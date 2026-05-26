import type { ResumeData } from '../types/resume';

export const sampleResume: ResumeData = {
  personal: {
    fullName: 'Matheus Souza',
    targetRole: 'Desenvolvedor Front-End Jr. | React • JavaScript • TypeScript',
    location: 'Curitiba/PR — Xaxim',
    phone: '(41) 98794-0764',
    email: 'matheuzfsouza@gmail.com',
    linkedin: 'linkedin.com/in/matheus-souza-benini',
    github: 'github.com/matheusferza',
    portfolio: 'ms-portifolio.netlify.app',
    instagram: '@matheusferza.dev',
  },
  summary:
    'Desenvolvedor Front-End Jr. com experiência prática em aplicações web e mobile utilizando React, JavaScript, TypeScript, Flutter e Firebase. Possui projetos próprios publicados envolvendo SaaS, sistemas de gestão, players multimídia e plataformas educacionais.',
  experiences: [
    {
      id: 'exp-ms-software',
      company: 'MS Software',
      role: 'Desenvolvedor Full Stack (PJ/MEI)',
      period: '2024 – Atual',
      bullets: [
        'Desenvolvimento de aplicações web, mobile e desktop sob demanda',
        'Criação de interfaces utilizando React, JavaScript, TypeScript e Flutter',
        'Integração com Firebase/Firestore e bancos de dados',
        'Desenvolvimento de soluções personalizadas para clientes',
      ],
    },
    {
      id: 'exp-anchieta',
      company: 'Instituto de Ensino Superior Anchieta',
      role: 'Assistente de T.I.',
      period: '2024',
      bullets: [
        'Suporte técnico a usuários e manutenção de sistemas',
        'Apoio em infraestrutura e gerenciamento de computadores',
      ],
    },
  ],
  projects: [
    {
      id: 'proj-kodaplay',
      name: 'KodaPlay',
      description: 'Player multimídia offline para desktop e mobile.',
      technologies: 'React, TypeScript, Vite, Capacitor',
    },
    {
      id: 'proj-atlantalogus',
      name: 'AtlantaLogus',
      description: 'Sistema PDV desktop com estoque, caixa e relatórios.',
      technologies: 'Java, Swing, PostgreSQL, Hibernate/JPA',
    },
    {
      id: 'proj-koda-system',
      name: 'Koda-System',
      description: 'Sistema PDV para mercados e operações de balcão.',
      technologies: 'Python, Tkinter, Banco de Dados',
    },
    {
      id: 'proj-landing-ai',
      name: 'Gerador de Landing Pages IA',
      description: 'SaaS com preview em tempo real.',
      technologies: 'JavaScript, HTML, CSS, API Groq',
    },
  ],
  education: {
    course: 'Sistemas de Informação',
    institution: 'Instituto de Ensino Superior Anchieta',
    period: '2020 – 2024',
  },
  skills: {
    frontend: 'HTML, CSS, JavaScript, TypeScript, React, Vite',
    mobile: 'Flutter',
    backend: 'Firebase, Firestore, PostgreSQL, Python',
    tools: 'Git, GitHub, Android Studio, Figma',
    others: '',
  },
};
