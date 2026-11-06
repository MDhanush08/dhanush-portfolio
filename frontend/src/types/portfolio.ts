export interface SocialLinks {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
}

export interface QuickFact {
  label: string;
  value: string;
  sublabel?: string;
}

export interface SkillItem {
  name: string;
  iconName: string; // Identifier for the react-icons or lucide icon
}

export interface SkillGroup {
  category: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  highlights: string[];
  techStack: string[];
}

export interface FreelanceClientProject {
  title: string;
  client?: string;
  description: string;
  techStack: string[];
  role: string;
}

export type ProjectCategory = 'All' | 'Full Stack' | 'Frontend' | 'Backend/AI';

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  techStack: string[];
  role: string;
  isFeatured?: boolean;
  isPrivate: boolean;
  privateBadgeText?: string;
  githubUrl?: string;
  liveUrl?: string;
  highlights: string[];
  placeholderType: 'dental' | 'invoice' | 'portfolio' | 'emotion';
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  location: string;
  period: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  details?: string;
}

export interface LanguageItem {
  language: string;
  proficiency: string;
}

export interface PortfolioData {
  name: string;
  role: string;
  location: string;
  statusBadge: string;
  cyclingRoles: string[];
  tagline: string;
  summary: string;
  aiAssistedNote: {
    title: string;
    description: string;
    tools: string[];
  };
  contact: SocialLinks;
  resumeUrl: string;
  quickFacts: QuickFact[];
  skillGroups: SkillGroup[];
  experience: ExperienceItem[];
  freelanceProjects: FreelanceClientProject[];
  projects: ProjectItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
}
