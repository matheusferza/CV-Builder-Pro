import { ArrowRight, FileText, Sparkles } from 'lucide-react';

export function Header() {
  const scrollToBuilder = () => {
    document.getElementById('builder')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-slate-950">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-slate-950 text-white">
              <FileText size={21} />
            </span>
            <div>
              <p className="text-base font-bold">CV Builder Pro</p>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">ATS Resume Studio</p>
            </div>
          </div>
          <button
            type="button"
            onClick={scrollToBuilder}
            className="hidden items-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-950 hover:bg-slate-950 hover:text-white sm:flex"
          >
            Começar <ArrowRight size={16} />
          </button>
        </nav>

        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700">
              <Sparkles size={15} /> Currículos profissionais em uma página
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Crie um currículo moderno, limpo e pronto para triagens ATS.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Preencha suas informações, veja o preview em tempo real e exporte um PDF fiel ao layout profissional.
            </p>
            <button
              type="button"
              onClick={scrollToBuilder}
              className="mt-7 inline-flex items-center gap-2 rounded-md bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700"
            >
              Criar meu currículo <ArrowRight size={17} />
            </button>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
            <div className="rounded-md bg-white p-5 shadow-sm">
              <p className="text-lg font-black text-slate-950">Matheus Souza</p>
              <p className="mt-1 text-sm font-semibold text-emerald-700">Desenvolvedor Front-End Jr.</p>
              <div className="my-4 h-px bg-slate-200" />
              <div className="space-y-2">
                {['Resumo Profissional', 'Experiência Profissional', 'Projetos Relevantes', 'Habilidades Técnicas'].map(
                  (item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                      <span className="text-sm font-semibold text-slate-700">{item}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </header>
  );
}
