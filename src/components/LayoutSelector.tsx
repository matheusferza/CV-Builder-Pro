import { templates } from '../data/templates';
import { useResumeTheme } from '../context/ResumeThemeContext';

export function LayoutSelector() {
  const { theme, updateTheme } = useResumeTheme();

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black text-slate-950">Templates</h2>
          <p className="text-sm text-slate-500">Troque o layout em tempo real.</p>
        </div>
        <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-bold text-slate-600">
          {templates.length} estilos
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {templates.map((template) => {
          const selected = theme.templateId === template.id;

          return (
            <button
              type="button"
              key={template.id}
              onClick={() =>
                updateTheme({
                  templateId: template.id,
                  primaryColor: template.accent,
                })
              }
              className={`group rounded-lg border p-3 text-left transition ${
                selected
                  ? 'border-slate-950 bg-slate-950 text-white shadow-md'
                  : 'border-slate-200 bg-slate-50 text-slate-950 hover:border-slate-400 hover:bg-white'
              }`}
            >
              <div className="mb-3 h-20 rounded-md border border-current/15 bg-white/90 p-2">
                <div className="mb-2 h-2 w-2/3 rounded-full" style={{ background: template.accent }} />
                <div className="space-y-1">
                  <div className="h-1.5 w-full rounded-full bg-slate-300" />
                  <div className="h-1.5 w-4/5 rounded-full bg-slate-200" />
                  <div className="h-1.5 w-5/6 rounded-full bg-slate-200" />
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-black">{template.name}</h3>
                <span className={selected ? 'text-xs text-white/70' : 'text-xs text-slate-500'}>
                  {template.category}
                </span>
              </div>
              <p className={selected ? 'mt-1 text-xs leading-5 text-white/75' : 'mt-1 text-xs leading-5 text-slate-500'}>
                {template.description}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
