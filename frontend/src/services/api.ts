import type { ContactFormData, ContactFormResponse, ChatResponse } from '../types/api';
import { portfolioData } from '../data/portfolio';

// Base API URL from environment variables, defaults to local NestJS backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Submit contact form message.
 * Current implementation: Mock stub with simulated network delay.
 * 
 * TODO (NestJS Backend Integration):
 * When the NestJS backend is ready, replace this mock with a real fetch or axios call:
 * ```ts
 * const response = await fetch(`${API_BASE_URL}/contact`, {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify(data),
 * });
 * if (!response.ok) throw new Error('Failed to send message');
 * return await response.json();
 * ```
 */
export async function submitContact(data: ContactFormData): Promise<ContactFormResponse> {
  // Simulate network latency (600ms)
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Basic sanity validation
  if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
    throw new Error('Please fill in all required fields.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    throw new Error('Please enter a valid email address.');
  }

  // Log for local development inspection
  if (import.meta.env.DEV) {
    console.info('[API STUB] submitContact received:', {
      ...data,
      targetEndpoint: `${API_BASE_URL}/contact`,
    });
  }

  return {
    success: true,
    message: `Thank you, ${data.name.trim()}! Your message has been received. Dhanush will get back to you shortly.`,
  };
}

/**
 * Send chat message to Dhanush AI Assistant.
 * Current implementation: Intelligent local knowledge-based mock responses.
 * 
 * TODO (NestJS Backend Integration):
 * When the NestJS backend with Gemini API / RAG is connected:
 * ```ts
 * const response = await fetch(`${API_BASE_URL}/chat`, {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ message }),
 * });
 * if (!response.ok) throw new Error('Chat service unavailable');
 * return await response.json();
 * ```
 */
export async function sendChatMessage(message: string): Promise<ChatResponse> {
  // Simulate network latency (700ms)
  await new Promise((resolve) => setTimeout(resolve, 700));

  const query = message.toLowerCase().trim();

  // Knowledge-based matching based on portfolioData
  if (query.includes('experience') || query.includes('work') || query.includes('nandalala')) {
    return {
      reply: `Dhanush has 2+ years of professional full-stack experience. He is currently a Software Developer at Nandalala Infotech (Sep 2024 - Present), building multi-role SaaS platforms with Angular, NestJS, GraphQL (Hasura), PostgreSQL, Redis, Docker, and GitLab CI/CD. He also has freelance experience delivering modern React and Node.js solutions.`,
      suggestedQuestions: [
        'Which projects has he built?',
        'What tech stack does he use?',
        'How does he use AI tools?',
      ],
    };
  }

  if (query.includes('project') || query.includes('dental') || query.includes('built') || query.includes('invoice')) {
    return {
      reply: `Dhanush's key projects include:\n\n1. Dental Interface 360: An enterprise multi-role SaaS for Admin, Supplier, Practice, and Professional users built with Angular, NestJS, Hasura GraphQL, Stripe, and Redis queues.\n2. Lala Invoice: An invoice and billing system with React, Redux, and Python.\n3. Personal Portfolio: This ultra-fast React 19 & Tailwind v4 site.\n4. Face Emotion Detection: A Python & Arduino computer vision system.`,
      suggestedQuestions: [
        'Tell me more about Dental Interface 360',
        'What is his backend experience?',
        'How can I contact Dhanush?',
      ],
    };
  }

  if (query.includes('tech stack') || query.includes('skill') || query.includes('technolog') || query.includes('stack')) {
    return {
      reply: `Dhanush specializes in Full Stack development:\n• Frontend: Angular, React.js, Redux, TypeScript, Tailwind CSS, GSAP\n• Backend: NestJS, Node.js, Express, Python, GraphQL, Hasura, REST APIs\n• Databases: PostgreSQL, MongoDB, SQL, Redis\n• DevOps: Docker, GitLab CI/CD, Git, Contabo, Render, Netlify`,
      suggestedQuestions: [
        'What is Dhanush\'s experience?',
        'Is he open to new roles?',
        'How can I contact him?',
      ],
    };
  }

  if (query.includes('ai') || query.includes('claude') || query.includes('rag') || query.includes('llm') || query.includes('antigravity')) {
    return {
      reply: `Dhanush actively leverages modern AI workflows (Antigravity, Claude Code, OpenAI Codex) to accelerate production-quality coding. He also has practical working knowledge of LLM integration using the Gemini API and RAG (Retrieval-Augmented Generation) architectures.`,
      suggestedQuestions: [
        'What is his full tech stack?',
        'Which projects has he built?',
        'How can I contact Dhanush?',
      ],
    };
  }

  if (query.includes('contact') || query.includes('email') || query.includes('hire') || query.includes('available') || query.includes('opportunity')) {
    return {
      reply: `Dhanush is currently based in Tiruchirappalli, Tamil Nadu, India, and is open to opportunities! You can reach him at ${portfolioData.contact.email} or use the Contact section form on this page to send a direct message.`,
      suggestedQuestions: [
        'Can I download his resume?',
        'What is his experience level?',
        'What tech stack does he use?',
      ],
    };
  }

  if (query.includes('resume') || query.includes('cv')) {
    return {
      reply: `You can download Dhanush's latest resume directly using the "Resume" button in the navigation bar or the hero section (file: /Dhanush_M_Resume.pdf).`,
      suggestedQuestions: [
        'What is Dhanush\'s experience?',
        'Which projects has he built?',
        'What is his education background?',
      ],
    };
  }

  if (query.includes('education') || query.includes('college') || query.includes('degree')) {
    return {
      reply: `Dhanush holds a Bachelor of Technology (B.Tech) in Information Technology from Kongunadu College of Engineering and Technology (2020 - 2024). He also holds CCNA certification from Cisco.`,
      suggestedQuestions: [
        'What is Dhanush\'s experience?',
        'What are his key skills?',
        'How can I get in touch?',
      ],
    };
  }

  // Default fallback response
  return {
    reply: `Hi! I'm Dhanush's portfolio assistant. I can answer questions about his 2+ years of experience with Angular, React, and NestJS, his projects like Dental Interface 360, or his skills in cloud deployment and AI engineering. What would you like to know?`,
    suggestedQuestions: [
      'What is Dhanush\'s experience?',
      'Which projects has he built?',
      'What tech stack does he use?',
    ],
  };
}
