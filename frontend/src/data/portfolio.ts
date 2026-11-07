import type {
  Profile,
  Project,
  ExperienceEntry,
  EducationEntry,
  LanguageEntry,
  SkillCategory,
} from '../types'

import dentalImg from '../assets/projects/dental-interface-360.png'
import lalaImg from '../assets/projects/lala-invoice.png'
import portfolioImg from '../assets/projects/portfolio.png'
import emotionImg from '../assets/projects/face-emotion-detection.png'

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
  yearsLabel: 'years of professional experience',
  email: '[your-email]',
  phone: '[your-phone]',
  linkedin: '[url]',
  github: '[url]',
  resumeUrl: '/Dhanush_M_Resume.pdf',
  aboutStatement: "I'm a Full Stack Software Developer with 2 years of professional experience building web applications and backend services.",
  aboutHighlight: '2 years of experience',
  aboutBio:
    'At Nandalala Infotech, I work across frontend development, backend services, APIs, and database integrations. My primary technologies include Angular, React, TypeScript, Node.js, NestJS, PostgreSQL, and MongoDB. I focus on building maintainable applications, developing reliable features, and creating practical solutions to real-world problems.',
  aboutHighlights: [
    {
      number: '01',
      title: 'Full Stack Development',
      detail: 'Building frontend interfaces, backend services, and database integrations.',
    },
    {
      number: '02',
      title: 'Security-minded',
      detail: 'Working with JWT authentication and role-based access control.',
    },
    {
      number: '03',
      title: 'Delivery focused',
      detail: 'Working with APIs, Docker, GitLab CI/CD, and deployment workflows.',
    },
  ],
}

export const projects: Project[] = [
  {
    slug: 'dental-interface-360',
    index: '01 / 04',
    title: 'Dental Interface 360',
    category: 'MULTI-ROLE SAAS PLATFORM',
    badge: 'Company project · Private',
    shortDescription:
      'A multi-role dental SaaS platform for Admin, Supplier, Practice, and Professional users, supporting secure access, billing, and background workflows.',
    overview:
      'Dental Interface 360 is a specialized dental SaaS platform built to unify clinical scheduling, lab cases, and administrative billing into a single connected system. Designed for multi-role workflows across Administrators, Dental Practices, Dental Professionals, and Suppliers, it streamlines treatment tracking, secure role-based access, automated notifications, and background operations in clinical environments.',
    role: 'Software Developer, Nandalala Infotech',
    type: 'Company project',
    cardChips: ['Angular', 'NestJS', 'GraphQL', 'Hasura'],
    screenshots: [dentalImg],
    featureGroups: [
      {
        category: 'Authentication & Security',
        items: [
          'JWT authentication',
          'Role-based access control across Admin, Supplier, Practice, and Professional roles',
        ],
      },
      {
        category: 'Payments & Notifications',
        items: [
          'Stripe payment integration for secure billing',
          'Firebase email notifications for automated communications',
        ],
      },
      {
        category: 'Backend & Data Processing',
        items: [
          'Redis background jobs and queues',
          'GraphQL APIs through Hasura',
          'PostgreSQL database with relational schemas',
        ],
      },
      {
        category: 'Deployment & Infrastructure',
        items: [
          'Docker containerization',
          'GitLab CI/CD automated deployment pipelines',
          'Contabo cloud server deployment',
        ],
      },
    ],
    features: [
      'JWT authentication and role-based access control',
      'Stripe payment integration',
      'Firebase email notifications',
      'Redis background jobs and queues',
      'GraphQL APIs through Hasura on PostgreSQL',
      'Docker and GitLab CI/CD deployment on Contabo',
    ],
    responsibilities: [
      'Built modular Angular UI components and structured client-side views for multi-role workflows',
      'Developed NestJS backend services and CRUD modules to handle business logic and role-specific data processing',
      'Designed and integrated GraphQL APIs with Hasura on PostgreSQL',
      'Implemented JWT authentication and role-based access control across Admin, Supplier, Practice, and Professional roles',
      'Integrated Stripe payment processing and Firebase email notifications',
      'Configured Redis for background queues and asynchronous job execution',
      'Containerized backend services with Docker and automated deployment with GitLab CI/CD on a Contabo server',
      'Conducted functional testing, tracked issues, and resolved bugs using Zoho BugTracker',
    ],
    techGroups: {
      Frontend: ['Angular', 'TypeScript', 'HTML5', 'SCSS'],
      'Backend & APIs': ['NestJS', 'Node.js', 'GraphQL', 'Hasura'],
      Database: ['PostgreSQL', 'Redis'],
      'Authentication & Security': ['JWT', 'Role-Based Access Control (RBAC)'],
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
    category: 'INVOICING & BILLING',
    badge: 'Company project · Private',
    shortDescription:
      'A full-stack invoice management application featuring CRUD workflows and role-based access for Admin and User accounts.',
    overview:
      'Lala Invoice is a full-stack invoicing and billing management solution engineered to simplify invoice tracking, client management, and revenue monitoring for small to medium businesses. Featuring distinct Admin and User access levels, it allows organizations to create, track, and update billing records with structured data validation and predictable state management.',
    role: 'Software Developer, Nandalala Infotech',
    type: 'Company project',
    cardChips: ['React.js', 'Redux', 'Python', 'MongoDB'],
    screenshots: [lalaImg],
    featureGroups: [
      {
        category: 'Core Workflows & Invoicing',
        items: [
          'Invoice create, read, update and delete (CRUD) operations',
          'Automated invoice status tracking (Paid, Pending, Overdue)',
        ],
      },
      {
        category: 'Access Control & Security',
        items: [
          'Role-based access control for Admin and User accounts',
          'Protected API endpoints and secure data isolation',
        ],
      },
      {
        category: 'State Management & Architecture',
        items: [
          'Predictable UI state management with Redux',
          'RESTful backend APIs in Python with MongoDB storage',
        ],
      },
    ],
    features: [
      'Invoice create, read, update and delete (CRUD)',
      'Role-based access for Admin and User accounts',
      'Predictable UI state with Redux',
      'Python backend APIs with MongoDB storage',
    ],
    responsibilities: [
      'Built the React.js frontend interface and managed complex form states with Redux',
      'Developed backend REST API endpoints in Python with MongoDB storage',
      'Implemented invoice CRUD workflows with validation and status tracking',
      'Applied role-based authorization to separate administrative controls from user access',
    ],
    techGroups: {
      Frontend: ['React.js', 'Redux', 'JavaScript (ES6+)', 'CSS3'],
      'Backend & APIs': ['Python', 'REST APIs'],
      Database: ['MongoDB'],
      'Authentication & Security': ['Role-Based Access Control (RBAC)'],
      'DevOps & Integrations': ['Git', 'GitHub'],
    },
    visual: 'invoice',
  },
  {
    slug: 'personal-portfolio',
    index: '03 / 04',
    title: 'Personal Portfolio',
    category: 'WEB EXPERIENCE',
    badge: 'Personal project',
    shortDescription:
      'A responsive developer portfolio built with React, featuring light and dark themes, interactive experiences, and dedicated project pages.',
    overview:
      'A personal developer portfolio designed and engineered to showcase software projects, technical background, and engineering capabilities with editorial clarity. Built with a focus on web performance, accessibility, light/dark theme adaptation, and responsive design, the platform provides recruiters and visitors with comprehensive insight into production work and technical stack proficiencies.',
    role: 'Design and development',
    type: 'Personal project',
    cardChips: ['React.js', 'TypeScript', 'Tailwind CSS', 'GSAP'],
    screenshots: [portfolioImg],
    featureGroups: [
      {
        category: 'Visual & UI Architecture',
        items: [
          'Editorial typography layout with Space Grotesk and JetBrains Mono',
          'Seamless light and dark theme modes with custom CSS tokens',
          'Custom responsive components and minimal layout hierarchy',
        ],
      },
      {
        category: 'Routing & Performance',
        items: [
          'Dedicated project detail routes with React Router',
          'Lightweight, performant GSAP entrance animations with reduced-motion support',
          'Client-side contact workflow with validation',
        ],
      },
      {
        category: 'Deployment & Tooling',
        items: [
          'Automated production builds and continuous deployment on Netlify',
          'Fast developer environment using Vite and TypeScript',
        ],
      },
    ],
    features: [
      'Light and dark themes with persistent storage',
      'Dedicated project detail pages with deep linking',
      'Responsive editorial layout from phones to large displays',
      'Lightweight GSAP entrance animations',
      'Automated deployment on Netlify',
    ],
    responsibilities: [
      'Designed the editorial interface, component system, and responsive layout',
      'Built the frontend using React 19, TypeScript, Tailwind CSS, and React Router',
      'Configured dynamic theme switching with light and dark mode design tokens',
      'Implemented scoped GSAP animations that respect user reduced-motion preferences',
      'Configured continuous deployment pipelines on Netlify',
    ],
    techGroups: {
      Frontend: ['React.js', 'TypeScript', 'Tailwind CSS', 'GSAP'],
      'Backend & APIs': ['React Router', 'Vite'],
      Database: ['Local Storage'],
      'Authentication & Security': ['Input Validation', 'Security Headers'],
      'DevOps & Integrations': ['Netlify', 'Git', 'GitHub'],
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
    category: 'COLLEGE PROJECT',
    badge: 'College project',
    shortDescription:
      'An academic project exploring facial emotion detection using Python with Arduino hardware integration.',
    overview:
      'An academic computer vision and hardware integration project focused on recognizing human facial expressions in real time. Built to bridge software machine learning logic with physical microcontroller behavior, the application analyzes facial expressions via camera input and triggers corresponding hardware responses through Arduino serial communication.',
    role: 'Developer',
    type: 'College project',
    cardChips: ['Python', 'Arduino'],
    screenshots: [emotionImg],
    featureGroups: [
      {
        category: 'Computer Vision & Detection',
        items: [
          'Real-time facial detection and expression analysis using Python',
          'Classification of facial emotion states (happy, neutral, sad, etc.)',
        ],
      },
      {
        category: 'Hardware Integration',
        items: [
          'Arduino microcontroller serial communication protocol',
          'Physical hardware feedback triggered by classified emotional states',
        ],
      },
    ],
    features: [
      'Real-time facial emotion recognition using Python',
      'Serial communication interface with Arduino',
      'Hardware response activation based on detected emotions',
    ],
    responsibilities: [
      'Developed real-time facial emotion recognition logic using Python and computer vision libraries',
      'Engineered serial data transmission between Python detection scripts and Arduino microcontroller',
      'Programmed Arduino hardware responses to reflect classified emotional states',
      'Conducted experimental trials and fine-tuned detection sensitivity',
    ],
    techGroups: {
      Frontend: ['OpenCV GUI', 'Python Tkinter'],
      'Backend & APIs': ['Python', 'NumPy'],
      Database: ['File Storage', 'Model Weights'],
      'Authentication & Security': ['Local Device Execution'],
      'DevOps & Integrations': ['Arduino Hardware', 'Serial Communication'],
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
      'TortoiseGit',
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
