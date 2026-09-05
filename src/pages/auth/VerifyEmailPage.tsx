import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { setPageTitle } from '../../utils/seo';
import { Button } from '../../components/ui/Button';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export const VerifyEmailPage: React.FC<{ onNavigateLogin?: () => void }> = ({ onNavigateLogin }) => {
  const { verifyEmail } = useAuth();
  const [statusMsg, setStatusMsg] = useState('E-posta adresiniz doğrulanıyor...');
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    setPageTitle('E-Posta Doğrulama', 'Hesap e-posta aktivasyon onay ekranı.');
    verifyEmail('token-123').then((res) => {
      setStatusMsg(res.message);
      setIsVerified(true);
    });
  }, []);

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              E-Posta Doğrulama
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {statusMsg}
            </p>
          </div>

          {isVerified && (
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={onNavigateLogin}
              leftIcon={<CheckCircle2 className="w-4 h-4" />}
            >
              Giriş Ekranına İlerle
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
