using System.Threading.Tasks;
using Ktun.CareerPortal.Domain.Entities;

namespace Ktun.CareerPortal.Infrastructure.Services.Hardening
{
    public interface IProductionHardeningEngine
    {
        Task<ProductionHardeningMetric> GetHardeningStatusAsync();
        Task<bool> FlushCacheAsync();
    }
}
