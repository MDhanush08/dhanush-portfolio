import { escapeHtml } from '../../../common/utils/escape-html';

export interface ContactNotificationTemplateData {
  name: string;
  email: string;
  subject?: string;
  message: string;
  receivedAt: string;
}

/**
 * Generates a clean, readable HTML email body for contact form notifications.
 * Every user-provided value is strictly sanitized through escapeHtml.
 */
export function renderContactNotificationHtml(
  data: ContactNotificationTemplateData,
): string {
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safeSubject = data.subject ? escapeHtml(data.subject) : null;
  const safeMessage = escapeHtml(data.message).replace(/\n/g, '<br/>');
  const safeReceivedAt = escapeHtml(data.receivedAt);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>New Portfolio Message</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 24px; color: #111827;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
    <tr>
      <td style="padding: 24px; background-color: #0f172a; color: #ffffff;">
        <h1 style="margin: 0; font-size: 20px; font-weight: 600; line-height: 1.4;">New Portfolio Contact Message</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px; line-height: 1.6;">
          <tr>
            <td style="padding-bottom: 12px; width: 100px; font-weight: 600; color: #4b5563;">From:</td>
            <td style="padding-bottom: 12px; color: #111827;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding-bottom: 12px; width: 100px; font-weight: 600; color: #4b5563;">Email:</td>
            <td style="padding-bottom: 12px; color: #111827;">
              <a href="mailto:${safeEmail}" style="color: #2563eb; text-decoration: underline;">${safeEmail}</a>
            </td>
          </tr>
          ${
            safeSubject
              ? `<tr>
            <td style="padding-bottom: 12px; width: 100px; font-weight: 600; color: #4b5563;">Subject:</td>
            <td style="padding-bottom: 12px; color: #111827;">${safeSubject}</td>
          </tr>`
              : ''
          }
          <tr>
            <td style="padding-bottom: 12px; width: 100px; font-weight: 600; color: #4b5563;">Received:</td>
            <td style="padding-bottom: 12px; color: #6b7280;">${safeReceivedAt}</td>
          </tr>
        </table>

        <div style="margin-top: 16px; padding: 16px; background-color: #f3f4f6; border-radius: 6px; font-size: 15px; line-height: 1.6; color: #1f2937;">
          <div style="font-weight: 600; margin-bottom: 8px; color: #374151; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Message</div>
          ${safeMessage}
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding: 16px 24px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; text-align: center;">
        Sent via Portfolio Contact Form
      </td>
    </tr>
  </table>
</body>
</html>`;
}
