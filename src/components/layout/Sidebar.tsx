import { FileText, LayoutTemplate, LogOut, Settings, Gauge } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BrandLogo } from './BrandLogo';

const nav = [
  { to: '/dashboard', label: 'Dashboard', icon: Gauge },
  { to: '/curriculos', label: 'Currículos', icon: FileText },
  { to: '/templates', label: 'Templates', icon: LayoutTemplate },
  { to: '/configuracoes', label: 'Configurações', icon: Settings },
];

export function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="hidden min-h-screen w-72 shrink-0 border-r border-slate-200 bg-white p-4 lg:flex lg:flex-col">
      <div className="mb-6 px-2">
        <BrandLogo to="/dashboard" />
      </div>
      <nav className="grid gap-1">
        {nav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-black transition ${
                isActive ? 'bg-slate-950 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
      <button
        type="button"
        onClick={logout}
        className="mt-auto flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-black text-slate-600 transition hover:bg-red-50 hover:text-red-700"
      >
        <LogOut size={18} />
        Sair
      </button>
    </aside>
  );
}
