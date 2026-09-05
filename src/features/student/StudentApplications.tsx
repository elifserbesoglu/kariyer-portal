import React, { useState } from 'react';
import { CheckCircle2, Calendar } from 'lucide-react';

export interface ApplicationItem {
  id: string;
  companyName: string;
  companyLogo: string;
  jobTitle: string;
  appliedDate: string;
  currentStep: number;
  statusText: string;
  interviewDate?: string;
}

export const StudentApplications: React.FC = () => {
  const [applications] = useState<ApplicationItem[]>([
    {
      id: 'app-1',
      companyName: 'ASELSAN Konya',
      companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=120&q=80',
      jobTitle: 'Yazılım Geliştirme Mühendisi',
      appliedDate: '15 Mayıs 2024',
      currentStep: 3,
      statusText: 'Mülakat Aşamasında',
      interviewDate: '24 Mayıs 2024 - 14:00 (Online Teams)',
    },
    {
      id: 'app-2',
      companyName: 'ROKETSAN',
      companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&q=80',
      jobTitle: 'Sistem Mühendisi (Gömülü)',
      appliedDate: '10 Mayıs 2024',
      currentStep: 2,
      statusText: 'Ön Eleme & Değerlendirme',
    },
    {
      id: 'app-3',
      companyName: 'HAVELSAN',
      companyLogo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=120&q=80',
      jobTitle: 'Yapay Zeka Araştırmacısı',
      appliedDate: '01 Mayıs 2024',
      currentStep: 1,
      statusText: 'Başvuru İletildi',
    },
  ]);

  const atsSteps = [
    { step: 1, label: 'Başvuru' },
    { step: 2, label: 'Ön Eleme' },
    { step: 3, label: 'Mülakat' },
    { step: 4, label: 'Teklif' },
    { step: 5, label: 'İşe Alındı' },
  ];

  return (
    <div className="space-y-6">
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

      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl border border-slate-200 p-2 bg-white flex items-center justify-center shrink-0">
                  <img src={app.companyLogo} alt={app.companyName} className="max-h-full max-w-full object-contain" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{app.jobTitle}</h3>
                  <span className="text-xs font-semibold text-burgundy-700 block">{app.companyName}</span>
                  <span className="text-[11px] text-slate-400">Başvuru Tarihi: {app.appliedDate}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block text-xs font-bold text-burgundy-700 bg-burgundy-50 dark:bg-burgundy-950 px-3 py-1 rounded-full">
                  {app.statusText}
                </span>
                {app.interviewDate && (
                  <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 mt-1 flex items-center justify-end gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {app.interviewDate}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                ATS İlerleme Süreci (Aday Takip):
              </span>
              <div className="grid grid-cols-5 gap-2 relative">
                {atsSteps.map((s) => {
                  const isCompleted = s.step < app.currentStep;
                  const isCurrent = s.step === app.currentStep;
                  return (
                    <div key={s.step} className="text-center space-y-1.5">
                      <div
                        className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center text-xs font-bold transition-all ${
                          isCompleted
                            ? 'bg-emerald-600 text-white'
                            : isCurrent
                            ? 'bg-burgundy-700 text-white ring-4 ring-burgundy-100 dark:ring-burgundy-950'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : s.step}
                      </div>
                      <span
                        className={`text-[11px] block font-semibold ${
                          isCurrent
                            ? 'text-burgundy-700 dark:text-burgundy-400 font-extrabold'
                            : isCompleted
                            ? 'text-slate-700 dark:text-slate-300'
                            : 'text-slate-400'
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
