import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Alert } from '../../components/ui/Alert';
import { Checkbox } from '../../components/ui/Checkbox';
import { Building2, Save, ShieldCheck } from 'lucide-react';

export const CompanyProfileEditor: React.FC = () => {
  const [profile, setProfile] = useState({
    companyName: 'ASELSAN Konya Silah Sistemleri A.Ş.',
    taxNumber: '1234567890',
    taxOffice: 'Selçuklu Vergi Dairesi',
    sector: 'Savunma Sanayii & Havacılık',
    website: 'https://aselsankonya.com.tr',
    phone: '+90 332 333 44 55',
    email: 'ik@aselsankonya.com.tr',
    employeeCount: '500 - 1000 Çalışan',
    city: 'Konya / Türkiye',
    address: 'Büyükkayacık OSB Mah. 4. Organize Sanayi Bölgesi 402. Sokak No:8 Selçuklu/Konya',
    introVideoUrl: 'https://youtube.com/watch?v=aselsan_konya_intro',
    description: 'ASELSAN Konya, Türk Silahlı Kuvvetleri ve müttefik ülke ordularının silah sistemleri ihtiyacını karşılamak üzere yüksek teknolojili yerli çözümler üretmektedir.',
    perkPrivateHealth: true,
    perkMealTicket: true,
    perkShuttleService: true,
    perkHybridWork: true,
    perkAcademicPermission: true,
  });

  const [savedMsg, setSavedMsg] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <Building2 className="w-5 h-5 text-burgundy-700" />
            <span>Kurumsal Firma Profil & Marka Yönetimi</span>
          </h2>
          <p className="text-xs text-slate-500">
            Öğrencilere gösterilecek kurumsal marka profilinizi, logosunu, tanıtım videosunu ve sağlanan imkanları düzenleyin.
          </p>
        </div>

        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
          <ShieldCheck className="w-4 h-4" /> Onaylı Kurumsal Hesap
        </span>
      </div>

      {savedMsg && (
        <Alert variant="success" title="Profil Güncellendi">
          Kurumsal profil değişiklikleriniz kaydedildi ve öğrenci portalında yayına alındı.
        </Alert>
      )}

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Doğrulanmış Vergi Bilgileri (Kilitli):</span>
          <div className="flex flex-wrap gap-4 text-slate-700 dark:text-slate-300 font-medium">
            <span>Firma: <strong>{profile.companyName}</strong></span>
            <span>VKN: <strong>{profile.taxNumber}</strong></span>
            <span>Vergi Dairesi: <strong>{profile.taxOffice}</strong></span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Sektör" value={profile.sector} onChange={(e) => setProfile({ ...profile, sector: e.target.value })} />
          <Input label="Çalışan Sayısı Skalası" value={profile.employeeCount} onChange={(e) => setProfile({ ...profile, employeeCount: e.target.value })} />
          <Input label="Kurumsal Web Sitesi" value={profile.website} onChange={(e) => setProfile({ ...profile, website: e.target.value })} />
          <Input label="Kurumsal İK İletişim E-postası" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Tanıtım Videosu Linki (YouTube / Vimeo)" value={profile.introVideoUrl} onChange={(e) => setProfile({ ...profile, introVideoUrl: e.target.value })} />
          <Input label="Şehir / Bölge" value={profile.city} onChange={(e) => setProfile({ ...profile, city: e.target.value })} />
        </div>

        <div>
          <label className="font-bold block mb-1">Açık Adres</label>
          <textarea
            className="w-full p-2.5 rounded-lg border text-xs bg-white dark:bg-slate-900"
            rows={2}
            value={profile.address}
            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
          />
        </div>

        <div>
          <label className="font-bold block mb-1">Firma Hakkında Detaylı Tanım Metni</label>
          <textarea
            className="w-full p-3 rounded-xl border text-xs bg-white dark:bg-slate-900"
            rows={4}
            value={profile.description}
            onChange={(e) => setProfile({ ...profile, description: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="font-bold block text-slate-900 dark:text-white">Çalışanlara Sağlanan Yan Haklar & Sağlık İmkanları:</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border">
            <Checkbox label="Özel Sağlık Sigortası" checked={profile.perkPrivateHealth} onChange={(e) => setProfile({ ...profile, perkPrivateHealth: e.target.checked })} />
            <Checkbox label="Yemek Kartı / Restoran" checked={profile.perkMealTicket} onChange={(e) => setProfile({ ...profile, perkMealTicket: e.target.checked })} />
            <Checkbox label="Personel Servisi" checked={profile.perkShuttleService} onChange={(e) => setProfile({ ...profile, perkShuttleService: e.target.checked })} />
            <Checkbox label="Esnek / Hibrit Çalışma" checked={profile.perkHybridWork} onChange={(e) => setProfile({ ...profile, perkHybridWork: e.target.checked })} />
            <Checkbox label="Yüksek Lisans İzni" checked={profile.perkAcademicPermission} onChange={(e) => setProfile({ ...profile, perkAcademicPermission: e.target.checked })} />
          </div>
        </div>

        <Button type="submit" variant="primary" size="md" leftIcon={<Save className="w-4 h-4" />}>
          Kurumsal Profil Değişikliklerini Kaydet
        </Button>
      </form>
    </div>
  );
};
