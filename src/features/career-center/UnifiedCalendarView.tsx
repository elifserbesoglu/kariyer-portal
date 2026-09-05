import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Download, ExternalLink, Clock, Bell, Video, Users } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { calendarService, type CalendarEventDto } from '../../services/calendarService';
import { useAuth } from '../../context/AuthContext';

export const UnifiedCalendarView: React.FC = () => {
  const { user } = useAuth();
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [events, setEvents] = useState<CalendarEventDto[]>([]);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const fetchCalendarEvents = async () => {
    const data = await calendarService.getUserEvents(user?.email || 'emre.tunc@ogr.ktun.edu.tr');
    setEvents(data);
  };

  useEffect(() => {
    fetchCalendarEvents();
  }, [user]);

  const handleExportIcs = (evt: CalendarEventDto) => {
    calendarService.exportIcsFile(evt);
    setToastMsg(`"${evt.title}" etkinliği .ics takvim dosyası olarak indirildi.`);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const filteredEvents = events.filter((e) => {
    if (filterCategory === 'ALL') return true;
    return e.eventType === filterCategory;
  });

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-burgundy-700" />
            <span>Ortak Etkinlik & Mülakat Takvimi</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Mülakatlarınızı, firma sunumlarını ve kariyer fuarlarını takvim üzerinden takip edin.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => setFilterCategory('ALL')}
            className={`px-3 py-1 rounded-lg transition-colors ${filterCategory === 'ALL' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'}`}
          >
            Tümü ({events.length})
          </button>
          <button
            onClick={() => setFilterCategory('INTERVIEW')}
            className={`px-3 py-1 rounded-lg transition-colors ${filterCategory === 'INTERVIEW' ? 'bg-white dark:bg-slate-700 text-amber-600 shadow-xs' : 'text-slate-500'}`}
          >
            Mülakatlar
          </button>
          <button
            onClick={() => setFilterCategory('MENTORSHIP')}
            className={`px-3 py-1 rounded-lg transition-colors ${filterCategory === 'MENTORSHIP' ? 'bg-white dark:bg-slate-700 text-burgundy-700 shadow-xs' : 'text-slate-500'}`}
          >
            Mentörlük
          </button>
        </div>
      </div>

      {toastMsg && (
        <Alert variant="success" title="Takvim İhracı">
          {toastMsg}
        </Alert>
      )}

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 text-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
              <div className="flex items-center gap-2">
                <Badge variant={evt.eventType === 'INTERVIEW' ? 'warning' : 'primary'}>
                  {evt.eventType === 'INTERVIEW' ? 'Mülakat Oturumu' : 'Mentörlük Görüşmesi'}
                </Badge>
                <span className="font-extrabold text-slate-900 dark:text-white text-sm">
                  {evt.title}
                </span>
              </div>

              {/* Reminder Badge */}
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                <Bell className="w-3 h-3" /> {evt.reminderMinutesBefore} Dk Önce Otomatik Hatırlatılacak
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-slate-700 dark:text-slate-300 font-medium">
                {evt.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-slate-500 font-semibold text-xs pt-1">
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-burgundy-700" /> Zaman: {evt.startTime} - {evt.endTime}</span>
                <span className="flex items-center gap-1.5"><Video className="w-3.5 h-3.5 text-blue-600" /> Konum: {evt.location}</span>
                <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-emerald-600" /> Katılımcı: {evt.attendeeEmail}</span>
              </div>
            </div>

            {/* Sync & Export Action Bar */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-3">
              <a
                href={evt.externalMeetingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-burgundy-700 hover:bg-burgundy-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Video className="w-3.5 h-3.5" /> Teams Toplantısına Katıl
              </a>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExportIcs(evt)}
                  leftIcon={<Download className="w-3.5 h-3.5 text-emerald-600" />}
                  className="font-bold text-xs"
                >
                  .ICS Dosyası İndir
                </Button>
                <a
                  href={calendarService.getGoogleCalendarLink(evt)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-xs flex items-center gap-1 transition-colors"
                >
                  Google Calendar <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
                <a
                  href={calendarService.getOutlookCalendarLink(evt)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-xs flex items-center gap-1 transition-colors"
                >
                  Outlook <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
