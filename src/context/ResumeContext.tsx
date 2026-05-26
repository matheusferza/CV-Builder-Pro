import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';
import { sampleResume } from '../data/sampleResume';
import { suggestSummaryWithAI } from '../services/aiResumeService';
import type { ResumeData, ResumeDocument } from '../types/resume';

interface ResumeContextValue {
  resume: ResumeData;
  setResume: Dispatch<SetStateAction<ResumeData>>;
  documents: ResumeDocument[];
  activeDocumentId: string;
  updateSection: <Section extends keyof ResumeData>(
    section: Section,
    value: ResumeData[Section],
  ) => void;
  resetToSample: () => void;
  clearResume: () => void;
  suggestSummary: () => void;
  createResume: () => string;
  createResumeFromData: (data: ResumeData, name?: string) => string;
  duplicateResume: () => void;
  duplicateResumeById: (id: string) => void;
  deleteResume: (id: string) => void;
  selectResume: (id: string) => void;
  toggleFavorite: (id: string) => void;
  exportJson: () => void;
  importJson: (file: File) => Promise<void>;
}

const STORAGE_KEY = 'cv-builder-pro:documents';
const ACTIVE_KEY = 'cv-builder-pro:active-document';
const ResumeContext = createContext<ResumeContextValue | undefined>(undefined);

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

function createDocument(data: ResumeData, name = data.personal.fullName || 'Curriculo sem nome'): ResumeDocument {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    name,
    favorite: false,
    createdAt: now,
    updatedAt: now,
    data,
  };
}

function getInitialDocuments(): ResumeDocument[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [createDocument(sampleResume, 'Matheus Souza')];

  try {
    const parsed = JSON.parse(stored) as ResumeDocument[];
    if (parsed.length === 0) return [createDocument(sampleResume, 'Matheus Souza')];

    if (parsed.length > 100) {
      const meaningful = parsed.filter(
        (document) => document.favorite || !/^novo curr/i.test(document.name),
      );
      const drafts = parsed
        .filter((document) => /^novo curr/i.test(document.name))
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .slice(0, 5);
      return [...meaningful, ...drafts].slice(0, 50);
    }

    return parsed;
  } catch {
    return [createDocument(sampleResume, 'Matheus Souza')];
  }
}

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [documents, setDocuments] = useState<ResumeDocument[]>(getInitialDocuments);
  const [activeDocumentId, setActiveDocumentId] = useState(() => {
    const stored = localStorage.getItem(ACTIVE_KEY);
    return stored || '';
  });

  const activeDocument = documents.find((document) => document.id === activeDocumentId) ?? documents[0];
  const resume = activeDocument.data;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    if (activeDocument?.id && activeDocument.id !== activeDocumentId) {
      setActiveDocumentId(activeDocument.id);
    }
  }, [activeDocument, activeDocumentId]);

  useEffect(() => {
    if (activeDocumentId) {
      localStorage.setItem(ACTIVE_KEY, activeDocumentId);
    }
  }, [activeDocumentId]);

  const updateActiveDocument = useCallback((updater: (data: ResumeData) => ResumeData) => {
    setDocuments((current) =>
      current.map((document) => {
        if (document.id !== activeDocument.id) return document;
        const data = updater(document.data);

        return {
          ...document,
          name: data.personal.fullName || document.name,
          updatedAt: new Date().toISOString(),
          data,
        };
      }),
    );
  }, [activeDocument.id]);

  const setResume: Dispatch<SetStateAction<ResumeData>> = useCallback(
    (value) => {
      updateActiveDocument((current) => (typeof value === 'function' ? value(current) : value));
    },
    [updateActiveDocument],
  );

  const updateSection = useCallback<ResumeContextValue['updateSection']>((section, value) => {
    updateActiveDocument((current) => ({ ...current, [section]: value }));
  }, [updateActiveDocument]);

  const resetToSample = useCallback(() => setResume(sampleResume), [setResume]);
  const clearResume = useCallback(() => setResume(emptyResume), [setResume]);

  const suggestSummary = useCallback(() => {
    setResume((current) => {
      const stacks = [
        current.skills.frontend,
        current.skills.mobile,
        current.skills.backend,
        current.skills.tools,
        current.skills.others,
      ]
        .filter(Boolean)
        .join(', ');
      const role = current.personal.targetRole || 'profissional de tecnologia';
      const projects =
        current.projects.length > 0
          ? `com projetos em ${current.projects
              .slice(0, 3)
              .map((project) => project.name)
              .join(', ')}`
          : 'com foco em soluções digitais eficientes';

      return {
        ...current,
        summary:
          suggestSummaryWithAI(current) ||
          `${role} com experiência prática no desenvolvimento de aplicações modernas, responsivas e orientadas a resultados. Atua com ${stacks || 'tecnologias web, boas práticas de desenvolvimento e versionamento'}, ${projects}. Perfil organizado, colaborativo e preparado para contribuir em times de produto e tecnologia.`,
      };
    });
  }, [setResume]);

  const createResume = useCallback(() => {
    const document = createDocument(emptyResume, 'Novo curriculo');
    setDocuments((current) => [...current, document]);
    setActiveDocumentId(document.id);
    return document.id;
  }, []);

  const createResumeFromData = useCallback((data: ResumeData, name?: string) => {
    const document = createDocument(data, name || data.personal.fullName || 'Curriculo importado');
    setDocuments((current) => [...current, document]);
    setActiveDocumentId(document.id);
    return document.id;
  }, []);

  const duplicateResume = useCallback(() => {
    const document = createDocument(activeDocument.data, `${activeDocument.name} - copia`);
    setDocuments((current) => [...current, document]);
    setActiveDocumentId(document.id);
  }, [activeDocument.data, activeDocument.name]);

  const duplicateResumeById = useCallback((id: string) => {
    const source = documents.find((document) => document.id === id);
    if (!source) return;

    const document = createDocument(source.data, `${source.name} - copia`);
    setDocuments((current) => [...current, document]);
    setActiveDocumentId(document.id);
  }, [documents]);

  const deleteResume = useCallback((id: string) => {
    setDocuments((current) => {
      if (current.length === 1) return current;
      const next = current.filter((document) => document.id !== id);
      if (activeDocumentId === id) {
        setActiveDocumentId(next[0]?.id || '');
      }
      return next;
    });
  }, [activeDocumentId]);

  const selectResume = useCallback((id: string) => setActiveDocumentId(id), []);

  const toggleFavorite = useCallback((id: string) => {
    setDocuments((current) =>
      current.map((document) =>
        document.id === id ? { ...document, favorite: !document.favorite } : document,
      ),
    );
  }, []);

  const exportJson = useCallback(() => {
    const payload = JSON.stringify({ document: activeDocument }, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeDocument.name.replace(/[^a-z0-9]+/gi, '_') || 'curriculo'}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [activeDocument]);

  const importJson = useCallback(async (file: File) => {
    const text = await file.text();
    const parsed = JSON.parse(text) as { document?: ResumeDocument; data?: ResumeData };
    const imported = parsed.document
      ? { ...parsed.document, id: crypto.randomUUID(), updatedAt: new Date().toISOString() }
      : createDocument(parsed.data ?? sampleResume, file.name.replace(/\.json$/i, ''));

    setDocuments((current) => [...current, imported]);
    setActiveDocumentId(imported.id);
  }, []);

  const value = useMemo(
    () => ({
      resume,
      setResume,
      documents,
      activeDocumentId: activeDocument.id,
      updateSection,
      resetToSample,
      clearResume,
      suggestSummary,
      createResume,
      createResumeFromData,
      duplicateResume,
      duplicateResumeById,
      deleteResume,
      selectResume,
      toggleFavorite,
      exportJson,
      importJson,
    }),
    [
      activeDocument.id,
      clearResume,
      createResume,
      createResumeFromData,
      documents,
      duplicateResume,
      duplicateResumeById,
      deleteResume,
      exportJson,
      importJson,
      resetToSample,
      resume,
      selectResume,
      setResume,
      suggestSummary,
      toggleFavorite,
      updateSection,
    ],
  );

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used inside ResumeProvider');
  }
  return context;
}
