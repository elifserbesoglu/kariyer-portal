import React, { useEffect } from 'react';
import { setPageTitle } from '../../utils/seo';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { SectionTitle } from '../../components/ui/SectionTitle';
import { Eye, CheckCircle2 } from 'lucide-react';

export const VisionPage: React.FC = () => {
  useEffect(() => {
    setPageTitle('Vizyonumuz', 'Konya Teknik Üniversitesi Kariyer Gelişim Merkezi Vizyonu.');
  }, []);

  return (
    <div className="space-y-8">
      <Breadcrumb items={[{ label: 'Kurumsal' }, { label: 'Vizyon' }]} />

      <SectionTitle title="Vizyonumuz" subtitle="Gelecek Hedeflerimiz ve Stratejik Ufku" />

      <div className="p-8 md:p-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-4 border-b pb-6">
          <div className="w-16 h-16 rounded-2xl bg-navy-50 dark:bg-navy-950/50 text-navy-900 dark:text-navy-200 flex items-center justify-center shrink-0">
            <Eye className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white">Vizyon İlkemiz</h2>
            <p className="text-xs text-slate-500">Geleceğin Lider Kariyer Merkezi</p>
          </div>
        </div>

        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          Üniversite-sanayi iş birliğinde Türkiye’nin lider kariyer merkezlerinden biri olmak; geliştirdiği dijital altyapı, ulusal/uluslararası ortaklıklar ve yüksek mezun istihdam oranı ile rol model bir araştırma ve uygulama merkezi haline gelmektir.
        </p>

        <div className="space-y-3 pt-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Stratejik Vizyon Hedeflerimiz</h3>
          <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-navy-900 dark:text-navy-400 shrink-0 mt-0.5" />
              Tüm mezunlarımızın ilk 6 ay içerisinde nitelikli istihdama katılımını sağlamak.
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-navy-900 dark:text-navy-400 shrink-0 mt-0.5" />
              Yapay zeka destekli kariyer rehberliği ve dijital portfolyo sistemlerini hayata geçirmek.
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-navy-900 dark:text-navy-400 shrink-0 mt-0.5" />
              Uluslararası staj ve değişim programlarında KTÜN öğrencilerine öncelikli fırsatlar oluşturmak.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
