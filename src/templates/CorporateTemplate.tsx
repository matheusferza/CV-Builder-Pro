import { getContacts, getThemeStyle, RenderSections, templateClass, type TemplateProps } from './templateHelpers';

export function CorporateTemplate({ resume, theme }: TemplateProps) {
  return (
    <article
      id="resume-preview"
      className={templateClass('corporate-template', theme)}
      style={getThemeStyle(theme)}
    >
      <header>
        <div>
          <h1>{resume.personal.fullName || 'Seu Nome'}</h1>
          <p>{resume.personal.targetRole || 'Cargo desejado'}</p>
        </div>
        <small>{getContacts(resume).join(' | ')}</small>
      </header>
      <main>
        <RenderSections resume={resume} theme={theme} />
      </main>
    </article>
  );
}
