import { ChatMessageDto } from '../dto/chat-request.dto';

/**
 * Contract for LLM (Large Language Model) integration.
 *
 * NOTE: A Gemini provider and a RAG (Retrieval-Augmented Generation) retrieval step
 * over portfolio data (projects, experience, skills, using Supabase pgvector embeddings)
 * will be added here later.
 *
 * TODO: Define LLM_PROVIDER injection token when concrete provider is implemented.
 */
export interface LlmProvider {
  /**
   * Generates a conversational reply from the LLM based on user message,
   * recent message history, and retrieved portfolio knowledge context.
   *
   * @param message Current user query
   * @param history Previous conversation turns (up to 10 messages)
   * @param context RAG-retrieved portfolio context chunks
   * @returns Assistant response text
   */
  generateReply(
    message: string,
    history?: ChatMessageDto[],
    context?: string,
  ): Promise<string>;
}
