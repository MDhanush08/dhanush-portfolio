export type VisualType =
  | 'dental'
  | 'invoice'
  | 'viralforge'
  | 'metals'
  | 'cms'
  | 'portfolio'
  | 'emotion'
  | 'generic'

export type ProjectType = 'company' | 'freelance' | 'personal' | 'college'

export interface ProjectLinks {
  github?: string
  live?: string
}

export interface ProjectTechGroups {
  [category: string]: string[]
}

export interface FeatureGroup {
  category: string
  items: string[]
}

export interface Project {
  slug: string
  index?: string
  title: string
  category: string
  badge: string
  shortDescription: string
  overview: string
  role: string
  type: ProjectType
  featured: boolean
  techGroups: ProjectTechGroups
  cardChips: string[]
  features: string[]
  featureGroups?: FeatureGroup[]
  responsibilities: string[]
  links?: ProjectLinks
  screenshots: string[]
  image?: string
  visual: VisualType
}

export interface ExperienceSubEntry {
  key: string
  title: string
  slug?: string
  category?: string
  roleSubtitle?: string
  description?: string
  bullets: string[]
  chips: string[]
}

export interface ExperienceEntry {
  label: string
  title: string
  company?: string
  dates: string
  isFreelance?: boolean
  description?: string
  chips?: string[]
  subEntries?: ExperienceSubEntry[]
}

export interface EducationEntry {
  id: string
  number: string
  category: string
  title: string
  institution: string
  periodOrProvider: string
  context: string
  section?: 'formal' | 'certification'
}

export interface LanguageEntry {
  name: string
  level: string
}

export interface SkillCategory {
  title: string
  iconName: string
  skills: string[]
}

export interface Profile {
  name: string
  firstName: string
  lastName: string
  initials: string
  role: string
  roleSpecialization: string
  locationCity: string
  locationRegion: string
  locationCountry: string
  tagline: string
  yearsExperience: string
  yearsLabel: string
  email: string
  phone: string
  linkedin: string
  github: string
  resumeUrl: string
  aboutStatement: string
  aboutHighlight: string
  aboutBio: string
  aboutHighlights: Array<{
    number: string
    title: string
    detail: string
  }>
}

export interface ContactFormData {
  name: string
  email: string
  subject?: string
  message: string
}

export interface ChatMessage {
  id: string
  sender: 'user' | 'bot'
  text: string
  timestamp: Date
}
