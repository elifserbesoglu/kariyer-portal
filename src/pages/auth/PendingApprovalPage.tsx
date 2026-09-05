import React, { useEffect } from 'react';
import { setPageTitle } from '../../utils/seo';
import { Button } from '../../components/ui/Button';
import { Clock, ArrowLeft } from 'lucide-react';

export const PendingApprovalPage: React.FC<{ onNavigateHome?: () => void }> = ({ onNavigateHome }) => {
  useEffect(() => {
    setPageTitle('Onay Bekliyor', 'İşveren hesabı kurumsal onay inceleme ekranı.');
  }, []);

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center mx-auto shadow-sm animate-pulse">
            <Clock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-amber-700 bg-amber-100 dark:bg-amber-950 px-2.5 py-1 rounded-full">
              DURUM: ONAY BEKLİYOR
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Kurumsal Hesabınız İnceleniyor
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              İşveren hesabınız ve vergi bilgileriniz Konya Teknik Üniversitesi Kariyer Merkezi yöneticileri tarafından incelenmektedir. Onay işlemi tamamlandığında e-posta ile bilgilendirileceksiniz.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border text-xs text-slate-500 space-y-1 text-left">
            <span className="font-bold block text-slate-700 dark:text-slate-300">Ortalama İnceleme Süresi:</span>
            <span>Mesai saatleri içerisinde 1 - 2 iş saati.</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={onNavigateHome}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Ana Sayfaya Dön
          </Button>
        </div>
      </div>
    </div>
  );
};
