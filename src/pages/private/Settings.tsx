import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';
import { getOpenAiKey, saveOpenAiKey } from '../../services/aiResumeService';

export function Settings() {
  const { user } = useAuth();
  const [apiKey, setApiKey] = useState(() => getOpenAiKey());
  const [saved, setSaved] = useState(false);

  const saveKey = () => {
    saveOpenAiKey(apiKey);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="grid gap-5">
      <div>
        <h1 className="text-3xl font-black">Configurações</h1>
        <p className="mt-1 text-slate-600">Preferências da conta, IA e preparação para recursos futuros.</p>
      </div>
      <Card className="max-w-2xl">
        <div className="grid gap-4">
          <Input label="Nome" value={user?.name || ''} readOnly />
          <Input label="E-mail" value={user?.email || ''} readOnly />
          <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
            <h2 className="font-black">IA para currículos</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Opcional: informe uma chave da OpenAI para analisar importações com IA real. Sem chave, o sistema usa análise local inteligente.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
              <Input
                label="OpenAI API Key"
                type="password"
                value={apiKey}
                placeholder="sk-..."
                onChange={(event) => setApiKey(event.target.value)}
              />
              <button
                type="button"
                onClick={saveKey}
                className="self-end rounded-md bg-slate-950 px-4 py-3 text-sm font-black text-white hover:bg-slate-800"
              >
                Salvar chave
              </button>
            </div>
            {saved ? <p className="mt-2 text-sm font-bold text-emerald-700">Chave salva neste navegador.</p> : null}
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
            <h2 className="font-black">Roadmap da conta</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Estrutura pronta para planos pagos, login social, banco de dados real, histórico de versões e IA para otimização de textos.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
