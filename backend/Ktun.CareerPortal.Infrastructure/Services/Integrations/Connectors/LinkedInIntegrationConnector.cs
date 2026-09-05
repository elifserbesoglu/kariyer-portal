using System;
using System.Threading.Tasks;
using Ktun.CareerPortal.Domain.Entities;

namespace Ktun.CareerPortal.Infrastructure.Services.Integrations.Connectors
{
    public class LinkedInIntegrationConnector : IExternalIntegrationProvider
    {
        public string ProviderKey => "LINKEDIN";
        public string ProviderName => "LinkedIn Auto-Share API";

        public Task<ExternalIntegrationConfig> SyncNowAsync()
        {
            var config = new ExternalIntegrationConfig
            {
                ProviderKey = ProviderKey,
                ProviderName = ProviderName,
                ConnectionStatus = "ACTIVE",
                ApiEndpoint = "https://api.linkedin.com/v2/simpleJobPostings",
                LastSyncedAt = DateTime.UtcNow,
                SyncedRecordCount = 612
            };
            return Task.FromResult(config);
        }
    }
}
