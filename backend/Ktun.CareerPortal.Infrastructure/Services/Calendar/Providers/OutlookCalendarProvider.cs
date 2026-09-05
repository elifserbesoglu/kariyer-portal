using System;
using System.Net;
using System.Threading.Tasks;
using Ktun.CareerPortal.Domain.Entities;

namespace Ktun.CareerPortal.Infrastructure.Services.Calendar.Providers
{
    public class OutlookCalendarProvider : ICalendarProvider
    {
        public string ProviderName => "Microsoft Outlook";

        public Task<string> GenerateSyncLinkOrContentAsync(CalendarEvent evt)
        {
            var title = WebUtility.UrlEncode(evt.Title);
            var body = WebUtility.UrlEncode(evt.Description);
            var location = WebUtility.UrlEncode(evt.Location);
            var start = evt.StartTime.ToString("o");
            var end = evt.EndTime.ToString("o");

            var link = $"https://outlook.live.com/calendar/0/deeplink/compose?subject={title}&body={body}&location={location}&startdt={start}&enddt={end}";
            return Task.FromResult(link);
        }
    }
}
