using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Ktun.CareerPortal.Infrastructure.Services.Security;

namespace Ktun.CareerPortal.Api.Controllers
{
    [ApiController]
    [Route("api/v1/security")]
    public class SecurityGovernanceController : ControllerBase
    {
        private readonly SecurityGovernanceEngine _securityEngine;

        public SecurityGovernanceController()
        {
            _securityEngine = new SecurityGovernanceEngine();
        }

        [HttpGet("events")]
        public async Task<IActionResult> GetEvents()
        {
            var events = await _securityEngine.GetAuditSecurityEventsAsync();
            return Ok(events);
        }

        [HttpPost("verify-mfa")]
        public async Task<IActionResult> VerifyMfa([FromBody] VerifyMfaRequest request)
        {
            var success = await _securityEngine.VerifyMfaTokenAsync(request.UserEmail, request.Code);
            return Ok(new { success });
        }

        [HttpDelete("sessions/{sessionId}")]
        public async Task<IActionResult> TerminateSession(string sessionId)
        {
            var success = await _securityEngine.TerminateSessionAsync(sessionId);
            return Ok(new { success });
        }
    }

    public class VerifyMfaRequest
    {
        public string UserEmail { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
    }
}
