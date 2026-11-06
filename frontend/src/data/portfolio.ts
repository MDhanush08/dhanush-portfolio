import type {
  Profile,
  Project,
  ExperienceEntry,
  EducationEntry,
  LanguageEntry,
  SkillCategory,
} from '../types'

export const profile: Profile = {
  name: 'Dhanush M',
  firstName: 'Dhanush',
  lastName: 'M.',
  initials: 'DM',
  role: 'Software Developer',
  roleSpecialization: '(Full Stack)',
  locationCity: 'Trichy',
  locationRegion: 'Tamil Nadu',
  locationCountry: 'India',
  tagline: 'I build web products that feel considered from the first click to the last line of code.',
  yearsExperience: '02',
  yearsLabel: 'years building',
  email: '[your-email]',
  phone: '[your-phone]',
  linkedin: '[url]',
  github: '[url]',
  resumeUrl: '/Dhanush_M_Resume.pdf',
  aboutStatement: "I'm a software developer with 2 years of experience building secure, scalable web applications.",
  aboutHighlight: '2 years of experience',
  aboutBio:
    'At Nandalala Infotech, I work across product surfaces, APIs and infrastructure, bringing together Angular, React, Node.js, NestJS and PostgreSQL. I also deliver part-time freelance applications from idea through deployment. I use AI tools to support thoughtful development and have working knowledge of LLM integration and RAG.',
  aboutHighlights: [
    {
      number: '01',
      title: 'Frontend to database',
      detail: 'Comfortable moving between UI, APIs and data layers.',
    },
    {
      number: '02',
      title: 'Security-minded',
      detail: 'JWT authentication and role-based access control.',
    },
    {
      number: '03',
      title: 'Delivery focused',
      detail: 'Docker, GitLab CI/CD and production deployment.',
    },
  ],
}

export const projects: Project[] = [
  {
    slug: 'dental-interface-360',
    index: '01 / 04',
    title: 'Dental Interface 360',
    category: 'Multi-role SaaS platform',
    badge: 'Company project · Private',
    shortDescription:
      'A connected workspace for Admin, Supplier, Practice and Professional users, with secure access, billing and background workflows.',
    overview:
      'Dental Interface 360 is a multi-role dental SaaS platform built at Nandalala Infotech for Admin, Supplier, Practice and Professional users.',
    role: 'Software Developer, Nandalala Infotech',
    type: 'Company project',
    cardChips: ['Angular', 'NestJS', 'GraphQL', 'Hasura', 'PostgreSQL', 'Redis', 'Docker'],
    features: [
      'Authentication and role-based access control (JWT)',
      'Online payments with Stripe',
      'Email notifications through Firebase',
      'Background jobs and queues with Redis',
      'GraphQL APIs through Hasura on PostgreSQL',
      'CI/CD deployment with Docker and GitLab on Contabo',
    ],
    responsibilities: [
      'Built Angular UI components and NestJS backend services with CRUD modules',
      'Designed GraphQL APIs with Hasura on PostgreSQL',
      'Implemented JWT authentication and role-based access across all four user roles',
      'Integrated Stripe payments and Firebase email notifications',
      'Used Redis for background jobs and queues',
      'Containerized with Docker and automated deployment with GitLab CI/CD on a Contabo server',
      'Tested features and tracked and resolved bugs in Zoho BugTracker',
    ],
    techGroups: {
      Frontend: ['Angular'],
      'Backend & APIs': ['NestJS', 'GraphQL', 'Hasura', 'JWT'],
      Database: ['PostgreSQL', 'Redis'],
      'DevOps & Integrations': [
        'Docker',
        'GitLab CI/CD',
        'Contabo',
        'Stripe',
        'Firebase',
        'Zoho BugTracker',
      ],
    },
    visual: 'dental',
  },
  {
    slug: 'lala-invoice',
    index: '02 / 04',
    title: 'Lala Invoice',
    category: 'Invoicing & billing',
    badge: 'Company project · Private',
    shortDescription:
      'A full-stack invoice application with CRUD workflows and role-based access for Admin and User accounts.',
    overview:
      'Lala Invoice is an invoice and billing management system with separate Admin and User access.',
    role: 'Software Developer, Nandalala Infotech',
    type: 'Company project',
    cardChips: ['React.js', 'Redux', 'Python', 'MongoDB'],
    features: [
      'Invoice create, read, update and delete (CRUD)',
      'Role-based access for Admin and User',
      'Predictable UI state with Redux',
    ],
    responsibilities: [
      'Built the React.js and Redux frontend',
      'Built backend APIs in Python with MongoDB storage',
      'Implemented invoice CRUD operations',
      'Applied role-based access control for Admin and User',
    ],
    techGroups: {
      Frontend: ['React.js', 'Redux'],
      Backend: ['Python'],
      Database: ['MongoDB'],
    },
    visual: 'invoice',
  },
  {
    slug: 'personal-portfolio',
    index: '03 / 04',
    title: 'Personal Portfolio',
    category: 'Web experience',
    badge: 'Personal project',
    shortDescription:
      'A responsive portfolio built with React and GSAP, with light and dark themes and dedicated project pages.',
    overview:
      'This portfolio, designed and built to present my work with clear structure and smooth, lightweight animation.',
    role: 'Design and development',
    type: 'Personal project',
    cardChips: ['React.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Netlify'],
    features: [
      'Light and dark themes',
      'Dedicated project detail pages',
      'Responsive layout from phones to large desktops',
      'Contact form',
    ],
    responsibilities: [
      'Designed the editorial interface and component system',
      'Built the React and TypeScript frontend with React Router',
      'Added lightweight GSAP animation',
      'Deployed on Netlify',
    ],
    techGroups: {
      Frontend: ['React', 'TypeScript', 'Tailwind CSS', 'React Router', 'GSAP'],
      Deployment: ['Netlify'],
    },
    links: {
      github: '[url]',
    },
    visual: 'portfolio',
  },
  {
    slug: 'face-emotion-detection',
    index: '04 / 04',
    title: 'Face Emotion Detection',
    category: 'College project',
    badge: 'College project',
    shortDescription:
      'An academic exploration of facial emotion detection using Python with Arduino hardware integration.',
    overview:
      'A college project that detects facial emotions using Python and integrates with Arduino hardware.',
    role: 'Developer',
    type: 'College project',
    cardChips: ['Python', 'Arduino'],
    features: [
      'Detects facial emotions using Python',
      'Integrates with Arduino hardware',
    ],
    responsibilities: [
      'Developed the emotion detection logic in Python',
      'Integrated the system with Arduino hardware',
    ],
    techGroups: {
      Software: ['Python'],
      Hardware: ['Arduino'],
    },
    links: {
      github: '[url]',
    },
    visual: 'emotion',
  },
]

export const experienceData: ExperienceEntry[] = [
  {
    label: 'FULL-TIME · TIRUCHIRAPPALLI',
    title: 'Software Developer',
    company: 'Nandalala Infotech',
    dates: 'SEP 2024 — PRESENT',
    subEntries: [
      {
        key: 'dental-360',
        title: 'A. Dental Interface 360',
        slug: 'dental-interface-360',
        roleSubtitle: 'Multi-role SaaS · Admin / Supplier / Practice / Professional',
        bullets: [
          'Built a multi-role platform and developed NestJS services with GraphQL APIs using Hasura.',
          'Implemented JWT authentication and role-based access; integrated Stripe payments and Firebase email notifications.',
          'Used Redis for background jobs, Docker for containers and GitLab CI/CD to deploy on Contabo.',
        ],
        chips: ['Angular', 'NestJS', 'GraphQL', 'Hasura', 'PostgreSQL', 'Redis', 'Docker'],
      },
      {
        key: 'lala-invoice',
        title: 'B. Lala Invoice',
        slug: 'lala-invoice',
        roleSubtitle: 'Invoice and billing application',
        bullets: [
          'Built invoice CRUD workflows and role-based access for Admin and User accounts.',
        ],
        chips: ['React.js', 'Redux', 'Python', 'MongoDB'],
      },
    ],
  },
  {
    label: 'INDEPENDENT PRACTICE',
    title: 'Freelance Full Stack Developer',
    dates: 'PART-TIME — FREELANCE',
    isFreelance: true,
    description:
      'Delivered client web applications using React, Angular, Node.js and MongoDB, including API integration and deployment.',
    chips: ['React', 'Angular', 'Node.js', 'MongoDB', 'API integration', 'Deployment'],
  },
]

export const educationData: EducationEntry[] = [
  {
    id: 'btech',
    number: '01',
    category: "Bachelor's degree",
    title: 'B.Tech, Information Technology',
    periodOrProvider: '2020 — 2024',
    institution: 'Kongunadu College of Engineering and Technology',
    context: 'Information Technology · Undergraduate degree',
  },
  {
    id: 'ccna',
    number: '02',
    category: 'Certification',
    title: 'CCNA',
    periodOrProvider: 'Cisco',
    institution: 'Cisco Certified Network Associate',
    context: 'Networking fundamentals',
  },
  {
    id: 'udemy',
    number: '03',
    category: 'Online course',
    title: 'HTML, CSS & JavaScript',
    periodOrProvider: 'Udemy',
    institution: 'Udemy',
    context: 'Web development fundamentals',
  },
]

export const languageData: LanguageEntry[] = [
  { name: 'English', level: 'Professional' },
  { name: 'Tamil', level: 'Native' },
]

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    iconName: 'layout',
    skills: [
      'Angular',
      'React.js',
      'Redux',
      'TypeScript',
      'JavaScript (ES6+)',
      'HTML5',
      'CSS3',
      'SCSS',
      'Tailwind CSS',
      'Bootstrap',
      'Ionic',
      'GSAP',
    ],
  },
  {
    title: 'Backend & APIs',
    iconName: 'server',
    skills: [
      'Node.js',
      'NestJS',
      'Express.js',
      'Python',
      'PHP',
      'REST APIs',
      'GraphQL',
      'Hasura',
      'JWT',
      'RBAC',
    ],
  },
  {
    title: 'Databases',
    iconName: 'database',
    skills: ['PostgreSQL', 'MongoDB', 'SQL', 'Redis'],
  },
  {
    title: 'DevOps & Deployment',
    iconName: 'cloud',
    skills: [
      'Docker',
      'GitLab CI/CD',
      'Git',
      'GitHub',
      'GitLab',
      'Tortoise Git',
      'Contabo',
      'Render',
      'Netlify',
    ],
  },
  {
    title: 'Tools & Testing',
    iconName: 'wrench',
    skills: ['Postman', 'Zoho BugTracker', 'VS Code', 'Android Studio'],
  },
  {
    title: 'Integrations & AI',
    iconName: 'cpu',
    skills: [
      'Stripe',
      'Firebase',
      'Gemini API',
      'LLM Integration',
      'RAG',
      'Claude Code',
      'OpenAI Codex',
      'Antigravity',
    ],
  },
]
