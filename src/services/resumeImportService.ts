import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import type { ResumeData } from '../types/resume';

const emptyResume: ResumeData = {
  personal: {
    fullName: '',
    targetRole: '',
    location: '',
    phone: '',
    email: '',
    linkedin: '',
    github: '',
    portfolio: '',
    instagram: '',
  },
  summary: '',
  experiences: [],
  projects: [],
  education: {
    course: '',
    institution: '',
    period: '',
  },
  skills: {
    frontend: '',
    mobile: '',
    backend: '',
    tools: '',
    others: '',
  },
};

const knownSkills = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Vite',
  'Vue',
  'Angular',
  'Node',
  'Python',
  'Java',
  'Spring',
  'PostgreSQL',
  'MySQL',
  'Firebase',
  'Firestore',
  'Flutter',
  'Git',
  'GitHub',
  'Figma',
  'Docker',
  'AWS',
  'MongoDB',
  'Next.js',
  'Tailwind',
  'Capacitor',
  'Hibernate',
  'JPA',
  'Tkinter',
];

const contactWords = /e-mail|email|telefone|linkedin|github|portfolio|portf[oó]lio|instagram|whatsapp/i;
const headingWords =
  /^(resumo|objetivo|perfil|experi[eê]ncia|experiencia|profissional|projetos?|forma[cç][aã]o|educa[cç][aã]o|habilidades|compet[eê]ncias|skills|tecnologias|ferramentas)$/i;

export async function importResumeFile(file: File): Promise<ResumeData> {
  const text = await extractResumeText(file);
  return parseResumeText(text, file.name);
}

export async function extractResumeText(file: File) {
  const extension = file.name.split('.').pop()?.toLowerCase();

  if (file.type === 'application/pdf' || extension === 'pdf') {
    return extractPdfText(file);
  }

  if (
    file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    extension === 'docx'
  ) {
    const mammoth = await import('mammoth');
    const buffer = await file.arrayBuffer();
    const result = await mammoth.default.extractRawText({ arrayBuffer: buffer });
    return result.value;
  }

  if (file.type.startsWith('image/') || ['jpg', 'jpeg', 'png'].includes(extension || '')) {
    const { createWorker } = await import('tesseract.js');
    const worker = await createWorker('por+eng');
    const result = await worker.recognize(file);
    await worker.terminate();
    return result.data.text;
  }

  throw new Error('Formato nao suportado. Use PDF, DOCX, JPG, JPEG ou PNG.');
}

async function extractPdfText(file: File) {
  const pdfjsLib = await import('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;
  const buffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
  const pages: string[] = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const rows = new Map<number, string[]>();

    for (const item of content.items) {
      if (!('str' in item) || !item.str.trim()) continue;
      const transform = 'transform' in item ? item.transform : [0, 0, 0, 0, 0, 0];
      const y = Math.round(Number(transform[5] || 0));
      rows.set(y, [...(rows.get(y) || []), item.str]);
    }

    pages.push(
      [...rows.entries()]
        .sort((a, b) => b[0] - a[0])
        .map(([, parts]) => parts.join(' '))
        .join('\n'),
    );
  }

  return pages.join('\n');
}

export function parseResumeText(text: string, fileName = ''): ResumeData {
  const normalized = normalizeText(text);
  const lines = toLines(normalized);
  const contacts = extractContacts(normalized);
  const contactFreeLines = lines.filter((line) => !isContactLine(line));
  const sections = splitSections(contactFreeLines);
  const allBodyLines = [...sections.summary, ...sections.experience, ...sections.projects, ...sections.education, ...sections.skills];
  const name = inferName(contactFreeLines, contacts.email, fileName);
  const role = inferRole(contactFreeLines, name);
  const skillText = sections.skills.join(', ') || inferSkills(normalized).join(', ');

  return {
    ...emptyResume,
    personal: {
      fullName: name,
      targetRole: role,
      location: inferLocation(lines),
      phone: contacts.phone,
      email: contacts.email,
      linkedin: contacts.linkedin,
      github: contacts.github,
      portfolio: contacts.portfolio,
      instagram: contacts.instagram,
    },
    summary: cleanSummary(sections.summary, name, role) || buildSummary(role, skillText),
    experiences: parseExperiences(sections.experience.length ? sections.experience : allBodyLines),
    projects: parseProjects(sections.projects),
    education: parseEducation(sections.education),
    skills: classifySkills(skillText || normalized),
  };
}

function normalizeText(text: string) {
  return text
    .replace(/\r/g, '\n')
    .replace(/([A-ZÁÀÂÃÉÊÍÓÔÕÚÇ]{2,})(Desenvolvedor|Developer|Analista|Assistente|Auxiliar|Engenheiro|Designer)/g, '$1\n$2')
    .replace(/([a-záàâãéêíóôõúç])((?:Instituto|Universidade|Faculdade|MS Software|KodaPlay|AtlantaLogus|Koda-System|Gerador de))/g, '$1\n$2')
    .replace(/([a-z0-9)])(Front-End:|Mobile:|Back-End|Ferramentas:)/gi, '$1\n$2')
    .replace(/[•●▪]/g, '\n- ')
    .replace(/[–—]/g, ' - ')
    .replace(/\s+\|\s+/g, '\n')
    .replace(/(LinkedIn|GitHub|Portfolio|Portfólio|Instagram|Telefone|E-mail|Email)\s*:/gi, '\n$1: ')
    .replace(/(Resumo Profissional|Experiência Profissional|Experiencia Profissional|Projetos Relevantes|Formação|Habilidades Técnicas)/gi, '\n$1\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function toLines(text: string) {
  return text
    .split('\n')
    .flatMap((line) => line.split(/\s{3,}/g))
    .map((line) => line.trim().replace(/\s+/g, ' '))
    .filter(Boolean);
}

function extractContacts(text: string) {
  const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] || '';
  const phone = text.match(/(?:\+?55\s*)?(?:\(?\d{2}\)?\s*)?\d{4,5}[-\s]?\d{4}/)?.[0] || '';
  const linkedin = extractLabeledValue(text, /linkedin/i) || text.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/[^\s,;]+/i)?.[0] || '';
  const github = extractLabeledValue(text, /github/i) || text.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/[^\s,;]+/i)?.[0] || '';
  const portfolio = extractPortfolio(text, email);
  const instagram = extractInstagram(text, email);

  return {
    email: cleanContact(email),
    phone: cleanContact(phone),
    linkedin: cleanContact(linkedin),
    github: cleanContact(github),
    portfolio: cleanContact(portfolio),
    instagram: cleanContact(instagram),
  };
}

function extractLabeledValue(text: string, label: RegExp) {
  const lines = toLines(text);
  const line = lines.find((item) => label.test(item));
  if (!line) return '';
  return line
    .replace(/^.*?:\s*/, '')
    .replace(/\s+(linkedin|github|portfolio|portf[oó]lio|instagram|telefone|e-mail|email)\s*:.*$/i, '')
    .trim();
}

function extractPortfolio(text: string, email: string) {
  const labeled = extractLabeledValue(text, /portfolio|portf[oó]lio/i);
  if (labeled) return labeled;

  const domains = text.match(/(?:https?:\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+[^\s,;]*/gi) || [];
  return (
    domains.find((domain) => {
      const lower = domain.toLowerCase();
      return (
        !lower.includes('linkedin.com') &&
        !lower.includes('github.com') &&
        !lower.includes(email.split('@')[1]?.toLowerCase() || 'email.invalid')
      );
    }) || ''
  );
}

function extractInstagram(text: string, email: string) {
  const labeled = extractLabeledValue(text, /instagram/i);
  if (labeled) return labeled;

  const handles = text.match(/(^|[\s,;])@[\w.]+/g) || [];
  return handles.map((item) => item.trim()).find((handle) => !email.includes(handle.replace('@', ''))) || '';
}

function cleanContact(value: string) {
  return value.replace(/[),;]+$/g, '').replace(/^https?:\/\//i, '').trim();
}

function isContactLine(line: string) {
  return (
    contactWords.test(line) ||
    line.includes('@') ||
    /linkedin\.com|github\.com|https?:\/\/|netlify\.app|vercel\.app/i.test(line)
  );
}

function inferName(lines: string[], email: string, fileName: string) {
  const forbidden = ['curriculum', 'curriculo', 'currículo', 'resume', 'contato', 'experiencia', 'experiência'];
  const candidate = lines.find((line) => {
    const clean = line.toLowerCase();
    return (
      line.length >= 5 &&
      line.length <= 48 &&
      !headingWords.test(line) &&
      !/\d/.test(line) &&
      !forbidden.some((word) => clean.includes(word)) &&
      !/desenvolvedor|developer|analista|assistente|auxiliar|engenheiro|designer/i.test(line)
    );
  });

  if (candidate) return titleCase(candidate);

  const fileNameMatch = fileName
    .replace(/\.[^.]+$/, '')
    .replace(/curriculo|currículo|resume|cv|front|back|dev/gi, '')
    .replace(/[_-]+/g, ' ')
    .trim();
  if (fileNameMatch.length > 4) return titleCase(fileNameMatch);

  return email ? titleCase(email.split('@')[0].replace(/[._-]/g, ' ')) : 'Curriculo Importado';
}

function inferRole(lines: string[], name: string) {
  const index = lines.findIndex((line) => line.toLowerCase() === name.toLowerCase());
  const nearby = index >= 0 ? lines.slice(index + 1, index + 5) : lines.slice(1, 6);
  return (
    nearby.find((line) =>
      /desenvolvedor|developer|analista|assistente|auxiliar|engenheiro|designer|frontend|front-end|full stack|back-end|administrativo/i.test(
        line,
      ),
    ) || ''
  );
}

function inferLocation(lines: string[]) {
  const candidates = lines
    .map((line) => {
      const cityUf = line.match(/\b[A-ZÁÀÂÃÉÊÍÓÔÕÚÇ][A-Za-zÁÀÂÃÉÊÍÓÔÕÚÇáàâãéêíóôõúç\s.-]{2,40}\/[A-Z]{2}\b/);
      if (cityUf) return cityUf[0].trim();

      const labeled = line.match(/(?:cidade|localiza[cç][aã]o|endereco|endereço)\s*:?\s*([^|,;]+)/i);
      if (labeled) return labeled[1].trim();

      const known = line.match(/\b(Curitiba|Sao Paulo|São Paulo|Rio de Janeiro|Belo Horizonte|Porto Alegre|Florianopolis|Florianópolis)\b(?:\s*[-,]\s*[A-Z]{2})?/i);
      if (known) return known[0].trim();

      return '';
    })
    .filter(Boolean);

  return candidates.find((candidate) => !contactWords.test(candidate) && !/github|linkedin|portfolio|@/i.test(candidate)) || '';
}

function splitSections(lines: string[]) {
  const buckets = {
    summary: [] as string[],
    experience: [] as string[],
    projects: [] as string[],
    education: [] as string[],
    skills: [] as string[],
  };
  let current: keyof typeof buckets = 'summary';

  for (const rawLine of lines) {
    const line = rawLine.replace(/^-+\s*/, '').trim();
    const lower = line.toLowerCase();
    if (/^resumo|objetivo|perfil/.test(lower)) {
      current = 'summary';
      continue;
    }
    if (/experi[eê]ncia|experiencia|profissional|trabalho/.test(lower)) {
      current = 'experience';
      continue;
    }
    if (/projetos|portfolio|portf[oó]lio/.test(lower)) {
      current = 'projects';
      continue;
    }
    if (/forma[cç][aã]o|educa[cç][aã]o|gradua[cç][aã]o|curso/.test(lower)) {
      current = 'education';
      continue;
    }
    if (/habilidades|compet[eê]ncias|skills|tecnologias|ferramentas/.test(lower)) {
      current = 'skills';
      continue;
    }
    buckets[current].push(line);
  }

  return buckets;
}

function cleanSummary(lines: string[], name: string, role: string) {
  return lines
    .filter((line) => line !== name && line !== role && !isContactLine(line) && !headingWords.test(line))
    .join(' ')
    .slice(0, 520);
}

function parseExperiences(lines: string[]) {
  const experienceLines = lines.filter(
    (line) =>
      !isContactLine(line) &&
      !headingWords.test(line) &&
      !/tecnologias?:|habilidades|formação|educação/i.test(line),
  );
  const chunks = chunkExperiences(experienceLines);

  return chunks.slice(0, 5).map((chunk, index) => {
    const header = chunk[0] || '';
    const parts = header.split(/\s+-\s+|\s+\|\s+/).map((part) => part.trim()).filter(Boolean);
    const period = chunk.find((line) => /\b\d{4}\b/.test(line)) || header.match(/\b\d{4}\s*[-a]\s*(?:\d{4}|atual)\b/i)?.[0] || '';

    return {
      id: crypto.randomUUID(),
      company: parts[0] || `Experiencia ${index + 1}`,
      role: parts[1] && !/\d{4}/.test(parts[1]) ? parts[1] : '',
      period,
      bullets: chunk
        .slice(1)
        .filter((line) => line.length > 8 && line !== period)
        .map((line) => line.replace(/^-+\s*/, ''))
        .slice(0, 5),
    };
  });
}

function chunkExperiences(lines: string[]) {
  const chunks: string[][] = [];
  let current: string[] = [];

  for (const line of lines) {
    const periodOnly = /^\d{4}\s*[-a]\s*(?:\d{4}|atual)$/i.test(line.trim());
    const looksHeader =
      !periodOnly &&
      line.length < 120 &&
      (/\b\d{4}\b.*[A-Za-zÁÀÂÃÉÊÍÓÔÕÚÇáàâãéêíóôõúç]{3,}/.test(line) ||
        /\s+-\s+/.test(line) ||
        /desenvolvedor|developer|assistente|analista|auxiliar|estagi/i.test(line));

    if (looksHeader && current.length > 0) {
      chunks.push(current);
      current = [];
    }
    current.push(line);
  }

  if (current.length) chunks.push(current);
  return chunks.filter((chunk) => chunk.some((line) => /\b\d{4}\b|desenvolvedor|assistente|analista|auxiliar/i.test(line)));
}

function parseProjects(lines: string[]) {
  const chunks = chunkByLikelyTitle(lines.filter((line) => !isContactLine(line)));
  return chunks.slice(0, 4).map((chunk, index) => ({
    id: crypto.randomUUID(),
    name: chunk[0] || `Projeto ${index + 1}`,
    description: chunk.slice(1, 3).join(' '),
    technologies: inferSkills(chunk.join(' ')).join(', '),
    link: chunk.find((line) => /https?:\/\/|\.com|\.app|\.dev/.test(line)) || '',
  }));
}

function parseEducation(lines: string[]) {
  const text = lines.join(' ');
  return {
    course: lines.find((line) => /sistemas|an[aá]lise|engenharia|ci[eê]ncia|curso|gradua/i.test(line)) || lines[0] || '',
    institution: lines.find((line) => /universidade|faculdade|instituto|school|college/i.test(line)) || '',
    period: text.match(/\d{4}\s*[-a]\s*(?:\d{4}|atual)/i)?.[0] || '',
  };
}

function classifySkills(text: string) {
  const skills = inferSkills(text);
  const has = (items: string[]) => skills.filter((skill) => items.some((item) => skill.toLowerCase().includes(item)));

  return {
    frontend: has(['html', 'css', 'javascript', 'typescript', 'react', 'vite', 'vue', 'angular', 'next', 'tailwind']).join(', '),
    mobile: has(['flutter', 'react native', 'android', 'ios', 'capacitor']).join(', '),
    backend: has(['node', 'python', 'java', 'spring', 'postgres', 'mysql', 'firebase', 'firestore', 'mongodb', 'hibernate', 'jpa', 'tkinter']).join(', '),
    tools: has(['git', 'github', 'figma', 'docker', 'aws']).join(', '),
    others: '',
  };
}

function inferSkills(text: string) {
  const lower = text.toLowerCase();
  return knownSkills.filter((skill) => lower.includes(skill.toLowerCase()));
}

function chunkByLikelyTitle(lines: string[]) {
  const chunks: string[][] = [];
  let current: string[] = [];

  for (const line of lines.filter((item) => item.length > 2)) {
    const startsNew = current.length > 0 && !line.startsWith('-') && line.length < 90 && /^[A-ZÁÀÂÃÉÊÍÓÔÕÚÇ0-9]/.test(line);
    if (startsNew) {
      chunks.push(current);
      current = [];
    }
    current.push(line);
  }

  if (current.length) chunks.push(current);
  return chunks.length ? chunks : [lines];
}

function buildSummary(role: string, skills: string) {
  if (!role && !skills) return '';
  return `${role || 'Profissional'} com experiencia em ${skills || 'tecnologias, projetos e rotinas profissionais'}. Curriculo importado automaticamente para revisao e edicao.`;
}

function titleCase(value: string) {
  return value
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
