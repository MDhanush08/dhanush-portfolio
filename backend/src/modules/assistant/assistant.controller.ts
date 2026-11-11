import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { seconds, Throttle } from '@nestjs/throttler';
import { AssistantService } from './assistant.service';
import { ChatRequestDto, ChatResponseDto } from './dto/chat-request.dto';

@ApiTags('assistant')
@Controller('assistant')
export class AssistantController {
  constructor(private readonly assistantService: AssistantService) {}

  @Post('chat')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 10, ttl: seconds(60) } })
  @ApiOperation({
    summary: 'Chat with Dhanush M portfolio RAG AI assistant',
  })
  @ApiResponse({
    status: 200,
    description: 'AI assistant reply generated successfully',
    type: ChatResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid chat request body or message exceeded max length',
  })
  @ApiResponse({
    status: 429,
    description: 'Rate limit exceeded (10 requests per minute)',
  })
  @ApiResponse({
    status: 503,
    description: 'AI service temporarily unavailable or upstream error',
  })
  async chat(@Body() dto: ChatRequestDto): Promise<ChatResponseDto> {
    return this.assistantService.chat(dto);
  }
}
