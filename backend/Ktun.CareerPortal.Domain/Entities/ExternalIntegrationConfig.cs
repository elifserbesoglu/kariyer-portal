using System;

namespace Ktun.CareerPortal.Domain.Entities
{
    public class ExternalIntegrationConfig
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string ProviderKey { get; set; } = string.Empty; // YETENEK_KAPISI, ISKUR, LINKEDIN, ZOOM
        public string ProviderName { get; set; } = string.Empty;
        public string ConnectionStatus { get; set; } = "ACTIVE"; // ACTIVE, PENDING, DISCONNECTED
        public string ApiEndpoint { get; set; } = string.Empty;
        public DateTime LastSyncedAt { get; set; } = DateTime.UtcNow;
        public int SyncedRecordCount { get; set; }
    }
}
