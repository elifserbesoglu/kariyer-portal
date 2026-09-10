import React, { useState } from 'react';
import { CvBuilder } from '../features/student/CvBuilder';
import { StudentApplications } from '../features/student/StudentApplications';
import { StudentInterviews } from '../features/student/StudentInterviews';
import { StudentMessaging } from '../features/student/StudentMessaging';
import { StudentCareerGoals } from '../features/student/StudentCareerGoals';
import { StudentGamificationBadges } from '../features/student/StudentGamificationBadges';
import { StudentPortfolioShowcase } from '../features/student/StudentPortfolioShowcase';
import { StudentBookmarks } from '../features/student/StudentBookmarks';
import { useAuth } from '../context/AuthContext';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { StatCard } from '../components/cards/StatCard';
import {
  FileText,
  Bookmark,
  LayoutDashboard,
  Clock,
  Edit,
  Globe,
  Phone,
  MapPin,
  CheckCircle2,
  Calendar,
  Share2,
  MessageSquare,
  Target,
  Code
} from 'lucide-react';

export const StudentLayout: React.FC<{
  children?: React.ReactNode;
  onRoleChange?: (role: string, subTab?: string) => void;
  initialTab?: 'dashboard' | 'cv' | 'applications' | 'bookmarks' | 'interviews' | 'messages' | 'goals' | 'portfolio';
}> = ({ initialTab = 'dashboard' }) => {
  const { user, updateUserAvatar } = useAuth();
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'cv' | 'applications' | 'bookmarks' | 'interviews' | 'messages' | 'goals' | 'portfolio'
  >(initialTab as any);

  React.useEffect(() => {
    if (initialTab) setActiveTab(initialTab as any);
  }, [initialTab]);

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const [personalProfile, setPersonalProfile] = useState({
    phone: '+90 555 123 45 67',
    city: 'Konya / Türkiye',
    linkedin: 'https://linkedin.com/in/emre-tunc',
    github: 'https://github.com/emretunc',
    website: 'https://emretunc.dev',
    bio: 'KTÜN Bilgisayar Mühendisliği 4. sınıf öğrencisiyim. Otonom sistemler, C++ ve gömülü yazılım alanında kariyer hedefliyorum.',
  });

  const handleSavePersonalProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditProfileOpen(false);
  };

  return (
    <div className="space-y-6">

      <main className="flex-1 max-w-1440 w-full mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs text-center space-y-4 relative">
              <button
                type="button"
                onClick={() => setIsEditProfileOpen(true)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-burgundy-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                title="Kişisel Profili Düzenle"
              >
                <Edit className="w-4 h-4" />
              </button>

              <div className="w-20 h-20 rounded-full bg-burgundy-700 text-white font-black text-2xl flex items-center justify-center mx-auto border-4 border-white dark:border-slate-800 shadow-md overflow-hidden relative">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.fullName} className="w-full h-full object-cover" />
                ) : (
                  <span>{user?.fullName.substring(0, 2).toUpperCase() || 'ET'}</span>
                )}
              </div>

              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {user?.fullName || 'Emre Tunç'}
                </h3>
                <span className="text-xs font-semibold text-burgundy-700 dark:text-burgundy-400 block">
                  {user?.department || 'Bilgisayar Mühendisliği'}
                </span>
                <span className="text-[11px] text-slate-400 block">
                  {user?.faculty || 'Mühendislik ve Doğa Bilimleri Fakültesi'} ({user?.grade || '4. Sınıf'})
                </span>
              </div>

              <div className="text-left text-xs space-y-1.5 text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{personalProfile.phone}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{personalProfile.city}</span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <a href={personalProfile.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-burgundy-700 flex items-center gap-1 font-bold text-[10px]">
                    <Share2 className="w-3.5 h-3.5" /> LinkedIn
                  </a>
                  <a href={personalProfile.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-burgundy-700 flex items-center gap-1 font-bold text-[10px]">
                    <Globe className="w-3.5 h-3.5" /> GitHub
                  </a>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 text-left text-xs space-y-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                  OBS Akademik Bilgiler (Kilitli):
                </span>
                <div className="flex justify-between">
                  <span className="text-slate-500">Öğrenci No:</span>
                  <span className="font-bold">{user?.studentNumber || '20120033001'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">GANO:</span>
                  <span className="font-bold text-emerald-600">3.42 / 4.00</span>
                </div>
              </div>
            </div>

            <nav className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1 font-semibold text-xs">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-burgundy-700 text-white font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Genel Bakış</span>
              </button>

              <button
                onClick={() => setActiveTab('cv')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors ${
                  activeTab === 'cv'
                    ? 'bg-burgundy-700 text-white font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Profilim</span>
              </button>

              <button
                onClick={() => setActiveTab('applications')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors ${
                  activeTab === 'applications'
                    ? 'bg-burgundy-700 text-white font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>Başvurularım</span>
              </button>

              <button
                onClick={() => setActiveTab('messages')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors ${
                  activeTab === 'messages'
                    ? 'bg-burgundy-700 text-white font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Mesajlaşma</span>
              </button>

              <button
                onClick={() => setActiveTab('portfolio')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors ${
                  activeTab === 'portfolio'
                    ? 'bg-burgundy-700 text-white font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Code className="w-4 h-4" />
                <span>Mühendislik Portfolyosu</span>
              </button>

              <button
                onClick={() => setActiveTab('goals')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors ${
                  activeTab === 'goals'
                    ? 'bg-burgundy-700 text-white font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Target className="w-4 h-4" />
                <span>Kariyer Hedefleri</span>
              </button>

              <button
                onClick={() => setActiveTab('bookmarks')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors ${
                  activeTab === 'bookmarks'
                    ? 'bg-burgundy-700 text-white font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>Favori İlanlar</span>
              </button>
            </nav>
          </aside>

          <main className="lg:col-span-3 space-y-6">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="flex justify-end">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-extrabold text-[11px] border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                    🟢 Canlı Bağlantı Aktif
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard title="Profil Tamamlanma" value="%95" subtitle="Eksiksiz Bilgi" className="border-l-4 border-l-emerald-500" />
                  <StatCard title="CV Hazırlık Durumu" value="Aktif" subtitle="ATS Format Uyumlu" className="border-l-4 border-l-burgundy-700" />
                  <StatCard title="Aktif Başvurular" value="3" subtitle="Değerlendirmede" className="border-l-4 border-l-navy-900" />
                  <StatCard title="Yaklaşan Mülakat" value="2" subtitle="Teams & Fiziksel" className="border-l-4 border-l-amber-500" />
                </div>

                <StudentGamificationBadges />

                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <Calendar className="w-4 h-4 text-burgundy-700" />
                    <span>Son Aktiviteler & Mülakat Çağrıları</span>
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-emerald-900 dark:text-emerald-200">ASELSAN Mülakat Çağrısı</span>
                        <p className="text-emerald-700 dark:text-emerald-300 mt-0.5">24 Mayıs 14:00 için Teams online mülakatı planlandı.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'cv' && <CvBuilder />}
            {activeTab === 'applications' && <StudentApplications />}
            {activeTab === 'interviews' && <StudentInterviews />}
            {activeTab === 'messages' && <StudentMessaging />}
            {activeTab === 'portfolio' && <StudentPortfolioShowcase />}
            {activeTab === 'goals' && <StudentCareerGoals />}
            {activeTab === 'bookmarks' && <StudentBookmarks />}
          </main>
        </div>
      </main>

      <Modal isOpen={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)} title="Kişisel İletişim & Profil Düzenle">
        <form onSubmit={handleSavePersonalProfile} className="space-y-4">
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl text-xs text-amber-800 dark:text-amber-200 border border-amber-200">
            <strong>Bilgi:</strong> Öğrenci No, Fakülte, Bölüm ve GANO gibi akademik veriler OBS entegrasyonuyla kilitlidir. Profil fotoğrafınızı ve kişisel iletişim bilgilerinizi güncelleyebilirsiniz.
          </div>

          {/* Profil Fotoğrafı Alanı */}
          <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 rounded-full bg-burgundy-700 text-white flex items-center justify-center font-extrabold text-sm overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.fullName} className="w-full h-full object-cover" />
              ) : (
                <span>{user?.fullName.substring(0, 2).toUpperCase() || 'ET'}</span>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">Profil Fotoğrafı</label>
              <div className="flex items-center gap-2">
                <label
                  htmlFor="modal-avatar-input"
                  className="px-3 py-1 bg-burgundy-700 hover:bg-burgundy-800 text-white font-bold text-xs rounded-lg cursor-pointer transition-colors"
                >
                  Fotoğraf Değiştir
                </label>
                <input
                  id="modal-avatar-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        if (ev.target?.result) updateUserAvatar(ev.target.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                {user?.avatar && (
                  <button
                    type="button"
                    onClick={() => updateUserAvatar('')}
                    className="px-2.5 py-1 text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 rounded-lg text-xs font-bold border border-rose-200 dark:border-rose-900"
                  >
                    Kaldır
                  </button>
                )}
              </div>
            </div>
          </div>

          <Input label="Telefon Numarası" value={personalProfile.phone} onChange={(e) => setPersonalProfile({ ...personalProfile, phone: e.target.value })} />
          <Input label="İkamet Şehir / Ülke" value={personalProfile.city} onChange={(e) => setPersonalProfile({ ...personalProfile, city: e.target.value })} />
          <Input label="LinkedIn Bağlantısı" value={personalProfile.linkedin} onChange={(e) => setPersonalProfile({ ...personalProfile, linkedin: e.target.value })} />
          <Input label="GitHub Bağlantısı" value={personalProfile.github} onChange={(e) => setPersonalProfile({ ...personalProfile, github: e.target.value })} />
          <Input label="Kişisel Web Sitesi" value={personalProfile.website} onChange={(e) => setPersonalProfile({ ...personalProfile, website: e.target.value })} />
          <div>
            <label className="text-xs font-medium block mb-1">Kısa Biyografi</label>
            <textarea className="w-full p-2.5 rounded-lg border text-xs" rows={3} value={personalProfile.bio} onChange={(e) => setPersonalProfile({ ...personalProfile, bio: e.target.value })} />
          </div>

          <Button type="submit" variant="primary" fullWidth>Profil Değişikliklerini Kaydet</Button>
        </form>
      </Modal>

    </div>
  );
};
