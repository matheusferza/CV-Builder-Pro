import { GripVertical, RotateCcw } from 'lucide-react';
import { defaultSectionOrder } from '../data/templates';
import { useResumeTheme } from '../context/ResumeThemeContext';
import type { SectionId } from '../types/resume';
import type { ResumeFont } from '../types/theme';

const fonts: ResumeFont[] = ['Inter', 'Arial', 'Georgia', 'Verdana', 'Times New Roman'];
const sectionLabels: Record<SectionId, string> = {
  summary: 'Resumo',
  experiences: 'Experiência',
  projects: 'Projetos',
  education: 'Formação',
  skills: 'Habilidades',
};

export function ThemeSwitcher() {
  const { theme, updateTheme, resetTheme } = useResumeTheme();

  const reorder = (from: SectionId, to: SectionId) => {
    const next = [...theme.sectionOrder];
    const fromIndex = next.indexOf(from);
    const toIndex = next.indexOf(to);
    next.splice(fromIndex, 1);
    next.splice(toIndex, 0, from);
    updateTheme({ sectionOrder: next });
  };

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black text-slate-950">Personalização</h2>
          <p className="text-sm text-slate-500">Cores, fonte, ritmo e seções.</p>
        </div>
        <button
          type="button"
          title="Restaurar tema"
          onClick={resetTheme}
          className="grid h-9 w-9 place-items-center rounded-md border border-slate-300 text-slate-700 transition hover:bg-slate-50"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-1.5 text-sm font-bold text-slate-700">
            Cor principal
            <input
              type="color"
              value={theme.primaryColor}
              onChange={(event) => updateTheme({ primaryColor: event.target.value })}
              className="h-11 w-full rounded-md border border-slate-300 bg-white p-1"
            />
          </label>
          <label className="grid gap-1.5 text-sm font-bold text-slate-700">
            Cor secundária
            <input
              type="color"
              value={theme.secondaryColor}
              onChange={(event) => updateTheme({ secondaryColor: event.target.value })}
              className="h-11 w-full rounded-md border border-slate-300 bg-white p-1"
            />
          </label>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-1.5 text-sm font-bold text-slate-700">
            Fonte
            <select
              value={theme.fontFamily}
              onChange={(event) => updateTheme({ fontFamily: event.target.value as ResumeFont })}
              className="h-11 rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold"
            >
              {fonts.map((font) => (
                <option key={font}>{font}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-1.5 text-sm font-bold text-slate-700">
            Tamanho da fonte: {theme.fontSize.toFixed(1)}px
            <input
              type="range"
              min="8"
              max="10.8"
              step="0.1"
              value={theme.fontSize}
              onChange={(event) => updateTheme({ fontSize: Number(event.target.value) })}
            />
          </label>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Select
            label="Espaçamento"
            value={theme.spacing}
            options={['compact', 'balanced', 'spacious']}
            onChange={(value) => updateTheme({ spacing: value as typeof theme.spacing })}
          />
          <Select
            label="Títulos"
            value={theme.headingStyle}
            options={['uppercase', 'classic', 'boxed', 'underline']}
            onChange={(value) => updateTheme({ headingStyle: value as typeof theme.headingStyle })}
          />
          <Select
            label="Seções"
            value={theme.sectionStyle}
            options={['lines', 'cards', 'plain', 'accent']}
            onChange={(value) => updateTheme({ sectionStyle: value as typeof theme.sectionStyle })}
          />
          <Select
            label="Bordas"
            value={theme.borderStyle}
            options={['none', 'subtle', 'strong', 'rounded']}
            onChange={(value) => updateTheme({ borderStyle: value as typeof theme.borderStyle })}
          />
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <Toggle
            label="Ícones"
            checked={theme.showIcons}
            onChange={(checked) => updateTheme({ showIcons: checked })}
          />
          <Toggle
            label="Layout compacto"
            checked={theme.compactMode}
            onChange={(checked) => updateTheme({ compactMode: checked })}
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-black text-slate-800">Ordem das seções</p>
            <button
              type="button"
              onClick={() => updateTheme({ sectionOrder: defaultSectionOrder })}
              className="text-xs font-bold text-slate-500 hover:text-slate-950"
            >
              Restaurar ordem
            </button>
          </div>
          <div className="space-y-2">
            {theme.sectionOrder.map((section) => (
              <div
                key={section}
                draggable
                onDragStart={(event) => event.dataTransfer.setData('text/plain', section)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => reorder(event.dataTransfer.getData('text/plain') as SectionId, section)}
                className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700"
              >
                <GripVertical size={16} className="text-slate-400" />
                {sectionLabels[section]}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-1.5 text-sm font-bold text-slate-700">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700">
      {label}
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-5 w-5 accent-emerald-600"
      />
    </label>
  );
}
