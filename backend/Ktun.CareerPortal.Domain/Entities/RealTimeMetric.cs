using System;

namespace Ktun.CareerPortal.Domain.Entities
{
    public class RealTimeMetric
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string MetricCode { get; set; } = string.Empty;
        public string MetricName { get; set; } = string.Empty;
        public int Value { get; set; }
        public string RoleScope { get; set; } = "ALL"; // STUDENT, EMPLOYER, ADMIN, ALL
        public DateTime LastUpdated { get; set; } = DateTime.UtcNow;
    }
}
