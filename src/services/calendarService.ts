import { apiClient } from './apiClient';

export interface CalendarEventDto {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  eventType: 'INTERVIEW' | 'MENTORSHIP' | 'CAREER_FAIR' | 'WEBINAR';
  organizerEmail: string;
  attendeeEmail: string;
  externalMeetingUrl: string;
  reminderSent: boolean;
  reminderMinutesBefore: number;
}

export const calendarService = {
  getUserEvents: async (userEmail: string = 'emre.tunc@ogr.ktun.edu.tr'): Promise<CalendarEventDto[]> => {
    try {
      const response = await apiClient.get<CalendarEventDto[]>(`/v1/calendar/events?userEmail=${encodeURIComponent(userEmail)}`);
      if (response.isSuccess && response.data) {
        return response.data;
      }
    } catch {
      // Fallback Data
    }

    return [
      {
        id: 'evt-1',
        title: 'ASELSAN Konya Gömülü C++ İK & Teknik Mülakatı',
        description: 'Emre Tunç ile Teams üzerinden birebir aday mühendislik mülakatı.',
        startTime: '06 Ağustos 2026 10:00',
        endTime: '06 Ağustos 2026 11:00',
        location: 'Microsoft Teams - Online',
        eventType: 'INTERVIEW',
        organizerEmail: 'ik@aselsankonya.com.tr',
        attendeeEmail: userEmail,
        externalMeetingUrl: 'https://teams.microsoft.com/l/meetup-join/aselsan-interview-101',
        reminderSent: true,
        reminderMinutesBefore: 30,
      },
      {
        id: 'evt-2',
        title: 'Mezun Mentörlük Oturumu — Ahmet Yılmaz',
        description: 'Savunma sanayii kariyer tavsiyeleri ve kod inceleme oturumu.',
        startTime: '07 Ağustos 2026 14:00',
        endTime: '07 Ağustos 2026 15:00',
        location: 'Online - Teams',
        eventType: 'MENTORSHIP',
        organizerEmail: 'ahmet.yilmaz@aselsankonya.com.tr',
        attendeeEmail: userEmail,
        externalMeetingUrl: 'https://teams.microsoft.com/l/meetup-join/ktun-mentorship-101',
        reminderSent: false,
        reminderMinutesBefore: 15,
      },
    ];
  },

  exportIcsFile: (event: CalendarEventDto) => {
    const csStr = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//KTUN Kariyer Portali//Enterprise Calendar//TR
BEGIN:VEVENT
UID:${event.id}@ktun.edu.tr
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([csStr], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.id}_event.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  getGoogleCalendarLink: (event: CalendarEventDto) => {
    const title = encodeURIComponent(event.title);
    const details = encodeURIComponent(event.description);
    const location = encodeURIComponent(event.location);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  },

  getOutlookCalendarLink: (event: CalendarEventDto) => {
    const title = encodeURIComponent(event.title);
    const body = encodeURIComponent(event.description);
    const location = encodeURIComponent(event.location);
    return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&body=${body}&location=${location}`;
  },
};
