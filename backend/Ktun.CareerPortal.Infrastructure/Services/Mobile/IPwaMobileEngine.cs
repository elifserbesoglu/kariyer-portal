using System.Threading.Tasks;
using Ktun.CareerPortal.Domain.Entities;

namespace Ktun.CareerPortal.Infrastructure.Services.Mobile
{
    public interface IPwaMobileEngine
    {
        Task<PwaDeviceSubscription> RegisterDeviceAsync(string userEmail, string pushEndpoint, string deviceOs);
        Task<string> GenerateQrAuthTokenAsync(string userEmail);
    }
}
