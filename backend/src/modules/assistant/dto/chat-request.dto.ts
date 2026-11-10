import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
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
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  content: string;
}

export class ChatRequestDto {
  @ApiProperty({
    description: 'User message query',
    minLength: 1,
    maxLength: 1000,
    example: 'Tell me about your background and experience.',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 1000)
  message: string;

  @ApiPropertyOptional({
    description: 'Recent conversation history (up to 10 messages)',
    type: [ChatMessageDto],
  })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @ValidateNested({ each: true })
  @Type(() => ChatMessageDto)
  history?: ChatMessageDto[];
}
