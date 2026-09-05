using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Ktun.CareerPortal.Infrastructure.Services.Tenancy;

namespace Ktun.CareerPortal.Api.Controllers
{
    [ApiController]
    [Route("api/v1/tenants")]
    public class TenancyController : ControllerBase
    {
        private readonly MultiTenantResolverService _tenantService;

        public TenancyController()
        {
            _tenantService = new MultiTenantResolverService();
        }

        [HttpGet]
        public async Task<IActionResult> GetTenants()
        {
            var tenants = await _tenantService.GetAllTenantsAsync();
            return Ok(tenants);
        }

        [HttpGet("resolve")]
        public async Task<IActionResult> ResolveTenant([FromQuery] string code = "KTUN_MAIN")
        {
            var tenant = await _tenantService.ResolveCurrentTenantAsync(code);
            return Ok(tenant);
        }
    }
}
