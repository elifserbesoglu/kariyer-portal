using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Ktun.CareerPortal.Infrastructure.Services.Mobile;

namespace Ktun.CareerPortal.Api.Controllers
{
    [ApiController]
    [Route("api/v1/pwa")]
    public class PwaMobileController : ControllerBase
    {
        private readonly PwaMobileEngineService _pwaService;

        public PwaMobileController()
        {
            _pwaService = new PwaMobileEngineService();
        }

        [HttpPost("register-device")]
        public async Task<IActionResult> RegisterDevice([FromBody] RegisterDeviceRequest request)
        {
            var result = await _pwaService.RegisterDeviceAsync(request.UserEmail, request.PushEndpoint, request.DeviceOs);
            return Ok(result);
        }

        [HttpGet("qr-login-token")]
        public async Task<IActionResult> GetQrToken([FromQuery] string userEmail = "emre.tunc@ogr.ktun.edu.tr")
        {
            var token = await _pwaService.GenerateQrAuthTokenAsync(userEmail);
            return Ok(new { userEmail, token, expiresMinutes = 5 });
        }
    }

    public class RegisterDeviceRequest
    {
        public string UserEmail { get; set; } = string.Empty;
        public string PushEndpoint { get; set; } = string.Empty;
        public string DeviceOs { get; set; } = "iOS";
    }
}
