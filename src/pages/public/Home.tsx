import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <main className="bg-slate-950 text-white">
      <section className="brand-hero relative overflow-hidden">
        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:px-10">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm font-black text-cyan-200">
              CV Builder Pro • Resume SaaS
            </p>
            <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-normal sm:text-6xl">
              Currículos premium com IA, templates e exportação profissional.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Crie, importe, analise e personalize currículos modernos em uma plataforma com dashboard, templates ATS e preview em tempo real.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-md bg-cyan-400 px-5 py-3 text-sm font-black text-slate-950 shadow-[0_0_34px_rgb(14_165_233/0.45)] transition hover:bg-cyan-300"
              >
                Começar agora <ArrowRight size={17} />
              </Link>
              <Link
                to="/planos"
                className="rounded-md border border-white/20 px-5 py-3 text-sm font-black text-white transition hover:border-cyan-300 hover:bg-white/10"
              >
                Ver planos
              </Link>
            </div>
          </div>

          <div className="brand-showcase rounded-2xl border border-cyan-300/20 bg-white/[0.04] p-5 shadow-[0_0_80px_rgb(14_165_233/0.18)] backdrop-blur">
            <img
              src="/brand/logo-cv-builder-pro.png"
              alt="CV Builder Pro"
              className="mx-auto mb-6 h-auto w-full max-w-[620px] rounded-xl opacity-95"
            />
            <div className="rounded-xl border border-white/10 bg-slate-950/70 p-6">
              <div className="mb-5 h-20 rounded-lg border border-cyan-300/20 bg-gradient-to-r from-slate-900 to-sky-950 p-4">
                <p className="text-xl font-black">Matheus Souza</p>
                <p className="text-sm font-bold text-cyan-300">Desenvolvedor Front-End Jr.</p>
              </div>
              {['Editor em tempo real', 'Importação com IA', 'Templates profissionais', 'Dashboard SaaS'].map((item) => (
                <div key={item} className="flex items-center gap-3 border-b border-white/10 py-3 text-sm font-bold text-slate-200">
                  <CheckCircle2 size={18} className="text-cyan-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
