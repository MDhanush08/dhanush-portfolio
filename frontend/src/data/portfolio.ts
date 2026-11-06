import type {
  CertificationItem,
  EducationItem,
  ExperienceItem,
  Project,
  QuickFact,
  SkillGroup,
} from '../types';

export interface PortfolioData {
  personal: {
    name: string;
    headline: string;
    cyclingRoles: string[];
    tagline: string;
    summary: string;
    location: string;
    email: string;
    phone: string;
    resumeUrl: string;
    social: {
      github: string;
      linkedin: string;
    };
    aiHighlights: {
      title: string;
      description: string;
      tools: string[];
    };
  };
  quickFacts: QuickFact[];
  skillGroups: SkillGroup[];
  allSkillsList: { name: string; category: string }[];
  experiences: ExperienceItem[];
  projects: Project[];
  education: EducationItem[];
  certifications: CertificationItem[];
  languages: { name: string; proficiency: string }[];
}

export const portfolioData: PortfolioData = {
  personal: {
    name: 'Dhanush M',
    headline: 'Software Developer',
    cyclingRoles: [
      'Software Developer',
      'Full Stack Engineer',
      'Angular and React Developer',
      'NestJS Backend Developer',
    ],
    tagline:
      'Building robust, scalable, and secure web applications with modern frontend architectures and high-performance backend microservices.',
    summary:
      'Software Developer with 2 years of experience building secure, scalable web applications using Angular, React.js, Node.js, NestJS, GraphQL and PostgreSQL. Experienced in JWT authentication, role-based access control, payment and notification integrations, and CI/CD deployment with Docker and GitLab. Uses AI tools such as Claude Code, Codex and Antigravity to accelerate development and improve code quality, with working knowledge of LLM integration and RAG.',
    location: 'Tiruchirappalli, Tamil Nadu, India',
    email: 'dhanushm.stack@gmail.com',
    phone: '9600261471',
    resumeUrl: '/Dhanush_M_Resume.pdf',
    social: {
      github: 'https://github.com/MDhanush08',
      linkedin: 'https://www.linkedin.com/in/dhanush360',
    },
    aiHighlights: {
      title: 'AI-Augmented Engineering',
      description:
        'Leveraging cutting-edge AI developer tooling (Claude Code, OpenAI Codex, Antigravity) to rapidly scaffold architectures, write bulletproof tests, and iterate with peak velocity. Experienced in real-world LLM integration (Gemini API) and Retrieval-Augmented Generation (RAG) paradigms.',
      tools: ['Claude Code', 'OpenAI Codex', 'Antigravity', 'Gemini API', 'RAG'],
    },
  },

  quickFacts: [
    {
      label: 'Experience',
      value: '2+ Years',
      subtext: 'Full-stack engineering & SaaS architecture',
    },
    {
      label: 'Core Focus',
      value: 'Full Stack',
      subtext: 'Angular + React.js + NestJS + GraphQL',
    },
    {
      label: 'Education',
      value: 'B.Tech IT',
      subtext: 'Kongunadu College of Engg & Tech',
    },
    {
      label: 'Location',
      value: 'Tamil Nadu, IN',
      subtext: 'Tiruchirappalli • Open to Remote',
    },
  ],

  skillGroups: [
    {
      id: 'frontend',
      title: 'Frontend Development',
      description: 'Modern, reactive single-page applications with state management and fluid animations.',
      skills: [
        { name: 'Angular', iconName: 'SiAngular', category: 'Frontend' },
        { name: 'React.js', iconName: 'SiReact', category: 'Frontend' },
        { name: 'Redux', iconName: 'SiRedux', category: 'Frontend' },
        { name: 'TypeScript', iconName: 'SiTypescript', category: 'Frontend' },
        { name: 'JavaScript (ES6+)', iconName: 'SiJavascript', category: 'Frontend' },
        { name: 'HTML5', iconName: 'SiHtml5', category: 'Frontend' },
        { name: 'CSS3', iconName: 'SiCss', category: 'Frontend' },
        { name: 'SCSS', iconName: 'SiSass', category: 'Frontend' },
        { name: 'Tailwind CSS', iconName: 'SiTailwindcss', category: 'Frontend' },
        { name: 'Bootstrap', iconName: 'SiBootstrap', category: 'Frontend' },
        { name: 'Ionic', iconName: 'SiIonic', category: 'Frontend' },
        { name: 'GSAP', iconName: 'SiGreensock', category: 'Frontend' },
      ],
    },
    {
      id: 'backend',
      title: 'Backend & APIs',
      description: 'Secure, scalable microservices, REST & GraphQL endpoints, and authorization logic.',
      skills: [
        { name: 'Node.js', iconName: 'SiNodedotjs', category: 'Backend' },
        { name: 'NestJS', iconName: 'SiNestjs', category: 'Backend' },
        { name: 'Express.js', iconName: 'SiExpress', category: 'Backend' },
        { name: 'Python', iconName: 'SiPython', category: 'Backend' },
        { name: 'PHP', iconName: 'SiPhp', category: 'Backend' },
        { name: 'REST APIs', iconName: 'TbApi', category: 'Backend' },
        { name: 'GraphQL', iconName: 'SiGraphql', category: 'Backend' },
        { name: 'Hasura', iconName: 'SiHasura', category: 'Backend' },
        { name: 'JWT Auth', iconName: 'SiJsonwebtokens', category: 'Backend' },
        { name: 'RBAC', iconName: 'TbShieldLock', category: 'Backend' },
      ],
    },
    {
      id: 'databases',
      title: 'Databases & In-Memory',
      description: 'Relational design, NoSQL persistence, and high-throughput caching.',
      skills: [
        { name: 'PostgreSQL', iconName: 'SiPostgresql', category: 'Databases' },
        { name: 'MongoDB', iconName: 'SiMongodb', category: 'Databases' },
        { name: 'SQL', iconName: 'TbDatabase', category: 'Databases' },
        { name: 'Redis', iconName: 'SiRedis', category: 'Databases' },
      ],
    },
    {
      id: 'devops',
      title: 'DevOps & Deployment',
      description: 'Automated containerized pipelines, version control, and cloud hosting.',
      skills: [
        { name: 'Docker', iconName: 'SiDocker', category: 'DevOps' },
        { name: 'GitLab CI/CD', iconName: 'SiGitlab', category: 'DevOps' },
        { name: 'Git', iconName: 'SiGit', category: 'DevOps' },
        { name: 'GitHub', iconName: 'SiGithub', category: 'DevOps' },
        { name: 'GitLab', iconName: 'SiGitlab', category: 'DevOps' },
        { name: 'Tortoise Git', iconName: 'TbBrandGit', category: 'DevOps' },
        { name: 'Contabo', iconName: 'TbServer', category: 'DevOps' },
        { name: 'Render', iconName: 'SiRender', category: 'DevOps' },
        { name: 'Netlify', iconName: 'SiNetlify', category: 'DevOps' },
      ],
    },
    {
      id: 'tools',
      title: 'Tools & Testing',
      description: 'Developer environments, API testing, debugging, and issue tracking.',
      skills: [
        { name: 'Postman', iconName: 'SiPostman', category: 'Tools' },
        { name: 'Zoho BugTracker', iconName: 'TbBug', category: 'Tools' },
        { name: 'VS Code', iconName: 'VscCode', category: 'Tools' },
        { name: 'Android Studio', iconName: 'SiAndroidstudio', category: 'Tools' },
      ],
    },
    {
      id: 'integrations-ai',
      title: 'Integrations & AI',
      description: 'Payment processors, push notifications, and next-gen LLM capabilities.',
      skills: [
        { name: 'Stripe', iconName: 'SiStripe', category: 'Integrations & AI' },
        { name: 'Firebase', iconName: 'SiFirebase', category: 'Integrations & AI' },
        { name: 'Gemini API', iconName: 'SiGooglecloud', category: 'Integrations & AI' },
        { name: 'RAG Architecture', iconName: 'TbBrain', category: 'Integrations & AI' },
        { name: 'Claude Code', iconName: 'TbSparkles', category: 'Integrations & AI' },
        { name: 'OpenAI Codex', iconName: 'TbBrandOpenai', category: 'Integrations & AI' },
        { name: 'Antigravity', iconName: 'TbCpu', category: 'Integrations & AI' },
      ],
    },
  ],

  allSkillsList: [
    { name: 'Angular', category: 'Frontend' },
    { name: 'React.js', category: 'Frontend' },
    { name: 'NestJS', category: 'Backend' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'GraphQL', category: 'API' },
    { name: 'Hasura', category: 'Backend' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'Redis', category: 'Cache' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'GitLab CI/CD', category: 'DevOps' },
    { name: 'Tailwind CSS', category: 'Frontend' },
    { name: 'Redux', category: 'Frontend' },
    { name: 'MongoDB', category: 'Database' },
    { name: 'Stripe', category: 'Integration' },
    { name: 'Firebase', category: 'Cloud' },
    { name: 'Python', category: 'Language' },
    { name: 'GSAP', category: 'Animation' },
    { name: 'Gemini API', category: 'AI' },
    { name: 'RAG', category: 'AI' },
  ],

  experiences: [
    {
      id: 'nandalala-infotech',
      role: 'Software Developer',
      company: 'Nandalala Infotech',
      location: 'Tiruchirappalli, Tamil Nadu',
      period: 'Sep 2024 – Present',
      type: 'Full-time',
      description:
        'Engineered enterprise SaaS platforms and high-throughput financial invoicing systems, handling end-to-end full-stack development, database schema modeling, and production CI/CD deployments.',
      highlights: [
        'Built multi-role SaaS platforms and invoicing systems with complex permission hierarchies.',
        'Engineered high-performance GraphQL APIs using Hasura and customized NestJS backend microservices.',
        'Implemented strict JWT authentication and granular Role-Based Access Control (RBAC).',
        'Integrated Stripe checkout/webhook payments and Firebase real-time notifications.',
        'Architected background workers and asynchronous processing pipelines using Redis queues.',
        'Containerized multi-service applications using Docker and established GitLab CI/CD pipelines targeting Contabo VPS.',
        'Conducted rigorous integration testing and tracked issues systematically in Zoho BugTracker.',
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
      company: 'Client Projects (Contract)',
      location: 'Remote',
      period: '2023 – Present',
      type: 'Part-time',
      description:
        'Delivering responsive, custom web applications and full-stack solutions for businesses and independent clients, from interface design to cloud deployment.',
      highlights: [
        'Engineered dynamic client single-page web applications utilizing React.js, Angular, Node.js, and MongoDB.',
        'Implemented secure RESTful API integrations, third-party authentication, and responsive UI components.',
        'Managed cloud server setup, DNS configuration, and automated static/containerized deployment.',
        'Collaborated closely with clients to transform functional requirements into high-conversion digital experiences.',
      ],
      techStack: ['React.js', 'Angular', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Netlify', 'Render'],
    },
  ],

  projects: [
    {
      id: 'dental-interface-360',
      title: 'Dental Interface 360',
      subtitle: 'Multi-Role Enterprise Dental SaaS Platform',
      description:
        'Comprehensive clinical and operational SaaS ecosystem engineered for 4 distinct user tiers: Admin, Supplier, Practice, and Professional. Features secure multi-tenant workflows, automated recurring billing, and real-time alerts.',
      role: 'Full Stack Developer (Nandalala Infotech)',
      category: 'fullstack',
      tags: [
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
        'Contabo',
      ],
      links: {
        label: 'Private / Client project',
      },
      isPrivate: true,
      featured: true,
      highlights: [
        'Hierarchical RBAC separating Admin, Supplier, Practice, and Professional roles with strict JWT authorization.',
        'Automated payment workflows and subscription billing handled via Stripe APIs.',
        'Email notifications and real-time system alerts triggered through Firebase integration.',
        'High-volume background jobs and queue processing powered by Redis.',
        'CI/CD automated deployment workflow with Docker on Contabo infrastructure.',
      ],
    },
    {
      id: 'lala-invoice',
      title: 'Lala Invoice',
      subtitle: 'Invoice & Billing Management System',
      description:
        'High-efficiency business invoicing solution built to streamline billing operations, client accounts, payment tracking, and ledger exports with role-based access.',
      role: 'Full Stack Developer',
      category: 'fullstack',
      tags: ['React.js', 'Redux', 'Python', 'MongoDB', 'REST API', 'JWT'],
      links: {
        label: 'Private / Client project',
      },
      isPrivate: true,
      featured: true,
      highlights: [
        'Complete Invoice CRUD operations with dynamic itemization, tax calculations, and PDF generation.',
        'Role-Based Access Control separating Administrator capabilities from standard accounting users.',
        'Redux centralized store for snappy offline-resilient UI state and smooth navigation.',
        'Optimized MongoDB indexing for fast ledger querying and report generation.',
      ],
    },
    {
      id: 'personal-portfolio',
      title: 'Developer Portfolio',
      subtitle: 'Modern Motion-Driven Portfolio & AI Assistant',
      description:
        'Production developer portfolio showcasing high-performance web engineering, fluid GSAP scroll interactions, zero-FOUC dual-theme tokens, and an interactive AI chatbot interface.',
      role: 'Creator & UI/UX Designer',
      category: 'frontend',
      tags: ['React 19', 'Vite', 'TypeScript', 'GSAP', 'Tailwind CSS v4', 'Netlify'],
      links: {
        github: 'https://github.com/MDhanush08/portfolio',
        live: '#',
      },
      isPrivate: false,
      featured: false,
      highlights: [
        'Fluid animations built with GSAP and ScrollTrigger respecting prefers-reduced-motion.',
        'Zero-flash dual-theme design system powered by CSS custom property tokens.',
        'Accessible AI chat assistant interface with keyboard trap and typing simulation.',
      ],
    },
    {
      id: 'face-emotion-detection',
      title: 'Face Emotion Detection',
      subtitle: 'Computer Vision & IoT Hardware Integration',
      description:
        'Intelligent facial emotion recognition system combining computer vision pipelines in Python with physical Arduino microcontroller responses to real-time human expressions.',
      role: 'Lead Developer (Academic Capstone)',
      category: 'backend-ai',
      tags: ['Python', 'OpenCV', 'Arduino', 'IoT', 'Machine Learning', 'Computer Vision'],
      links: {
        github: 'https://github.com/MDhanush08/face-emotion-detection',
      },
      isPrivate: false,
      featured: false,
      highlights: [
        'Real-time webcam video stream processing and facial landmark feature extraction with OpenCV.',
        'Serial communication protocol bridging Python emotion classification to Arduino microcontrollers.',
        'Hardware actuators/LEDs responding dynamically to detected user emotional states.',
      ],
    },
  ],

  education: [
    {
      degree: 'B.Tech in Information Technology',
      institution: 'Kongunadu College of Engineering and Technology',
      period: '2020 – 2024',
      location: 'Tamil Nadu, India',
      notes: 'Comprehensive foundation in Data Structures, Algorithms, Software Engineering, DBMS, and Web Technologies.',
    },
  ],

  certifications: [
    {
      title: 'CCNA (Cisco Certified Network Associate)',
      issuer: 'Cisco',
    },
    {
      title: 'HTML, CSS, JavaScript Certification',
      issuer: 'Udemy',
    },
  ],

  languages: [
    { name: 'English', proficiency: 'Professional Working Proficiency' },
    { name: 'Tamil', proficiency: 'Native / Bilingual' },
  ],
};
