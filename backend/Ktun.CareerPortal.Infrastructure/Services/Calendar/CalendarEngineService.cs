using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ktun.CareerPortal.Domain.Entities;
using Ktun.CareerPortal.Infrastructure.Services.Calendar.Providers;

namespace Ktun.CareerPortal.Infrastructure.Services.Calendar
{
    public class CalendarEngineService
    {
        private readonly Dictionary<string, ICalendarProvider> _providers;
        private readonly List<CalendarEvent> _eventsStore;

        public CalendarEngineService()
        {
            _providers = new Dictionary<string, ICalendarProvider>
            {
                { "ics", new IcsExportCalendarProvider() },
                { "google", new GoogleCalendarProvider() },
                { "outlook", new OutlookCalendarProvider() }
            };

            _eventsStore = new List<CalendarEvent>
            {
                new CalendarEvent
                {
                    Id = "evt-1",
                    Title = "ASELSAN Konya Gömülü C++ İK & Teknik Mülakatı",
                    Description = "Emre Tunç ile Teams üzerinden birebir aday mühendislik mülakatı.",
                    StartTime = DateTime.UtcNow.AddDays(1).AddHours(10),
                    EndTime = DateTime.UtcNow.AddDays(1).AddHours(11),
                    Location = "Microsoft Teams - Online",
                    EventType = "INTERVIEW",
                    OrganizerEmail = "ik@aselsankonya.com.tr",
                    AttendeeEmail = "emre.tunc@ogr.ktun.edu.tr",
                    ExternalMeetingUrl = "https://teams.microsoft.com/l/meetup-join/aselsan-interview-101"
                },
                new CalendarEvent
                {
                    Id = "evt-2",
                    Title = "Mezun Mentörlük Oturumu — Ahmet Yılmaz",
                    Description = "Savunma sanayii kariyer tavsiyeleri ve kod inceleme oturumu.",
                    StartTime = DateTime.UtcNow.AddDays(2).AddHours(14),
                    EndTime = DateTime.UtcNow.AddDays(2).AddHours(15),
                    Location = "Online - Teams",
                    EventType = "MENTORSHIP",
                    OrganizerEmail = "ahmet.yilmaz@aselsankonya.com.tr",
                    AttendeeEmail = "emre.tunc@ogr.ktun.edu.tr",
                    ExternalMeetingUrl = "https://teams.microsoft.com/l/meetup-join/ktun-mentorship-101"
                }
            };
        }

        public IEnumerable<CalendarEvent> GetUserEvents(string userEmail)
        {
            return _eventsStore.Where(e =>
                string.Equals(e.AttendeeEmail, userEmail, StringComparison.OrdinalIgnoreCase) ||
                string.Equals(e.OrganizerEmail, userEmail, StringComparison.OrdinalIgnoreCase)
            );
        }

        public async Task<string> ExportCalendarEventAsync(string eventId, string providerKey = "ics")
        {
            var evt = _eventsStore.FirstOrDefault(e => e.Id == eventId) ?? _eventsStore[0];
            var key = providerKey.ToLowerInvariant();

            if (_providers.TryGetValue(key, out var provider))
            {
                return await provider.GenerateSyncLinkOrContentAsync(evt);
            }

            return await _providers["ics"].GenerateSyncLinkOrContentAsync(evt);
        }
    }
}
