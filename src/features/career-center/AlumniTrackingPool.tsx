import React, { useState } from 'react';
import { StatCard } from '../../components/cards/StatCard';
import { GraduationCap, Search, Award } from 'lucide-react';
import { Input } from '../../components/ui/Input';

export interface AlumniRecord {
  id: string;
  fullName: string;
  graduationYear: string;
  department: string;
  isEmployed: boolean;
  companyName?: string;
  position?: string;
  city?: string;
  country?: string;
  startDate?: string;
  salaryRange?: string;
  workModel?: 'Tam Zamanlı' | 'Uzaktan (Remote)' | 'Hibrit' | 'Yarı Zamanlı';
  wantsToMentor: boolean;
}

export const AlumniTrackingPool: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const [alumniList] = useState<AlumniRecord[]>([
    {
      id: 'alm-1',
      fullName: 'Ahmet Yılmaz',
      graduationYear: '2023',
      department: 'Bilgisayar Mühendisliği',
      isEmployed: true,
      companyName: 'ASELSAN Konya A.Ş.',
      position: 'Kıdemli Gömülü C++ Yazılım Mühendisi',
      city: 'Konya',
      country: 'Türkiye',
      startDate: 'Ocak 2024',
      salaryRange: '50.000 TL - 65.000 TL',
      workModel: 'Tam Zamanlı',
      wantsToMentor: true,
    },
    {
      id: 'alm-2',
      fullName: 'Selin Arslan',
      graduationYear: '2022',
      department: 'Elektrik-Elektronik Mühendisliği',
      isEmployed: true,
      companyName: 'SIEMENS AG',
      position: 'Güç Sistemleri Uzmanı',
      city: 'Münih',
      country: 'Almanya',
      startDate: 'Eylül 2023',
      salaryRange: '3.500 € - 4.500 €',
      workModel: 'Hibrit',
      wantsToMentor: true,
    },
    {
      id: 'alm-3',
      fullName: 'Burak Kaya',
      graduationYear: '2023',
      department: 'Makine Mühendisliği',
      isEmployed: true,
      companyName: 'ROKETSAN',
      position: 'Mekanik Tasarım Mühendisi',
      city: 'Ankara',
      country: 'Türkiye',
      startDate: 'Kasım 2023',
      salaryRange: '45.000 TL - 55.000 TL',
      workModel: 'Tam Zamanlı',
      wantsToMentor: false,
    },
  ]);

  const filteredAlumni = alumniList.filter(
    (a) =>
      a.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.companyName && a.companyName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Kayıtlı Mezun Sayısı" value="12.450" subtitle="Sisteme Entegre" className="border-l-4 border-l-burgundy-700" />
        <StatCard title="İstihdam Oranı" value="%89.4" subtitle="İlk 6 Ayda İşe Başlama" className="border-l-4 border-l-emerald-500" />
        <StatCard title="Yurt Dışı Çalışan" value="480" subtitle="Almanya, Hollanda, ABD" className="border-l-4 border-l-navy-900" />
        <StatCard title="Gönüllü Mezun Mentor" value="340" subtitle="Öğrencilere Destek" className="border-l-4 border-l-amber-500" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-burgundy-700" />
            <span>Mezun İzleme & İstihdam Raporlama Havuzu</span>
          </h2>
          <p className="text-xs text-slate-500">
            KTÜN mezunlarının hangi kurumda, hangi maaş skalası ve çalışma modeliyle çalıştığını takip edin.
          </p>
        </div>

        <div className="w-full sm:w-72">
          <Input
            placeholder="Mezun adı, bölüm veya firma ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4 text-slate-400" />}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAlumni.map((alumni) => (
          <div
            key={alumni.id}
            className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 relative hover:border-burgundy-700 transition-colors"
          >
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{alumni.fullName}</h3>
                <span className="text-xs font-semibold text-burgundy-700 block">{alumni.department} ({alumni.graduationYear} Mezunu)</span>
              </div>
              <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 px-2 py-0.5 rounded-full">
                ✓ İstihdamda
              </span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl text-xs space-y-1.5 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700">
              <div>Firma: <strong className="text-slate-900 dark:text-white">{alumni.companyName}</strong></div>
              <div>Pozisyon: <strong>{alumni.position}</strong></div>
              <div>Lokasyon: {alumni.city}, {alumni.country}</div>
              <div>Maaş Skalası: <strong className="text-emerald-600">{alumni.salaryRange}</strong></div>
              <div>Çalışma Modeli: {alumni.workModel}</div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
              {alumni.wantsToMentor ? (
                <span className="text-[11px] font-bold text-burgundy-700 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" /> Gönüllü Mezun Mentor
                </span>
              ) : (
                <span className="text-[11px] text-slate-400">Mentorluk Pasif</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
