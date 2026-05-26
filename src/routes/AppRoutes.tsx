import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { PublicLayout } from '../components/layout/PublicLayout';
import { Dashboard } from '../pages/private/Dashboard';
import { ResumeEditor } from '../pages/private/ResumeEditor';
import { Resumes } from '../pages/private/Resumes';
import { Settings } from '../pages/private/Settings';
import { Templates } from '../pages/private/Templates';
import { About } from '../pages/public/About';
import { Contact } from '../pages/public/Contact';
import { Home } from '../pages/public/Home';
import { Login } from '../pages/public/Login';
import { Pricing } from '../pages/public/Pricing';
import { Register } from '../pages/public/Register';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="sobre" element={<About />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="planos" element={<Pricing />} />
        <Route path="contact" element={<Contact />} />
        <Route path="contato" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
        <Route path="curriculos" element={<Resumes />} />
        <Route path="curriculos/novo" element={<ResumeEditor mode="new" />} />
        <Route path="curriculos/editar/:id" element={<ResumeEditor mode="edit" />} />
        <Route path="resumes" element={<Navigate to="/curriculos" replace />} />
        <Route path="resumes/new" element={<Navigate to="/curriculos/novo" replace />} />
        <Route path="resumes/:id/edit" element={<ResumeEditor mode="edit" />} />
        <Route path="templates" element={<Templates />} />
        <Route path="configuracoes" element={<Settings />} />
        <Route path="settings" element={<Navigate to="/configuracoes" replace />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
