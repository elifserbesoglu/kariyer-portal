import React, { useEffect } from 'react';
import { setPageTitle } from '../../utils/seo';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { SectionTitle } from '../../components/ui/SectionTitle';
import { FileText, Users, Building2, Calendar, Award, Compass } from 'lucide-react';

export const CareerCenterPage: React.FC = () => {
  useEffect(() => {
    setPageTitle('Kariyer Merkezi Hizmetleri', 'KTÜN Kariyer Gelişim Merkezi tarafından sunulan akademik ve mesleki hizmetler.');
  }, []);

  const services = [
    { title: 'Kariyer Haritası & Rehberlik', desc: 'Öğrenci ve mezunlarımızın mesleki yetkinlik analizi ve kariyer planlaması.', icon: <Compass className="w-6 h-6 text-burgundy-700" /> },
    { title: 'ATS Uyumlu CV İnceleme', desc: 'Özgeçmişinizin uluslararası standartlara uygunluğunun değerlendirilmesi.', icon: <FileText className="w-6 h-6 text-burgundy-700" /> },
    { title: 'Sanayi & Protokol Yönetimi', desc: 'Savunma ve teknoloji şirketleri ile aday mühendislik ve staj anlaşmaları.', icon: <Building2 className="w-6 h-6 text-burgundy-700" /> },
    { title: 'Kariyer Fuarı & Günleri', desc: 'Yıllık sektör buluşmaları ve stant etkinlikleri organizasyonu.', icon: <Calendar className="w-6 h-6 text-burgundy-700" /> },
    { title: 'Mülakat Hazırlık & Simülasyon', desc: 'Teknik ve İK mülakatlarına hazırlık pratikleri ve geri bildirimleri.', icon: <Award className="w-6 h-6 text-burgundy-700" /> },
    { title: 'Mezun Takip Sistemi', desc: 'KTÜN mezunlarının sektör dağılımlarını ve iş durumlarını izleme.', icon: <Users className="w-6 h-6 text-burgundy-700" /> },
  ];

  return (
    <div className="space-y-8">
      <Breadcrumb items={[{ label: 'Kurumsal' }, { label: 'Kariyer Merkezi' }]} />

      <SectionTitle title="Kariyer Merkezi Hizmetlerimiz" subtitle="Öğrenci ve mezunlarımıza sunduğumuz profesyonel imkanlar" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, idx) => (
          <div key={idx} className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 hover:shadow-card-hover transition-all">
            <div className="w-12 h-12 rounded-xl bg-burgundy-50 dark:bg-burgundy-950/50 flex items-center justify-center">
              {s.icon}
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">{s.title}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
