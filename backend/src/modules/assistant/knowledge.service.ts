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

@Injectable()
export class KnowledgeService {
  private readonly logger = new Logger(KnowledgeService.name);

  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly geminiService: GeminiService,
  ) {}

  /**
   * Semantically searches the portfolio_knowledge vector table for relevant chunks.
   *
   * @param question Raw user query
   * @param topK Number of candidate chunks to retrieve (default: 6)
   * @param minSimilarity Cutoff score for retrieval (default: 0.0)
   * @returns Array of retrieved knowledge facts with similarity scores
   */
  async retrieve(
    question: string,
    topK = 6,
    minSimilarity = 0.0,
  ): Promise<KnowledgeMatch[]> {
    const trimmed = question.trim();
    if (!trimmed) {
      return [];
    }

    // Expand search query for short inputs (<= 3 words) to strengthen semantic vector match
    const words = trimmed.split(/\s+/).filter(Boolean);
    const searchQuery =
      words.length <= 3 ? `Tell me about Dhanush. ${trimmed}` : trimmed;

    try {
      // Generate embedding vector using RETRIEVAL_QUERY task type
      const queryEmbedding = await this.geminiService.embedText(
        searchQuery,
        'RETRIEVAL_QUERY',
      );

      // Call Supabase RPC function match_portfolio_knowledge
      const { data, error } = await this.supabaseService
        .getClient()
        .rpc('match_portfolio_knowledge', {
          query_embedding: queryEmbedding,
          match_count: topK,
          min_similarity: minSimilarity,
        });

      if (error) {
        this.logger.error(
          `Supabase match_portfolio_knowledge RPC error: ${error.message} (${error.code})`,
        );
        return [];
      }

      if (!data || !Array.isArray(data)) {
        return [];
      }

      return data as KnowledgeMatch[];
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.error(`Knowledge retrieval failure: ${msg}`);
      return [];
    }
  }
}
