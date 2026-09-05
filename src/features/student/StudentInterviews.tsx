import React, { useState } from 'react';
import { Badge } from '../../components/ui/Badge';
import { Calendar as CalendarIcon, Video, MapPin, ExternalLink } from 'lucide-react';

export interface InterviewItem {
  id: string;
  companyName: string;
  jobTitle: string;
  type: 'Online' | 'Fiziksel';
  date: string;
  time: string;
  locationOrLink: string;
  interviewerName: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export const StudentInterviews: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  const [interviews] = useState<InterviewItem[]>([
    {
      id: 'int-1',
      companyName: 'ASELSAN Konya Silah Sistemleri A.Ş.',
      jobTitle: 'Yazılım Geliştirme Mühendisi (Gömülü C++)',
      type: 'Online',
      date: '24 Mayıs 2024',
      time: '14:00 - 14:45',
      locationOrLink: 'https://teams.microsoft.com/l/meetup-join/aselsan-interview-102',
      interviewerName: 'Mehmet Yılmaz (Kıdemli İK Uzmanı)',
      status: 'Scheduled',
    },
    {
      id: 'int-2',
      companyName: 'ROKETSAN',
      jobTitle: 'Aday Mühendislik Programı (2024-2025)',
      type: 'Fiziksel',
      date: '28 Mayıs 2024',
      time: '10:30 - 11:30',
      locationOrLink: 'ROKETSAN Ankara Tesisleri A-Blok Toplantı Salonu',
      interviewerName: 'Zeynep Kaya (Teknik Lider)',
      status: 'Scheduled',
    },
    {
      id: 'int-3',
      companyName: 'HAVELSAN',
      jobTitle: 'Yazılım Stajyeri',
      type: 'Online',
      date: '10 Mayıs 2024',
      time: '15:00 - 15:30',
      locationOrLink: 'https://teams.microsoft.com/l/meetup-join/havelsan-interview-04',
      interviewerName: 'Ali Şahin',
      status: 'Completed',
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <span>Mülakatlarım & Randevu Takvimi</span>
            <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 px-2 py-0.5 rounded-full">
              {interviews.filter((i) => i.status === 'Scheduled').length} Yaklaşan Mülakat
            </span>
          </h2>
          <p className="text-xs text-slate-500">
            Firmalar tarafından planlanan online Teams mülakatlarınızı ve fiziksel görüşmelerinizi takip edin.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              viewMode === 'list' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            Liste Görünümü
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              viewMode === 'calendar' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            Takvim Görünümü
          </button>
        </div>
      </div>

      {viewMode === 'list' && (
        <div className="space-y-4">
          {interviews.map((item) => (
            <div
              key={item.id}
              className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 relative"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-navy-900 text-white font-bold flex items-center justify-center text-sm">
                    {item.type === 'Online' ? <Video className="w-5 h-5 text-emerald-400" /> : <MapPin className="w-5 h-5 text-burgundy-400" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{item.jobTitle}</h3>
                    <span className="text-xs font-semibold text-burgundy-700 block">{item.companyName}</span>
                  </div>
                </div>

                <Badge variant={item.status === 'Scheduled' ? 'success' : 'secondary'} size="sm">
                  {item.status === 'Scheduled' ? '✓ Planlandı' : 'Tamamlandı'}
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs text-slate-600 dark:text-slate-300">
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Tarih & Saat:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{item.date} ({item.time})</span>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Mülakat Şekli:</span>
                  <span className="font-bold">{item.type} Mülakat</span>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Görüşmeci / Uzman:</span>
                  <span>{item.interviewerName}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 font-medium truncate max-w-md">
                  {item.type === 'Online' ? 'Microsoft Teams Katılım Bağlantısı' : item.locationOrLink}
                </span>

                {item.type === 'Online' && item.status === 'Scheduled' && (
                  <a
                    href={item.locationOrLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                  >
                    <span>Teams Mülakatına Katıl</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {viewMode === 'calendar' && (
        <div className="p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-3">
          <CalendarIcon className="w-12 h-12 text-burgundy-700 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Mayıs 2024 Mülakat Takvimi</h3>
          <p className="text-xs text-slate-500">24 Mayıs ve 28 Mayıs tarihlerinde 2 adet aktif mülakat randevunuz bulunmaktadır.</p>
        </div>
      )}
    </div>
  );
};
