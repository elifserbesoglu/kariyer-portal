using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ktun.CareerPortal.Domain.Entities;

namespace Ktun.CareerPortal.Infrastructure.Services.Tenancy
{
    public class MultiTenantResolverService : ITenantResolver
    {
        private readonly List<TenantInfo> _tenantsStore;

        public MultiTenantResolverService()
        {
            _tenantsStore = new List<TenantInfo>
            {
                new TenantInfo { Id = "t-1", TenantCode = "KTUN_MAIN", TenantName = "KTÜN Rektörlük Ana Kiracı", Subdomain = "ktun", PrimaryColorHex = "#721c24", IsActive = true },
                new TenantInfo { Id = "t-2", TenantCode = "ENG_FACULTY", TenantName = "Mühendislik ve Doğa Bilimleri Fakültesi", Subdomain = "muhendislik", PrimaryColorHex = "#0056b3", IsActive = true },
                new TenantInfo { Id = "t-3", TenantCode = "ARCH_FACULTY", TenantName = "Mimarlık ve Tasarım Fakültesi", Subdomain = "mimarlik", PrimaryColorHex = "#28a745", IsActive = true }
            };
        }

        public Task<IEnumerable<TenantInfo>> GetAllTenantsAsync()
        {
            return Task.FromResult<IEnumerable<TenantInfo>>(_tenantsStore);
        }

        public Task<TenantInfo> ResolveCurrentTenantAsync(string tenantCodeOrSubdomain)
        {
            if (string.IsNullOrWhiteSpace(tenantCodeOrSubdomain))
            {
                return Task.FromResult(_tenantsStore[0]);
            }

            var found = _tenantsStore.FirstOrDefault(t =>
                string.Equals(t.TenantCode, tenantCodeOrSubdomain, StringComparison.OrdinalIgnoreCase) ||
                string.Equals(t.Subdomain, tenantCodeOrSubdomain, StringComparison.OrdinalIgnoreCase)
            );

            return Task.FromResult(found ?? _tenantsStore[0]);
        }
    }
}
