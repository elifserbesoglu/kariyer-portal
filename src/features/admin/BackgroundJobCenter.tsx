import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Cpu, Play, RefreshCw } from 'lucide-react';

export interface BackgroundJob {
  id: string;
  name: string;
  type: 'Mail' | 'Notification' | 'Export' | 'AuditCleanup' | 'FileCleanup' | 'Reminder';
  status: 'Processing' | 'Completed' | 'Pending' | 'Failed';
  scheduledTime: string;
  executionDuration: string;
  details: string;
}

export const BackgroundJobCenter: React.FC = () => {
  const [jobs, setJobs] = useState<BackgroundJob[]>([
    {
      id: 'job-101',
      name: 'Toplu Duyuru E-postası Gönderimi (Bilgisayar Müh. 3. Sınıf)',
      type: 'Mail',
      status: 'Processing',
      scheduledTime: '15.05.2024 15:30',
      executionDuration: '45 sn',
      details: '420 öğrenciye ASELSAN staj duyurusu iletiliyor (%78 tamamlandı).',
    },
    {
      id: 'job-102',
      name: 'Haftalık Sistem Audit Log Arşivlemesi',
      type: 'AuditCleanup',
      status: 'Completed',
      scheduledTime: '15.05.2024 03:00',
      executionDuration: '1.2 dk',
      details: '50.000 eski log kaydı güvenli Cold Storage kasanıza taşındı.',
    },
    {
      id: 'job-103',
      name: 'Mülakat Hatırlatma Bildirimi Tetikleyici',
      type: 'Reminder',
      status: 'Completed',
      scheduledTime: '15.05.2024 09:00',
      executionDuration: '12 sn',
      details: 'Bugünkü mülakatı olan 6 öğrenciye SMS ve mobil push iletildi.',
    },
  ]);

  const handleRunJob = (id: string) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, status: 'Processing', details: 'Manuel tetiklendi, yürütülüyor...' } : j))
    );
    setTimeout(() => {
      setJobs((prev) =>
        prev.map((j) => (j.id === id ? { ...j, status: 'Completed', details: 'Görev başarıyla tamamlandı.' } : j))
      );
    }, 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <Cpu className="w-5 h-5 text-burgundy-700" />
            <span>Arka Plan Görev Kuyruğu & Asenkron İşlem Merkezi</span>
          </h2>
          <p className="text-xs text-slate-500">
            E-posta iletileri, toplu bildirimler, dosya temizliği ve zamanlanmış rapor görevlerinin durumunu takip edin.
          </p>
        </div>

        <Button variant="outline" size="sm" leftIcon={<RefreshCw className="w-4 h-4" />}>
          Kuyruğu Yenile
        </Button>
      </div>

      <div className="space-y-3">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <span>{job.name}</span>
                <Badge
                  variant={job.status === 'Completed' ? 'success' : job.status === 'Processing' ? 'warning' : 'secondary'}
                  size="sm"
                >
                  {job.status === 'Processing' ? '⚙ İşleniyor...' : job.status === 'Completed' ? '✓ Tamamlandı' : 'Bekliyor'}
                </Badge>
              </div>
              <p className="text-slate-600 dark:text-slate-300 font-medium">{job.details}</p>
              <div className="text-[11px] text-slate-400">
                Planlanan Zaman: {job.scheduledTime} • Çalışma Süresi: {job.executionDuration}
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRunJob(job.id)}
              leftIcon={<Play className="w-3.5 h-3.5 text-emerald-600" />}
              className="shrink-0"
            >
              Yeniden Çalıştır
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
