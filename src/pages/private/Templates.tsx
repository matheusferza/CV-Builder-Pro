import { LayoutSelector } from '../../components/LayoutSelector';
import { ThemeSwitcher } from '../../components/ThemeSwitcher';
import { DynamicResumeRenderer } from '../../components/DynamicResumeRenderer';

export function Templates() {
  return (
    <div className="grid gap-5">
      <div>
        <h1 className="text-3xl font-black">Templates</h1>
        <p className="mt-1 text-slate-600">Escolha e personalize estilos profissionais para seus currículos.</p>
      </div>
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1fr]">
        <div className="space-y-4">
          <LayoutSelector />
          <ThemeSwitcher />
        </div>
        <div className="preview-stage overflow-x-auto rounded-lg border border-slate-200 bg-slate-200/60 p-4">
          <DynamicResumeRenderer />
        </div>
      </div>
    </div>
  );
}
