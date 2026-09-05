using System.Threading.Tasks;
using Ktun.CareerPortal.Domain.Entities;

namespace Ktun.CareerPortal.Infrastructure.Services.Integrations
{
    public interface IExternalIntegrationProvider
    {
        string ProviderKey { get; }
        string ProviderName { get; }
        Task<ExternalIntegrationConfig> SyncNowAsync();
    }
}
