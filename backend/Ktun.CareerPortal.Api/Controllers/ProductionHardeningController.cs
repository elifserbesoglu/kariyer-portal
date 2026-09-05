using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Ktun.CareerPortal.Infrastructure.Services.Hardening;

namespace Ktun.CareerPortal.Api.Controllers
{
    [ApiController]
    [Route("api/v1/hardening")]
    public class ProductionHardeningController : ControllerBase
    {
        private readonly ProductionHardeningEngine _hardeningEngine;

        public ProductionHardeningController()
        {
            _hardeningEngine = new ProductionHardeningEngine();
        }

        [HttpGet("status")]
        public async Task<IActionResult> GetStatus()
        {
            var status = await _hardeningEngine.GetHardeningStatusAsync();
            return Ok(status);
        }

        [HttpPost("flush-cache")]
        public async Task<IActionResult> FlushCache()
        {
            var result = await _hardeningEngine.FlushCacheAsync();
            return Ok(new { success = result, message = "Redis Distributed Cache flushed successfully." });
        }
    }
}
