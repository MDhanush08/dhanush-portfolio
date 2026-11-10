import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class ChatMessageDto {
  @ApiProperty({
    description: 'Role of the message sender',
    enum: ['user', 'assistant'],
    example: 'user',
  })
  @IsIn(['user', 'assistant'])
  role: 'user' | 'assistant';

  @ApiProperty({
    description: 'Message content',
    maxLength: 1000,
    example: 'What projects have you built using NestJS?',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  content: string;
}

export class ChatRequestDto {
  @ApiProperty({
    description: 'User message query',
    minLength: 1,
    maxLength: 500,
    example: 'Tell me about Dhanush and his projects.',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  @Length(1, 500)
  message: string;

  @ApiPropertyOptional({
    description: 'Recent conversation history (up to 6 messages)',
    type: [ChatMessageDto],
  })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(6)
  @ValidateNested({ each: true })
  @Type(() => ChatMessageDto)
  history?: ChatMessageDto[];
}

export class ChatLinkDto {
  @ApiProperty({
    description: 'Human-friendly label for the destination link',
    example: 'View my projects',
  })
  label: string;

  @ApiProperty({
    description: 'Frontend URL route or element anchor hash',
    example: '/projects',
  })
  url: string;
}

export class ChatResponseDto {
  @ApiProperty({
    description: 'AI assistant generated reply text',
    example:
      'Dhanush has built several production projects including Dental Interface 360, Lala Invoice, and Viral Forge.',
  })
  reply: string;

  @ApiProperty({
    description: 'Relevant frontend links related to the answer',
    type: [ChatLinkDto],
    example: [{ label: 'View my projects', url: '/projects' }],
  })
  links: ChatLinkDto[];
}
