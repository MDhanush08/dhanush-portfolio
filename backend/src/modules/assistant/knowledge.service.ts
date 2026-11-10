import { Injectable, Logger } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { GeminiService } from './gemini.service';

export interface KnowledgeMatch {
  id: number;
  section: string;
  content: string;
  link: string | null;
  similarity: number;
}

export interface RetrievalResult {
  chunks: KnowledgeMatch[];
  vectorMatches: KnowledgeMatch[];
  intentChunksCount: number;
  bestSimilarity: number;
  searchQuery: string;
}

@Injectable()
export class KnowledgeService {
  private readonly logger = new Logger(KnowledgeService.name);

  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly geminiService: GeminiService,
  ) {}

  /**
   * Retrieves semantically matched vector chunks merged with intent-based section rows.
   *
   * @param question Current user query
   * @param matchedIntents List of fuzzy-matched intents (e.g. ['projects', 'experience'])
   * @param previousUserMessage Previous user message if follow-up turn
   * @param topK Number of candidate vector chunks to retrieve (default: 8)
   * @param minSimilarity Threshold cutoff (default: 0.0 for raw query)
   */
  async retrieve(
    question: string,
    matchedIntents: string[] = [],
    previousUserMessage?: string,
    topK = 8,
    minSimilarity = 0.0,
  ): Promise<RetrievalResult> {
    const trimmed = question.trim();
    if (!trimmed) {
      return {
        chunks: [],
        vectorMatches: [],
        intentChunksCount: 0,
        bestSimilarity: 0,
        searchQuery: '',
      };
    }

    // 1. Build search query
    const words = trimmed.split(/\s+/).filter(Boolean);
    let searchQuery = trimmed;

    // Follow-up context: if message is 3 words or fewer and previous message exists, append previous query
    if (
      words.length <= 3 &&
      previousUserMessage &&
      previousUserMessage.trim()
    ) {
      searchQuery = `${previousUserMessage.trim()} ${trimmed}`;
    }

    // Expand search query for short inputs (<= 4 words) to strengthen semantic vector match
    const currentWords = searchQuery.split(/\s+/).filter(Boolean);
    if (currentWords.length <= 4) {
      searchQuery = `Tell me about Dhanush. ${searchQuery}`;
    }

    let vectorMatches: KnowledgeMatch[] = [];
    let bestSimilarity = 0;

    // 2. Vector search via Supabase pgvector RPC
    try {
      const queryEmbedding = await this.geminiService.embedText(
        searchQuery,
        'RETRIEVAL_QUERY',
      );

      const { data, error } = await this.supabaseService
        .getClient()
        .rpc('match_portfolio_knowledge', {
          query_embedding: queryEmbedding,
          match_count: topK,
          min_similarity: minSimilarity,
        });

      if (error) {
        this.logger.error(
          `Supabase match_portfolio_knowledge RPC error: ${error.message}`,
        );
      } else if (Array.isArray(data)) {
        vectorMatches = data as KnowledgeMatch[];
        if (vectorMatches.length > 0) {
          bestSimilarity = vectorMatches[0].similarity;
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.error(`Vector retrieval error: ${msg}`);
    }

    // 3. Intent-based section retrieval (filtered to valid portfolio content sections)
    const validContentSections = [
      'about',
      'experience',
      'projects',
      'skills',
      'education',
      'contact',
    ];
    const targetSections = matchedIntents.filter((intent) =>
      validContentSections.includes(intent.toLowerCase()),
    );

    let intentMatches: KnowledgeMatch[] = [];

    if (targetSections.length > 0) {
      try {
        const { data: sectionData, error: sectionError } =
          await this.supabaseService
            .getClient()
            .from('portfolio_knowledge')
            .select('id, section, content, link')
            .in('section', targetSections);

        if (sectionError) {
          this.logger.error(
            `Supabase intent section query error: ${sectionError.message}`,
          );
        } else if (Array.isArray(sectionData)) {
          // Intent matches receive an assigned high relevance score
          intentMatches = sectionData.map((row) => ({
            id: Number(row.id),
            section: String(row.section),
            content: String(row.content),
            link: row.link ? String(row.link) : null,
            similarity: 0.9,
          }));
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        this.logger.error(`Intent section retrieval error: ${msg}`);
      }
    }

    // 4. Merge and deduplicate (vector matches first, then intent matches, max 14)
    const mergedMap = new Map<number, KnowledgeMatch>();

    for (const match of vectorMatches) {
      mergedMap.set(match.id, match);
    }

    for (const match of intentMatches) {
      if (!mergedMap.has(match.id)) {
        mergedMap.set(match.id, match);
      }
      if (mergedMap.size >= 14) {
        break;
      }
    }

    const mergedChunks = Array.from(mergedMap.values()).slice(0, 14);

    return {
      chunks: mergedChunks,
      vectorMatches,
      intentChunksCount: intentMatches.length,
      bestSimilarity: Math.max(
        bestSimilarity,
        intentMatches.length > 0 ? 0.9 : 0,
      ),
      searchQuery,
    };
  }
}
