import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateContactDto {
  @ApiProperty({
    description: 'Sender full name',
    minLength: 1,
    maxLength: 100,
    example: 'Jane Doe',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @ApiProperty({
    description: 'Sender email address',
    maxLength: 254,
    example: 'jane@example.com',
  })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(254)
  email: string;

  @ApiPropertyOptional({
    description: 'Optional subject line',
    maxLength: 150,
    example: 'Project Collaboration',
  })
  @Transform(({ value }) =>
    typeof value === 'string' && value.trim() !== '' ? value.trim() : undefined,
  )
  @IsOptional()
  @IsString()
  @MaxLength(150)
  subject?: string;

  @ApiProperty({
    description: 'Contact message body',
    minLength: 1,
    maxLength: 5000,
    example: 'Hi, I would like to discuss a project with you.',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  @Length(1, 5000)
  message: string;

  @ApiPropertyOptional({
    description: 'Honeypot field - must be left blank by legitimate visitors',
    example: '',
  })
  @IsOptional()
  @IsString()
  website?: string;
}
