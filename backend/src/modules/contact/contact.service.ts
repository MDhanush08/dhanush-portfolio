import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { ContactRepository } from './contact.repository';
import { CreateContactDto } from './dto/create-contact.dto';

export interface ContactSubmissionResult {
  success: boolean;
  message: string;
}

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(
    private readonly contactRepository: ContactRepository,
    private readonly mailService: MailService,
  ) {}

  async submit(dto: CreateContactDto): Promise<ContactSubmissionResult> {
    // Honeypot check: silently return success without saving or emailing
    if (dto.website && dto.website.trim().length > 0) {
      return {
        success: true,
        message:
          'Thanks! Your message has been sent. I will get back to you soon.',
      };
    }

    let savedRecordId: string | null = null;
    let saveSucceeded = false;
    let emailSucceeded = false;

    // 1. Insert into Supabase (log errors without personal data)
    try {
      const record = await this.contactRepository.create({
        name: dto.name,
        email: dto.email,
        subject: dto.subject,
        message: dto.message,
      });

      if (record?.id) {
        savedRecordId = record.id;
        saveSucceeded = true;
      }
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : 'Unknown database error';
      this.logger.error(`Database insertion failed: ${errorMsg}`);
    }

    // 2. Send email notification via Resend (log errors without personal data)
    try {
      await this.mailService.sendContactNotification({
        name: dto.name,
        email: dto.email,
        subject: dto.subject,
        message: dto.message,
      });
      emailSucceeded = true;
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : 'Unknown email error';
      this.logger.error(`Email dispatch failed: ${errorMsg}`);
    }

    // 3. Update email status if record was saved (best effort, never throw)
    if (saveSucceeded && savedRecordId) {
      try {
        const status = emailSucceeded ? 'sent' : 'failed';
        await this.contactRepository.updateEmailStatus(savedRecordId, status);
      } catch (err: unknown) {
        const errorMsg =
          err instanceof Error ? err.message : 'Unknown update error';
        this.logger.warn(
          `Failed to update email status for message ${savedRecordId}: ${errorMsg}`,
        );
      }
    }

    // 4. Return success if at least one succeeded
    if (saveSucceeded || emailSucceeded) {
      return {
        success: true,
        message:
          'Thanks! Your message has been sent. I will get back to you soon.',
      };
    }

    // 5. If both failed, throw 503
    throw new ServiceUnavailableException(
      'Could not send your message right now. Please email me directly.',
    );
  }
}
