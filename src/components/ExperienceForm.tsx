import { Plus, Trash2 } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import type { Experience } from '../types/resume';
import { Field, Panel, Textarea } from './FormControls';

const createExperience = (): Experience => ({
  id: crypto.randomUUID(),
  company: '',
  role: '',
  period: '',
  bullets: [''],
});

export function ExperienceForm() {
  const { resume, updateSection } = useResume();

  const updateExperience = (id: string, value: Partial<Experience>) => {
    updateSection(
      'experiences',
      resume.experiences.map((experience) =>
        experience.id === id ? { ...experience, ...value } : experience,
      ),
    );
  };

  const updateBullets = (id: string, value: string) => {
    updateExperience(id, {
      bullets: value
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean),
    });
  };

  return (
    <Panel title="Experiência Profissional">
      <div className="space-y-4">
        {resume.experiences.map((experience, index) => (
          <div key={experience.id} className="rounded-md border border-slate-200 bg-slate-50 p-3">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-black text-slate-800">Experiência {index + 1}</p>
              <button
                type="button"
                title="Remover experiência"
                onClick={() =>
                  updateSection(
                    'experiences',
                    resume.experiences.filter((item) => item.id !== experience.id),
                  )
                }
                className="grid h-9 w-9 place-items-center rounded-md border border-slate-300 text-slate-600 transition hover:border-red-300 hover:bg-red-50 hover:text-red-700"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field
                label="Empresa"
                value={experience.company}
                onChange={(event) => updateExperience(experience.id, { company: event.target.value })}
              />
              <Field
                label="Cargo"
                value={experience.role}
                onChange={(event) => updateExperience(experience.id, { role: event.target.value })}
              />
              <Field
                label="Período"
                value={experience.period}
                onChange={(event) => updateExperience(experience.id, { period: event.target.value })}
              />
              <Textarea
                label="Responsabilidades"
                value={experience.bullets.join('\n')}
                onChange={(event) => updateBullets(experience.id, event.target.value)}
                placeholder="Uma responsabilidade por linha"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => updateSection('experiences', [...resume.experiences, createExperience()])}
          className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-800 transition hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-800"
        >
          <Plus size={16} /> Adicionar experiência
        </button>
      </div>
    </Panel>
  );
}
