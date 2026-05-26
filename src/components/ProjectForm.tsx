import { Plus, Trash2 } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import type { Project } from '../types/resume';
import { Field, Panel, Textarea } from './FormControls';

const createProject = (): Project => ({
  id: crypto.randomUUID(),
  name: '',
  description: '',
  technologies: '',
  link: '',
});

export function ProjectForm() {
  const { resume, updateSection } = useResume();

  const updateProject = (id: string, value: Partial<Project>) => {
    updateSection(
      'projects',
      resume.projects.map((project) => (project.id === id ? { ...project, ...value } : project)),
    );
  };

  return (
    <Panel title="Projetos Relevantes">
      <div className="space-y-4">
        {resume.projects.map((project, index) => (
          <div key={project.id} className="rounded-md border border-slate-200 bg-slate-50 p-3">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-black text-slate-800">Projeto {index + 1}</p>
              <button
                type="button"
                title="Remover projeto"
                onClick={() =>
                  updateSection(
                    'projects',
                    resume.projects.filter((item) => item.id !== project.id),
                  )
                }
                className="grid h-9 w-9 place-items-center rounded-md border border-slate-300 text-slate-600 transition hover:border-red-300 hover:bg-red-50 hover:text-red-700"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field
                label="Nome do projeto"
                value={project.name}
                onChange={(event) => updateProject(project.id, { name: event.target.value })}
              />
              <Field
                label="Tecnologias"
                value={project.technologies}
                onChange={(event) => updateProject(project.id, { technologies: event.target.value })}
              />
              <Textarea
                label="Descrição curta"
                value={project.description}
                onChange={(event) => updateProject(project.id, { description: event.target.value })}
              />
              <Field
                label="Link opcional"
                value={project.link}
                onChange={(event) => updateProject(project.id, { link: event.target.value })}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => updateSection('projects', [...resume.projects, createProject()])}
          className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-800 transition hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-800"
        >
          <Plus size={16} /> Adicionar projeto
        </button>
      </div>
    </Panel>
  );
}
