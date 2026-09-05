import { useState, lazy, Suspense } from 'react';
import { ThemeProvider } from './hooks/useTheme';
import { ToastProvider } from './hooks/useToast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WorkflowProvider } from './context/WorkflowContext';
import { PublicRouterProvider } from './router/PublicRouter';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { ToastContainer } from './components/ui/Toast';
import { Header } from './layouts/Header';
import { Footer } from './layouts/Footer';

import { PublicAppContainer } from './pages/public/PublicAppContainer';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';
import { VerifyEmailPage } from './pages/auth/VerifyEmailPage';
import { PendingApprovalPage } from './pages/auth/PendingApprovalPage';

const StudentLayout = lazy(() => import('./layouts/StudentLayout').then(m => ({ default: m.StudentLayout as React.FC<{ initialTab?: string }> })));
const CareerCenterLayout = lazy(() => import('./layouts/CareerCenterLayout').then(m => ({ default: m.CareerCenterLayout as React.FC<{ initialTab?: string }> })));
const EmployerAtsPage = lazy(() => import('./pages/employer/EmployerAtsPage').then(m => ({ default: m.EmployerAtsPage })));
const EmployerCreateJobPage = lazy(() => import('./pages/employer/EmployerCreateJobPage').then(m => ({ default: m.EmployerCreateJobPage })));
const EmployerProfilePage = lazy(() => import('./pages/employer/EmployerProfilePage').then(m => ({ default: m.EmployerProfilePage })));

const RouteFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center p-8">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-4 border-burgundy-700 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-sm font-bold text-slate-600 dark:text-slate-400">KTÜN Portal Yükleniyor...</p>
    </div>
  </div>
);

import { Modal } from './components/ui/Modal';
import { Button } from './components/ui/Button';

export function MainRouterContent() {
  const getInitialView = () => {
    if (typeof window === 'undefined') return 'public';
    return sessionStorage.getItem('ktun_current_view') || 'public';
  };

  const [currentView, setCurrentView] = useState<string>(getInitialView);
  const [activeSubTab, setActiveSubTab] = useState<string | undefined>(undefined);
  const [loginRequiredAction, setLoginRequiredAction] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();

  const handleRoleChange = (role: string, subTab?: string) => {
    setCurrentView(role);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('ktun_current_view', role);
    }
    if (subTab) {
      setActiveSubTab(subTab);
    } else {
      setActiveSubTab(undefined);
    }
  };

  return (
    <PublicRouterProvider onOpenLoginModal={(action) => setLoginRequiredAction(action || 'Bu işlemi gerçekleştirmek')}>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        {/* Top Development & Role Switcher Bar */}
        <div className="bg-slate-900 text-white text-xs py-2 px-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 z-50 sticky top-0">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-burgundy-400">KTÜN Kariyer Portalı:</span>
            <span className="text-slate-300 font-semibold text-[11px]">
              {isAuthenticated ? (
                <span className="text-emerald-400 font-bold">
                  ✓ Oturum Açık: {user?.fullName} ({user?.role === 'Student' ? 'Öğrenci' : user?.role === 'Employer' ? 'İşveren' : user?.role === 'CareerCenter' ? 'Kariyer Merkezi' : user?.role})
                </span>
              ) : (
                <span className="text-amber-400 font-bold">🔒 Oturum Kapalı</span>
              )}
            </span>
            <span className="ml-2 px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-extrabold text-[10px] border border-emerald-800">
              ⚡ Sistem Aktif
            </span>
          </div>

          <div className="flex items-center flex-wrap gap-1.5 text-[11px]">
            <button
              onClick={() => handleRoleChange('public')}
              className={`px-2.5 py-1 rounded font-bold transition-colors ${currentView === 'public' ? 'bg-burgundy-700 text-white' : 'bg-slate-800 text-slate-300'}`}
            >
              🏛️ Genel Görünüm
            </button>
            <button
              onClick={() => handleRoleChange('login')}
              className={`px-2.5 py-1 rounded font-bold transition-colors ${currentView === 'login' ? 'bg-burgundy-700 text-white' : 'bg-slate-800 text-slate-300'}`}
            >
              🔑 Giriş Ekranı
            </button>
            <button
              onClick={() => handleRoleChange('student')}
              className={`px-2.5 py-1 rounded font-bold transition-colors ${currentView === 'student' ? 'bg-burgundy-700 text-white' : 'bg-slate-800 text-slate-300'}`}
            >
              🎓 Öğrenci Paneli
            </button>
            <button
              onClick={() => handleRoleChange('employer')}
              className={`px-2.5 py-1 rounded font-bold transition-colors ${currentView === 'employer' ? 'bg-burgundy-700 text-white' : 'bg-slate-800 text-slate-300'}`}
            >
              🏢 İşveren Paneli
            </button>
            <button
              onClick={() => handleRoleChange('career-center')}
              className={`px-2.5 py-1 rounded font-bold transition-colors ${currentView === 'career-center' ? 'bg-burgundy-700 text-white' : 'bg-slate-800 text-slate-300'}`}
            >
              🏛️ Yönetici Paneli
            </button>
          </div>
        </div>

        {/* Global Persistent Header */}
        <Header currentView={currentView} onRoleChange={handleRoleChange} />

        {/* Dynamic Route & Layout View */}
        <main className="flex-1">
          <Suspense fallback={<RouteFallback />}>
            {currentView === 'public' && <PublicAppContainer />}
            {currentView === 'login' && (
              <LoginPage
                onSuccessRoleRedirect={handleRoleChange}
                onNavigateRegister={() => handleRoleChange('register')}
                onNavigateForgotPassword={() => handleRoleChange('forgot-password')}
              />
            )}
            {currentView === 'register' && <RegisterPage onNavigateLogin={() => handleRoleChange('login')} onNavigatePendingApproval={() => handleRoleChange('pending-approval')} />}
            {currentView === 'forgot-password' && <ForgotPasswordPage onNavigateLogin={() => handleRoleChange('login')} />}
            {currentView === 'reset-password' && <ResetPasswordPage onNavigateLogin={() => handleRoleChange('login')} />}
            {currentView === 'verify-email' && <VerifyEmailPage onNavigateLogin={() => handleRoleChange('login')} />}
            {currentView === 'pending-approval' && <PendingApprovalPage onNavigateHome={() => handleRoleChange('public')} />}

            {currentView === 'student' && (
              <div className="max-w-1440 mx-auto px-4 md:px-8 py-8">
                <ProtectedRoute allowedRoles={['Student', 'Alumni']}>
                  <StudentLayout initialTab={activeSubTab as any} />
                </ProtectedRoute>
              </div>
            )}

            {(currentView === 'employer' || currentView === 'employer-ats') && (
              <div className="max-w-1440 mx-auto px-4 md:px-8 py-8">
                <ProtectedRoute allowedRoles={['Employer']}>
                  <EmployerAtsPage onNavigate={(view) => handleRoleChange(view)} />
                </ProtectedRoute>
              </div>
            )}

            {currentView === 'employer-create-job' && (
              <div className="max-w-1440 mx-auto px-4 md:px-8 py-8">
                <ProtectedRoute allowedRoles={['Employer']}>
                  <EmployerCreateJobPage onNavigate={(view) => handleRoleChange(view)} />
                </ProtectedRoute>
              </div>
            )}

            {currentView === 'employer-profile' && (
              <div className="max-w-1440 mx-auto px-4 md:px-8 py-8">
                <ProtectedRoute allowedRoles={['Employer']}>
                  <EmployerProfilePage onNavigate={(view) => handleRoleChange(view)} />
                </ProtectedRoute>
              </div>
            )}

            {currentView === 'career-center' && (
              <div className="max-w-1440 mx-auto px-4 md:px-8 py-8">
                <ProtectedRoute allowedRoles={['CareerCenter']}>
                  <CareerCenterLayout initialTab={activeSubTab as any} />
                </ProtectedRoute>
              </div>
            )}
          </Suspense>
        </main>
        {loginRequiredAction && (
          <Modal
            isOpen={!!loginRequiredAction}
            onClose={() => setLoginRequiredAction(null)}
            title="Giriş Yapılması Gerekiyor"
          >
            <div className="space-y-4 text-xs">
              <p className="text-slate-600 dark:text-slate-300">
                {loginRequiredAction} için lütfen KTÜN Kariyer Portalı hesabınızla giriş yapınız veya kayıt olunuz.
              </p>
              <div className="flex justify-end gap-2 pt-2 border-t">
                <Button variant="outline" size="sm" onClick={() => setLoginRequiredAction(null)}>Vazgeç</Button>
                <Button variant="primary" size="sm" onClick={() => {
                  setLoginRequiredAction(null);
                  setCurrentView('login');
                }}>Giriş Ekranına Git</Button>
              </div>
            </div>
          </Modal>
        )}

        {/* Global Persistent Footer */}
        <Footer />
      </div>
    </PublicRouterProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <WorkflowProvider>
            <MainRouterContent />
            <ToastContainer />
          </WorkflowProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
