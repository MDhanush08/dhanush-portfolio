import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { minutes, Throttle } from '@nestjs/throttler';
import { ContactService, ContactSubmissionResult } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@ApiTags('contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Throttle({ default: { limit: 5, ttl: minutes(10) } })
  @ApiOperation({ summary: 'Submit a contact form message' })
  @ApiResponse({
    status: 201,
    description: 'Message processed and sent successfully',
    schema: {
      example: {
        success: true,
        message:
          'Thanks! Your message has been sent. I will get back to you soon.',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed for input fields',
  })
  @ApiResponse({
    status: 429,
    description: 'Too many requests - rate limit exceeded',
  })
  @ApiResponse({
    status: 503,
    description: 'Service temporarily unavailable',
  })
  async submit(
    @Body() createContactDto: CreateContactDto,
  ): Promise<ContactSubmissionResult> {
    return this.contactService.submit(createContactDto);
  }
}
