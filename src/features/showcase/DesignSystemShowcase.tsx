import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { IconButton } from '../../components/ui/IconButton';
import { ButtonGroup } from '../../components/ui/ButtonGroup';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Select } from '../../components/ui/Select';
import { SearchBox } from '../../components/ui/SearchBox';
import { Checkbox } from '../../components/ui/Checkbox';
import { Radio } from '../../components/ui/Radio';
import { Switch } from '../../components/ui/Switch';
import { Badge } from '../../components/ui/Badge';
import { Chip } from '../../components/ui/Chip';
import { Tag } from '../../components/ui/Tag';
import { Avatar } from '../../components/ui/Avatar';
import { Tabs } from '../../components/ui/Tabs';
import { Modal } from '../../components/ui/Modal';
import { Drawer } from '../../components/ui/Drawer';
import { DataTable } from '../../components/ui/DataTable';
import { LoadingState } from '../../components/ui/LoadingState';
import { Skeleton } from '../../components/ui/Skeleton';
import { Progress } from '../../components/ui/Progress';
import { StepIndicator } from '../../components/ui/StepIndicator';
import { Hero } from '../../components/ui/Hero';
import { Banner } from '../../components/ui/Banner';
import { SectionTitle } from '../../components/ui/SectionTitle';
import { FilterPanel } from '../../components/ui/FilterPanel';

import { StatCard } from '../../components/cards/StatCard';
import { JobCard } from '../../components/cards/JobCard';
import { ProfileCard } from '../../components/cards/ProfileCard';

import { Error404, Error403, Error500, ErrorNoInternet, ErrorUnauthorized } from '../errors/ErrorPages';
import { useToast } from '../../hooks/useToast';
import { useDisclosure } from '../../hooks/useDisclosure';
import {
  Sparkles,
  Send,
  Trash2,
  Bookmark,
  Layers,
  Palette,
  Sliders,
  AlertTriangle
} from 'lucide-react';

export const DesignSystemShowcase: React.FC = () => {
  const { addToast } = useToast();
  const modalDisc = useDisclosure();
  const drawerDisc = useDisclosure();

  const [activeShowcaseTab, setActiveShowcaseTab] = useState('tokens');
  const [activeErrorTab, setActiveErrorTab] = useState('404');

  const [inputValue, setInputValue] = useState('elifs@ktun.edu.tr');
  const [switchVal, setSwitchVal] = useState(true);
  const [checkboxVal, setCheckboxVal] = useState(true);
  const [radioVal, setRadioVal] = useState('option1');
  const [currentStep, setCurrentStep] = useState(1);
  const [filters] = useState<Record<string, string[]>>({
    type: ['job'],
    work: ['full'],
  });

  const showcaseTabs = [
    { id: 'tokens', label: 'Design Tokens', icon: <Palette className="w-4 h-4" /> },
    { id: 'components', label: 'UI Components', icon: <Layers className="w-4 h-4" /> },
    { id: 'cards', label: 'Cards System', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'data-table', label: 'Data Table Standard', icon: <Sliders className="w-4 h-4" /> },
    { id: 'errors', label: 'Error Pages', icon: <AlertTriangle className="w-4 h-4" /> },
  ];

  // Table Data Sample
  const tableData = [
    { id: '1', title: 'Yazılım Mühendisi (Gömülü Sistemler)', company: 'ASELSAN Konya', city: 'Konya', type: 'Tam Zamanlı', date: '15.06.2024' },
    { id: '2', title: 'Sistem Mühendisi', company: 'ROKETSAN', city: 'Ankara', type: 'Tam Zamanlı', date: '20.06.2024' },
    { id: '3', title: 'Yapay Zeka Mühendisi', company: 'HAVELSAN', city: 'Konya', type: 'Tam Zamanlı', date: '18.06.2024' },
    { id: '4', title: 'Proje Uzman Yardımcısı', company: 'TÜBİTAK BİLGEM', city: 'Kocaeli', type: 'Staj', date: '30.06.2024' },
    { id: '5', title: 'Üretim Mühendisi', company: 'FORD OTOSAN', city: 'Kocaeli', type: 'Tam Zamanlı', date: '12.05.2024' },
  ];

  const tableColumns = [
    { key: 'title', header: 'İlan Başlığı', sortable: true },
    { key: 'company', header: 'Firma', sortable: true },
    { key: 'city', header: 'Şehir', sortable: true },
    { key: 'type', header: 'Çalışma Şekli', render: (row: any) => <Badge variant="primary">{row.type}</Badge> },
    { key: 'date', header: 'Son Başvuru', sortable: true },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Banner Intro */}
      <Hero
        title="KTÜN Design System & UI Foundation"
        subtitle="Konya Teknik Üniversitesi Kariyer Gelişim ve Mezun İzleme Portalı kurumsal tasarım altyapısı ve bileşen kütüphanesi."
      >
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="navy" size="lg">Enterprise Grade</Badge>
          <Badge variant="primary" size="lg">WCAG AA Compliant</Badge>
          <Badge variant="success" size="lg">Dark Mode Supported</Badge>
        </div>
      </Hero>

      {/* Navigation Tabs */}
      <Tabs
        tabs={showcaseTabs}
        activeTab={activeShowcaseTab}
        onChange={(id) => setActiveShowcaseTab(id)}
        variant="pills"
      />

      {/* 1. DESIGN TOKENS SHOWCASE */}
      {activeShowcaseTab === 'tokens' && (
        <div className="space-y-10 animate-fade-in">
          {/* Colors */}
          <div className="space-y-4">
            <SectionTitle title="Colors (Renk Paleti)" subtitle="KTÜN Kurumsal Bordo (#8B0000) ve Lacivert (#0B192C) tasarım jetonları." />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Burgundy Scale */}
              <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Burgundy (Kurumsal Bordo)</h4>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { shade: '50', hex: '#FDF2F2' },
                    { shade: '100', hex: '#FBE8E8' },
                    { shade: '300', hex: '#EE9898' },
                    { shade: '700', hex: '#8B0000' },
                    { shade: '900', hex: '#520000' },
                  ].map((c) => (
                    <div key={c.shade} className="flex flex-col items-center">
                      <div className="w-full h-12 rounded-lg shadow-inner flex items-end justify-center p-1 text-[10px] font-bold text-white" style={{ backgroundColor: c.hex }}>
                        {c.shade}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1">{c.hex}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navy Scale */}
              <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Navy (Kurumsal Lacivert)</h4>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { shade: '50', hex: '#F0F4F8' },
                    { shade: '300', hex: '#9FB3C8' },
                    { shade: '700', hex: '#334E68' },
                    { shade: '900', hex: '#0B192C' },
                    { shade: '950', hex: '#060D17' },
                  ].map((c) => (
                    <div key={c.shade} className="flex flex-col items-center">
                      <div className="w-full h-12 rounded-lg shadow-inner flex items-end justify-center p-1 text-[10px] font-bold text-white" style={{ backgroundColor: c.hex }}>
                        {c.shade}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1">{c.hex}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Typography Scale */}
          <div className="space-y-4">
            <SectionTitle title="Typography (Tipografi Hiyerarşisi)" subtitle="H1 - H5, Body, Caption, Label standartları." />
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="border-b pb-3"><h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">H1 - Konya Teknik Üniversitesi Kariyer Portalı (36px)</h1></div>
              <div className="border-b pb-3"><h2 className="text-2xl font-bold text-slate-900 dark:text-white">H2 - İş ve Staj İlanları Bölüm Başlığı (24px)</h2></div>
              <div className="border-b pb-3"><h3 className="text-xl font-bold text-slate-900 dark:text-white">H3 - Yazılım Mühendisi Kart Başlığı (20px)</h3></div>
              <div className="border-b pb-3"><h4 className="text-base font-semibold text-slate-800 dark:text-slate-200">H4 - Alt Bileşen Başlığı (16px)</h4></div>
              <div className="border-b pb-3"><p className="text-sm text-slate-600 dark:text-slate-300">Body - Genel metin içeriği ve açıklama paragrafı. 14px okunaklı tipografi.</p></div>
              <div><span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Caption / Label - 12px Etiket metni</span></div>
            </div>
          </div>

          {/* Radius & Shadows */}
          <div className="space-y-4">
            <SectionTitle title="Radius & Shadows (Köşe Yuvarlama & Gölgeler)" subtitle="Apple / Linear stili yumuşak yükseklik ve köşe standartları." />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 shadow-xs text-center text-xs font-semibold">
                Rounded MD (6px) + shadow-xs
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm text-center text-xs font-semibold">
                Rounded LG (8px) + shadow-sm
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-md text-center text-xs font-semibold">
                Rounded XL (12px) + shadow-md
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-card text-center text-xs font-semibold">
                Rounded 2XL (16px) + shadow-card
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. UI COMPONENTS SHOWCASE */}
      {activeShowcaseTab === 'components' && (
        <div className="space-y-10 animate-fade-in">
          {/* Buttons */}
          <div className="space-y-4">
            <SectionTitle title="Buttons & Actions" subtitle="Primary, Secondary, Outline, Danger, Navy, Link, Loading, ve Icon Butonlar." />
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" leftIcon={<Send className="w-4 h-4" />}>Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="navy">Navy Button</Button>
                <Button variant="danger" leftIcon={<Trash2 className="w-4 h-4" />}>Danger</Button>
                <Button variant="link">Link Button</Button>
                <Button variant="primary" isLoading>Yükleniyor</Button>
                <Button variant="primary" disabled>Devre Dışı</Button>
              </div>

              <div className="flex items-center gap-4 border-t pt-4">
                <span className="text-xs font-bold text-slate-500">Icon Buttons:</span>
                <IconButton ariaLabel="Bookmark" icon={<Bookmark className="w-4 h-4" />} variant="outline" />
                <IconButton ariaLabel="Notifications" icon={<Sparkles className="w-4 h-4" />} variant="primary" badgeCount={5} />
                <IconButton ariaLabel="Close" icon={<Trash2 className="w-4 h-4" />} variant="danger" />
              </div>

              <div className="flex items-center gap-4 border-t pt-4">
                <span className="text-xs font-bold text-slate-500">Button Group:</span>
                <ButtonGroup>
                  <Button variant="secondary" size="sm">Günlük</Button>
                  <Button variant="primary" size="sm">Haftalık</Button>
                  <Button variant="secondary" size="sm">Aylık</Button>
                </ButtonGroup>
              </div>
            </div>
          </div>

          {/* Form Standard */}
          <div className="space-y-4">
            <SectionTitle title="Form Components Standard" subtitle="Validation, Disabled, Loading, Focus, Error, Success, Warning durumları." />
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input label="Normal Input" placeholder="E-posta yazınız..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                <Input label="Başarılı Input" value="valid.user@ktun.edu.tr" success helperText="E-posta adresi doğrulandı." />
                <Input label="Hatalı Input" value="invalid-email" error="Geçerli bir kurumsal e-posta giriniz." />
                <Input label="Uyarı Durumu" value="0532 000 00 00" warning="Telefon numaranızı başında 0 olmadan giriniz." />
                <Input label="Yükleniyor State" value="Kontrol ediliyor..." isLoading />
                <Input label="Devre Dışı" value="Düzenlenemez Alan" disabled />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
                <Select
                  label="Fakülte Seçimi"
                  options={[
                    { value: 'muhendislik', label: 'Mühendislik ve Doğa Bilimleri Fakültesi' },
                    { value: 'mimarlik', label: 'Mimarlık ve Tasarım Fakültesi' },
                  ]}
                />
                <SearchBox placeholder="Anahtar kelime, pozisyon veya firma ara..." />
              </div>

              <div className="flex flex-wrap items-center gap-8 border-t pt-4">
                <Checkbox label="KVKK Metnini Okudum ve Kabul Ediyorum" checked={checkboxVal} onChange={(e) => setCheckboxVal(e.target.checked)} />
                <Radio label="Tam Zamanlı" name="demo-radio" checked={radioVal === 'option1'} onChange={() => setRadioVal('option1')} />
                <Radio label="Yarı Zamanlı" name="demo-radio" checked={radioVal === 'option2'} onChange={() => setRadioVal('option2')} />
                <Switch label="E-posta Bildirimleri" checked={switchVal} onChange={(e) => setSwitchVal(e.target.checked)} />
              </div>

              <Textarea label="Ön Yazı / Açıklama" placeholder="Kariyer hedeflerinizi özetleyiniz..." />
            </div>
          </div>

          {/* Badges, Chips, Avatars, Tabs */}
          <div className="space-y-4">
            <SectionTitle title="Badges, Chips, Avatars & Overlays" subtitle="Durum etiketleri, kullanıcı avatarları, tablar ve bildirimler." />
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="primary" dot>Ön Eleme</Badge>
                <Badge variant="success" dot>Kabul Edildi</Badge>
                <Badge variant="warning" dot>Değerlendirmede</Badge>
                <Badge variant="error" dot>Reddedildi</Badge>
                <Badge variant="info">Mülakat Aşamasında</Badge>
                <Badge variant="navy">KTÜN 2026</Badge>
              </div>

              <div className="flex flex-wrap items-center gap-3 border-t pt-4">
                <Chip label="Yazılım Mühendisliği" selected />
                <Chip label="Konya" onRemove={() => {}} />
                <Chip label="C/C++" />
                <Tag variant="burgundy">Gömülü Sistemler</Tag>
                <Tag variant="emerald">Aktif İlan</Tag>
              </div>

              <div className="flex items-center gap-4 border-t pt-4">
                <Avatar name="Elif Serbeşoğlu" size="xs" />
                <Avatar name="Ahmet Yılmaz" size="sm" status="online" />
                <Avatar name="Merve Şahin" size="md" status="away" />
                <Avatar name="KTÜN Kariyer" size="lg" status="busy" />
              </div>

              <div className="flex items-center gap-4 border-t pt-4">
                <Button variant="outline" size="sm" onClick={modalDisc.open}>Modal Aç Demo</Button>
                <Button variant="secondary" size="sm" onClick={drawerDisc.open}>Drawer Aç Demo</Button>
                <Button variant="primary" size="sm" onClick={() => addToast({ title: 'İşlem Başarılı', description: 'Profiliniz güncellendi.', variant: 'success' })}>
                  Toast Tetikle
                </Button>
              </div>
            </div>
          </div>

          {/* Indicators & Progress */}
          <div className="space-y-4">
            <SectionTitle title="Progress & Indicators" subtitle="Adım göstergeleri, ilerleme çubukları ve skeleton yükleyiciler." />
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <StepIndicator
                steps={[
                  { id: '1', title: 'Kişisel Bilgiler', description: 'Tamamlandı' },
                  { id: '2', title: 'Eğitim & Deneyim', description: 'Şu anki adım' },
                  { id: '3', title: 'CV Yükleme', description: 'Bekliyor' },
                ]}
                currentStep={currentStep}
                onStepClick={(s) => setCurrentStep(s)}
              />

              <Progress value={68} label="Profil Doluluk Oranı" showValue variant="burgundy" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4">
                <Skeleton variant="rectangular" />
                <Skeleton variant="card" />
                <LoadingState label="Veriler hazırlanıyor..." />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. CARDS SYSTEM SHOWCASE */}
      {activeShowcaseTab === 'cards' && (
        <div className="space-y-8 animate-fade-in">
          <SectionTitle title="Standardized Cards Library" subtitle="İş İlanı, Şirket, Etkinlik, Danışman, Duyuru ve İstatistik kartları." />

          {/* Stats Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard title="Toplam Başvurularım" value="12" subtitle="3 Değerlendirmede" change="+12%" changeType="positive" />
            <StatCard title="Favori İlanlarım" value="8" subtitle="2 Yeni eklendi" change="+5%" changeType="positive" />
            <StatCard title="Yaklaşan Etkinlik" value="2" subtitle="Bu hafta" change="Aktif" changeType="neutral" />
            <StatCard title="CV Görüntüleme" value="156" subtitle="Son 30 gün" change="+18%" changeType="positive" />
          </div>

          {/* Reference Job Cards */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">İş ve Staj İlan Kartları (Referans Görsel Birebir)</h3>
            <div className="space-y-4">
              <JobCard
                id="j1"
                companyName="ASELSAN Konya"
                title="Yazılım Mühendisi (Gömülü Sistemler)"
                workType="Tam Zamanlı"
                location="Konya"
                experience="3-5 Yıl"
                department="Bilgisayar Mühendisliği"
                deadline="15.06.2024"
                isFeatured
                isSaved
              />
              <JobCard
                id="j2"
                companyName="ROKETSAN"
                title="Sistem Mühendisi"
                workType="Tam Zamanlı"
                location="Ankara / Konya"
                experience="2-4 Yıl"
                department="Elektrik-Elektronik Mühendisliği"
                deadline="20.06.2024"
              />
            </div>
          </div>

          {/* Profile Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileCard
              name="Dr. Merve Şahin"
              title="Kariyer Danışmanı"
              department="Mühendislik & Yazılım Danışmanlığı"
              email="merve.sahin@ktun.edu.tr"
              onAppointmentClick={() => {}}
            />
          </div>

          {/* Announcements & Banner */}
          <Banner
            title="Kariyer planlamanızı bir adım öteye taşıyın!"
            description="Uzman kariyer danışmanlarımızla görüşerek hedeflerinize daha hızlı ulaşabilirsiniz."
            buttonText="Randevu Al"
            onButtonClick={() => {}}
          />
        </div>
      )}

      {/* 4. DATA TABLE STANDARD */}
      {activeShowcaseTab === 'data-table' && (
        <div className="space-y-6 animate-fade-in">
          <SectionTitle title="DataTable Standard Component" subtitle="Arama, Sıralama, Sayfalama, Filtreleme ve Sütun Gizleme hazır altyapı." />
          <DataTable columns={tableColumns} data={tableData} pageSize={3} />
        </div>
      )}

      {/* 5. ERROR PAGES SHOWCASE */}
      {activeShowcaseTab === 'errors' && (
        <div className="space-y-6 animate-fade-in">
          <SectionTitle title="Standardized Error Pages" subtitle="404, 403, 500, No Internet, Unauthorized ekran standartları." />
          <div className="flex items-center gap-2 border-b pb-3">
            {['404', '403', '500', 'no-internet', 'unauthorized'].map((err) => (
              <Button
                key={err}
                variant={activeErrorTab === err ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setActiveErrorTab(err)}
              >
                {err.toUpperCase()}
              </Button>
            ))}
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4">
            {activeErrorTab === '404' && <Error404 onGoHome={() => setActiveShowcaseTab('tokens')} />}
            {activeErrorTab === '403' && <Error403 onGoHome={() => setActiveShowcaseTab('tokens')} />}
            {activeErrorTab === '500' && <Error500 onRetry={() => {}} />}
            {activeErrorTab === 'no-internet' && <ErrorNoInternet onRetry={() => {}} />}
            {activeErrorTab === 'unauthorized' && <ErrorUnauthorized onLogin={() => {}} />}
          </div>
        </div>
      )}

      {/* Modal & Drawer Demos */}
      <Modal isOpen={modalDisc.isOpen} onClose={modalDisc.close} title="Örnek Modal Dialog" description="KTÜN Design System Standart Modal">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Bu modal diyaloğu WCAG AA erişilebilirlik standartlarına uygundur. ESC tuşu ile kapatılabilir.
        </p>
      </Modal>

      <Drawer isOpen={drawerDisc.isOpen} onClose={drawerDisc.close} title="Filtreleme Paneli">
        <FilterPanel
          sections={[
            { id: 'type', title: 'İlan Türü', options: [{ label: 'İş İlanı', value: 'job', count: 180 }, { label: 'Staj İlanı', value: 'intern', count: 65 }] }
          ]}
          selectedFilters={filters}
          onFilterChange={() => {}}
          onClearAll={() => {}}
        />
      </Drawer>
    </div>
  );
};
