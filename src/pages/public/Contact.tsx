import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';

export function Contact() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
      <h1 className="text-4xl font-black">Contato</h1>
      <Card className="mt-8">
        <form className="grid gap-4">
          <Input label="Nome" />
          <Input label="E-mail" type="email" />
          <label className="grid gap-1.5 text-sm font-bold text-slate-700">
            Mensagem
            <textarea className="min-h-32 rounded-md border border-slate-300 p-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100" />
          </label>
          <Button type="button">Enviar mensagem</Button>
        </form>
      </Card>
    </main>
  );
}
