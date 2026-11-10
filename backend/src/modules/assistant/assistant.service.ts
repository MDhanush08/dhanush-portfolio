import { Injectable, NotImplementedException } from '@nestjs/common';
import { ChatRequestDto } from './dto/chat-request.dto';

@Injectable()
export class AssistantService {
  // TODO: Inject LLM Provider (e.g. GeminiProvider implementing LlmProvider) via injection token
  // TODO: Inject RetrievalService for pgvector similarity search over portfolio knowledge
  // TODO: Define portfolio system prompt and conversational constraints

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async chat(_dto: ChatRequestDto): Promise<{ reply: string }> {
    void _dto;
    throw new NotImplementedException('The AI assistant is not available yet.');
  }
}
