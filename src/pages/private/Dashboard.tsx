import { ArrowRight, FileText, LayoutTemplate, Plus, Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { useAuth } from '../../context/AuthContext';
import { useResume } from '../../context/ResumeContext';
import { templates } from '../../data/templates';

export function Dashboard() {
  const { user } = useAuth();
  const { documents } = useResume();
  const recent = [...documents].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 4);

  return (
    <div className="grid gap-6">
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:p-7">
        <div className="grid gap-5 xl:grid-cols-[1fr_auto] xl:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-700">Dashboard</p>
            <h1 className="mt-2 text-3xl font-black tracking-normal">Olá, {user?.name.split(' ')[0] || 'usuário'}</h1>
            <p className="mt-2 max-w-2xl text-slate-600">
              Seu painel de currículos, templates e exportações. Continue de onde parou ou crie uma nova versão para uma vaga específica.
            </p>
          </div>
          <Link
            to="/curriculos/novo"
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-emerald-600 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-700 sm:w-auto"
          >
            <Plus size={17} /> Criar novo currículo
          </Link>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
        <Metric title="Currículos criados" value={documents.length} icon={<FileText size={20} />} />
        <Metric title="Templates disponíveis" value={templates.length} icon={<LayoutTemplate size={20} />} />
        <Metric title="Favoritos" value={documents.filter((document) => document.favorite).length} icon={<Sparkles size={20} />} />
      </div>

      <div className="grid gap-6 2xl:grid-cols-[minmax(0,1.2fr)_minmax(430px,0.8fr)]">
        <Card className="p-5 lg:p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black">Últimos currículos</h2>
              <p className="mt-1 text-sm text-slate-500">Acesse rapidamente as versões recentes.</p>
            </div>
            <Link to="/curriculos" className="shrink-0 text-sm font-black text-emerald-700 hover:text-emerald-900">
              Ver todos
            </Link>
          </div>
          <div className="grid gap-3">
            {recent.map((document) => (
              <Link
                key={document.id}
                to={`/curriculos/editar/${document.id}`}
                className="flex items-center justify-between gap-4 rounded-md border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300 hover:bg-white"
              >
                <div className="min-w-0">
                  <p className="truncate font-black">{document.name}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Atualizado em {new Date(document.updatedAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <ArrowRight size={17} className="shrink-0" />
              </Link>
            ))}
          </div>
        </Card>

        <Card className="p-5 lg:p-6">
          <div className="mb-5">
            <h2 className="text-xl font-black">Templates recomendados</h2>
            <p className="mt-1 text-sm text-slate-500">Modelos para começar com boa estrutura visual.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-1">
            {templates.slice(0, 4).map((template) => (
              <Link
                key={template.id}
                to="/templates"
                className="rounded-md border border-slate-200 p-4 transition hover:border-slate-300 hover:bg-slate-50"
              >
                <div className="mb-3 h-2 w-20 rounded-full" style={{ background: template.accent }} />
                <p className="font-black">{template.name}</p>
                <p className="mt-1 text-sm leading-6 text-slate-500">{template.description}</p>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Metric({ title, value, icon }: { title: string; value: number; icon: ReactNode }) {
  return (
    <Card className="p-5 lg:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-black">{value}</p>
        </div>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-slate-950 text-white">{icon}</span>
      </div>
    </Card>
  );
}
