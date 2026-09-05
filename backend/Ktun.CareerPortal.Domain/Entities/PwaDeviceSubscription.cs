using System;

namespace Ktun.CareerPortal.Domain.Entities
{
    public class PwaDeviceSubscription
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string UserEmail { get; set; } = string.Empty;
        public string PushEndpoint { get; set; } = string.Empty;
        public string DeviceOs { get; set; } = "iOS"; // iOS, Android, Desktop
        public bool IsOfflineCapable { get; set; } = true;
        public string QrAuthToken { get; set; } = Guid.NewGuid().ToString("N");
        public DateTime RegisteredAt { get; set; } = DateTime.UtcNow;
    }
}
