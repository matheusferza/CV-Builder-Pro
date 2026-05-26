import { RotateCcw, Sparkles, Trash2 } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { ExperienceForm } from './ExperienceForm';
import { ExportButton } from './ExportButton';
import { Field, Panel, Textarea } from './FormControls';
import { ProjectForm } from './ProjectForm';
import { SkillsForm } from './SkillsForm';

export function ResumeForm() {
  const { resume, updateSection, clearResume, resetToSample, suggestSummary } = useResume();

  return (
    <div className="space-y-4">
      <div className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-3">
        <ExportButton />
        <button
          type="button"
          onClick={resetToSample}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 px-4 py-3 text-sm font-bold text-slate-800 transition hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-800"
        >
          <RotateCcw size={17} /> Exemplo
        </button>
        <button
          type="button"
          onClick={clearResume}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 px-4 py-3 text-sm font-bold text-slate-800 transition hover:border-red-300 hover:bg-red-50 hover:text-red-700"
        >
          <Trash2 size={17} /> Limpar dados
        </button>
      </div>

      <Panel title="Dados Pessoais">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field
            label="Nome completo"
            value={resume.personal.fullName}
            onChange={(event) =>
              updateSection('personal', { ...resume.personal, fullName: event.target.value })
            }
          />
          <Field
            label="Cargo desejado"
            value={resume.personal.targetRole}
            onChange={(event) =>
              updateSection('personal', { ...resume.personal, targetRole: event.target.value })
            }
          />
          <Field
            label="Cidade/Estado"
            value={resume.personal.location}
            onChange={(event) =>
              updateSection('personal', { ...resume.personal, location: event.target.value })
            }
          />
          <Field
            label="Telefone"
            value={resume.personal.phone}
            onChange={(event) =>
              updateSection('personal', { ...resume.personal, phone: event.target.value })
            }
          />
          <Field
            label="E-mail"
            type="email"
            value={resume.personal.email}
            onChange={(event) =>
              updateSection('personal', { ...resume.personal, email: event.target.value })
            }
          />
          <Field
            label="LinkedIn"
            value={resume.personal.linkedin}
            onChange={(event) =>
              updateSection('personal', { ...resume.personal, linkedin: event.target.value })
            }
          />
          <Field
            label="GitHub"
            value={resume.personal.github}
            onChange={(event) =>
              updateSection('personal', { ...resume.personal, github: event.target.value })
            }
          />
          <Field
            label="Portfólio"
            value={resume.personal.portfolio}
            onChange={(event) =>
              updateSection('personal', { ...resume.personal, portfolio: event.target.value })
            }
          />
          <Field
            label="Instagram profissional"
            value={resume.personal.instagram}
            onChange={(event) =>
              updateSection('personal', { ...resume.personal, instagram: event.target.value })
            }
          />
        </div>
      </Panel>

      <Panel title="Resumo Profissional">
        <div className="space-y-3">
          <Textarea
            label="Resumo"
            value={resume.summary}
            onChange={(event) => updateSection('summary', event.target.value)}
          />
          <button
            type="button"
            onClick={suggestSummary}
            className="inline-flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-800 transition hover:border-emerald-600 hover:bg-emerald-100"
          >
            <Sparkles size={16} /> Sugerir resumo automaticamente
          </button>
        </div>
      </Panel>

      <ExperienceForm />
      <ProjectForm />

      <Panel title="Formação Acadêmica">
        <div className="grid gap-3 sm:grid-cols-3">
          <Field
            label="Curso"
            value={resume.education.course}
            onChange={(event) =>
              updateSection('education', { ...resume.education, course: event.target.value })
            }
          />
          <Field
            label="Instituição"
            value={resume.education.institution}
            onChange={(event) =>
              updateSection('education', { ...resume.education, institution: event.target.value })
            }
          />
          <Field
            label="Período"
            value={resume.education.period}
            onChange={(event) =>
              updateSection('education', { ...resume.education, period: event.target.value })
            }
          />
        </div>
      </Panel>

      <SkillsForm />
    </div>
  );
}
