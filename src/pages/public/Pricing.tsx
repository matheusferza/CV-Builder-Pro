import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';

const plans: Array<{ name: string; price: string; items: string[] }> = [
  { name: 'Starter', price: 'Grátis', items: ['1 currículo', 'Templates básicos', 'Exportação PDF'] },
  { name: 'Pro', price: 'R$ 19/mês', items: ['Currículos ilimitados', 'Templates premium', 'IA para resumos'] },
  { name: 'Career', price: 'R$ 39/mês', items: ['Histórico de versões', 'Importação LinkedIn', 'Suporte prioritário'] },
];

export function Pricing() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <h1 className="text-4xl font-black">Planos simples para crescer</h1>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {plans.map(({ name, price, items }) => (
          <Card key={name} className={name === 'Pro' ? 'border-slate-950 shadow-lg' : ''}>
            <h2 className="text-xl font-black">{name}</h2>
            <p className="mt-3 text-3xl font-black">{price}</p>
            <div className="mt-5 grid gap-3">
              {items.map((item) => (
                <p key={item} className="flex items-center gap-2 text-sm font-bold text-slate-600">
                  <Check size={16} className="text-emerald-600" /> {item}
                </p>
              ))}
            </div>
            <Link to="/register" className="mt-6 inline-flex w-full justify-center rounded-md bg-slate-950 px-4 py-3 text-sm font-black text-white">
              Escolher plano
            </Link>
          </Card>
        ))}
      </div>
    </main>
  );
}
