import { Injectable, Logger } from '@nestjs/common';
import {
  ASSISTANT_SYSTEM_PROMPT,
  GREETING_REPLY,
  MIN_SIMILARITY_THRESHOLD,
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

  constructor(
    private readonly geminiService: GeminiService,
    private readonly knowledgeService: KnowledgeService,
  ) {}

  /**
   * Main RAG conversation pipeline:
   * 1. Inspect greeting intent or retrieve semantic knowledge chunks.
   * 2. If no chunk meets similarity threshold, safely return out-of-scope response without LLM invocation.
   * 3. Construct bounded system prompt with retrieved facts.
   * 4. Request generation from Gemini.
   * 5. Extract deterministic, deduplicated links based on used facts.
   */
  async chat(dto: ChatRequestDto): Promise<ChatResponseDto> {
    const rawMessage = dto.message.trim();

    // 1. Check for pure greeting or introductory turn
    if (this.isGreeting(rawMessage)) {
      return {
        reply: GREETING_REPLY,
        links: [
          {
            label: SECTION_LINKS.about.label,
            url: SECTION_LINKS.about.url,
          },
        ],
      };
    }

    // 2. Retrieve top-6 knowledge facts from Supabase pgvector
    const matches = await this.knowledgeService.retrieve(rawMessage, 6, 0.0);

    // 3. Evaluate similarity relevance cutoff
    const bestMatch = matches[0];
    const isRelevant =
      bestMatch && bestMatch.similarity >= MIN_SIMILARITY_THRESHOLD;

    if (!isRelevant) {
      this.logger.debug(
        `User query outside knowledge scope (similarity: ${bestMatch?.similarity?.toFixed(3) ?? 'none'}): "${rawMessage.slice(0, 60)}"`,
      );
      return {
        reply: OUT_OF_SCOPE_REPLY,
        links: [],
      };
    }

    // 4. Build strict fact-bounded system prompt
    const factsList = matches
      .map((m, idx) => `${idx + 1}. [${m.section}] ${m.content}`)
      .join('\n');

    const promptWithFacts = `${ASSISTANT_SYSTEM_PROMPT}\n\nFacts about Dhanush:\n${factsList}`;

    // 5. Generate conversational answer through Gemini
    const answer = await this.geminiService.generateAnswer(
      promptWithFacts,
      dto.history ?? [],
      rawMessage,
    );

    // 6. Build deterministic, deduplicated links from top matching chunks (max 2)
    const links = this.extractDeterministicLinks(matches);

    return {
      reply: answer,
      links,
    };
  }

  /**
   * Identifies simple greeting phrases to respond instantly with friendly context.
   */
  private isGreeting(text: string): boolean {
    const normalized = text
      .toLowerCase()
      .replace(/[!?,.]/g, '')
      .trim();

    const GREETING_PATTERNS = [
      /^hi+$/i,
      /^hello+$/i,
      /^hey+$/i,
      /^hii+$/i,
      /^vanakkam$/i,
      /^namaste$/i,
      /^good\s*(morning|afternoon|evening)$/i,
      /^hello\s*there$/i,
      /^hi\s*there$/i,
    ];

    return GREETING_PATTERNS.some((pattern) => pattern.test(normalized));
  }

  /**
   * Deterministically constructs up to 2 unique navigation links from retrieved knowledge facts.
   */
  private extractDeterministicLinks(matches: KnowledgeMatch[]): ChatLinkDto[] {
    const links: ChatLinkDto[] = [];
    const seenUrls = new Set<string>();

    for (const match of matches) {
      if (links.length >= 2) {
        break;
      }

      // Check configured section link mapping or link column
      const config = SECTION_LINKS[match.section.toLowerCase()];
      const targetUrl = config?.url || match.link;
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
}
