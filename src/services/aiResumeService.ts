import type { ResumeData } from '../types/resume';

const OPENAI_KEY_STORAGE = 'cv-builder-pro:openai-api-key';

export function getOpenAiKey() {
  return localStorage.getItem(OPENAI_KEY_STORAGE) || import.meta.env.VITE_OPENAI_API_KEY || '';
}

export function saveOpenAiKey(key: string) {
  if (key.trim()) {
    localStorage.setItem(OPENAI_KEY_STORAGE, key.trim());
  } else {
    localStorage.removeItem(OPENAI_KEY_STORAGE);
  }
}

export async function analyzeResumeWithAI(rawText: string, draft: ResumeData): Promise<ResumeData> {
  const apiKey = getOpenAiKey();
  if (!apiKey) {
    return improveResumeLocally(rawText, draft);
  }

  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        input: [
          {
            role: 'system',
            content:
              'Você é especialista em currículos ATS. Extraia dados reais do texto e responda apenas no JSON do schema. Não invente empresas, cargos, períodos ou links. Se uma informação não existir, use string vazia ou array vazio.',
          },
          {
            role: 'user',
            content: `JSON draft heurístico:\n${JSON.stringify(draft, null, 2)}\n\nTexto bruto extraído do currículo:\n${rawText}`,
          },
        ],
        text: {
          format: {
            type: 'json_schema',
            name: 'resume_data',
            strict: true,
            schema: resumeSchema,
          },
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Falha na análise com IA.');
    }

    const data = await response.json();
    const outputText = extractOutputText(data);
    const parsed = JSON.parse(outputText) as ResumeData;
    return normalizeAiResume(parsed, draft);
  } catch {
    return improveResumeLocally(rawText, draft);
  }
}

export function suggestSummaryWithAI(resume: ResumeData) {
  return improveResumeLocally(JSON.stringify(resume), resume).summary;
}

function extractOutputText(response: any) {
  if (typeof response.output_text === 'string') return response.output_text;

  const content = response.output?.flatMap((item: any) => item.content || []) || [];
  const text = content
    .map((item: any) => item.text || item.output_text || '')
    .filter(Boolean)
    .join('');

  if (!text) {
    throw new Error('Resposta de IA sem texto estruturado.');
  }

  return text;
}

function normalizeAiResume(ai: ResumeData, fallback: ResumeData): ResumeData {
  return {
    personal: { ...fallback.personal, ...ai.personal },
    summary: ai.summary || fallback.summary,
    experiences: ai.experiences?.length ? ai.experiences : fallback.experiences,
    projects: ai.projects?.length ? ai.projects : fallback.projects,
    education: { ...fallback.education, ...ai.education },
    skills: { ...fallback.skills, ...ai.skills },
  };
}

function improveResumeLocally(rawText: string, resume: ResumeData): ResumeData {
  const allSkills = [
    resume.skills.frontend,
    resume.skills.mobile,
    resume.skills.backend,
    resume.skills.tools,
    resume.skills.others,
  ]
    .filter(Boolean)
    .join(', ');
  const role = resume.personal.targetRole || inferRoleFromText(rawText) || 'Profissional';
  const projectNames = resume.projects.map((project) => project.name).filter(Boolean).slice(0, 3).join(', ');
  const hasExperience = resume.experiences.length > 0;

  const summary =
    resume.summary && resume.summary.length > 120
      ? resume.summary
      : `${role} com experiência prática em ${allSkills || 'projetos, tecnologia e rotinas profissionais'}${
          hasExperience ? ', atuação em ambientes profissionais' : ''
        }${projectNames ? ` e projetos como ${projectNames}` : ''}. Perfil organizado, orientado a resultados e com currículo importado para revisão final.`;

  return {
    ...resume,
    personal: {
      ...resume.personal,
      targetRole: resume.personal.targetRole || role,
    },
    summary,
  };
}

function inferRoleFromText(text: string) {
  return (
    text.match(
      /(Desenvolvedor(?:a)? [^\n|]+|Developer [^\n|]+|Analista [^\n|]+|Assistente [^\n|]+|Auxiliar [^\n|]+)/i,
    )?.[0] || ''
  );
}

const stringSchema = { type: 'string' };

const resumeSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['personal', 'summary', 'experiences', 'projects', 'education', 'skills'],
  properties: {
    personal: {
      type: 'object',
      additionalProperties: false,
      required: ['fullName', 'targetRole', 'location', 'phone', 'email', 'linkedin', 'github', 'portfolio', 'instagram'],
      properties: {
        fullName: stringSchema,
        targetRole: stringSchema,
        location: stringSchema,
        phone: stringSchema,
        email: stringSchema,
        linkedin: stringSchema,
        github: stringSchema,
        portfolio: stringSchema,
        instagram: stringSchema,
      },
    },
    summary: stringSchema,
    experiences: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['id', 'company', 'role', 'period', 'bullets'],
        properties: {
          id: stringSchema,
          company: stringSchema,
          role: stringSchema,
          period: stringSchema,
          bullets: { type: 'array', items: stringSchema },
        },
      },
    },
    projects: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['id', 'name', 'description', 'technologies', 'link'],
        properties: {
          id: stringSchema,
          name: stringSchema,
          description: stringSchema,
          technologies: stringSchema,
          link: stringSchema,
        },
      },
    },
    education: {
      type: 'object',
      additionalProperties: false,
      required: ['course', 'institution', 'period'],
      properties: {
        course: stringSchema,
        institution: stringSchema,
        period: stringSchema,
      },
    },
    skills: {
      type: 'object',
      additionalProperties: false,
      required: ['frontend', 'mobile', 'backend', 'tools', 'others'],
      properties: {
        frontend: stringSchema,
        mobile: stringSchema,
        backend: stringSchema,
        tools: stringSchema,
        others: stringSchema,
      },
    },
  },
};
