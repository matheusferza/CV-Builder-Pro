import { useResume } from '../context/ResumeContext';
import type { Skills } from '../types/resume';
import { Panel, Textarea } from './FormControls';

const skillFields: Array<[keyof Skills, string]> = [
  ['frontend', 'Front-End'],
  ['mobile', 'Mobile'],
  ['backend', 'Back-End & Banco de Dados'],
  ['tools', 'Ferramentas'],
  ['others', 'Outros conhecimentos'],
];

export function SkillsForm() {
  const { resume, updateSection } = useResume();

  return (
    <Panel title="Habilidades Técnicas">
      <div className="grid gap-3 sm:grid-cols-2">
        {skillFields.map(([key, label]) => (
          <Textarea
            key={key}
            label={label}
            value={resume.skills[key]}
            onChange={(event) =>
              updateSection('skills', { ...resume.skills, [key]: event.target.value })
            }
            placeholder="Separe por vírgulas"
          />
        ))}
      </div>
    </Panel>
  );
}
