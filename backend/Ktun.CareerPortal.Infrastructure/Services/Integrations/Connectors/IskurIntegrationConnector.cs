using System;
using System.Threading.Tasks;
using Ktun.CareerPortal.Domain.Entities;

namespace Ktun.CareerPortal.Infrastructure.Services.Integrations.Connectors
{
    public class IskurIntegrationConnector : IExternalIntegrationProvider
    {
        public string ProviderKey => "ISKUR";
        public string ProviderName => "Türkiye İş Kurumu (İŞKUR)";

        public Task<ExternalIntegrationConfig> SyncNowAsync()
        {
            var config = new ExternalIntegrationConfig
            {
                ProviderKey = ProviderKey,
                ProviderName = ProviderName,
                ConnectionStatus = "ACTIVE",
                ApiEndpoint = "https://esube.iskur.gov.tr/api/v2/jobs",
                LastSyncedAt = DateTime.UtcNow,
                SyncedRecordCount = 850
            };
            return Task.FromResult(config);
        }
    }
}
