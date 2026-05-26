import type { ResumeData, SectionId, Skills } from '../types/resume';
import type { ResumeTheme } from '../types/theme';
import { Fragment } from 'react';
import type { CSSProperties, ReactNode } from 'react';

export interface TemplateProps {
  resume: ResumeData;
  theme: ResumeTheme;
}

export const skillLabels: Array<[keyof Skills, string]> = [
  ['frontend', 'Front-End'],
  ['mobile', 'Mobile'],
  ['backend', 'Back-End & Banco de Dados'],
  ['tools', 'Ferramentas'],
  ['others', 'Outros'],
];

export function compactUrl(value: string) {
  return value.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

export function getContacts(resume: ResumeData) {
  return [
    resume.personal.location,
    resume.personal.phone,
    resume.personal.email,
    resume.personal.linkedin,
    resume.personal.github,
    resume.personal.portfolio,
    resume.personal.instagram,
  ].filter(Boolean);
}

export function getThemeStyle(theme: ResumeTheme, dark = false): React.CSSProperties {
  const spacing = theme.compactMode
    ? theme.spacing === 'spacious'
      ? 1.05
      : theme.spacing === 'balanced'
        ? 0.92
        : 0.78
    : theme.spacing === 'spacious'
      ? 1.28
      : theme.spacing === 'balanced'
        ? 1.08
        : 0.9;

  return {
    '--resume-primary': theme.primaryColor,
    '--resume-secondary': theme.secondaryColor,
    '--resume-spacing': spacing,
    '--resume-font-size': `${theme.fontSize}px`,
    fontFamily: `${theme.fontFamily}, Arial, sans-serif`,
    color: dark ? '#e5e7eb' : '#111827',
  } as CSSProperties;
}

export function Heading({ children, theme }: { children: ReactNode; theme: ResumeTheme }) {
  const base = 'resume-template-heading';
  const className = `${base} heading-${theme.headingStyle} section-${theme.sectionStyle}`;

  return (
    <h2 className={className}>
      {theme.showIcons ? <span className="heading-icon" /> : null}
      {children}
    </h2>
  );
}

export function templateClass(name: string, theme: ResumeTheme) {
  return `resume-page resume-template ${name} border-${theme.borderStyle}`;
}

export function RenderSections({
  resume,
  theme,
  sectionClassName = '',
}: TemplateProps & { sectionClassName?: string }) {
  const sections: Record<SectionId, React.ReactNode> = {
    summary: (
      <section className={sectionClassName}>
        <Heading theme={theme}>Resumo Profissional</Heading>
        <p>{resume.summary}</p>
      </section>
    ),
    experiences: (
      <section className={sectionClassName}>
        <Heading theme={theme}>Experiência Profissional</Heading>
        <div className="resume-section-stack">
          {resume.experiences.map((experience) => (
            <div key={experience.id}>
              <div className="resume-row">
                <h3>
                  {experience.company} — {experience.role}
                </h3>
                <span>{experience.period}</span>
              </div>
              <ul>
                {experience.bullets.filter(Boolean).map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    ),
    projects: (
      <section className={sectionClassName}>
        <Heading theme={theme}>Projetos Relevantes</Heading>
        <div className="resume-project-grid">
          {resume.projects.map((project) => (
            <div key={project.id} className="resume-project">
              <h3>
                {project.name}
                {project.link ? <span> | {compactUrl(project.link)}</span> : null}
              </h3>
              <p>{project.description}</p>
              <strong>Tecnologias: {project.technologies}</strong>
            </div>
          ))}
        </div>
      </section>
    ),
    education: (
      <section className={sectionClassName}>
        <Heading theme={theme}>Formação</Heading>
        <div className="resume-row">
          <p>
            <strong>{resume.education.course}</strong> — {resume.education.institution}
          </p>
          <span>{resume.education.period}</span>
        </div>
      </section>
    ),
    skills: (
      <section className={sectionClassName}>
        <Heading theme={theme}>Habilidades Técnicas</Heading>
        <div className="resume-skill-list">
          {skillLabels.map(([key, label]) =>
            resume.skills[key] ? (
              <p key={key}>
                <strong>{label}:</strong> {resume.skills[key]}
              </p>
            ) : null,
          )}
        </div>
      </section>
    ),
  };

  return <>{theme.sectionOrder.map((section) => <Fragment key={section}>{sections[section]}</Fragment>)}</>;
}
