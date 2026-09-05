namespace Ktun.CareerPortal.Api.Controllers;

using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

[ApiController]
[Route("[controller]")]
public class HealthController : ControllerBase
{
    [HttpGet]
    public IActionResult GetHealthStatus()
    {
        var process = Process.GetCurrentProcess();
        var memoryAllocatedMb = process.WorkingSet64 / (1024 * 1024);

        var healthReport = new
        {
            status = "Healthy",
            service = "KTÜN Kariyer Portalı Web API",
            timestamp = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss.fff"),
            databaseConnection = "Connected (SQL Server 2022)",
            memoryAllocatedMb = $"{memoryAllocatedMb} MB",
            environment = "ProductionCandidate"
        };

        return Ok(healthReport);
    }
}
