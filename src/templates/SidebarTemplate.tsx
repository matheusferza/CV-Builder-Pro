import { compactUrl, getContacts, getThemeStyle, RenderSections, skillLabels, templateClass, type TemplateProps } from './templateHelpers';

export function SidebarTemplate({ resume, theme }: TemplateProps) {
  return (
    <article
      id="resume-preview"
      className={templateClass('sidebar-template', theme)}
      style={getThemeStyle(theme)}
    >
      <aside>
        <h1>{resume.personal.fullName || 'Seu Nome'}</h1>
        <p>{resume.personal.targetRole || 'Cargo desejado'}</p>
        <div className="sidebar-block">
          <h2>Contato</h2>
          {getContacts(resume).map((contact) => (
            <span key={contact}>{compactUrl(contact)}</span>
          ))}
        </div>
        <div className="sidebar-block">
          <h2>Skills</h2>
          {skillLabels.map(([key, label]) =>
            resume.skills[key] ? (
              <p key={key}>
                <strong>{label}</strong>
                {resume.skills[key]}
              </p>
            ) : null,
          )}
        </div>
      </aside>
      <main>
        <RenderSections
          resume={{ ...resume, skills: { frontend: '', mobile: '', backend: '', tools: '', others: '' } }}
          theme={theme}
        />
      </main>
    </article>
  );
}
