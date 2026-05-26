import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { defaultTheme } from '../data/templates';
import type { ResumeTheme } from '../types/theme';

interface ResumeThemeContextValue {
  theme: ResumeTheme;
  updateTheme: (value: Partial<ResumeTheme>) => void;
  resetTheme: () => void;
}

const STORAGE_KEY = 'cv-builder-pro:theme';
const ResumeThemeContext = createContext<ResumeThemeContextValue | undefined>(undefined);

function getInitialTheme(): ResumeTheme {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return defaultTheme;

  try {
    return { ...defaultTheme, ...JSON.parse(stored) };
  } catch {
    return defaultTheme;
  }
}

export function ResumeThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ResumeTheme>(getInitialTheme);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      updateTheme: (next: Partial<ResumeTheme>) =>
        setTheme((current) => ({
          ...current,
          ...next,
        })),
      resetTheme: () => setTheme(defaultTheme),
    }),
    [theme],
  );

  return <ResumeThemeContext.Provider value={value}>{children}</ResumeThemeContext.Provider>;
}

export function useResumeTheme() {
  const context = useContext(ResumeThemeContext);
  if (!context) {
    throw new Error('useResumeTheme must be used inside ResumeThemeProvider');
  }
  return context;
}
