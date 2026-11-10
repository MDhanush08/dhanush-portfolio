/**
 * Sanitizes header values to prevent email header injection attacks.
 * Strips carriage returns, line feeds, and ASCII control characters,
 * trims excess whitespace, and bounds length.
 *
 * @param value The raw string to sanitize
 * @param maxLength Maximum allowed length (default: 100)
 * @returns Sanitized header string
 */
export function sanitizeHeader(value: string, maxLength = 100): string {
  if (!value) {
    return '';
  }

  // Strip CR, LF, and all ASCII control characters (0-31 and 127)
  // eslint-disable-next-line no-control-regex
  const sanitized = value.replace(/[\r\n\x00-\x1F\x7F]/g, ' ').trim();

  // Compress multiple consecutive spaces
  const singleSpaced = sanitized.replace(/\s+/g, ' ');

  return singleSpaced.slice(0, maxLength);
}
