using System;
using System.Net;
using System.Threading.Tasks;
using Ktun.CareerPortal.Domain.Entities;

namespace Ktun.CareerPortal.Infrastructure.Services.Calendar.Providers
{
    public class GoogleCalendarProvider : ICalendarProvider
    {
        public string ProviderName => "Google Calendar";

        public Task<string> GenerateSyncLinkOrContentAsync(CalendarEvent evt)
        {
            var title = WebUtility.UrlEncode(evt.Title);
            var details = WebUtility.UrlEncode(evt.Description);
            var location = WebUtility.UrlEncode(evt.Location);
            var dates = $"{evt.StartTime:yyyyMMddTHHmmssZ}/{evt.EndTime:yyyyMMddTHHmmssZ}";

            var link = $"https://calendar.google.com/calendar/render?action=TEMPLATE&text={title}&dates={dates}&details={details}&location={location}";
            return Task.FromResult(link);
        }
    }
}
