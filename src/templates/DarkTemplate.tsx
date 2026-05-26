import { getContacts, getThemeStyle, RenderSections, templateClass, type TemplateProps } from './templateHelpers';

export function DarkTemplate({ resume, theme }: TemplateProps) {
  return (
    <article
      id="resume-preview"
      className={templateClass('dark-template', theme)}
      style={getThemeStyle(theme, true)}
    >
      <header>
        <span>Premium Resume</span>
        <h1>{resume.personal.fullName || 'Seu Nome'}</h1>
        <p>{resume.personal.targetRole || 'Cargo desejado'}</p>
        <small>{getContacts(resume).join(' | ')}</small>
      </header>
      <main>
        <RenderSections resume={resume} theme={theme} sectionClassName="dark-section" />
      </main>
    </article>
  );
}
