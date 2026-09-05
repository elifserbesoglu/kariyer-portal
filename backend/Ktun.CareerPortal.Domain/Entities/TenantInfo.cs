using System;

namespace Ktun.CareerPortal.Domain.Entities
{
    public class TenantInfo
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string TenantCode { get; set; } = "KTUN_MAIN"; // KTUN_MAIN, ENG_FACULTY, ARCH_FACULTY
        public string TenantName { get; set; } = "Konya Teknik Üniversitesi (Ana Kiracı)";
        public string Subdomain { get; set; } = "ktun";
        public string PrimaryColorHex { get; set; } = "#721c24";
        public bool IsActive { get; set; } = true;
        public long StorageQuotaBytes { get; set; } = 107374182400; // 100 GB
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
