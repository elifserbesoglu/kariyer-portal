using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Ktun.CareerPortal.Infrastructure.Services.Integrations;

namespace Ktun.CareerPortal.Api.Controllers
{
    [ApiController]
    [Route("api/v1/integrations")]
    public class IntegrationPlatformController : ControllerBase
    {
        private readonly EnterpriseIntegrationPlatformService _eipService;

        public IntegrationPlatformController()
        {
            _eipService = new EnterpriseIntegrationPlatformService();
        }

        [HttpGet("connectors")]
        public IActionResult GetConnectors()
        {
            var configs = _eipService.GetConfigs();
            return Ok(configs);
        }

        [HttpPost("sync/{providerKey}")]
        public async Task<IActionResult> SyncNow(string providerKey)
        {
            var result = await _eipService.TriggerSyncAsync(providerKey);
            return Ok(result);
        }
    }
}
