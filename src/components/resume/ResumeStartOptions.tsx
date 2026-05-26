import { FilePlus2, Loader2, UploadCloud } from 'lucide-react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { useResume } from '../../context/ResumeContext';
import { analyzeResumeWithAI } from '../../services/aiResumeService';
import { extractResumeText, parseResumeText } from '../../services/resumeImportService';

export function ResumeStartOptions() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { createResume, createResumeFromData } = useResume();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const startBlank = () => {
    const id = createResume();
    navigate(`/curriculos/editar/${id}`, { replace: true });
  };

  const importFile = async (file: File) => {
    setError('');
    setLoading(true);
    try {
      const rawText = await extractResumeText(file);
      const draft = parseResumeText(rawText, file.name);
      const data = await analyzeResumeWithAI(rawText, draft);
      const id = createResumeFromData(data, data.personal.fullName || file.name.replace(/\.[^.]+$/, ''));
      navigate(`/curriculos/editar/${id}`, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível importar o currículo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto grid max-w-5xl gap-5">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-700">Novo currículo</p>
        <h1 className="mt-2 text-3xl font-black">Como você quer começar?</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Crie um formulário limpo do zero ou importe um currículo existente para preencher os campos automaticamente.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="p-6">
          <div className="grid h-12 w-12 place-items-center rounded-lg bg-slate-950 text-white">
            <FilePlus2 size={22} />
          </div>
          <h2 className="mt-5 text-xl font-black">Começar em branco</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Abre o editor com todos os campos vazios, ideal para montar uma versão nova para uma vaga específica.
          </p>
          <button
            type="button"
            onClick={startBlank}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-emerald-600 px-4 py-3 text-sm font-black text-white hover:bg-emerald-700"
          >
            Criar em branco
          </button>
        </Card>

        <Card className="p-6">
          <div className="grid h-12 w-12 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
            <UploadCloud size={23} />
          </div>
          <h2 className="mt-5 text-xl font-black">Importar currículo</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Envie PDF, DOCX, JPG, JPEG ou PNG. O sistema lê o conteúdo e preenche nome, contatos, resumo, experiências e habilidades.
          </p>
          <button
            type="button"
            disabled={loading}
            onClick={() => inputRef.current?.click()}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-800 hover:border-slate-950 disabled:cursor-wait disabled:opacity-70"
          >
            {loading ? <Loader2 size={17} className="animate-spin" /> : <UploadCloud size={17} />}
            {loading ? 'IA analisando currículo...' : 'Selecionar arquivo'}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.docx,.jpg,.jpeg,.png,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void importFile(file);
              event.target.value = '';
            }}
          />
        </Card>
      </div>

      {error ? <div className="rounded-md bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</div> : null}
    </div>
  );
}
