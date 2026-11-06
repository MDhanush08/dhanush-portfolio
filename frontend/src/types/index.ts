export type ProjectCategory = 'all' | 'fullstack' | 'frontend' | 'backend-ai';

export interface ProjectLink {
  github?: string;
  live?: string;
  label?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  role: string;
  category: ProjectCategory;
  tags: string[];
  links: ProjectLink;
  isPrivate?: boolean;
  featured?: boolean;
  highlights: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'Full-time' | 'Freelance' | 'Part-time';
  description: string;
  highlights: string[];
  techStack: string[];
}

export interface SkillItem {
  name: string;
  iconName: string;
  category: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  score?: string;
  notes?: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  credentialUrl?: string;
}

export interface QuickFact {
  label: string;
  value: string;
  subtext?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactSubmissionResult {
  success: boolean;
  message: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
