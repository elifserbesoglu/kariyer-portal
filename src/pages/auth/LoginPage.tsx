import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { setPageTitle } from '../../utils/seo';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import { Alert } from '../../components/ui/Alert';
import { LogIn, Lock, Sparkles } from 'lucide-react';

import { KtunLogo } from '../../components/ui/KtunLogo';

export const LoginPage: React.FC<{
  onNavigateRegister?: () => void;
  onNavigateForgotPassword?: () => void;
  onSuccessRoleRedirect?: (role: string) => void;
}> = ({ onNavigateRegister, onNavigateForgotPassword, onSuccessRoleRedirect }) => {
  const { login, isLoading } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPageTitle('Giriş Yap', 'KTÜN Kariyer Portalı Kullanıcı Giriş Ekranı.');
  }, []);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = await login({ identifier, password, rememberMe });
    if (result.success && result.user) {
      if (result.user.role === 'Employer' && result.user.approvalStatus === 'PendingApproval') {
        if (onSuccessRoleRedirect) onSuccessRoleRedirect('pending-approval');
        return;
      }
      const roleRouteMap: Record<string, string> = {
        Student: 'student',
        Alumni: 'student',
        Employer: 'employer',
        CareerCenter: 'career-center',
      };
      if (onSuccessRoleRedirect) {
        onSuccessRoleRedirect(roleRouteMap[result.user.role] || 'student');
      }
    } else {
      setError(result.error || 'Giriş yapılamadı.');
    }
  };

  const handleQuickFill = (email: string) => {
    setIdentifier(email);
    setPassword('123456');
    setError(null);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-5">
            <Lock className="w-32 h-32 text-burgundy-700" />
          </div>

          <div className="text-center space-y-2 relative z-10">
            <div className="flex justify-center mb-3">
              <KtunLogo size="lg" variant="seal-only" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Portal Girişi
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Kurumsal e-posta veya öğrenci numaranız ile giriş yapabilirsiniz.
            </p>
          </div>

          {error && <Alert variant="error" title="Giriş Hatası">{error}</Alert>}

          <form onSubmit={handleLoginSubmit} className="space-y-4 relative z-10">
            <Input
              label="E-Posta Adresi veya Öğrenci Numarası"
              required
              placeholder="ör. 20120033001 veya eposta@ktun.edu.tr"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />

            <Input
              label="Şifre"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex items-center justify-between text-xs">
              <Checkbox
                label="Beni Hatırla"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />

              <button
                type="button"
                onClick={onNavigateForgotPassword}
                className="font-bold text-burgundy-700 dark:text-burgundy-400 hover:underline"
              >
                Şifremi Unuttum?
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
              leftIcon={<LogIn className="w-4 h-4" />}
            >
              Giriş Yap
            </Button>
          </form>

          {/* Quick Demo Test Accounts Box */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 relative z-10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Hızlı Test Hesapları (Demo):
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-[10px]">
              <button
                type="button"
                onClick={() => handleQuickFill('20120033001')}
                className="p-1.5 bg-slate-50 dark:bg-slate-800/80 rounded-lg text-left hover:bg-burgundy-50 dark:hover:bg-slate-700 transition-colors"
              >
                🎓 <strong>Öğrenci:</strong> Emre Tunç
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('ik@aselsankonya.com.tr')}
                className="p-1.5 bg-slate-50 dark:bg-slate-800/80 rounded-lg text-left hover:bg-burgundy-50 dark:hover:bg-slate-700 transition-colors"
              >
                🏢 <strong>İşveren:</strong> ASELSAN İK
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('kariyer@ktun.edu.tr')}
                className="p-1.5 bg-slate-50 dark:bg-slate-800/80 rounded-lg text-left hover:bg-burgundy-50 dark:hover:bg-slate-700 transition-colors"
              >
                🏛️ <strong>Kariyer Merkezi</strong> (Admin)
              </button>
            </div>
          </div>

          <div className="pt-2 text-center text-xs text-slate-500 relative z-10">
            Hesabınız yok mu?{' '}
            <button
              type="button"
              onClick={onNavigateRegister}
              className="font-bold text-burgundy-700 dark:text-burgundy-400 hover:underline"
            >
              Hemen Kaydolun
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
