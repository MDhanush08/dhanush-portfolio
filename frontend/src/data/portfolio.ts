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
  role: 'Full Stack Developer',
  roleSpecialization: '',
  locationCity: 'Trichy',
  locationRegion: 'Tamil Nadu',
  locationCountry: 'India',
  tagline: 'I build web products that feel considered from the first click to the last line of code.',
  yearsExperience: '02',
  yearsLabel: 'years of professional experience',
  email: 'dhanushm.stack@gmail.com',
  phone: '',
  linkedin: 'https://www.linkedin.com/in/dhanush360',
  github: 'https://github.com/MDhanush08',
  resumeUrl: 'https://drive.google.com/uc?export=download&id=1QjPYY_9O_Ks9CV3HGgOJ_mK_5ynW9vqB',
  aboutStatement: "I'm a Full Stack Developer with 2 years of professional experience building web applications and backend services.",
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
    type: 'company',
    featured: true,
    cardChips: ['Angular', 'NestJS', 'GraphQL', 'Hasura'],
    screenshots: ['/projects/dental-interface-360/1.webp'],
    screenshotAlt: 'Dental Interface 360 landing page',
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
    type: 'company',
    featured: true,
    cardChips: ['React.js', 'Redux', 'Python', 'MongoDB'],
    screenshots: ['/projects/lala-invoice/1.webp'],
    screenshotAlt: 'Lala Invoice landing page',
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
    slug: 'viral-forge',
    title: 'Viral Forge',
    category: 'AI social media tool',
    badge: 'Freelance project',
    shortDescription:
      'A web platform to create AI-assisted social media content and publish it to multiple platforms from one place.',
    overview:
      'Viral Forge lets users manage social media posting from a single platform. Users can generate images with AI, automatically get a title, description, captions and hashtags for each image, and publish directly to their social media accounts.',
    role: 'Full stack developer',
    type: 'freelance',
    featured: true,
    cardChips: ['Angular', 'Tailwind CSS', 'Node.js', 'Express', 'Gemini API'],
    screenshots: ['/projects/viral-forge/1.webp'],
    screenshotAlt: 'Viral Forge studio screen',
    features: [
      'Publish to multiple social platforms from a single dashboard',
      'AI image creation from a text prompt',
      'Title, description, captions and hashtags generated automatically with the Gemini API',
      'Direct posting to Facebook and Instagram through the Facebook developer APIs',
    ],
    responsibilities: [
      'Built the Angular and Tailwind CSS frontend',
      'Built the Node.js and Express backend',
      'Integrated the Gemini API for AI content generation',
      'Integrated the Facebook developer APIs for publishing posts',
    ],
    techGroups: {
      Frontend: ['Angular', 'Tailwind CSS'],
      Backend: ['Node.js', 'Express'],
      'AI and integrations': ['Gemini API', 'Facebook developer APIs'],
    },
    links: {},
    visual: 'viralforge',
  },
  {
    slug: 'vignesh-metals',
    title: 'Vignesh Metals',
    category: 'E-commerce mobile app',
    badge: 'Freelance project',
    shortDescription:
      'An e-commerce mobile app where sellers list products and buyers purchase them, packaged as an Android app.',
    overview:
      'Vignesh Metals is an e-commerce mobile application with two user roles. Sellers list their products and buyers browse and purchase them. The app was built with Ionic and React, connected to existing Node.js APIs, and packaged as an Android APK.',
    role: 'Mobile and frontend developer',
    type: 'freelance',
    featured: false,
    cardChips: ['Ionic', 'React', 'Capacitor', 'Node.js', 'Android Studio'],
    screenshots: ['/projects/vignesh-metals/1.webp'],
    screenshotAlt: 'Vignesh Metals mobile app product list',
    features: [
      'Two user roles: Buyer and Seller',
      'Sellers list products for sale',
      'Buyers browse and buy products',
      'Integrated with existing Node.js APIs',
      'Android APK built with Capacitor and Android Studio',
    ],
    responsibilities: [
      'Built the mobile app interface with Ionic and React',
      'Integrated the existing Node.js APIs',
      'Implemented role-based flows for buyers and sellers',
      'Packaged the app as an Android APK using Capacitor and Android Studio',
    ],
    techGroups: {
      Frontend: ['Ionic', 'React'],
      Backend: ['Node.js APIs (integrated)'],
      Mobile: ['Capacitor', 'Android Studio'],
    },
    links: {},
    visual: 'metals',
  },
  {
    slug: 'cms-website-builder',
    title: 'CMS Website Builder',
    category: 'No-code website builder',
    badge: 'Freelance project',
    shortDescription:
      'A customizable website builder, similar to WordPress or Framer, with drag-and-drop page design.',
    overview:
      'A CMS-style website builder where pages are designed visually using drag and drop, in the spirit of WordPress and Framer, with fully customizable UI.',
    role: 'Full stack developer',
    type: 'freelance',
    featured: false,
    cardChips: ['React', 'dnd kit', 'Tailwind CSS', 'Node.js', 'Swagger'],
    screenshots: [],
    features: [
      'Drag-and-drop page designer',
      'Customizable UI components',
      'Smooth interface animations with Framer Motion',
      'File uploads handled with Multer',
      'API documentation with Swagger',
    ],
    responsibilities: [
      'Built the React frontend with dnd kit, Tailwind CSS and Framer Motion',
      'Built the Node.js and Express backend',
      'Implemented file uploads with Multer',
      'Documented the APIs with Swagger',
    ],
    techGroups: {
      Frontend: ['React', 'dnd kit', 'Tailwind CSS', 'Framer Motion'],
      Backend: ['Node.js', 'Express', 'Multer', 'Swagger'],
    },
    links: {},
    visual: 'cms',
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
    type: 'personal',
    featured: false,
    cardChips: ['React.js', 'TypeScript', 'Tailwind CSS', 'GSAP'],
    screenshots: [],
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
    type: 'college',
    featured: true,
    cardChips: ['Python', 'Arduino'],
    screenshots: [],
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
    dates: 'SEP 2024 – NOV 2026',
    subEntries: [
      {
        key: 'dental-360',
        title: 'Dental Interface 360',
        slug: 'dental-interface-360',
        category: 'MULTI-ROLE SAAS PLATFORM',
        roleSubtitle: 'Multi-role SaaS platform',
        description:
          'A multi-role dental SaaS platform for Admin, Supplier, Practice, and Professional users, supporting secure access, billing, and background workflows.',
        bullets: [
          'Contributed to a multi-role dental SaaS platform for Admin, Supplier, Practice, and Professional users.',
          'Developed Angular UI components and NestJS backend services, including GraphQL APIs using Hasura.',
          'Implemented JWT authentication and role-based access control.',
          'Integrated Stripe payments and Firebase email notifications.',
          'Worked with Redis background jobs, Docker containers, and GitLab CI/CD deployment workflows.',
        ],
        chips: ['Angular', 'NestJS', 'GraphQL', 'Hasura', 'PostgreSQL', 'Redis', 'Docker'],
      },
      {
        key: 'lala-invoice',
        title: 'Lala Invoice',
        slug: 'lala-invoice',
        category: 'INVOICE AND BILLING APPLICATION',
        roleSubtitle: 'Invoice and billing application',
        description:
          'A full-stack invoice management application with CRUD workflows and role-based access for Admin and User accounts.',
        bullets: [
          'Developed invoice CRUD workflows for Admin and User accounts.',
          'Implemented role-based access for invoice management features.',
        ],
        chips: ['React.js', 'Redux', 'Python', 'MongoDB'],
      },
    ],
  },
  {
    label: 'PART-TIME – FREELANCE',
    title: 'Freelance Full Stack Developer',
    dates: 'PART-TIME – FREELANCE',
    isFreelance: true,
    description:
      'Developed web applications for client requirements using React, Angular, and Node.js. Worked on frontend implementation, backend API integration, database connectivity, and application deployment.',
    chips: ['React.js', 'Angular', 'Node.js', 'MongoDB', 'API Integration', 'Deployment'],
  },
]

export const educationData: EducationEntry[] = [
  {
    id: 'btech',
    number: '01',
    category: "BACHELOR'S DEGREE",
    title: 'B.Tech, Information Technology',
    institution: 'Kongunadu College of Engineering and Technology',
    periodOrProvider: '2020 — 2024',
    context: 'Information Technology · Undergraduate degree',
    section: 'formal',
  },
  {
    id: 'hsc',
    number: '02',
    category: 'HIGHER SECONDARY',
    title: 'Higher Secondary (HSC) – Computer Science',
    institution: 'Zamindar Higher Secondary School, Thuraiyur',
    periodOrProvider: '2019 — 2020',
    context: 'Computer Science · Higher Secondary Certificate (HSC)',
    section: 'formal',
  },
  {
    id: 'sslc',
    number: '03',
    category: 'SECONDARY SCHOOL',
    title: 'SSLC',
    institution: 'Zamindar Higher Secondary School, Thuraiyur',
    periodOrProvider: '2017 — 2018',
    context: 'Secondary School Leaving Certificate (SSLC)',
    section: 'formal',
  },
  {
    id: 'ccna',
    number: '04',
    category: 'CERTIFICATION',
    title: 'CCNA',
    institution: 'Cisco Certified Network Associate',
    periodOrProvider: 'Cisco',
    context: 'Networking fundamentals.',
    section: 'certification',
  },
  {
    id: 'udemy',
    number: '05',
    category: 'ONLINE COURSE',
    title: 'HTML, CSS & JavaScript',
    institution: 'Udemy',
    periodOrProvider: 'Udemy',
    context: 'Web development fundamentals.',
    section: 'certification',
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
