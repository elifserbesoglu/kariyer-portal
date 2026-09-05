import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { setPageTitle } from '../../utils/seo';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { Mail, ArrowLeft, Send } from 'lucide-react';

export const ForgotPasswordPage: React.FC<{ onNavigateLogin?: () => void }> = ({ onNavigateLogin }) => {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setPageTitle('Şifremi Unuttum', 'Şifre sıfırlama talebi oluşturma ekranı.');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await forgotPassword(email);
    setIsSubmitting(false);
    setMsg(result.message);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 text-center">
          <div className="w-14 h-14 rounded-full bg-burgundy-50 dark:bg-burgundy-950/50 text-burgundy-700 flex items-center justify-center mx-auto shadow-sm">
            <Mail className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Şifrenizi mi Unuttunuz?
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Sistemde kayıtlı e-posta adresinizi giriniz. Sıfırlama bağlantısı e-postanıza iletilecektir.
            </p>
          </div>

          {msg && <Alert variant="success" title="Bilgilendirme">{msg}</Alert>}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <Input
              label="E-Posta Adresi"
              type="email"
              required
              placeholder="eposta@ktun.edu.tr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isSubmitting}
              leftIcon={<Send className="w-4 h-4" />}
            >
              Sıfırlama Bağlantısı Gönder
            </Button>
          </form>

          <button
            type="button"
            onClick={onNavigateLogin}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-burgundy-700 transition-colors pt-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Giriş Ekranına Dön
          </button>
        </div>
      </div>
    </div>
  );
};
