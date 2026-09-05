using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ktun.CareerPortal.Domain.Entities;
using Ktun.CareerPortal.Infrastructure.Services.Integrations.Connectors;

namespace Ktun.CareerPortal.Infrastructure.Services.Integrations
{
    public class EnterpriseIntegrationPlatformService
    {
        private readonly Dictionary<string, IExternalIntegrationProvider> _connectors;
        private readonly List<ExternalIntegrationConfig> _configsStore;

        public EnterpriseIntegrationPlatformService()
        {
            _connectors = new Dictionary<string, IExternalIntegrationProvider>
            {
                { "YETENEK_KAPISI", new YetenekKapisiIntegrationConnector() },
                { "ISKUR", new IskurIntegrationConnector() },
                { "LINKEDIN", new LinkedInIntegrationConnector() }
            };

            _configsStore = new List<ExternalIntegrationConfig>
            {
                new ExternalIntegrationConfig { ProviderKey = "YETENEK_KAPISI", ProviderName = "CBİKO Yetenek Kapısı", ConnectionStatus = "ACTIVE", ApiEndpoint = "https://api.yetenekkapisi.gov.tr/v1", LastSyncedAt = DateTime.UtcNow.AddHours(-1), SyncedRecordCount = 1420 },
                new ExternalIntegrationConfig { ProviderKey = "ISKUR", ProviderName = "Türkiye İş Kurumu (İŞKUR)", ConnectionStatus = "ACTIVE", ApiEndpoint = "https://esube.iskur.gov.tr/api/v2", LastSyncedAt = DateTime.UtcNow.AddHours(-3), SyncedRecordCount = 850 },
                new ExternalIntegrationConfig { ProviderKey = "LINKEDIN", ProviderName = "LinkedIn Auto-Share API", ConnectionStatus = "ACTIVE", ApiEndpoint = "https://api.linkedin.com/v2", LastSyncedAt = DateTime.UtcNow.AddHours(-5), SyncedRecordCount = 612 },
                new ExternalIntegrationConfig { ProviderKey = "ZOOM", ProviderName = "Zoom Video Conferencing", ConnectionStatus = "CONNECTED", ApiEndpoint = "https://api.zoom.us/v2", LastSyncedAt = DateTime.UtcNow.AddDays(-1), SyncedRecordCount = 310 }
            };
        }

        public IEnumerable<ExternalIntegrationConfig> GetConfigs() => _configsStore;

        public async Task<ExternalIntegrationConfig> TriggerSyncAsync(string providerKey)
        {
            var key = providerKey.ToUpperInvariant();
            if (_connectors.TryGetValue(key, out var connector))
            {
                var updated = await connector.SyncNowAsync();
                var existing = _configsStore.FirstOrDefault(c => c.ProviderKey == key);
                if (existing != null)
                {
                    existing.LastSyncedAt = DateTime.UtcNow;
                    existing.SyncedRecordCount += 15;
                    return existing;
                }
                return updated;
            }

            var cfg = _configsStore.FirstOrDefault(c => c.ProviderKey == key) ?? _configsStore[0];
            cfg.LastSyncedAt = DateTime.UtcNow;
            return cfg;
        }
    }
}
