import type { ResumeTheme, TemplateDefinition } from '../types/theme';

export const defaultSectionOrder: ResumeTheme['sectionOrder'] = [
  'summary',
  'experiences',
  'projects',
  'education',
  'skills',
];

export const templates: TemplateDefinition[] = [
  {
    id: 'ats-clean',
    name: 'ATS Clean',
    description: 'Branco, objetivo e ultra compatível com sistemas ATS.',
    category: 'ATS',
    accent: '#047857',
  },
  {
    id: 'modern-dev',
    name: 'Modern Dev',
    description: 'Premium, técnico e focado em stacks e projetos.',
    category: 'Tech',
    accent: '#2563eb',
  },
  {
    id: 'sidebar',
    name: 'Sidebar',
    description: 'Contatos e habilidades em barra lateral esquerda.',
    category: 'Two-column',
    accent: '#0f766e',
  },
  {
    id: 'dark-mode',
    name: 'Dark Mode',
    description: 'Fundo escuro, contraste elegante e visual cyber.',
    category: 'Premium',
    accent: '#22c55e',
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Clássico sofisticado para empresas grandes.',
    category: 'Business',
    accent: '#1d4ed8',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Tipografia limpa, ritmo calmo e pouco ruído visual.',
    category: 'Clean',
    accent: '#111827',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Mais expressivo, sem perder legibilidade profissional.',
    category: 'Portfolio',
    accent: '#be123c',
  },
  {
    id: 'dev-premium',
    name: 'Dev Premium',
    description: 'Layout denso, refinado e otimizado para devs.',
    category: 'Tech',
    accent: '#7c3aed',
  },
];

export const defaultTheme: ResumeTheme = {
  templateId: 'ats-clean',
  primaryColor: '#047857',
  secondaryColor: '#0f172a',
  fontFamily: 'Inter',
  fontSize: 9.1,
  spacing: 'balanced',
  headingStyle: 'uppercase',
  sectionStyle: 'lines',
  borderStyle: 'subtle',
  showIcons: true,
  compactMode: true,
  sectionOrder: defaultSectionOrder,
};
