import { Copy, Edit3, FilePlus2, Star, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { useResume } from '../../context/ResumeContext';

export function Resumes() {
  const { documents, duplicateResumeById, deleteResume, toggleFavorite } = useResume();

  return (
    <div className="grid gap-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black">Currículos</h1>
          <p className="mt-1 text-slate-600">Gerencie, duplique e edite suas versões.</p>
        </div>
        <Link to="/curriculos/novo" className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-3 text-sm font-black text-white">
          <FilePlus2 size={17} /> Novo
        </Link>
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="border-b border-slate-200 text-xs uppercase tracking-[0.12em] text-slate-500">
              <tr>
                <th className="py-3">Nome</th>
                <th>Atualização</th>
                <th>Status</th>
                <th className="text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((document) => (
                <tr key={document.id} className="border-b border-slate-100">
                  <td className="py-4 font-black">{document.name}</td>
                  <td>{new Date(document.updatedAt).toLocaleDateString('pt-BR')}</td>
                  <td>{document.favorite ? 'Favorito' : 'Rascunho'}</td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <button type="button" onClick={() => toggleFavorite(document.id)} className="table-action"><Star size={15} fill={document.favorite ? 'currentColor' : 'none'} /></button>
                      <Link to={`/curriculos/editar/${document.id}`} className="table-action"><Edit3 size={15} /></Link>
                      <button type="button" onClick={() => duplicateResumeById(document.id)} className="table-action"><Copy size={15} /></button>
                      <button type="button" onClick={() => deleteResume(document.id)} className="table-action text-red-600"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
