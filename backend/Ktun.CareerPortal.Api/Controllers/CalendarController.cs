using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Ktun.CareerPortal.Infrastructure.Services.Calendar;

namespace Ktun.CareerPortal.Api.Controllers
{
    [ApiController]
    [Route("api/v1/calendar")]
    public class CalendarController : ControllerBase
    {
        private readonly CalendarEngineService _calendarService;

        public CalendarController()
        {
            _calendarService = new CalendarEngineService();
        }

        [HttpGet("events")]
        public IActionResult GetEvents([FromQuery] string userEmail = "emre.tunc@ogr.ktun.edu.tr")
        {
            var events = _calendarService.GetUserEvents(userEmail);
            return Ok(events);
        }

        [HttpGet("export/{eventId}")]
        public async Task<IActionResult> ExportEvent(string eventId, [FromQuery] string provider = "ics")
        {
            var contentOrLink = await _calendarService.ExportCalendarEventAsync(eventId, provider);
            return Ok(new { provider, contentOrLink });
        }
    }
}
