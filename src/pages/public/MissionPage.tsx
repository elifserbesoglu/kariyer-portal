import React, { useEffect } from 'react';
import { setPageTitle } from '../../utils/seo';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { SectionTitle } from '../../components/ui/SectionTitle';
import { Compass, CheckCircle2 } from 'lucide-react';

export const MissionPage: React.FC = () => {
  useEffect(() => {
    setPageTitle('Misyonumuz', 'Konya Teknik Üniversitesi Kariyer Gelişim Merkezi Misyonu.');
  }, []);

  return (
    <div className="space-y-8">
      <Breadcrumb items={[{ label: 'Kurumsal' }, { label: 'Misyon' }]} />

      <SectionTitle title="Misyonumuz" subtitle="Kariyer Merkezimizin Temel Varoluş Amacı" />

      <div className="p-8 md:p-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-4 border-b pb-6">
          <div className="w-16 h-16 rounded-2xl bg-burgundy-50 dark:bg-burgundy-950/50 text-burgundy-700 flex items-center justify-center shrink-0">
            <Compass className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white">Misyon İlkesi</h2>
            <p className="text-xs text-slate-500">Gelişim Odaklı Ulusal ve Uluslararası Kariyer Desteği</p>
          </div>
        </div>

        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          Konya Teknik Üniversitesi öğrencilerinin ve mezunlarının; kişisel ve profesyonel potansiyellerini en üst düzeyde ortaya koymalarını sağlamak, onları küresel rekabet ortamına hazırlamak ve nitelikli insan kaynağı ihtiyacını karşılayacak yenilikçi kariyer planlama hizmetleri sunmaktır.
        </p>

        <div className="space-y-3 pt-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Temel Misyon Hedeflerimiz</h3>
          <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-burgundy-700 shrink-0 mt-0.5" />
              Öğrencilerin öz yetkinliklerini fark etmelerine rehberlik etmek.
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-burgundy-700 shrink-0 mt-0.5" />
              Savunma sanayii ve yüksek teknoloji sektörleri ile nitelikli iş birlikleri kurmak.
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-burgundy-700 shrink-0 mt-0.5" />
              Mezunlarımızın kariyer gelişimlerini sürekli takip ederek mezun ağını güçlendirmek.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
