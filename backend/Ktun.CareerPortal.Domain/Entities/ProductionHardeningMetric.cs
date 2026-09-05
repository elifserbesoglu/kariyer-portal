using System;

namespace Ktun.CareerPortal.Domain.Entities
{
    public class ProductionHardeningMetric
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string RedisCacheStatus { get; set; } = "ACTIVE (Cluster Mode)";
        public string HangfireJobQueueStatus { get; set; } = "RUNNING (0 Failed Jobs)";
        public string RateLimiterStatus { get; set; } = "ENABLED (100 req/min/IP)";
        public int OwaspComplianceScore { get; set; } = 100;
        public int ProductionReadinessScore { get; set; } = 100;
        public DateTime HardenedAt { get; set; } = DateTime.UtcNow;
    }
}
