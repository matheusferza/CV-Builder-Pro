import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DynamicResumeRenderer } from '../../components/DynamicResumeRenderer';
import { LayoutSelector } from '../../components/LayoutSelector';
import { ResumeStartOptions } from '../../components/resume/ResumeStartOptions';
import { ResumeForm } from '../../components/ResumeForm';
import { ThemeSwitcher } from '../../components/ThemeSwitcher';
import { useResume } from '../../context/ResumeContext';

export function ResumeEditor({ mode }: { mode: 'new' | 'edit' }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { documents, selectResume } = useResume();
  const [mobileView, setMobileView] = useState<'edit' | 'preview'>('edit');

  useEffect(() => {
    if (mode === 'new') {
      return;
    }

    if (id && documents.some((document) => document.id === id)) {
      selectResume(id);
    } else if (id) {
      navigate('/curriculos', { replace: true });
    }
  }, [documents, id, mode, navigate, selectResume]);

  if (mode === 'new') {
    return <ResumeStartOptions />;
  }

  return (
    <div className="grid gap-5">
      <div>
        <h1 className="text-3xl font-black">Editor de currículo</h1>
        <p className="mt-1 text-slate-600">Edição, template e preview ficam separados para trabalhar com foco.</p>
      </div>
      <div className="grid grid-cols-2 rounded-lg border border-slate-200 bg-white p-1 shadow-sm 2xl:hidden">
        <button type="button" onClick={() => setMobileView('edit')} className={`rounded-md px-4 py-2 text-sm font-black ${mobileView === 'edit' ? 'bg-slate-950 text-white' : 'text-slate-600'}`}>Edição</button>
        <button type="button" onClick={() => setMobileView('preview')} className={`rounded-md px-4 py-2 text-sm font-black ${mobileView === 'preview' ? 'bg-slate-950 text-white' : 'text-slate-600'}`}>Preview</button>
      </div>
      <div className="grid gap-8 2xl:grid-cols-[minmax(520px,620px)_minmax(760px,1fr)]">
        <section className={mobileView === 'preview' ? 'hidden 2xl:block' : ''}>
          <div className="space-y-4">
            <LayoutSelector />
            <ThemeSwitcher />
            <ResumeForm />
          </div>
        </section>
        <aside className={`${mobileView === 'edit' ? 'hidden 2xl:block' : ''} 2xl:sticky 2xl:top-24 self-start`}>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-black">Preview A4</h2>
            <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-bold text-slate-600">1 página</span>
          </div>
          <div className="preview-stage overflow-x-auto rounded-xl border border-slate-200 bg-slate-200/70 p-6">
            <DynamicResumeRenderer />
          </div>
        </aside>
      </div>
    </div>
  );
}
