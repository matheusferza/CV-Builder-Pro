import { useResume } from '../context/ResumeContext';
import { useResumeTheme } from '../context/ResumeThemeContext';
import { TemplateEngine } from '../templates/TemplateEngine';

export function DynamicResumeRenderer() {
  const { resume } = useResume();
  const { theme } = useResumeTheme();

  return <TemplateEngine resume={resume} theme={theme} />;
}
