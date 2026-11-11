export const CONTACT_LIMITS = {
  name: 60,
  email: 254,
  subject: 100,
  message: 2000,
} as const;

export const CHAT_LIMIT = 300;

export const CHAT_HISTORY_LIMITS = {
  maxItems: 10,
  maxContentLength: 1500,
} as const;
