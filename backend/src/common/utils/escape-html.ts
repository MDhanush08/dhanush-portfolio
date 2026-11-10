/**
 * Safely escapes HTML special characters to prevent XSS injection.
 *
 * @param str The raw input string
 * @returns Escaped safe HTML string
 */
export function escapeHtml(str: string): string {
  if (!str) {
    return '';
  }

  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
