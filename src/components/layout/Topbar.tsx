import { Bell, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function Topbar() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-slate-100/90 px-5 py-4 backdrop-blur lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="hidden min-h-11 w-full max-w-md items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-500 md:flex">
          <Search size={17} />
          Buscar currículos, templates ou configurações
        </div>
        <div className="ml-auto flex items-center gap-3">
          <Link to="/curriculos/novo" className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-black text-white hover:bg-emerald-700">
            Novo currículo
          </Link>
          <button type="button" className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 bg-white text-slate-600">
            <Bell size={17} />
          </button>
          <div className="grid h-10 w-10 place-items-center rounded-md bg-slate-950 text-sm font-black text-white">
            {user?.name.slice(0, 1).toUpperCase() || 'U'}
          </div>
        </div>
      </div>
    </header>
  );
}
