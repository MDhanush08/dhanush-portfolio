import { Module } from '@nestjs/common';
import { AssistantController } from './assistant.controller';
import { AssistantService } from './assistant.service';
import { GeminiService } from './gemini.service';
import { KnowledgeService } from './knowledge.service';

@Module({
  controllers: [AssistantController],
  providers: [AssistantService, GeminiService, KnowledgeService],
  exports: [AssistantService, GeminiService, KnowledgeService],
})
export class AssistantModule {}
