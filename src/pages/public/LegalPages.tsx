import React, { useState, useEffect } from 'react';
import { setPageTitle } from '../../utils/seo';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { SectionTitle } from '../../components/ui/SectionTitle';
import { Shield, Lock, Cookie, Scale, CheckCircle2, ChevronRight } from 'lucide-react';

export type LegalTabType = 'kvkk' | 'privacy' | 'cookie' | 'terms';

export interface SingleLegalPageProps {
  initialTab?: LegalTabType;
}

export const UnifiedLegalPage: React.FC<SingleLegalPageProps> = ({ initialTab = 'kvkk' }) => {
  const [activeTab, setActiveTab] = useState<LegalTabType>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    const titles: Record<LegalTabType, string> = {
      kvkk: 'KVKK Aydınlatma Metni — Yasal & Politikalar',
      privacy: 'Gizlilik Politikası — Yasal & Politikalar',
      cookie: 'Çerez Politikası — Yasal & Politikalar',
      terms: 'Kullanım Koşulları — Yasal & Politikalar',
    };
    setPageTitle(titles[activeTab], 'Konya Teknik Üniversitesi Kariyer Portalı Yasal & Politikalar Dokümanı.');
  }, [activeTab]);

  const tabs: { id: LegalTabType; title: string; subtitle: string; icon: React.ReactNode }[] = [
    {
      id: 'kvkk',
      title: 'KVKK Aydınlatma Metni',
      subtitle: '6698 Sayılı Kanun Kapsamında Veri İşleme Bilgilendirmesi',
      icon: <Shield className="w-4 h-4 text-burgundy-700" />,
    },
    {
      id: 'privacy',
      title: 'Gizlilik Politikası',
      subtitle: 'Kullanıcı Verilerinin Korunması & Güvenlik Standartları',
      icon: <Lock className="w-4 h-4 text-burgundy-700" />,
    },
    {
      id: 'cookie',
      title: 'Çerez Politikası',
      subtitle: 'Oturum, Performans ve Analitik Çerez Tercihleri',
      icon: <Cookie className="w-4 h-4 text-burgundy-700" />,
    },
    {
      id: 'terms',
      title: 'Kullanım Koşulları',
      subtitle: 'Portal Hizmet Şartları, Kurallar ve Yasal Sorumluluklar',
      icon: <Scale className="w-4 h-4 text-burgundy-700" />,
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <Breadcrumb items={[{ label: 'Kurumsal' }, { label: 'Yasal & Politikalar' }]} />

      {/* Main Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <SectionTitle
          title="Yasal & Politikalar"
          subtitle="Konya Teknik Üniversitesi Kariyer Portalı Yasal Haklar ve Kurumsal Politikalar"
        />
      </div>

      {/* Single Page Tab Selector Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                isActive
                  ? 'bg-burgundy-700 text-white border-burgundy-700 shadow-md scale-[1.02]'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-burgundy-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`p-2 rounded-xl ${isActive ? 'bg-white/10 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>
                  {tab.icon}
                </span>
                <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              </div>
              <div>
                <h3 className={`text-xs font-black uppercase tracking-wider ${isActive ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                  {tab.title}
                </h3>
              </div>
            </button>
          );
        })}
      </div>

      {/* Single Page Document View Area */}
      <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-8 leading-relaxed text-slate-700 dark:text-slate-300 text-sm">
        
        {/* Section 1: KVKK Aydınlatma Metni */}
        {activeTab === 'kvkk' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex items-center gap-3">
              <Shield className="w-6 h-6 text-burgundy-700" />
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  6698 Sayılı KVKK Aydınlatma Metni
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Son Güncelleme: 01 Ocak 2026 | Doküman kODU: KTUN-KVKK-2026-v2
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
                1. Veri Sorumlusunun Kimliği
              </h3>
              <p>
                Konya Teknik Üniversitesi Kariyer Gelişim ve Mezun İzleme Uygulama ve Araştırma Merkezi (“KTÜN Kariyer”) olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca, kişisel verilerinizi veri sorumlusu sıfatıyla işlemekteyiz.
              </p>

              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
                2. Kişisel Verilerin İşlenme Amacı ve Yasal Sebepler
              </h3>
              <p>
                Kişisel verileriniz (Ad, Soyad, T.C. Kimlik No, Öğrenci No, GANO, İletişim Bilgileri, Özgeçmiş İçerikleri ve Başvuru Geçmişi);
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 font-medium">
                <li>Öğrencilerimizin ve mezunlarımızın onaylı kurumsal firma ilanlarına başvuru yapabilmesi,</li>
                <li>İşveren kurumlar ile aday uyum değerlendirmelerinin yürütülmesi,</li>
                <li>Birebir kariyer danışmanlığı ve mentörlük randevu organizasyonlarının sağlanması,</li>
                <li>Yükseköğretim Kanunu ve resmi mevzuattan kaynaklanan hukuki yükümlülüklerin ifası amacıyla işlenmektedir.</li>
              </ul>

              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
                3. İşlenen Verilerin Aktarıldığı Taraflar
              </h3>
              <p>
                Toplanan kişisel verileriniz, yalnızca açık rızanız doğrultusunda başvuruda bulunduğunuz onaylı kurumsal işverenler ve mevzuat uyarınca yetkili kamu kurum ve kuruluşları ile paylaşılmaktadır. Verileriniz hiçbir koşulda ticari amaçla üçüncü taraflara satılmaz veya devredilmez.
              </p>

              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
                4. Veri Sahibinin Kanuni Hakları (Madde 11)
              </h3>
              <p>
                KVKK'nın 11. maddesi uyarınca <strong>kariyer@ktun.edu.tr</strong> adresine e-posta göndererek; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, verilerinizin düzeltilmesini veya silinmesini isteme hakkına sahipsiniz.
              </p>
            </div>
          </div>
        )}

        {/* Section 2: Gizlilik Politikası */}
        {activeTab === 'privacy' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex items-center gap-3">
              <Lock className="w-6 h-6 text-burgundy-700" />
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  Kurumsal Gizlilik Politikası
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Kullanıcı Veri Güvenliği ve Altyapı Koruma Standartları
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <p>
                Konya Teknik Üniversitesi Kariyer Portalı, öğrenci, mezun ve işveren kullanıcılarımızın dijital mahremiyetini ve sistem güvenliğini en üst düzeyde korumayı taahhüt eder.
              </p>

              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
                Veri Güvenliği Standartları ve Şifreleme
              </h3>
              <p>
                Sistemimizde iletilen tüm veriler endüstri standardı 256-bit TLS/SSL şifreleme protokolleri ile koruma altındadır. Veritabanı katmanında parola ve hassas erişim anahtarları OWASP standartlarına uygun biçimde tuzlanmış karma (Salted Hashing - BCrypt/Argon2) yöntemleriyle saklanır.
              </p>

              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
                Hesap Güvenliği ve Yetkisiz Erişim
              </h3>
              <p>
                Kullanıcılarımız kendi hesap şifrelerinin gizliliğinden sorumludur. Şüpheli oturum açma girişimlerinde sistem otomatik olarak hesabı geçici korumaya alır ve doğrulamalı güvenlik protokollerini devreye sokar.
              </p>
            </div>
          </div>
        )}

        {/* Section 3: Çerez Politikası */}
        {activeTab === 'cookie' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex items-center gap-3">
              <Cookie className="w-6 h-6 text-burgundy-700" />
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  Çerez (Cookie) Kullanım Politikası
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Web Sitesi Oturum ve Performans Çerezleri Bilgilendirmesi
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <p>
                Web sitemizde kullanıcı deneyimini iyileştirmek, oturum tercihlerinizi (örneğin Dark Mode teması veya aktif rol modülü) hatırlamak amacıyla birinci taraf çerezler (cookies) kullanılmaktadır.
              </p>

              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
                Kullanılan Çerez Türleri
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-extrabold text-slate-900 dark:text-white block text-xs">
                    1. Zorunlu Oturum Çerezleri
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Sistemde güvenli oturum açılabilmesi ve yetkilendirme doğrulamasının yapılması için zorunludur.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-extrabold text-slate-900 dark:text-white block text-xs">
                    2. Tercih ve Tema Çerezleri
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Koyu mod (Dark Mode) ve arayüz özelleştirmelerinizin taranan cihazda saklanmasını sağlar.
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-500 pt-2">
                Tarayıcı ayarlarınızdan çerez kullanımını dilediğiniz zaman kısıtlayabilir veya silebilirsiniz.
              </p>
            </div>
          </div>
        )}

        {/* Section 4: Kullanım Koşulları */}
        {activeTab === 'terms' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex items-center gap-3">
              <Scale className="w-6 h-6 text-burgundy-700" />
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  Portal Kullanım Koşulları ve Hizmet Şartları
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Sistem Kullanım Kuralları ve Yasal Sorumluluklar
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <p>
                Konya Teknik Üniversitesi Kariyer Portalını kullanan tüm öğrenciler, mezunlar ve kurumsal işveren temsilcileri işbu kullanım şartlarına uymayı kabul ve beyan ederler.
              </p>

              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
                Doğru Bilgi Beyanı Yükümlülüğü
              </h3>
              <p>
                Kullanıcılar profil, CV ve iş ilanı oluştururken verdikleri tüm akademik ve kurumsal bilgilerin doğru ve güncel olduğunu taahhüt eder. Yanıltıcı beyanda bulunan hesaplar Kariyer Merkezi yönetimi tarafından askıya alınır.
              </p>

              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
                Fikri Mülkiyet ve Amblem Kullanımı
              </h3>
              <p>
                Portalın tasarımı, logosu ve kod altyapısı Konya Teknik Üniversitesi'ne aittir. İzin alınmaksızın kopyalanamaz veya üçüncü taraflarca dağıtılamaz.
              </p>
            </div>
          </div>
        )}

        {/* Unified Bottom Footer Banner */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
          <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
            <CheckCircle2 className="w-4 h-4" /> Tüm politikalar Konya Teknik Üniversitesi Rektörlüğü onaylıdır.
          </span>
          <span>İletişim: kariyer@ktun.edu.tr | +90 332 205 11 11</span>
        </div>
      </div>
    </div>
  );
};

export const KvkkPage: React.FC = () => <UnifiedLegalPage initialTab="kvkk" />;
export const PrivacyPage: React.FC = () => <UnifiedLegalPage initialTab="privacy" />;
export const CookiePolicyPage: React.FC = () => <UnifiedLegalPage initialTab="cookie" />;
export const TermsPage: React.FC = () => <UnifiedLegalPage initialTab="terms" />;
