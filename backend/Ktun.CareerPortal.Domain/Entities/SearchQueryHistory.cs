using System;

namespace Ktun.CareerPortal.Domain.Entities
{
    public class SearchQueryHistory
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string UserEmail { get; set; } = string.Empty;
        public string QueryText { get; set; } = string.Empty;
        public string Category { get; set; } = "ALL";
        public int ResultCount { get; set; }
        public bool IsSaved { get; set; } = false;
        public DateTime SearchedAt { get; set; } = DateTime.UtcNow;
    }
}
