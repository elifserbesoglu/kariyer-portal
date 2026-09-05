using System;

namespace Ktun.CareerPortal.Domain.Entities
{
    public class BiReportMetric
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string RegionName { get; set; } = string.Empty;
        public int EmploymentPercentage { get; set; }
        public int HiredCount { get; set; }
        public string TopSector { get; set; } = string.Empty;
        public double AvgStartingSalaryTl { get; set; }
        public DateTime CalculatedAt { get; set; } = DateTime.UtcNow;
    }
}
