import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAuth } from '../../context/AuthContext';

export function RegisterForm() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (name.trim().length < 2 || !email.includes('@') || password.length < 6) {
      setError('Preencha nome, e-mail válido e senha com pelo menos 6 caracteres.');
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível cadastrar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="grid gap-4">
      <Input label="Nome" value={name} onChange={(event) => setName(event.target.value)} />
      <Input label="E-mail" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      <Input label="Senha" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      {error ? <div className="rounded-md bg-red-50 px-3 py-2 text-sm font-bold text-red-700">{error}</div> : null}
      <Button type="submit" disabled={loading}>{loading ? 'Criando conta...' : 'Criar conta'}</Button>
      <p className="text-center text-sm font-semibold text-slate-500">
        Já tem conta? <Link to="/login" className="text-emerald-700">Entrar</Link>
      </p>
    </form>
  );
}
