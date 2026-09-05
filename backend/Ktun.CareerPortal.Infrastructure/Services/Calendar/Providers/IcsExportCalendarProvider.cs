using System;
using System.Text;
using System.Threading.Tasks;
using Ktun.CareerPortal.Domain.Entities;

namespace Ktun.CareerPortal.Infrastructure.Services.Calendar.Providers
{
    public class IcsExportCalendarProvider : ICalendarProvider
    {
        public string ProviderName => "ICS File Export";

        public Task<string> GenerateSyncLinkOrContentAsync(CalendarEvent evt)
        {
            var sb = new StringBuilder();
            sb.AppendLine("BEGIN:VCALENDAR");
            sb.AppendLine("VERSION:2.0");
            sb.AppendLine("PRODID:-//KTUN Kariyer Portali//Enterprise Calendar//TR");
            sb.AppendLine("BEGIN:VEVENT");
            sb.AppendLine($"UID:{evt.Id}@ktun.edu.tr");
            sb.AppendLine($"DTSTAMP:{DateTime.UtcNow:yyyyMMddTHHmmssZ}");
            sb.AppendLine($"DTSTART:{evt.StartTime:yyyyMMddTHHmmssZ}");
            sb.AppendLine($"DTEND:{evt.EndTime:yyyyMMddTHHmmssZ}");
            sb.AppendLine($"SUMMARY:{evt.Title}");
            sb.AppendLine($"DESCRIPTION:{evt.Description}");
            sb.AppendLine($"LOCATION:{evt.Location}");
            sb.AppendLine("END:VEVENT");
            sb.AppendLine("END:VCALENDAR");

            return Task.FromResult(sb.ToString());
        }
    }
}
