import type {
  ChatApiResponse,
  ChatHistoryItem,
  ContactFormData,
} from '../types'
import { profile } from '../data/portfolio'

/**
 * Submit contact form payload.
 * Connects to NestJS/Express backend if VITE_API_URL is configured.
 * If VITE_API_URL is not set, throws an explicit configuration requirement error
 * rather than displaying a false success message.
 */
export async function submitContact(data: ContactFormData): Promise<{ success: boolean; message: string }> {
  const apiUrl = import.meta.env.VITE_API_URL

  if (apiUrl) {
    try {
      const response = await fetch(`${apiUrl}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error(`Failed to send message (${response.status}: ${response.statusText}). Please check your server or email configuration.`)
      }
      const result = await response.json().catch(() => ({}))
      return {
        success: true,
        message: result.message || 'Thank you! Your message has been sent successfully.',
      }
    } catch (err: unknown) {
      if (err instanceof Error) throw err
      throw new Error('Failed to connect to contact server.')
    }
  }

  // Simulate network delay before informing that backend integration endpoint is required
  await new Promise((resolve) => setTimeout(resolve, 600))

  if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
    throw new Error('Please fill in all required fields.')
  }

  throw new Error(
    `Contact backend endpoint is not configured (VITE_API_URL is not set). Please reach out directly to ${profile.email}.`
  )
}

/**
 * Send a chat message to the portfolio RAG AI assistant backend.
 * Calls `${import.meta.env.VITE_API_URL}/assistant/chat` with `{ message, history }`.
 * Uses a 70s timeout to gracefully accommodate Render cold starts.
 */
export async function sendChatMessage(
  message: string,
  history: ChatHistoryItem[] = [],
  signal?: AbortSignal
): Promise<ChatApiResponse> {
  const apiUrl = import.meta.env.VITE_API_URL

  if (!apiUrl) {
    throw new Error('Assistant API endpoint is not configured (VITE_API_URL is missing).')
  }

  const endpoint = `${apiUrl}/assistant/chat`

  let response: Response
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, history }),
      signal,
    })
  } catch (err: unknown) {
    if (err instanceof Error && err.name === 'AbortError') {
      throw new Error('The request timed out. The server might be waking up; please try again.')
    }
    throw new Error('Unable to connect to the assistant server. Please check your connection and try again.')
  }

  if (response.status === 429) {
    throw new Error('Too many requests, please wait a moment.')
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    const msg = errorData.message || `Server returned error (${response.status})`
    throw new Error(Array.isArray(msg) ? msg.join(', ') : msg)
  }

  const data = (await response.json()) as ChatApiResponse
  return {
    reply: data.reply,
    links: data.links || [],
  }
}
