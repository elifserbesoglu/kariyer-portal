import React from 'react';
import { useWorkflow } from '../../context/WorkflowContext';
import type { WorkflowApplication } from '../../context/WorkflowContext';

export const StudentApplications: React.FC = () => {
  const { applications: wfApplications } = useWorkflow();

  const allApplications = React.useMemo(() => {
    const list: Array<{
      id: string;
      companyName: string;
      jobTitle: string;
      appliedDate: string;
      stage: WorkflowApplication['stage'];
    }> = [
      {
        id: 'app-1',
        companyName: 'ASELSAN Konya Silah Sistemleri A.Ş.',
        jobTitle: 'Yazılım Geliştirme Mühendisi (Gömülü C++)',
        appliedDate: '15.05.2024',
        stage: 'interview',
      },
      {
        id: 'app-2',
        companyName: 'ROKETSAN',
        jobTitle: 'Sistem Mühendisi (Gömülü)',
        appliedDate: '10.05.2024',
        stage: 'screening',
      },
      {
        id: 'app-3',
        companyName: 'HAVELSAN',
        jobTitle: 'Yapay Zeka Araştırmacısı',
        appliedDate: '01.05.2024',
        stage: 'applied',
      },
    ];

    // Merge live workflow applications ensuring uniqueness
    if (wfApplications && wfApplications.length > 0) {
      wfApplications.forEach((wfApp) => {
        const idx = list.findIndex((l) => l.id === wfApp.id);
        if (idx >= 0) {
          list[idx] = {
            ...list[idx],
            stage: wfApp.stage,
            jobTitle: wfApp.jobTitle || list[idx].jobTitle,
            companyName: wfApp.companyName || list[idx].companyName,
          };
        } else {
          list.push({
            id: wfApp.id,
            companyName: wfApp.companyName || 'ASELSAN Konya',
            jobTitle: wfApp.jobTitle || 'İlan Başvurusu',
            appliedDate: wfApp.appliedDate || 'Bugün',
            stage: wfApp.stage,
          });
        }
      });
    }

    return list;
  }, [wfApplications]);

  const getStageConfig = (stage: string) => {
    switch (stage) {
      case 'hired':
        return {
          text: 'İşe Alındı',
          badgeClass: 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold text-xs px-3.5 py-1.5',
          icon: '✓ ',
        };
      case 'interview_rejected':
        return {
          text: 'Aday Reddedildi',
          badgeClass: 'bg-rose-100 text-rose-800 border border-rose-300 font-extrabold text-xs px-3.5 py-1.5',
          icon: '✕ ',
        };
      default:
        return {
          text: 'Değerlendirme Aşamasında',
          badgeClass: 'bg-amber-50 text-amber-800 border border-amber-200 font-bold text-xs px-3 py-1.5',
          icon: '⏳ ',
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Başvurularım
          </h2>
          <p className="text-xs text-slate-500">
            Gönderdiğiniz iş ve staj başvurularının güncel durumunu inceleyin.
          </p>
        </div>
      </div>

      {/* Simplified Applications Cards List */}
      <div className="space-y-3">
        {allApplications.map((app) => {
          const cfg = getStageConfig(app.stage);

          return (
            <div
              key={app.id}
              className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl border border-slate-200 dark:border-slate-700 p-2 bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 font-black text-burgundy-700 text-base shadow-2xs">
                  {app.companyName.substring(0, 2).toUpperCase()}
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">{app.jobTitle}</h3>
                  <span className="text-xs font-bold text-burgundy-700 dark:text-burgundy-400 block">{app.companyName}</span>
                  <span className="text-[11px] text-slate-400 font-medium block">Başvuru Tarihi: {app.appliedDate}</span>
                </div>
              </div>

              <div className="flex items-center sm:justify-end">
                <span className={`inline-flex items-center gap-1 rounded-full ${cfg.badgeClass}`}>
                  <span>{cfg.icon}</span>
                  <span>{cfg.text}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
