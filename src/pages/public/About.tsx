import { Card } from '../../components/ui/Card';

export function About() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
      <h1 className="text-4xl font-black">Sobre o CV Builder Pro</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
        Uma plataforma para criar currículos de tecnologia com estrutura limpa, personalização premium e foco em produtividade.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {['ATS-friendly', 'Templates escaláveis', 'Preparado para IA'].map((title) => (
          <Card key={title}>
            <h2 className="text-lg font-black">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Construído para evoluir com planos pagos, login social, histórico e geração inteligente.</p>
          </Card>
        ))}
      </div>
    </main>
  );
}
