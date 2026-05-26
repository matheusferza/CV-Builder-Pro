import { compactUrl, getContacts, getThemeStyle, RenderSections, skillLabels, templateClass, type TemplateProps } from './templateHelpers';

export function ModernTemplate({ resume, theme }: TemplateProps) {
  return (
    <article
      id="resume-preview"
      className={templateClass('modern-dev-template', theme)}
      style={getThemeStyle(theme)}
    >
      <header className="modern-hero">
        <div>
          <h1>{resume.personal.fullName || 'Seu Nome'}</h1>
          <p>{resume.personal.targetRole || 'Cargo desejado'}</p>
        </div>
        <div className="modern-contact">
          {getContacts(resume).map((contact) => (
            <span key={contact}>{compactUrl(contact)}</span>
          ))}
        </div>
      </header>
      <div className="tech-strip">
        {skillLabels.slice(0, 4).map(([key]) =>
          resume.skills[key]
            ? resume.skills[key]
                .split(',')
                .slice(0, 3)
                .map((skill) => <span key={`${key}-${skill}`}>{skill.trim()}</span>)
            : null,
        )}
      </div>
      <main>
        <RenderSections resume={resume} theme={theme} />
      </main>
    </article>
  );
}
