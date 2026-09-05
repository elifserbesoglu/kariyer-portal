import React from 'react';
import { Lock, Sparkles } from 'lucide-react';

export interface BadgeItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}

export const StudentGamificationBadges: React.FC = () => {
  const badges: BadgeItem[] = [
    { id: 'b1', title: 'İlk Başvuru', description: 'Portaldaki ilk iş/staj başvurusunu tamamladın.', icon: '🚀', earned: true, earnedDate: '10.05.2024' },
    { id: 'b2', title: 'İlk CV', description: 'ATS uyumlu profesyonel özgeçmişini oluşturdun.', icon: '📄', earned: true, earnedDate: '12.05.2024' },
    { id: 'b3', title: 'Profil %100', description: 'Kişisel ve akademik bilgilerini eksiksiz tamamladın.', icon: '🌟', earned: true, earnedDate: '14.05.2024' },
    { id: 'b4', title: '10 Başvuru', description: 'Kariyer yolunda 10 farklı aktif ilana başvurdun.', icon: '🎯', earned: false },
    { id: 'b5', title: 'İlk Mülakat', description: 'Bir firmadan resmi mülakat çağrısı aldın.', icon: '💼', earned: true, earnedDate: '15.05.2024' },
    { id: 'b6', title: 'İlk İşe Yerleşme', description: 'Kariyer Portalı üzerinden staj veya iş teklifini kabul ettin.', icon: '🏆', earned: false },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-burgundy-700" />
          <span>Kariyer Rozetlerim & Başarılarım</span>
        </h3>
        <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 px-2 py-0.5 rounded-full">
          {badges.filter((b) => b.earned).length} / {badges.length} Kazanıldı
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`p-3.5 rounded-2xl border text-center space-y-2 relative transition-all ${
              badge.earned
                ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900'
                : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60'
            }`}
          >
            <div className="text-3xl">{badge.icon}</div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{badge.title}</h4>
              <p className="text-[10px] text-slate-500 line-clamp-2 mt-0.5">{badge.description}</p>
            </div>

            {badge.earned ? (
              <span className="text-[9px] font-bold text-emerald-600 block pt-1 border-t border-emerald-100 dark:border-emerald-900">
                ✓ {badge.earnedDate}
              </span>
            ) : (
              <span className="text-[9px] font-bold text-slate-400 block pt-1 border-t border-slate-200 dark:border-slate-800 flex items-center justify-center gap-0.5">
                <Lock className="w-2.5 h-2.5" /> Kilitli
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
