import React, { useState } from 'react';
import { Terminal } from 'lucide-react';

export interface SystemLogEntry {
  id: string;
  category: 'Audit' | 'Application' | 'Security' | 'Error' | 'System';
  timestamp: string;
  source: string;
  user: string;
  message: string;
  ipAddress: string;
}

export const CategorizedLogCenter: React.FC = () => {
  const [activeLogTab, setActiveLogTab] = useState<'Audit' | 'Application' | 'Security' | 'Error' | 'System'>('Audit');

  const [logEntries] = useState<SystemLogEntry[]>([
    {
      id: 'log-1',
      category: 'Audit',
      timestamp: '15.05.2024 14:30:12',
      source: 'WorkflowContext',
      user: 'kariyer@ktun.edu.tr',
      message: 'EMPLOYER_APPROVED: ASELSAN Konya VKN onaylandı.',
      ipAddress: '193.140.230.15',
    },
    {
      id: 'log-2',
      category: 'Security',
      timestamp: '15.05.2024 14:28:05',
      source: 'AuthGuard',
      user: 'unknown@ktun.edu.tr',
      message: 'FAILED_LOGIN_ATTEMPT: Hatalı parola 3. deneme.',
      ipAddress: '193.140.230.88',
    },
    {
      id: 'log-3',
      category: 'Application',
      timestamp: '15.05.2024 14:15:00',
      source: 'PdfExporter',
      user: 'emre.tunc@ogr.ktun.edu.tr',
      message: 'CV_PDF_GENERATED: ATS formatında PDF indirildi.',
      ipAddress: '193.140.230.12',
    },
    {
      id: 'log-4',
      category: 'Error',
      timestamp: '15.05.2024 13:00:22',
      source: 'SmtpClient',
      user: 'system@ktun.edu.tr',
      message: 'SMTP_TIMEOUT_WARN: Mail sunucusuna 2000ms gecikmeli bağlandı.',
      ipAddress: '127.0.0.1',
    },
    {
      id: 'log-5',
      category: 'System',
      timestamp: '15.05.2024 03:00:00',
      source: 'CronRunner',
      user: 'system@ktun.edu.tr',
      message: 'BACKGROUND_JOB_FINISHED: 50.000 eski audit log arşivlendi.',
      ipAddress: '127.0.0.1',
    },
  ]);

  const filteredLogs = logEntries.filter((l) => l.category === activeLogTab);

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <Terminal className="w-5 h-5 text-burgundy-700" />
            <span>Kategorize Edilmiş Sistem Log Yönetim Merkezi</span>
          </h2>
          <p className="text-xs text-slate-500">
            Audit Log, Uygulama Logları, Güvenlik İhlal Kayıtları, Hata Logları ve Sistem Loglarını ayrıştırılmış kanallarda inceleyin.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs font-bold border-b border-slate-100 dark:border-slate-800 pb-3">
        {(['Audit', 'Application', 'Security', 'Error', 'System'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveLogTab(cat)}
            className={`px-3.5 py-1.5 rounded-xl transition-colors ${
              activeLogTab === cat ? 'bg-burgundy-700 text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {cat} Logs ({logEntries.filter((l) => l.category === cat).length})
          </button>
        ))}
      </div>

      <div className="space-y-2 font-mono text-xs">
        {filteredLogs.map((log) => (
          <div
            key={log.id}
            className="p-3 bg-slate-900 text-slate-200 rounded-xl border border-slate-800 space-y-1"
          >
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>[{log.timestamp}] — Source: {log.source} — IP: {log.ipAddress}</span>
              <span className="text-burgundy-400 font-bold">{log.user}</span>
            </div>
            <div className="text-emerald-400 leading-relaxed">{log.message}</div>
          </div>
        ))}

        {filteredLogs.length === 0 && (
          <div className="p-8 text-center text-slate-500 text-xs">
            Bu kategoride henüz kaydedilmiş log bulunmamaktadır.
          </div>
        )}
      </div>
    </div>
  );
};
