using System;

namespace Ktun.CareerPortal.Domain.Entities
{
    public class SecurityEventLog
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string EventType { get; set; } = "LOGIN_ATTEMPT"; // LOGIN_ATTEMPT, MFA_VERIFIED, PERMISSION_DENIED, SUSPICIOUS_IP
        public string Severity { get; set; } = "LOW"; // LOW, MEDIUM, HIGH, CRITICAL
        public string UserEmail { get; set; } = string.Empty;
        public string IpAddress { get; set; } = "192.168.1.100";
        public string UserAgent { get; set; } = "Mozilla/5.0 (Macintosh; Intel Mac OS X)";
        public string Description { get; set; } = string.Empty;
        public bool Iso27001Compliant { get; set; } = true;
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
}
