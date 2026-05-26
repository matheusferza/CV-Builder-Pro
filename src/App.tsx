import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext';
import { ResumeThemeProvider } from './context/ResumeThemeContext';
import { AppRoutes } from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ResumeProvider>
          <ResumeThemeProvider>
            <AppRoutes />
          </ResumeThemeProvider>
        </ResumeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
