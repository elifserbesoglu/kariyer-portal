using System;
using System.Threading.Tasks;
using Ktun.CareerPortal.Domain.Entities;

namespace Ktun.CareerPortal.Infrastructure.Services.Integrations.Connectors
{
    public class YetenekKapisiIntegrationConnector : IExternalIntegrationProvider
    {
        public string ProviderKey => "YETENEK_KAPISI";
        public string ProviderName => "CBİKO Yetenek Kapısı";

        public Task<ExternalIntegrationConfig> SyncNowAsync()
        {
            var config = new ExternalIntegrationConfig
            {
                ProviderKey = ProviderKey,
                ProviderName = ProviderName,
                ConnectionStatus = "ACTIVE",
                ApiEndpoint = "https://api.yetenekkapisi.gov.tr/v1/sync",
                LastSyncedAt = DateTime.UtcNow,
                SyncedRecordCount = 1420
            };
            return Task.FromResult(config);
        }
    }
}
