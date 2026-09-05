using System.Threading.Tasks;
using Ktun.CareerPortal.Domain.Entities;

namespace Ktun.CareerPortal.Infrastructure.Services.Calendar
{
    public interface ICalendarProvider
    {
        string ProviderName { get; }
        Task<string> GenerateSyncLinkOrContentAsync(CalendarEvent calendarEvent);
    }
}
