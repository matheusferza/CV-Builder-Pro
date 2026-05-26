import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAuth } from '../../context/AuthContext';

export function LoginForm() {
  const { login, recoverPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (!email.includes('@') || password.length < 6) {
      setError('Informe um e-mail válido e senha com pelo menos 6 caracteres.');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      navigate((location.state as { from?: string } | null)?.from || '/dashboard', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível entrar.');
    } finally {
      setLoading(false);
    }
  };

  const recover = async () => {
    setError('');
    setStatus('');
    if (!email.includes('@')) {
      setError('Digite seu e-mail antes de recuperar a senha.');
      return;
    }

    setLoading(true);
    try {
      setStatus(await recoverPassword(email));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível recuperar a senha.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="grid gap-4">
      <Input label="E-mail" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      <Input label="Senha" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      {error ? <div className="rounded-md bg-red-50 px-3 py-2 text-sm font-bold text-red-700">{error}</div> : null}
      {status ? <div className="rounded-md bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-700">{status}</div> : null}
      <Button type="submit" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</Button>
      <div className="flex items-center justify-between text-sm font-bold">
        <button type="button" onClick={recover} className="text-slate-500 hover:text-slate-950">
          Recuperar senha
        </button>
        <Link to="/register" className="text-emerald-700 hover:text-emerald-900">
          Criar conta
        </Link>
      </div>
    </form>
  );
}
