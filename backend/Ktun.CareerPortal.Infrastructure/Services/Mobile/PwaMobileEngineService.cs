using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ktun.CareerPortal.Domain.Entities;

namespace Ktun.CareerPortal.Infrastructure.Services.Mobile
{
    public class PwaMobileEngineService : IPwaMobileEngine
    {
        private readonly List<PwaDeviceSubscription> _devicesStore;

        public PwaMobileEngineService()
        {
            _devicesStore = new List<PwaDeviceSubscription>
            {
                new PwaDeviceSubscription { UserEmail = "emre.tunc@ogr.ktun.edu.tr", DeviceOs = "iOS iPhone 15 Pro", PushEndpoint = "https://fcm.googleapis.com/fcm/send/token-1", IsOfflineCapable = true },
                new PwaDeviceSubscription { UserEmail = "ik@aselsankonya.com.tr", DeviceOs = "Android Samsung S24", PushEndpoint = "https://fcm.googleapis.com/fcm/send/token-2", IsOfflineCapable = true }
            };
        }

        public Task<PwaDeviceSubscription> RegisterDeviceAsync(string userEmail, string pushEndpoint, string deviceOs)
        {
            var device = new PwaDeviceSubscription
            {
                UserEmail = userEmail,
                PushEndpoint = pushEndpoint,
                DeviceOs = deviceOs,
                IsOfflineCapable = true,
                RegisteredAt = DateTime.UtcNow
            };

            _devicesStore.Add(device);
            return Task.FromResult(device);
        }

        public Task<string> GenerateQrAuthTokenAsync(string userEmail)
        {
            var token = $"KTUN_PWA_QR_{Guid.NewGuid():N}";
            return Task.FromResult(token);
        }

        public IEnumerable<PwaDeviceSubscription> GetUserSubscriptions(string userEmail)
        {
            return _devicesStore.Where(d => string.Equals(d.UserEmail, userEmail, StringComparison.OrdinalIgnoreCase));
        }
    }
}
