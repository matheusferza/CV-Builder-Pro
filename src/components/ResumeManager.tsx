import { Copy, Download, FilePlus2, Star, Upload } from 'lucide-react';
import { useRef } from 'react';
import { useResume } from '../context/ResumeContext';

export function ResumeManager() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const {
    documents,
    activeDocumentId,
    createResume,
    duplicateResume,
    selectResume,
    toggleFavorite,
    exportJson,
    importJson,
  } = useResume();

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4">
        <h2 className="text-base font-black text-slate-950">Currículos</h2>
        <p className="text-sm text-slate-500">Múltiplas versões salvas automaticamente.</p>
      </div>
      <div className="mb-3 grid gap-2 sm:grid-cols-2">
        <button type="button" onClick={createResume} className="manager-button">
          <FilePlus2 size={16} /> Novo
        </button>
        <button type="button" onClick={duplicateResume} className="manager-button">
          <Copy size={16} /> Duplicar
        </button>
        <button type="button" onClick={exportJson} className="manager-button">
          <Download size={16} /> Exportar JSON
        </button>
        <button type="button" onClick={() => inputRef.current?.click()} className="manager-button">
          <Upload size={16} /> Importar JSON
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="application/json"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void importJson(file);
          event.target.value = '';
        }}
      />
      <div className="space-y-2">
        {documents.map((document) => (
          <div
            key={document.id}
            className={`flex items-center gap-2 rounded-md border p-2 transition ${
              document.id === activeDocumentId ? 'border-slate-950 bg-slate-950 text-white' : 'border-slate-200 bg-slate-50'
            }`}
          >
            <button
              type="button"
              onClick={() => selectResume(document.id)}
              className="min-w-0 flex-1 text-left"
            >
              <p className="truncate text-sm font-black">{document.name}</p>
              <p className={document.id === activeDocumentId ? 'text-xs text-white/60' : 'text-xs text-slate-500'}>
                {new Date(document.updatedAt).toLocaleDateString('pt-BR')}
              </p>
            </button>
            <button
              type="button"
              title="Favoritar"
              onClick={() => toggleFavorite(document.id)}
              className="grid h-9 w-9 place-items-center rounded-md border border-current/20"
            >
              <Star size={16} fill={document.favorite ? 'currentColor' : 'none'} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
