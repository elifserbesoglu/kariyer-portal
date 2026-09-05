import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { setPageTitle } from '../../utils/seo';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { KeyRound, CheckCircle2 } from 'lucide-react';

export const ResetPasswordPage: React.FC<{ onNavigateLogin?: () => void }> = ({ onNavigateLogin }) => {
  const { resetPassword } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPageTitle('Şifre Sıfırla', 'Yeni şifre belirleme ekranı.');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError('Şifreler uyuşmamaktadır.');
      return;
    }
    const res = await resetPassword('mock-token', password);
    setMsg(res.message);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 text-center">
          <div className="w-14 h-14 rounded-full bg-burgundy-50 dark:bg-burgundy-950/50 text-burgundy-700 flex items-center justify-center mx-auto shadow-sm">
            <KeyRound className="w-7 h-7" />
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Yeni Şifre Belirleyin
          </h2>

          {error && <Alert variant="error" title="Hata">{error}</Alert>}
          {msg && <Alert variant="success" title="Başarılı">{msg}</Alert>}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <Input
              label="Yeni Şifre"
              type="password"
              required
              placeholder="En az 6 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              label="Yeni Şifre (Tekrar)"
              type="password"
              required
              placeholder="Şifreyi doğrula"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button type="submit" variant="primary" size="lg" fullWidth leftIcon={<CheckCircle2 className="w-4 h-4" />}>
              Şifreyi Güncelle
            </Button>
          </form>

          {msg && (
            <Button variant="outline" size="sm" fullWidth onClick={onNavigateLogin}>
              Giriş Ekranına Git
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
