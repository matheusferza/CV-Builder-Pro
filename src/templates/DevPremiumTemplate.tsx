import { compactUrl, getContacts, getThemeStyle, RenderSections, templateClass, type TemplateProps } from './templateHelpers';

export function DevPremiumTemplate({ resume, theme }: TemplateProps) {
  return (
    <article
      id="resume-preview"
      className={templateClass('dev-premium-template', theme)}
      style={getThemeStyle(theme)}
    >
      <header>
        <div>
          <small>Software Developer Resume</small>
          <h1>{resume.personal.fullName || 'Seu Nome'}</h1>
          <p>{resume.personal.targetRole || 'Cargo desejado'}</p>
        </div>
        <div>
          {getContacts(resume).map((contact) => (
            <span key={contact}>{compactUrl(contact)}</span>
          ))}
        </div>
      </header>
      <main>
        <RenderSections resume={resume} theme={theme} />
      </main>
    </article>
  );
}
