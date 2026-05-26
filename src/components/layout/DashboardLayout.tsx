import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-950 lg:flex">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <Topbar />
        <main className="mx-auto max-w-[1760px] px-5 py-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
