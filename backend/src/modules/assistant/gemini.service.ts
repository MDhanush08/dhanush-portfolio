import {
  Injectable,
  InternalServerErrorException,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ASSISTANT_SYSTEM_PROMPT } from './assistant.constants';
import { ChatMessageDto } from './dto/chat-request.dto';
import { LlmProvider } from './interfaces/llm-provider.interface';

interface GeminiEmbeddingResponse {
  embedding?: {
    values?: number[];
  };
  error?: {
    code?: number;
    message?: string;
    status?: string;
  };
}

interface GeminiContentResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
      role?: string;
    };
  }>;
  error?: {
    code?: number;
    message?: string;
    status?: string;
  };
}

@Injectable()
export class GeminiService implements LlmProvider {
  private readonly logger = new Logger(GeminiService.name);
  private readonly apiKey: string;
  private readonly embedModel: string;
  private readonly chatModel: string;
  private readonly baseUrl = 'https://generativelanguage.googleapis.com/v1beta';

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('gemini.apiKey') || '';
    this.embedModel =
      this.configService.get<string>('gemini.embedModel') ||
      'gemini-embedding-001';
    this.chatModel = this.configService.get<string>('gemini.chatModel') || '';
  }

  /**
   * Generates a 768-dimensional vector embedding for the input text.
   *
   * @param text Content string to embed
   * @param taskType RETRIEVAL_DOCUMENT for stored knowledge, RETRIEVAL_QUERY for user queries
   * @returns Array of numbers representing the embedding vector
   */
  async embedText(
    text: string,
    taskType: 'RETRIEVAL_DOCUMENT' | 'RETRIEVAL_QUERY' = 'RETRIEVAL_QUERY',
  ): Promise<number[]> {
    if (!this.apiKey) {
      this.logger.error('GEMINI_API_KEY is not configured');
      throw new InternalServerErrorException(
        'AI Assistant service configuration error',
      );
    }

    const endpoint = `${this.baseUrl}/models/${this.embedModel}:embedContent?key=${encodeURIComponent(this.apiKey)}`;
    const payload = {
      model: `models/${this.embedModel}`,
      content: {
        parts: [{ text }],
      },
      taskType,
      outputDimensionality: 768,
    };

    const data = await this.executeWithRetry<GeminiEmbeddingResponse>(
      endpoint,
      payload,
      'Embedding',
    );

    const values = data?.embedding?.values;
    if (!values || !Array.isArray(values) || values.length === 0) {
      this.logger.error(
        `Gemini embedding response missing values. Status: ${data?.error?.status ?? 'unknown'}`,
      );
      throw new ServiceUnavailableException(
        'Failed to compute semantic embedding',
      );
    }

    return values;
  }

  /**
   * Generates conversational response using system prompt, recent turns, and current query.
   *
   * @param systemPrompt Instructions and retrieved knowledge facts
   * @param history Previous chat turns (up to 6 items)
   * @param userMessage Current user message
   * @returns Text reply string
   */
  async generateAnswer(
    systemPrompt: string,
    history: ChatMessageDto[] = [],
    userMessage: string,
  ): Promise<string> {
    if (!this.apiKey || !this.chatModel) {
      this.logger.error(
        'GEMINI_API_KEY or GEMINI_CHAT_MODEL is not configured',
      );
      throw new InternalServerErrorException(
        'AI Assistant service configuration error',
      );
    }

    const endpoint = `${this.baseUrl}/models/${this.chatModel}:generateContent?key=${encodeURIComponent(this.apiKey)}`;

    // Map conversation history into Gemini format (user <-> model)
    const contents: Array<{
      role: 'user' | 'model';
      parts: Array<{ text: string }>;
    }> = [];

    for (const item of history) {
      contents.push({
        role: item.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: item.content }],
      });
    }

    // Append current user message
    contents.push({
      role: 'user',
      parts: [{ text: userMessage }],
    });

    const payload = {
      system_instruction: {
        parts: [{ text: systemPrompt }],
      },
      contents,
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 600,
      },
    };

    const data = await this.executeWithRetry<GeminiContentResponse>(
      endpoint,
      payload,
      'Content Generation',
    );

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!reply) {
      this.logger.warn('Gemini generateContent returned empty candidate parts');
      return "I don't have that information about Dhanush. You can reach him through the contact section.";
    }

    return reply.trim();
  }

  /**
   * Implements LlmProvider contract.
   */
  async generateReply(
    message: string,
    history: ChatMessageDto[] = [],
    context?: string,
  ): Promise<string> {
    const prompt = context
      ? `${ASSISTANT_SYSTEM_PROMPT}\n\nFacts about Dhanush:\n${context}`
      : ASSISTANT_SYSTEM_PROMPT;
    return this.generateAnswer(prompt, history, message);
  }

  /**
   * Executes HTTP POST request against Gemini REST API with retry on 503 and 429.
   */
  private async executeWithRetry<T>(
    endpoint: string,
    body: Record<string, unknown>,
    operationName: string,
    maxRetries = 3,
  ): Promise<T> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000);

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          return (await response.json()) as T;
        }

        const status = response.status;
        const errorText = await response.text().catch(() => '');

        this.logger.warn(
          `Gemini ${operationName} returned HTTP ${status} on attempt ${attempt}/${maxRetries}`,
        );

        // Retry on 503 Service Unavailable and 429 Too Many Requests
        if ((status === 503 || status === 429) && attempt < maxRetries) {
          const delay = Math.pow(2, attempt) * 500; // 1000ms, 2000ms, ...
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }

        this.logger.error(
          `Gemini ${operationName} failed with HTTP ${status}: ${errorText.slice(0, 200)}`,
        );

        if (status === 429) {
          throw new ServiceUnavailableException(
            'The AI assistant is temporarily rate-limited. Please wait a moment and try again.',
          );
        }

        throw new ServiceUnavailableException(
          'The AI assistant is temporarily unavailable. Please try again shortly.',
        );
      } catch (err: unknown) {
        clearTimeout(timeoutId);

        if (err instanceof ServiceUnavailableException) {
          throw err;
        }

        const isAbort =
          err instanceof Error &&
          (err.name === 'AbortError' || err.message.includes('aborted'));

        if (isAbort) {
          this.logger.error(
            `Gemini ${operationName} timed out after 25 seconds on attempt ${attempt}`,
          );
        } else {
          const msg = err instanceof Error ? err.message : String(err);
          this.logger.error(
            `Gemini ${operationName} error on attempt ${attempt}: ${msg}`,
          );
        }

        lastError = err instanceof Error ? err : new Error(String(err));

        if (attempt < maxRetries) {
          const delay = Math.pow(2, attempt) * 500;
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }
      }
    }

    throw new ServiceUnavailableException(
      lastError?.message?.includes('aborted')
        ? 'AI assistant request timed out. Please try again.'
        : 'The AI assistant service is temporarily unreachable.',
    );
  }
}
