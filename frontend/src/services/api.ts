import type { ContactFormData } from '../types'
import { profile, projects, skillCategories } from '../data/portfolio'

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
 * Send a chat message to the assistant.
 * Answers from local portfolio data using keyword matching.
 */
export async function sendChatMessage(query: string): Promise<string> {
  const apiUrl = import.meta.env.VITE_API_URL
  if (apiUrl) {
    try {
      const response = await fetch(`${apiUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      })
      if (response.ok) {
        const json = await response.json()
        if (json.reply) return json.reply
      }
    } catch {
      // fall back to local answer
    }
  }

  // Simulate thinking delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const q = query.toLowerCase()

  if (q.includes('experience') || q.includes('background') || q.includes('work experience') || q.includes('job')) {
    return `Dhanush has ${profile.yearsExperience} years of experience as a Full Stack Software Developer, previously working at Nandalala Infotech in Trichy (Sep 2024 – Nov 2026) across Angular, React, NestJS, GraphQL/Hasura, and PostgreSQL, along with part-time freelance development.`
  }

  if (q.includes('project') || q.includes('built') || q.includes('portfolio') || q.includes('work')) {
    const names = projects.map((p) => p.title).join(', ')
    return `Key projects include: ${names}. Highlights: "Dental Interface 360" (multi-role dental SaaS with NestJS, GraphQL, Stripe), "Lala Invoice" (billing system in React/Python/MongoDB), and "Personal Portfolio".`
  }

  if (q.includes('tech') || q.includes('stack') || q.includes('tool') || q.includes('skills')) {
    const cats = skillCategories.map((c) => `${c.title} (${c.skills.slice(0, 4).join(', ')})`).join('; ')
    return `Dhanush works across the full stack: ${cats}. Core languages & frameworks include TypeScript, Angular, React, NestJS, Node.js, and PostgreSQL.`
  }

  if (q.includes('education') || q.includes('college') || q.includes('degree')) {
    return 'Dhanush holds a B.Tech in Information Technology from Kongunadu College of Engineering and Technology (2020–2024), along with Higher Secondary (Computer Science) & SSLC from Zamindar Higher Secondary School, Cisco CCNA, and web development certifications.'
  }

  if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('reach')) {
    return `You can reach Dhanush via the contact form on this site, or directly at ${profile.email}. He is based in Tiruchirappalli, Tamil Nadu, India.`
  }

  return `Dhanush is a full stack software developer with 2 years of experience specializing in Angular, React, NestJS, and PostgreSQL. Feel free to ask about his experience, projects, or technical skills!`
}
