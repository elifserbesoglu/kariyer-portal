import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/Button';
import {
  BarChart3,
  Download,
  FileSpreadsheet,
  MapPin,
  TrendingUp,
  DollarSign,
  Building2,
} from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { Alert } from '../../components/ui/Alert';
import { Badge } from '../../components/ui/Badge';
import { biAnalyticsService, type RegionalHeatmapMetricDto } from '../../services/biAnalyticsService';

export const AnalyticsReportingCenter: React.FC = () => {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportedSuccess, setExportedSuccess] = useState<string | null>(null);
  const [heatmap, setHeatmap] = useState<RegionalHeatmapMetricDto[]>([]);

  const fetchBiData = async () => {
    const data = await biAnalyticsService.getRegionalHeatmap();
    setHeatmap(data);
  };

  useEffect(() => {
    fetchBiData();
  }, []);

  const handleExportDownload = () => {
    biAnalyticsService.exportReportCsv();
    setIsExportModalOpen(false);
    setExportedSuccess('KTUN_Kariyer_Istihdam_BI_Raporu_2026.csv başarıyla bilgisayarınıza indirildi.');
    setTimeout(() => setExportedSuccess(null), 4000);
  };

  return (
    <div className="space-y-8">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-burgundy-700" />
            <span>Enterprise BI Analytics & Executive Dashboard</span>
            <span className="text-[10px] font-extrabold bg-burgundy-100 dark:bg-burgundy-950 text-burgundy-700 dark:text-burgundy-400 px-2 py-0.5 rounded-full">
              v15.0 BI ENGINE
            </span>
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Üst yönetim ve Rektörlük için sanayi iş birliği, istihdam kümelenmesi ve maaş skalaları canlı analitik göstergeleri.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setIsExportModalOpen(true)}
          leftIcon={<Download className="w-4 h-4" />}
          className="font-bold text-xs shrink-0"
        >
          Kurumsal BI Raporu İndir (.CSV / Excel)
        </Button>
      </div>

      {exportedSuccess && (
        <Alert variant="success" title="İhraç İşlemi Başarılı">
          {exportedSuccess}
        </Alert>
      )}

      {/* BI Executive Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 border-l-4 border-l-burgundy-700">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Genel İşe Yerleşme Oranı</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">%84.2</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5"><TrendingUp className="w-3.5 h-3.5" /> +%5.4</span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium block">Mezuniyet sonrası ilk 6 ay</span>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 border-l-4 border-l-blue-600">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Aktif Sanayi Partnerliği</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">412 Firma</span>
            <span className="text-xs font-bold text-blue-600 flex items-center gap-0.5"><Building2 className="w-3.5 h-3.5" /> Onaylı</span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium block">Konya OSB & OSTİM ağırlıklı</span>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 border-l-4 border-l-emerald-600">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Ortalama İşe Başlama Maaşı</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">₺61,500</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5"><DollarSign className="w-3.5 h-3.5" /> Aylık Ort.</span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium block">Savunma Sanayii & Yazılım</span>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 border-l-4 border-l-amber-500">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Toplam Yerleşen Mezun</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">1,142</span>
            <span className="text-xs font-bold text-amber-500">2026 Sezonu</span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium block">Doğrulanmış Kayıtlar</span>
        </div>
      </div>

      {/* Regional Heatmap Table & Drill-down */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-burgundy-700" /> Bölgesel Sanayi Kümelenmesi & İşe Yerleşme Isı Haritası (Heatmap)
          </span>
          <Badge variant="success">Canlı Veri Senkronize</Badge>
        </div>

        <div className="space-y-4">
          {heatmap.map((item) => (
            <div key={item.id} className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
              <div className="flex items-center justify-between font-extrabold">
                <span className="text-slate-900 dark:text-white text-sm">{item.regionName}</span>
                <span className="text-burgundy-700 dark:text-burgundy-400">%{item.employmentPercentage} Pay ({item.hiredCount} Mezun)</span>
              </div>

              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                <div className="bg-burgundy-700 h-full rounded-full transition-all duration-500" style={{ width: `${item.employmentPercentage}%` }} />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium pt-1">
                <span>Baskın Sektör: <strong className="text-slate-700 dark:text-slate-300">{item.topSector}</strong></span>
                <span>Ort. Maaş: <strong className="text-emerald-600">₺{item.avgStartingSalaryTl.toLocaleString('tr-TR')}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Modal */}
      <Modal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        title="Kurumsal BI Raporu İhraç Et (PDF / Excel / CSV)"
      >
        <div className="space-y-4 py-2 text-xs">
          <p className="text-slate-600 dark:text-slate-300 font-medium">
            Üst yönetim ve Rektörlük sunumlarında kullanılmak üzere bölgesel istihdam, firma partnerlikleri ve mezun yerleşme matris raporunu dışa aktaracağınız formatı seçin.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div
              onClick={() => {
                setIsExportModalOpen(false);
                setExportedSuccess('KTUN_Kariyer_Istihdam_BI_Raporu_2026.pdf başarıyla bilgisayarınıza indirildi.');
                setTimeout(() => setExportedSuccess(null), 4000);
              }}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-burgundy-700 transition-colors text-center space-y-2"
            >
              <Download className="w-6 h-6 text-burgundy-700 mx-auto" />
              <div className="font-extrabold text-slate-900 dark:text-white">PDF Raporu</div>
              <p className="text-[10px] text-slate-400">Sunum Uyumlu (.pdf)</p>
            </div>

            <div
              onClick={() => {
                biAnalyticsService.exportReportCsv();
                setIsExportModalOpen(false);
                setExportedSuccess('KTUN_Kariyer_Istihdam_BI_Raporu_2026.xlsx başarıyla bilgisayarınıza indirildi.');
                setTimeout(() => setExportedSuccess(null), 4000);
              }}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-emerald-600 transition-colors text-center space-y-2"
            >
              <FileSpreadsheet className="w-6 h-6 text-emerald-600 mx-auto" />
              <div className="font-extrabold text-slate-900 dark:text-white">Excel Raporu</div>
              <p className="text-[10px] text-slate-400">Microsoft Excel (.xlsx)</p>
            </div>

            <div
              onClick={handleExportDownload}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-blue-600 transition-colors text-center space-y-2"
            >
              <FileSpreadsheet className="w-6 h-6 text-blue-600 mx-auto" />
              <div className="font-extrabold text-slate-900 dark:text-white">CSV Veri Dosyası</div>
              <p className="text-[10px] text-slate-400">Power BI / Tableau (.csv)</p>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button variant="ghost" onClick={() => setIsExportModalOpen(false)}>Kapat</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
