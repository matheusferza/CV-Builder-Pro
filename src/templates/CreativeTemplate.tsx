import { getContacts, getThemeStyle, RenderSections, templateClass, type TemplateProps } from './templateHelpers';

export function CreativeTemplate({ resume, theme }: TemplateProps) {
  return (
    <article
      id="resume-preview"
      className={templateClass('creative-template', theme)}
      style={getThemeStyle(theme)}
    >
      <header>
        <div className="creative-mark">{resume.personal.fullName.slice(0, 1) || 'C'}</div>
        <div>
          <h1>{resume.personal.fullName || 'Seu Nome'}</h1>
          <p>{resume.personal.targetRole || 'Cargo desejado'}</p>
          <small>{getContacts(resume).join(' | ')}</small>
        </div>
      </header>
      <main>
        <RenderSections resume={resume} theme={theme} sectionClassName="creative-section" />
      </main>
    </article>
  );
}
