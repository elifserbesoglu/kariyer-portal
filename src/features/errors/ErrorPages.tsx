import React from 'react';
import { Button } from '../../components/ui/Button';
import { Home, RefreshCw, ShieldAlert, WifiOff, Lock, AlertOctagon } from 'lucide-react';

export const Error404: React.FC<{ onGoHome?: () => void }> = ({ onGoHome }) => (
  <div className="flex flex-col items-center justify-center text-center py-16 px-4 space-y-5">
    <div className="w-24 h-24 rounded-3xl bg-burgundy-50 dark:bg-burgundy-950/50 text-burgundy-700 dark:text-burgundy-400 flex items-center justify-center text-4xl font-extrabold shadow-sm border border-burgundy-100 dark:border-burgundy-900">
      404
    </div>
    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Sayfa Bulunamadı</h2>
    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
      Aradığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanım dışı kalmış olabilir.
    </p>
    <Button variant="primary" leftIcon={<Home className="w-4 h-4" />} onClick={onGoHome}>
      Ana Sayfaya Dön
    </Button>
  </div>
);

export const Error403: React.FC<{ onGoHome?: () => void }> = ({ onGoHome }) => (
  <div className="flex flex-col items-center justify-center text-center py-16 px-4 space-y-5">
    <div className="w-20 h-20 rounded-3xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-sm border border-amber-100 dark:border-amber-900">
      <ShieldAlert className="w-10 h-10" />
    </div>
    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">403 - Erişim Engellendi</h2>
    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
      Bu sayfayı görüntülemek için gerekli yetkilere sahip değilsiniz.
    </p>
    <Button variant="primary" leftIcon={<Home className="w-4 h-4" />} onClick={onGoHome}>
      Ana Sayfaya Dön
    </Button>
  </div>
);

export const Error500: React.FC<{ onRetry?: () => void }> = ({ onRetry }) => (
  <div className="flex flex-col items-center justify-center text-center py-16 px-4 space-y-5">
    <div className="w-20 h-20 rounded-3xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center shadow-sm border border-red-100 dark:border-red-900">
      <AlertOctagon className="w-10 h-10" />
    </div>
    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">500 - Sunucu Hatası</h2>
    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
      Sistemde geçici bir teknik aksaklık meydana geldi. Lütfen biraz sonra tekrar deneyiniz.
    </p>
    <Button variant="primary" leftIcon={<RefreshCw className="w-4 h-4" />} onClick={onRetry}>
      Tekrar Dene
    </Button>
  </div>
);

export const ErrorNoInternet: React.FC<{ onRetry?: () => void }> = ({ onRetry }) => (
  <div className="flex flex-col items-center justify-center text-center py-16 px-4 space-y-5">
    <div className="w-20 h-20 rounded-3xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center shadow-sm border border-slate-200 dark:border-slate-700">
      <WifiOff className="w-10 h-10" />
    </div>
    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">İnternet Bağlantısı Yok</h2>
    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
      Lütfen ağ bağlantınızı kontrol edip tekrar deneyiniz.
    </p>
    <Button variant="secondary" leftIcon={<RefreshCw className="w-4 h-4" />} onClick={onRetry}>
      Yenile
    </Button>
  </div>
);

export const ErrorUnauthorized: React.FC<{ onLogin?: () => void }> = ({ onLogin }) => (
  <div className="flex flex-col items-center justify-center text-center py-16 px-4 space-y-5">
    <div className="w-20 h-20 rounded-3xl bg-burgundy-50 dark:bg-burgundy-950/50 text-burgundy-700 dark:text-burgundy-400 flex items-center justify-center shadow-sm border border-burgundy-100 dark:border-burgundy-900">
      <Lock className="w-10 h-10" />
    </div>
    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Oturum Açmanız Gerekiyor</h2>
    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
      Bu içeriğe erişmek için KTÜN Kariyer Portalına giriş yapmalısınız.
    </p>
    <Button variant="primary" onClick={onLogin}>
      Giriş Yap
    </Button>
  </div>
);
