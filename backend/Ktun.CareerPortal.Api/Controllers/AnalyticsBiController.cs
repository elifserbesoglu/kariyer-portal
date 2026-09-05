using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Ktun.CareerPortal.Infrastructure.Services.Analytics;

namespace Ktun.CareerPortal.Api.Controllers
{
    [ApiController]
    [Route("api/v1/analytics")]
    public class AnalyticsBiController : ControllerBase
    {
        private readonly EnterpriseBiAnalyticsEngine _biEngine;

        public AnalyticsBiController()
        {
            _biEngine = new EnterpriseBiAnalyticsEngine();
        }

        [HttpGet("regional-heatmap")]
        public async Task<IActionResult> GetHeatmap()
        {
            var heatmap = await _biEngine.GetRegionalEmploymentHeatmapAsync();
            return Ok(heatmap);
        }

        [HttpGet("export-excel")]
        public async Task<IActionResult> ExportExcel()
        {
            var bytes = await _biEngine.ExportAnalyticsReportToExcelAsync();
            return File(bytes, "text/csv", "KTUN_Kariyer_İstihdam_Raporu_2026.csv");
        }
    }
}
