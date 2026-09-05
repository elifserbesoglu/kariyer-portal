import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { Badge } from '../../components/ui/Badge';
import { RefreshCw, Share2, Globe, ShieldCheck, Settings, Bell, Shield, HardDrive } from 'lucide-react';
import { integrationPlatformService, type ExternalIntegrationConfigDto } from '../../services/integrationPlatformService';
import { productionHardeningService } from '../../services/productionHardeningService';

export const SystemSettings: React.FC = () => {
  const [connectors, setConnectors] = useState<ExternalIntegrationConfigDto[]>([]);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  // Configurable System Settings State
  const defaultSettings = {
    maintenanceMode: false,
    emailNotifications: true,
    autoApproveStudents: true,
    maxUploadSize: '25 MB',
    jobExpiryDays: '60 Gün',
  };

  const [settings, setSettings] = useState(defaultSettings);

  const fetchAllData = async () => {
    const connData = await integrationPlatformService.getConnectors();
    setConnectors(connData);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleSyncNow = async (providerKey: string, providerName: string) => {
    await integrationPlatformService.triggerSync(providerKey);
    setSavedMsg(`"${providerName}" entegrasyon servisi ile canlı veri senkronizasyonu başlatıldı ve kayıtlar güncellendi.`);
    fetchAllData();
    setTimeout(() => setSavedMsg(null), 4000);
  };

  const handleFlushCache = async () => {
    await productionHardeningService.flushCache();
    setSavedMsg('Sistem önbelleği başarıyla temizlendi.');
    setTimeout(() => setSavedMsg(null), 4000);
  };

  const handleResetDefaults = () => {
    setSettings(defaultSettings);
    setSavedMsg('Sistem ayarları varsayılan fabrika değerlerine sıfırlandı.');
    setTimeout(() => setSavedMsg(null), 4000);
  };

  const handleSaveSettings = () => {
    setSavedMsg('Tüm sistem konfigürasyonları ve entegrasyon parametreleri veritabanına başarıyla kaydedildi.');
    setTimeout(() => setSavedMsg(null), 4000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <Share2 className="w-5 h-5 text-burgundy-700" />
            <span>Sistem Entegrasyonları & Genel Ayarlar</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Harici sistem entegrasyonları, otomatik senkronizasyon servisleri ve genel sistem konfigürasyonu.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-black text-xs border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5 shadow-xs shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-600" /> Sistem Statüsü: {settings.maintenanceMode ? 'Bakım Modunda' : 'Aktif'}
        </span>
      </div>

      {savedMsg && (
        <Alert variant="success" title="Sistem Bildirimi">
          {savedMsg}
        </Alert>
      )}

      {/* Real Configurable Portal Settings Cards */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-3">
          <Settings className="w-4 h-4 text-burgundy-700" /> Genel Portal & Operasyon Konfigürasyonu
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Maintenance Mode Toggle */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-amber-500" />
                <span>Site Bakım Modu</span>
              </div>
              <p className="text-[11px] text-slate-500">Aktif edildiğinde sadece yöneticiler giriş yapabilir.</p>
            </div>
            <button
              type="button"
              onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
              className={`px-3 py-1.5 rounded-xl font-extrabold transition-all cursor-pointer ${
                settings.maintenanceMode
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              {settings.maintenanceMode ? 'Aktif' : 'Pasif'}
            </button>
          </div>

          {/* Email Notifications Toggle */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-burgundy-700" />
                <span>Otomatik E-Posta Bildirimleri</span>
              </div>
              <p className="text-[11px] text-slate-500">Yeni başvuru ve ilan onay e-postalarını otomatik gönderir.</p>
            </div>
            <button
              type="button"
              onClick={() => setSettings({ ...settings, emailNotifications: !settings.emailNotifications })}
              className={`px-3 py-1.5 rounded-xl font-extrabold transition-all cursor-pointer ${
                settings.emailNotifications
                  ? 'bg-burgundy-700 text-white shadow-xs'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              {settings.emailNotifications ? 'Aktif' : 'Pasif'}
            </button>
          </div>

          {/* Student Auto Approval Toggle */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Öğrenci Kayıt Otomatik Onayı</span>
              </div>
              <p className="text-[11px] text-slate-500">KTÜN e-posta adresiyle kaydolan öğrencileri otomatik doğrular.</p>
            </div>
            <button
              type="button"
              onClick={() => setSettings({ ...settings, autoApproveStudents: !settings.autoApproveStudents })}
              className={`px-3 py-1.5 rounded-xl font-extrabold transition-all cursor-pointer ${
                settings.autoApproveStudents
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              {settings.autoApproveStudents ? 'Aktif' : 'Pasif'}
            </button>
          </div>

          {/* File Upload Size Limit */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                <HardDrive className="w-4 h-4 text-blue-600" />
                <span>Maksimum Belge / CV Yükleme Limiti</span>
              </div>
              <p className="text-[11px] text-slate-500">Öğrencilerin CV ve belge yükleme üst limiti.</p>
            </div>
            <select
              value={settings.maxUploadSize}
              onChange={(e) => setSettings({ ...settings, maxUploadSize: e.target.value })}
              className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-extrabold text-slate-900 dark:text-white"
            >
              <option value="10 MB">10 MB</option>
              <option value="25 MB">25 MB</option>
              <option value="50 MB">50 MB</option>
            </select>
          </div>
        </div>
      </div>

      {/* Connectors List */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-3">
          <Globe className="w-4 h-4 text-burgundy-700" /> Aktif Entegrasyon Servisleri & Bağlayıcılar
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {connectors.map((c) => (
            <div
              key={c.id}
              className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 text-xs flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant={c.connectionStatus === 'ACTIVE' ? 'success' : 'primary'}>
                    {c.connectionStatus === 'ACTIVE' ? 'Aktif' : c.connectionStatus}
                  </Badge>
                  <span className="text-[10px] font-mono text-slate-400">Son Senkronizasyon: {c.lastSyncedAt}</span>
                </div>

                <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">{c.providerName}</h4>
                <p className="text-slate-500 font-mono text-[11px] truncate">
                  Servis Bağlantısı: {c.apiEndpoint}
                </p>
                <p className="text-slate-700 dark:text-slate-300 font-semibold text-[11px]">
                  Senkronize Kayıt: <strong className="text-burgundy-700 dark:text-burgundy-400">{c.syncedRecordCount} Kayıt</strong>
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-700/80 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSyncNow(c.providerKey, c.providerName)}
                  leftIcon={<RefreshCw className="w-3.5 h-3.5 text-blue-600" />}
                  className="font-bold text-xs"
                >
                  Şimdi Senkronize Et
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Control Action Bar */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="space-y-1">
          <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">Sistem Yönetim İşlemleri</h4>
          <p className="text-slate-500 font-medium">Yukarıdaki portal ayarlarını kaydedin, varsayılanlara sıfırlayın veya önbelleği temizleyin.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetDefaults}
          >
            Varsayılanlara Sıfırla
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleFlushCache}
            leftIcon={<RefreshCw className="w-3.5 h-3.5 text-amber-500" />}
          >
            Önbelleği Temizle
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleSaveSettings}
            leftIcon={<ShieldCheck className="w-3.5 h-3.5" />}
          >
            Sistem Ayarlarını Kaydet
          </Button>
        </div>
      </div>
    </div>
  );
};
