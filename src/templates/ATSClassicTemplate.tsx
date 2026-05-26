import { getContacts, getThemeStyle, RenderSections, templateClass, type TemplateProps } from './templateHelpers';

export function ATSClassicTemplate({ resume, theme }: TemplateProps) {
  return (
    <article
      id="resume-preview"
      className={templateClass('ats-clean-template', theme)}
      style={getThemeStyle(theme)}
    >
      <header className="resume-centered-header">
        <h1>{resume.personal.fullName || 'Seu Nome'}</h1>
        <p>{resume.personal.targetRole || 'Cargo desejado'}</p>
        <small>{getContacts(resume).join(' | ')}</small>
      </header>
      <main>
        <RenderSections resume={resume} theme={theme} />
      </main>
    </article>
  );
}
