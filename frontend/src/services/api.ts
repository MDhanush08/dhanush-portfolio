import type { ContactFormData, ContactSubmissionResult } from '../types';

/**
 * Backend API Base URL
 * Set in .env or Netlify environment variables as VITE_API_URL
 */
const API_URL = import.meta.env.VITE_API_URL || '';

// Informative log for future backend integration
if (API_URL) {
  // eslint-disable-next-line no-console
  console.info('[API] Configured backend endpoint:', API_URL);
}

/**
 * Submit Contact Form
 * Stub function: Currently simulates a network round-trip.
 * TODO: Connect to NestJS backend via POST ${API_URL}/api/contact
 */
export async function submitContact(data: ContactFormData): Promise<ContactSubmissionResult> {
  // Simulating network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
    throw new Error('Please fill in all required fields.');
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    throw new Error('Please enter a valid email address.');
  }

  // When backend is ready, uncomment:
  /*
  if (API_URL) {
    const response = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to send message.');
    }
    return await response.json();
  }
  */

  return {
    success: true,
    message: `Thank you, ${data.name}! Your message has been received. Dhanush will get back to you shortly.`,
  };
}

/**
 * Send AI Chat Message
 * Stub function: Currently replies with intelligent contextual knowledge about Dhanush M.
 * TODO: Connect to NestJS Gemini/LLM endpoint via POST ${API_URL}/api/chat
 */
export async function sendChatMessage(prompt: string): Promise<string> {
  // Simulate AI streaming/thinking delay
  await new Promise((resolve) => setTimeout(resolve, 900));

  const lower = prompt.toLowerCase();

  // Contextual mock responses based on portfolio data
  if (lower.includes('experience') || lower.includes('work') || lower.includes('background') || lower.includes('company')) {
    return 'Dhanush has 2+ years of software development experience. He is currently working at Nandalala Infotech in Tiruchirappalli, where he engineers multi-role SaaS platforms, GraphQL APIs with Hasura, NestJS backend services, Stripe billing, Redis queues, and Docker/GitLab CI/CD pipelines.';
  }

  if (lower.includes('project') || lower.includes('built') || lower.includes('portfolio') || lower.includes('dental')) {
    return 'Key projects include:\n• **Dental Interface 360**: An enterprise multi-role dental SaaS (Angular, NestJS, GraphQL, Hasura, PostgreSQL, Redis, Stripe, Docker).\n• **Lala Invoice**: An invoice & billing management application (React, Redux, Python, MongoDB).\n• **Face Emotion Detection**: Python + OpenCV + Arduino IoT hardware integration.\n• **Personal Portfolio**: React 19, GSAP, Tailwind v4.';
  }

  if (lower.includes('stack') || lower.includes('tech') || lower.includes('skill') || lower.includes('frontend') || lower.includes('backend')) {
    return "Dhanush's core tech stack spans both frontend and backend:\n• **Frontend:** Angular, React.js, Redux, TypeScript, Tailwind CSS, GSAP\n• **Backend:** NestJS, Node.js, Express.js, GraphQL, Hasura, REST, JWT & RBAC\n• **Databases:** PostgreSQL, MongoDB, Redis, SQL\n• **DevOps:** Docker, GitLab CI/CD, Git, Contabo, Render, Netlify\n• **AI Tools:** Claude Code, Codex, Antigravity, Gemini API, RAG";
  }

  if (lower.includes('contact') || lower.includes('email') || lower.includes('hire') || lower.includes('reach') || lower.includes('phone')) {
    return 'You can reach Dhanush directly at:\n• **Email:** dhanushm.stack@gmail.com\n• **Phone:** +91 9600261471\n• **LinkedIn:** linkedin.com/in/dhanush360\n• **GitHub:** github.com/MDhanush08\n\nYou can also use the contact form at the bottom of this page!';
  }

  if (lower.includes('ai') || lower.includes('llm') || lower.includes('rag')) {
    return 'Dhanush actively integrates AI into modern software engineering workflows: utilizing Claude Code, Codex, and Antigravity to accelerate development velocity, and building with the Gemini API and RAG (Retrieval-Augmented Generation) patterns.';
  }

  if (lower.includes('education') || lower.includes('college') || lower.includes('degree')) {
    return 'Dhanush holds a B.Tech degree in Information Technology from Kongunadu College of Engineering and Technology (2020 – 2024). He also holds a Cisco CCNA certification.';
  }

  // Fallback intelligent response
  return "I'm Dhanush's AI portfolio assistant. I can answer questions about his 2+ years of full-stack experience (Angular, React, NestJS), his featured SaaS projects like Dental Interface 360, his skills, or how to get in touch with him for new opportunities!";
}
