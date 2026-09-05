import React, { useState } from 'react';
import { Activity, User, Building2, Briefcase, Calendar } from 'lucide-react';

export interface ActivityStreamItem {
  id: string;
  user: string;
  actorRole: string;
  action: string;
  timestamp: string;
  iconType: 'user' | 'company' | 'job' | 'event';
}

export const SystemActivityFeed: React.FC = () => {
  const [activities] = useState<ActivityStreamItem[]>([
    { id: 'act-1', user: 'Emre Tunç (Öğrenci)', actorRole: 'Student', action: 'ASELSAN Konya Gömülü C++ ilanına yeni başvuru yaptı.', timestamp: '2 dk önce', iconType: 'user' },
    { id: 'act-2', user: 'ASELSAN Konya İK', actorRole: 'Employer', action: 'Otonom Yazılım Stajyeri pozisyonu için yeni ilan oluşturdu.', timestamp: '15 dk önce', iconType: 'job' },
    { id: 'act-3', user: 'Dr. Mehmet Şahin', actorRole: 'CareerCenter', action: 'Yeni Teknoloji Ltd. kurumsal vergi kimliğini onayladı.', timestamp: '1 saat önce', iconType: 'company' },
    { id: 'act-4', user: 'Zeynep Arslan', actorRole: 'CareerCenter', action: 'KTÜN 5. Savunma Sanayii Kariyer Günü etkinliğini yayınladı.', timestamp: '3 saat önce', iconType: 'event' },
  ]);

  const getIcon = (type: ActivityStreamItem['iconType']) => {
    switch (type) {
      case 'user': return <User className="w-4 h-4 text-blue-500" />;
      case 'company': return <Building2 className="w-4 h-4 text-burgundy-700" />;
      case 'job': return <Briefcase className="w-4 h-4 text-emerald-600" />;
      case 'event': return <Calendar className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
          <Activity className="w-4 h-4 text-burgundy-700" />
          <span>Canlı Sistem Aktivite Akışı (Real-Time Activity Feed)</span>
        </h3>
        <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
          ● Canlı Yayın
        </span>
      </div>

      <div className="space-y-3">
        {activities.map((act) => (
          <div
            key={act.id}
            className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3 text-xs"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border">
                {getIcon(act.iconType)}
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white block">{act.user}</strong>
                <span className="text-slate-600 dark:text-slate-300">{act.action}</span>
              </div>
            </div>
            <span className="text-[10px] text-slate-400 font-mono shrink-0">{act.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
