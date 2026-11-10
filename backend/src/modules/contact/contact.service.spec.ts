/* eslint-disable @typescript-eslint/unbound-method, typescript/unbound-method */
import { ServiceUnavailableException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { escapeHtml } from '../../common/utils/escape-html';
import { sanitizeHeader } from '../../common/utils/sanitize-header';
import { MailService } from '../mail/mail.service';
import { ContactRepository } from './contact.repository';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

describe('ContactService', () => {
  let service: ContactService;
  let repository: jest.Mocked<ContactRepository>;
  let mailService: jest.Mocked<MailService>;

  const validDto: CreateContactDto = {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    subject: 'Project inquiry',
    message: 'Hello, I would love to collaborate with you.',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactService,
        {
          provide: ContactRepository,
          useValue: {
            create: jest.fn(),
            updateEmailStatus: jest.fn(),
            ping: jest.fn(),
          },
        },
        {
          provide: MailService,
          useValue: {
            sendContactNotification: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ContactService>(ContactService);
    repository = module.get(ContactRepository);
    mailService = module.get(MailService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('submit', () => {
    it('(a) saves, emails and returns success', async () => {
      repository.create.mockResolvedValue({ id: 'msg-uuid-1' });
      mailService.sendContactNotification.mockResolvedValue({
        id: 'resend-id-1',
      });
      repository.updateEmailStatus.mockResolvedValue(undefined);

      const result = await service.submit(validDto);

      expect(result).toEqual({
        success: true,
        message:
          'Thanks! Your message has been sent. I will get back to you soon.',
      });
      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(repository.create).toHaveBeenCalledWith({
        name: validDto.name,
        email: validDto.email,
        subject: validDto.subject,
        message: validDto.message,
      });
      expect(mailService.sendContactNotification).toHaveBeenCalledTimes(1);
      expect(repository.updateEmailStatus).toHaveBeenCalledWith(
        'msg-uuid-1',
        'sent',
      );
    });

    it('(b) database fails but email works, still returns success', async () => {
      repository.create.mockRejectedValue(new Error('Supabase unreachable'));
      mailService.sendContactNotification.mockResolvedValue({
        id: 'resend-id-2',
      });

      const result = await service.submit(validDto);

      expect(result).toEqual({
        success: true,
        message:
          'Thanks! Your message has been sent. I will get back to you soon.',
      });
      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(mailService.sendContactNotification).toHaveBeenCalledTimes(1);
      expect(repository.updateEmailStatus).not.toHaveBeenCalled();
    });

    it('(c) email fails but database works, still returns success and marks email_status "failed"', async () => {
      repository.create.mockResolvedValue({ id: 'msg-uuid-3' });
      mailService.sendContactNotification.mockRejectedValue(
        new Error('Resend rate limit'),
      );
      repository.updateEmailStatus.mockResolvedValue(undefined);

      const result = await service.submit(validDto);

      expect(result).toEqual({
        success: true,
        message:
          'Thanks! Your message has been sent. I will get back to you soon.',
      });
      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(mailService.sendContactNotification).toHaveBeenCalledTimes(1);
      expect(repository.updateEmailStatus).toHaveBeenCalledWith(
        'msg-uuid-3',
        'failed',
      );
    });

    it('(d) both fail, throws 503 ServiceUnavailableException', async () => {
      repository.create.mockRejectedValue(new Error('Supabase unreachable'));
      mailService.sendContactNotification.mockRejectedValue(
        new Error('Resend network outage'),
      );

      await expect(service.submit(validDto)).rejects.toThrow(
        ServiceUnavailableException,
      );
      await expect(service.submit(validDto)).rejects.toThrow(
        'Could not send your message right now. Please email me directly.',
      );
      expect(repository.updateEmailStatus).not.toHaveBeenCalled();
    });

    it('(e) honeypot filled, returns success and calls neither dependency', async () => {
      const spamDto: CreateContactDto = {
        name: validDto.name,
        email: validDto.email,
        subject: validDto.subject,
        message: validDto.message,
        website: 'https://spambot-link.com',
      };

      const result = await service.submit(spamDto);

      expect(result).toEqual({
        success: true,
        message:
          'Thanks! Your message has been sent. I will get back to you soon.',
      });
      expect(repository.create).not.toHaveBeenCalled();
      expect(mailService.sendContactNotification).not.toHaveBeenCalled();
      expect(repository.updateEmailStatus).not.toHaveBeenCalled();
    });
  });
});

describe('Utils', () => {
  describe('escapeHtml', () => {
    it('should escape HTML special characters to prevent XSS', () => {
      const input = '<script>alert("XSS & attack\'s")</script>';
      const expected =
        '&lt;script&gt;alert(&quot;XSS &amp; attack&#39;s&quot;)&lt;/script&gt;';
      expect(escapeHtml(input)).toBe(expected);
    });

    it('should return empty string for null, undefined, or empty string', () => {
      expect(escapeHtml('')).toBe('');
      expect(escapeHtml(null as unknown as string)).toBe('');
      expect(escapeHtml(undefined as unknown as string)).toBe('');
    });

    it('should return plain text unchanged', () => {
      expect(escapeHtml('Hello world 123')).toBe('Hello world 123');
    });
  });

  describe('sanitizeHeader', () => {
    it('should strip CR and LF to prevent header injection', () => {
      const malicious = 'Sender\r\nBcc: evil@attacker.com\nSubject: Injected';
      const result = sanitizeHeader(malicious);
      expect(result).not.toContain('\r');
      expect(result).not.toContain('\n');
      expect(result).toBe('Sender Bcc: evil@attacker.com Subject: Injected');
    });

    it('should strip control characters and trim whitespace', () => {
      const input = '  \x00\x08John Doe\x1F  ';
      expect(sanitizeHeader(input)).toBe('John Doe');
    });

    it('should truncate strings exceeding maxLength', () => {
      const longInput = 'a'.repeat(200);
      const result = sanitizeHeader(longInput, 100);
      expect(result.length).toBe(100);
    });

    it('should return empty string for empty, null or undefined input', () => {
      expect(sanitizeHeader('')).toBe('');
      expect(sanitizeHeader(null as unknown as string)).toBe('');
      expect(sanitizeHeader(undefined as unknown as string)).toBe('');
    });
  });
});
