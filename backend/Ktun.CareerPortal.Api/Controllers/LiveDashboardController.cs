using Microsoft.AspNetCore.Mvc;
using Ktun.CareerPortal.Infrastructure.Services.Analytics;

namespace Ktun.CareerPortal.Api.Controllers
{
    [ApiController]
    [Route("api/v1/live-dashboard")]
    public class LiveDashboardController : ControllerBase
    {
        private readonly RealTimeAnalyticsService _analyticsService;

        public LiveDashboardController()
        {
            _analyticsService = new RealTimeAnalyticsService();
        }

        [HttpGet("metrics")]
        public IActionResult GetMetrics([FromQuery] string roleScope = "ALL")
        {
            var metrics = _analyticsService.GetLiveMetrics(roleScope);
            return Ok(metrics);
        }
    }
}
