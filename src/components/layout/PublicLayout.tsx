import { Link, NavLink, Outlet } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';

const links = [
  ['/', 'Home'],
  ['/sobre', 'Sobre'],
  ['/planos', 'Planos'],
  ['/contato', 'Contato'],
];

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <header className="sticky top-0 z-20 border-b border-slate-800/60 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <BrandLogo dark />
          <nav className="hidden items-center gap-6 md:flex">
            {links.map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `text-sm font-bold ${isActive ? 'text-cyan-300' : 'text-slate-300 hover:text-white'}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login" className="rounded-md px-4 py-2 text-sm font-black text-slate-200 hover:bg-white/10">
              Login
            </Link>
            <Link to="/register" className="rounded-md bg-cyan-500 px-4 py-2 text-sm font-black text-slate-950 shadow-[0_0_24px_rgb(14_165_233/0.35)] hover:bg-cyan-300">
              Cadastro
            </Link>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
