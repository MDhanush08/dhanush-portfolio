import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ASSISTANT_SYSTEM_PROMPT,
  detectIntents,
  MIN_SIMILARITY_THRESHOLD,
  normalizeInput,
  OUT_OF_SCOPE_REPLY,
  SECTION_LINKS,
} from './assistant.constants';
import {
  ChatLinkDto,
  ChatRequestDto,
  ChatResponseDto,
} from './dto/chat-request.dto';
import { GeminiService } from './gemini.service';
import { KnowledgeMatch, KnowledgeService } from './knowledge.service';

@Injectable()
export class AssistantService {
  private readonly logger = new Logger(AssistantService.name);
  private readonly isDev: boolean;

  constructor(
    private readonly configService: ConfigService,
    private readonly geminiService: GeminiService,
    private readonly knowledgeService: KnowledgeService,
  ) {
    const nodeEnv = this.configService.get<string>('nodeEnv') || 'development';
    this.isDev = nodeEnv !== 'production';
  }

  /**
   * Main RAG conversation pipeline with typo tolerance, intent prioritization,
   * dev-mode debugging, and deterministic link building.
   */
  async chat(dto: ChatRequestDto): Promise<ChatResponseDto> {
    const rawMessage = dto.message.trim();
    const normalized = normalizeInput(rawMessage);
    const matchedIntents = detectIntents(normalized);

    // 1. Inspect previous message for follow-up turns
    let previousUserMessage: string | undefined;
    if (dto.history && dto.history.length > 0) {
      for (let i = dto.history.length - 1; i >= 0; i--) {
        if (dto.history[i].role === 'user') {
          previousUserMessage = dto.history[i].content;
          break;
        }
      }
    }

    // 2. Handle pure small talk / greetings without invoking RAG or LLM
    const contentIntents = matchedIntents.filter((i) => i !== 'help');

    if (matchedIntents.includes('help') && contentIntents.length === 0) {
      const smallTalkResponse = this.handleSmallTalk(normalized);
      if (this.isDev) {
        this.logger.debug(
          `[AI-DEBUG] Small talk handled directly: "${rawMessage}" -> Matched: [${matchedIntents.join(', ')}]`,
        );
      }
      return smallTalkResponse;
    }

    // 3. Retrieve chunks: vector search + intent-based section rows
    const retrieval = await this.knowledgeService.retrieve(
      rawMessage,
      contentIntents,
      previousUserMessage,
      8,
      0.0,
    );

    const hasIntentMatch = contentIntents.length > 0;
    const bestVectorSimilarity =
      retrieval.vectorMatches.length > 0
        ? retrieval.vectorMatches[0].similarity
        : 0;
    const isAboveVectorThreshold =
      bestVectorSimilarity >= MIN_SIMILARITY_THRESHOLD;

    // Dev-only structured logging
    if (this.isDev) {
      this.logDebugSummary({
        originalQuestion: rawMessage,
        normalizedQuestion: normalized,
        matchedIntents,
        searchText: retrieval.searchQuery,
        chunks: retrieval.chunks,
        threshold: MIN_SIMILARITY_THRESHOLD,
        bestVectorSimilarity,
        hasIntentMatch,
      });
    }

    // 4. Threshold & relevance cutoff
    // Fallback ONLY when NO intent match AND NO chunk above threshold
    if (!hasIntentMatch && !isAboveVectorThreshold) {
      if (this.isDev) {
        this.logger.debug(
          `[AI-DEBUG] Fallback decision: LLM SKIPPED because best similarity (${bestVectorSimilarity.toFixed(3)}) < threshold (${MIN_SIMILARITY_THRESHOLD}) and no matched intents.`,
        );
      }
      return {
        reply: OUT_OF_SCOPE_REPLY,
        links: [],
      };
    }

    // 5. Construct system prompt with current date and retrieved facts
    const todayStr = new Date().toISOString().split('T')[0];
    const systemPrompt = ASSISTANT_SYSTEM_PROMPT.replace('{{TODAY}}', todayStr);

    const factsList = retrieval.chunks
      .map((c, idx) => `${idx + 1}. [${c.section}] ${c.content}`)
      .join('\n');

    const promptWithFacts = `${systemPrompt}\n\nFacts about Dhanush:\n${factsList}`;

    // 6. Generate answer via Gemini
    if (this.isDev) {
      this.logger.debug(
        `[AI-DEBUG] Calling Gemini LLM with ${retrieval.chunks.length} fact chunks.`,
      );
    }

    const answer = await this.geminiService.generateAnswer(
      promptWithFacts,
      dto.history ?? [],
      rawMessage,
    );

    // 7. Check if fallback originated from LLM
    if (
      this.isDev &&
      answer &&
      (answer.includes(OUT_OF_SCOPE_REPLY) ||
        answer.includes("don't have that information"))
    ) {
      this.logger.debug(
        `[AI-DEBUG] Fallback decision: Fallback response came from the LLM itself.`,
      );
    }

    // 8. Build deterministic links (intent-matched sections prioritized, max 2)
    const links = this.buildDeterministicLinks(
      contentIntents,
      retrieval.chunks,
    );

    return {
      reply: answer,
      links,
    };
  }

  /**
   * Generates instant contextual responses for small talk, greetings, and help.
   */
  private handleSmallTalk(normalized: string): ChatResponseDto {
    if (normalized.includes('thank')) {
      return {
        reply:
          "You're welcome! Feel free to ask if you have more questions about Dhanush M's projects, technical skills, or work experience.",
        links: [{ label: 'Go to About', url: '#about' }],
      };
    }

    if (normalized.includes('bye')) {
      return {
        reply:
          'Goodbye! Have a great day and feel free to reach out to Dhanush anytime via the contact section.',
        links: [{ label: 'Go to Contact', url: '#contact' }],
      };
    }

    if (normalized.includes('what can you do') || normalized.includes('help')) {
      return {
        reply:
          "Hello! I am Dhanush M's portfolio AI assistant. I can answer questions about Dhanush's software projects, technical skills, professional work experience, education, and how to contact him. Feel free to ask!",
        links: [{ label: 'Go to About', url: '#about' }],
      };
    }

    // Default friendly greeting
    return {
      reply:
        "Hello! I am Dhanush M's portfolio AI assistant. Dhanush is a Full Stack Software Developer with 2 years of professional experience across Angular, React, Node.js, NestJS, and PostgreSQL. How can I help you today?",
      links: [{ label: 'Go to About', url: '#about' }],
    };
  }

  /**
   * Deterministically constructs up to 2 unique navigation links.
   * Priority is given to sections matching the user's detected intents.
   */
  private buildDeterministicLinks(
    matchedIntents: string[],
    chunks: KnowledgeMatch[],
  ): ChatLinkDto[] {
    const links: ChatLinkDto[] = [];
    const seenUrls = new Set<string>();

    // 1. Prioritize links for directly matched content intents
    for (const intent of matchedIntents) {
      if (links.length >= 2) break;
      const config = SECTION_LINKS[intent.toLowerCase()];
      if (config && !seenUrls.has(config.url)) {
        seenUrls.add(config.url);
        links.push({
          label: config.label,
          url: config.url,
        });
      }
    }

    // 2. Add remaining links from retrieved knowledge chunks
    for (const chunk of chunks) {
      if (links.length >= 2) break;
      const config = SECTION_LINKS[chunk.section.toLowerCase()];
      const targetUrl = config?.url || chunk.link;
      const targetLabel = config?.label || 'Learn more';

      if (targetUrl && !seenUrls.has(targetUrl)) {
        seenUrls.add(targetUrl);
        links.push({
          label: targetLabel,
          url: targetUrl,
        });
      }
    }

    return links;
  }

  /**
   * Logs structured diagnostic details when NODE_ENV !== 'production'.
   */
  private logDebugSummary(info: {
    originalQuestion: string;
    normalizedQuestion: string;
    matchedIntents: string[];
    searchText: string;
    chunks: KnowledgeMatch[];
    threshold: number;
    bestVectorSimilarity: number;
    hasIntentMatch: boolean;
  }): void {
    this.logger.debug('----------------------------------------------------');
    this.logger.debug(
      `[AI-DEBUG] Original Question : "${info.originalQuestion}"`,
    );
    this.logger.debug(
      `[AI-DEBUG] Normalized        : "${info.normalizedQuestion}"`,
    );
    this.logger.debug(
      `[AI-DEBUG] Matched Intents   : [${info.matchedIntents.join(', ')}]`,
    );
    this.logger.debug(`[AI-DEBUG] Search Text       : "${info.searchText}"`);
    this.logger.debug(
      `[AI-DEBUG] Threshold         : ${info.threshold} (Best Vector: ${info.bestVectorSimilarity.toFixed(3)})`,
    );
    this.logger.debug(
      `[AI-DEBUG] Intent Match?     : ${info.hasIntentMatch ? 'YES' : 'NO'}`,
    );
    this.logger.debug(`[AI-DEBUG] Retrieved Chunks (${info.chunks.length}):`);
    info.chunks.forEach((chunk, i) => {
      this.logger.debug(
        `   [${i + 1}] ID: ${chunk.id} | Section: ${chunk.section} | Sim: ${chunk.similarity.toFixed(3)} | "${chunk.content.slice(0, 60)}..."`,
      );
    });
    this.logger.debug('----------------------------------------------------');
  }
}
