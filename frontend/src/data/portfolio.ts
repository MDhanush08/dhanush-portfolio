import type { PortfolioData, Project } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  name: 'Dhanush M',
  role: 'Software Developer',
  location: 'Tiruchirappalli, Tamil Nadu, India',
  statusBadge: 'Open to opportunities',
  cyclingRoles: [
    'Full Stack Engineer',
    'Angular & React Developer',
    'NestJS Backend Developer',
  ],
  tagline:
    'Building secure, scalable web applications from intuitive UI architectures to high-throughput APIs and cloud deployment.',
  summary:
    'Software Developer with 2 years of experience building secure, scalable web applications using Angular, React.js, Node.js, NestJS, GraphQL and PostgreSQL. Experienced in JWT authentication, role-based access control (RBAC), payment and notification integrations, and CI/CD deployment with Docker and GitLab. Uses AI tools such as Claude Code, Codex and Antigravity to accelerate development and improve code quality, with working knowledge of LLM integration and RAG.',
  aiAssistedNote: {
    title: 'AI-Augmented Engineering',
    description:
      'Leverages modern AI workflows (Claude Code, OpenAI Codex, Antigravity) to write clean, tested, and resilient code faster. Experienced in designing prompt architectures, RAG patterns, and integrating Gemini API into modern full-stack workflows.',
    tools: ['Antigravity', 'Claude Code', 'OpenAI Codex', 'Gemini API', 'RAG Architecture'],
  },
  contact: {
    email: 'dhanush.dev@example.com', // Placeholder: replace with your actual email
    phone: '+91 98765 43210', // Placeholder: replace with your actual phone
    linkedin: 'https://linkedin.com/in/dhanush-m', // Placeholder: replace with your LinkedIn URL
    github: 'https://github.com/dhanush-m', // Placeholder: replace with your GitHub URL
  },
  resumeUrl: '/Dhanush_M_Resume.pdf',
  quickFacts: [
    {
      value: '2+ Years',
      label: 'Professional Experience',
      sublabel: 'Full-stack engineering in SaaS & API systems',
    },
    {
      value: 'Full Stack',
      label: 'Core Focus',
      sublabel: 'Angular, React, Node.js & NestJS',
    },
    {
      value: 'B.Tech IT',
      label: 'Education',
      sublabel: 'Kongunadu College of Engg & Tech',
    },
  ],
  skillGroups: [
    {
      category: 'Frontend',
      skills: [
        { name: 'Angular', iconName: 'SiAngular' },
        { name: 'React.js', iconName: 'SiReact' },
        { name: 'Redux', iconName: 'SiRedux' },
        { name: 'TypeScript', iconName: 'SiTypescript' },
        { name: 'JavaScript (ES6+)', iconName: 'SiJavascript' },
        { name: 'HTML5', iconName: 'SiHtml5' },
        { name: 'CSS3', iconName: 'SiCss3' },
        { name: 'SCSS', iconName: 'SiSass' },
        { name: 'Tailwind CSS', iconName: 'SiTailwindcss' },
        { name: 'Bootstrap', iconName: 'SiBootstrap' },
        { name: 'Ionic', iconName: 'SiIonic' },
        { name: 'GSAP', iconName: 'SiGreensock' },
      ],
    },
    {
      category: 'Backend & APIs',
      skills: [
        { name: 'Node.js', iconName: 'SiNodedotjs' },
        { name: 'NestJS', iconName: 'SiNestjs' },
        { name: 'Express.js', iconName: 'SiExpress' },
        { name: 'Python', iconName: 'SiPython' },
        { name: 'PHP', iconName: 'SiPhp' },
        { name: 'REST APIs', iconName: 'TbApi' },
        { name: 'GraphQL', iconName: 'SiGraphql' },
        { name: 'Hasura', iconName: 'SiHasura' },
        { name: 'JWT Auth', iconName: 'SiJsonwebtokens' },
        { name: 'RBAC Security', iconName: 'TbShieldCheck' },
      ],
    },
    {
      category: 'Databases',
      skills: [
        { name: 'PostgreSQL', iconName: 'SiPostgresql' },
        { name: 'MongoDB', iconName: 'SiMongodb' },
        { name: 'SQL', iconName: 'TbDatabase' },
        { name: 'Redis', iconName: 'SiRedis' },
      ],
    },
    {
      category: 'DevOps & Deployment',
      skills: [
        { name: 'Docker', iconName: 'SiDocker' },
        { name: 'GitLab CI/CD', iconName: 'SiGitlab' },
        { name: 'Git', iconName: 'SiGit' },
        { name: 'GitHub', iconName: 'SiGithub' },
        { name: 'GitLab', iconName: 'SiGitlab' },
        { name: 'Tortoise Git', iconName: 'TbBrandGit' },
        { name: 'Contabo', iconName: 'TbServer' },
        { name: 'Render', iconName: 'SiRender' },
        { name: 'Netlify', iconName: 'SiNetlify' },
      ],
    },
    {
      category: 'Tools & Testing',
      skills: [
        { name: 'Postman', iconName: 'SiPostman' },
        { name: 'Zoho BugTracker', iconName: 'TbBug' },
        { name: 'VS Code', iconName: 'TbBrandVscode' },
        { name: 'Android Studio', iconName: 'SiAndroidstudio' },
      ],
    },
    {
      category: 'Integrations & AI',
      skills: [
        { name: 'Stripe', iconName: 'SiStripe' },
        { name: 'Firebase', iconName: 'SiFirebase' },
        { name: 'Gemini API', iconName: 'SiGoogle' },
        { name: 'RAG Architecture', iconName: 'TbCpu' },
        { name: 'Claude Code', iconName: 'TbTerminal2' },
        { name: 'OpenAI Codex', iconName: 'TbBrandOpenai' },
        { name: 'Antigravity', iconName: 'TbSparkles' },
      ],
    },
  ],
  experience: [
    {
      id: 'nandalala-infotech',
      role: 'Software Developer',
      company: 'Nandalala Infotech',
      location: 'Tiruchirappalli, Tamil Nadu, India',
      period: 'Sep 2024 - Present',
      type: 'Full-time',
      highlights: [
        'Architected and built multi-role SaaS platforms and invoicing enterprise products serving diverse user tiers.',
        'Developed high-performance GraphQL APIs using Hasura and microservices with NestJS.',
        'Implemented stateless JWT authentication with fine-grained Role-Based Access Control (RBAC).',
        'Engineered payment integrations with Stripe and automated multi-channel email alerts with Firebase.',
        'Designed asynchronous background processing and event-driven queues with Redis.',
        'Containerized services using Docker and automated CI/CD deployment pipelines on Contabo VPS via GitLab CI.',
        'Managed rigorous QA cycles, unit test execution, and issue tracking in Zoho BugTracker.',
      ],
      techStack: [
        'Angular',
        'NestJS',
        'GraphQL',
        'Hasura',
        'PostgreSQL',
        'Redis',
        'Docker',
        'GitLab CI/CD',
        'Stripe',
        'Firebase',
        'JWT',
      ],
    },
    {
      id: 'freelance-developer',
      role: 'Freelance Full Stack Developer',
      company: 'Independent Consulting',
      location: 'Remote',
      period: '2023 - Present',
      type: 'Part-time',
      highlights: [
        'Delivered responsive client web applications using React, Angular, Node.js, and MongoDB.',
        'Integrated third-party REST APIs, automated notification workflows, and database models.',
        'Orchestrated cloud deployments on Render and Netlify with optimized asset delivery and zero downtime.',
      ],
      techStack: ['React.js', 'Angular', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Netlify', 'Render'],
    },
  ],
  freelanceProjects: [
    {
      title: 'Custom Business Web Application',
      client: 'Client Confidential',
      description: 'Full-stack client portal with dynamic dashboards, authentication, and database synchronization.',
      techStack: ['React.js', 'Node.js', 'MongoDB', 'Tailwind CSS'],
      role: 'Full Stack Developer',
    },
    {
      title: 'E-Commerce Catalog & Checkout Portal',
      client: 'Client Confidential',
      description: 'Responsive catalog storefront with cart persistence, Stripe webhook handling, and order notifications.',
      techStack: ['Angular', 'Node.js', 'Stripe', 'Express.js'],
      role: 'Lead Front-End & API Integration',
    },
  ],
  projects: [
    {
      id: 'dental-interface-360',
      slug: 'dental-interface-360',
      index: '01',
      title: 'Dental Interface 360',
      tagline: 'Multi-Role Dental SaaS Platform (Admin, Supplier, Practice & Professional)',
      shortDescription:
        'A comprehensive multi-role dental enterprise SaaS ecosystem empowering Practice clinics, Suppliers, Dental Professionals, and Platform Admins with clinical management and supply ordering.',
      overview:
        'Dental Interface 360 is a full-scale multi-role dental enterprise SaaS platform built to unify clinical practice operations and medical supply procurement. It connects Practice clinics, dental suppliers, healthcare professionals, and platform administrators through dedicated role-based portals with secure workflows and real-time processing.',
      category: 'Full Stack',
      projectType: 'Enterprise SaaS at Nandalala Infotech',
      statusBadge: 'Private / Client Project',
      role: 'Full Stack Developer (Nandalala Infotech)',
      isPrivate: true,
      privateBadgeText: 'Private / Client Project',
      features: [
        'Multi-role access hierarchy with JWT authentication and granular Role-Based Access Control (RBAC)',
        'Stripe checkout integration for recurring dental practice subscriptions and equipment purchases',
        'Automated real-time email triggers and notifications through Firebase Cloud Messaging and Auth',
        'Asynchronous queue management with Redis for heavy background billing cycles and data exports',
        'High-performance GraphQL APIs engineered using Hasura and microservices with NestJS',
      ],
      responsibilities: [
        'Architected and built full-stack workflows across Angular frontend and NestJS backend microservices',
        'Designed PostgreSQL database schemas, Hasura GraphQL query/mutation resolvers, and permissions',
        'Implemented secure JWT auth token rotation and role guards protecting administrative endpoints',
        'Integrated Stripe billing API for automated subscription renewals and invoicing',
        'Automated containerized Docker build pipelines and deployment on Contabo servers via GitLab CI/CD',
      ],
      techStack: [
        'Angular',
        'NestJS',
        'GraphQL',
        'Hasura',
        'PostgreSQL',
        'Redis',
        'Docker',
        'GitLab CI/CD',
        'Stripe',
        'Firebase',
        'JWT',
      ],
      groupedTechStack: [
        {
          category: 'Frontend',
          skills: ['Angular', 'TypeScript', 'SCSS', 'RxJS'],
        },
        {
          category: 'Backend & APIs',
          skills: ['NestJS', 'GraphQL', 'Hasura', 'Node.js', 'JWT Auth', 'RBAC'],
        },
        {
          category: 'Database & Queues',
          skills: ['PostgreSQL', 'Redis'],
        },
        {
          category: 'DevOps & Deployment',
          skills: ['Docker', 'GitLab CI/CD', 'Contabo VPS'],
        },
        {
          category: 'Integrations',
          skills: ['Stripe Payments', 'Firebase Cloud Messaging'],
        },
      ],
      screenshots: [],
      placeholderType: 'dental',
      highlights: [
        'Multi-role access hierarchy with JWT and RBAC for Admin, Supplier, Practice, and Professional personas',
        'Stripe checkout integration for recurring dental practice subscriptions and equipment purchases',
        'Automated real-time email triggers and notifications through Firebase Cloud Messaging and Auth',
        'Asynchronous queue management with Redis for heavy background billing cycles and data exports',
        'Automated Docker build pipelines and deployment on Contabo servers via GitLab CI/CD',
      ],
    },
    {
      id: 'lala-invoice',
      slug: 'lala-invoice',
      index: '02',
      title: 'Lala Invoice',
      tagline: 'Invoice & Billing Management System',
      shortDescription:
        'A streamlined enterprise invoicing and billing web application designed for fast invoice creation, dynamic tax calculations, client ledgers, and financial audit compliance.',
      overview:
        'Lala Invoice is a streamlined invoice and billing management platform engineered for businesses to track financial transactions, manage client accounts, and automate invoice life-cycle statuses from draft to payment settlement.',
      category: 'Full Stack',
      projectType: 'Client System at Nandalala Infotech',
      statusBadge: 'Private / Client Project',
      role: 'Full Stack Developer',
      isPrivate: true,
      privateBadgeText: 'Private / Client Project',
      features: [
        'Full invoice lifecycle CRUD with draft, pending, approved, and paid state transitions',
        'Role-based permissions separating Administrative finance managers from standard invoicing operators',
        'State persistence with Redux for dynamic multi-item invoice tables and automated tax computations',
        'Automated PDF invoice generation and document storage in MongoDB for compliance audit history',
      ],
      responsibilities: [
        'Engineered reactive frontend interface using React.js and Tailwind CSS with state management in Redux',
        'Developed backend REST services in Python to process itemized billing computations and client ledgers',
        'Configured MongoDB schemas for persisting invoices, client records, and payment receipts',
      ],
      techStack: ['React.js', 'Redux', 'Python', 'MongoDB', 'Tailwind CSS'],
      groupedTechStack: [
        {
          category: 'Frontend',
          skills: ['React.js', 'Redux', 'Tailwind CSS', 'JavaScript (ES6+)'],
        },
        {
          category: 'Backend',
          skills: ['Python', 'REST APIs'],
        },
        {
          category: 'Database',
          skills: ['MongoDB'],
        },
      ],
      screenshots: [],
      placeholderType: 'invoice',
      highlights: [
        'Full invoice lifecycle CRUD with draft, pending, approved, and paid states',
        'Role-based permissions separating Administrative finance managers from standard invoicing operators',
        'State persistence with Redux for multi-item invoice tables and dynamic tax calculations',
        'Document PDF generation and MongoDB document storage for long-term audit compliance',
      ],
    },
    {
      id: 'personal-portfolio',
      slug: 'personal-portfolio',
      index: '03',
      title: 'Developer Portfolio',
      tagline: 'Ultra-Performance React Portfolio & AI Assistant',
      shortDescription:
        'High-performance personal developer portfolio built with React 19, Vite, Tailwind CSS v4, and GSAP. Features zero-lag native scrolling, dark/light themes, and an interactive AI assistant.',
      overview:
        'A production-grade developer portfolio engineered for optimal responsiveness, fluid typography, and sub-second performance. It highlights professional work, skills, and interactive project details, paired with an embedded AI assistant widget.',
      category: 'Frontend',
      projectType: 'Personal Portfolio Project',
      statusBadge: 'Open Source',
      role: 'Design & Engineering',
      isPrivate: false,
      githubUrl: 'https://github.com/dhanush-m/portfolio',
      liveUrl: 'https://dhanush-m.dev/',
      features: [
        'Fluid full-width layout with Poppins typography and zero-lag native scrolling',
        'CSS-first dark and light theme switching with synchronized system preference',
        'Accessible interactive AI chatbot panel ready for NestJS backend integration',
        'Dedicated project routing with smooth browser history and scroll restoration',
      ],
      responsibilities: [
        'Designed and built responsive component system using React 19 and Tailwind CSS v4',
        'Implemented client-side routing, lazy-loaded detail views, and scroll restoration',
        'Configured static Netlify deployment with redirect rules and clean accessibility semantics',
      ],
      techStack: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'GSAP', 'Vite', 'Netlify'],
      groupedTechStack: [
        {
          category: 'Frontend',
          skills: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'GSAP'],
        },
        {
          category: 'Tooling & Deployment',
          skills: ['Vite', 'Netlify', 'PostCSS'],
        },
      ],
      screenshots: [],
      placeholderType: 'portfolio',
      highlights: [
        'Sub-second first paint with CSS-first dark/light theme switching and zero layout shift',
        'Accessible interactive AI chatbot panel ready for NestJS backend integration',
        'Pure CSS keyframe marquees and transform/opacity GSAP scroll triggers',
        'Mobile-first responsive design with touch targets exceeding 44px',
      ],
    },
    {
      id: 'face-emotion-detection',
      slug: 'face-emotion-detection',
      index: '04',
      title: 'Face Emotion Detection',
      tagline: 'Real-Time Facial Expression Classifier with Arduino Hardware',
      shortDescription:
        'An intelligent computer vision system that captures live facial video feeds, detects emotional states, and drives external hardware feedback via Arduino microcontrollers.',
      overview:
        'An intelligent computer vision and embedded systems project that captures live webcam video, classifies human facial expressions using deep learning, and communicates detection results to Arduino hardware for physical feedback.',
      category: 'Backend/AI',
      projectType: 'College Capstone Project',
      statusBadge: 'Open Source',
      role: 'System Architect & ML Engineer (College Capstone)',
      isPrivate: false,
      githubUrl: 'https://github.com/dhanush-m/face-emotion-detection',
      features: [
        'Real-time facial landmark extraction using OpenCV and convolutional neural network models',
        'Classification of diverse emotional expressions (happy, neutral, stressed, etc.)',
        'Synchronous hardware state signaling over Arduino serial interface',
        'Optimized inference pipeline for minimal latency on standard webcam inputs',
      ],
      responsibilities: [
        'Trained and evaluated facial emotion recognition models using TensorFlow and Python',
        'Programmed Arduino microcontroller firmware to receive serial signals and trigger output actuators',
        'Engineered the OpenCV video capture and preprocessing pipeline',
      ],
      techStack: ['Python', 'OpenCV', 'TensorFlow', 'Arduino', 'Serial Communication'],
      groupedTechStack: [
        {
          category: 'AI & Computer Vision',
          skills: ['Python', 'OpenCV', 'TensorFlow'],
        },
        {
          category: 'Embedded & Hardware',
          skills: ['Arduino', 'Serial Communication'],
        },
      ],
      screenshots: [],
      placeholderType: 'emotion',
      highlights: [
        'Real-time facial landmark extraction using OpenCV and convolutional neural networks',
        'Synchronous hardware state signaling over Arduino serial interface',
        'Trained model weights optimized for minimal inference latency on standard webcams',
      ],
    },
  ],
  education: [
    {
      degree: 'Bachelor of Technology (B.Tech)',
      field: 'Information Technology',
      institution: 'Kongunadu College of Engineering and Technology',
      location: 'Namakkal / Trichy, Tamil Nadu',
      period: '2020 - 2024',
    },
  ],
  certifications: [
    {
      name: 'CCNA (Cisco Certified Network Associate)',
      issuer: 'Cisco',
      details: 'Foundations of computer networking, routing protocols, and IP infrastructure',
    },
    {
      name: 'HTML, CSS, JavaScript Certification',
      issuer: 'Udemy',
      details: 'Modern JavaScript (ES6+), DOM architecture, and responsive responsive styling',
    },
  ],
  languages: [
    {
      language: 'English',
      proficiency: 'Professional Working Proficiency',
    },
    {
      language: 'Tamil',
      proficiency: 'Native / Bilingual Proficiency',
    },
  ],
};

export function getProjectBySlug(slug: string): Project | undefined {
  return portfolioData.projects.find((p) => p.slug === slug);
}

