import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { sanitizeHeader } from '../../common/utils/sanitize-header';
import { renderContactNotificationHtml } from './templates/contact-notification.template';

export class MailDeliveryException extends Error {
  constructor(message = 'Failed to deliver notification email') {
    super(message);
    this.name = 'MailDeliveryException';
  }
}

export interface ContactNotificationPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

@Injectable()
export class MailService {
  private readonly resend: Resend;
  private readonly logger = new Logger(MailService.name);
  private readonly notifyEmail: string;
  private readonly mailFrom: string;

  constructor(private readonly configService: ConfigService) {
    const apiKey =
      this.configService.get<string>('mail.resendApiKey') || 'placeholder_key';
    this.resend = new Resend(apiKey);
    this.notifyEmail = this.configService.get<string>('mail.notifyEmail') || '';
    this.mailFrom =
      this.configService.get<string>('mail.mailFrom') ||
      'Portfolio Contact <onboarding@resend.dev>';
  }

  async sendContactNotification(
    payload: ContactNotificationPayload,
  ): Promise<{ id: string }> {
    const sanitizedName = sanitizeHeader(payload.name, 100);
    const sanitizedSubject = payload.subject
      ? sanitizeHeader(payload.subject, 150)
      : undefined;

    const emailSubject = sanitizedSubject
      ? `New portfolio message from ${sanitizedName}: ${sanitizedSubject}`
      : `New portfolio message from ${sanitizedName}`;

    const receivedAt = new Date().toUTCString();

    const html = renderContactNotificationHtml({
      name: payload.name,
      email: payload.email,
      subject: payload.subject,
      message: payload.message,
      receivedAt,
    });

    const text = [
      'New portfolio message received',
      '',
      `From: ${sanitizedName} <${payload.email}>`,
      `Subject: ${sanitizedSubject || '(None)'}`,
      `Received: ${receivedAt}`,
      '',
      'Message:',
      payload.message,
    ].join('\n');

    const { data, error } = await this.resend.emails.send({
      from: this.mailFrom,
      to: this.notifyEmail,
      replyTo: payload.email,
      subject: emailSubject,
      html,
      text,
    });

    if (error) {
      this.logger.error(
        `Failed to send email notification: ${error.name} - ${error.message}`,
      );
      throw new MailDeliveryException(
        'Failed to send contact notification email',
      );
    }

    if (!data) {
      throw new MailDeliveryException('No data returned from email service');
    }

    return data;
  }
}
