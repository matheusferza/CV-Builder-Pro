import { LoginForm } from '../../components/auth/LoginForm';
import { Card } from '../../components/ui/Card';

export function Login() {
  return (
    <main className="mx-auto grid min-h-[calc(100vh-73px)] max-w-6xl items-center gap-8 px-5 py-12 sm:px-8 lg:grid-cols-2">
      <div>
        <h1 className="text-4xl font-black">Entre no seu workspace</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">Acesse seus currículos, templates favoritos e configurações salvas.</p>
      </div>
      <Card>
        <LoginForm />
      </Card>
    </main>
  );
}
