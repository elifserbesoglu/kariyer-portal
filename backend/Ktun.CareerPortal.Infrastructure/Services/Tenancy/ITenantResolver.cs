using System.Collections.Generic;
using System.Threading.Tasks;
using Ktun.CareerPortal.Domain.Entities;

namespace Ktun.CareerPortal.Infrastructure.Services.Tenancy
{
    public interface ITenantResolver
    {
        Task<IEnumerable<TenantInfo>> GetAllTenantsAsync();
        Task<TenantInfo> ResolveCurrentTenantAsync(string tenantCodeOrSubdomain);
    }
}
