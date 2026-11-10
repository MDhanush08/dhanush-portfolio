import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { seconds, Throttle } from '@nestjs/throttler';
import { AssistantService } from './assistant.service';
import { ChatRequestDto } from './dto/chat-request.dto';

@ApiTags('assistant')
@Controller('assistant')
export class AssistantController {
  constructor(private readonly assistantService: AssistantService) {}

  @Post('chat')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 10, ttl: seconds(60) } })
  @ApiOperation({ summary: 'Chat with portfolio AI assistant (skeleton)' })
  @ApiResponse({
    status: 200,
    description: 'AI assistant reply generated',
    schema: {
      example: {
        reply: 'Hello! I am Jawahar portfolio assistant...',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid chat request payload',
  })
  @ApiResponse({
    status: 429,
    description: 'Rate limit exceeded',
  })
  @ApiResponse({
    status: 501,
    description: 'The AI assistant is not available yet',
  })
  async chat(@Body() dto: ChatRequestDto): Promise<{ reply: string }> {
    return this.assistantService.chat(dto);
  }
}
