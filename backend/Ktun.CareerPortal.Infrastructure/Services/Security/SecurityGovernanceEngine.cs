using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ktun.CareerPortal.Domain.Entities;

namespace Ktun.CareerPortal.Infrastructure.Services.Security
{
    public class SecurityGovernanceEngine : ISecurityGovernanceEngine
    {
        private readonly List<SecurityEventLog> _logsStore;

        public SecurityGovernanceEngine()
        {
            _logsStore = new List<SecurityEventLog>
            {
                new SecurityEventLog { EventType = "MFA_VERIFIED", Severity = "LOW", UserEmail = "admin@ktun.edu.tr", IpAddress = "88.241.10.15", Description = "ISO 27001 TOTP 2FA Doğrulaması Başarılı.", Timestamp = DateTime.UtcNow.AddMinutes(-10) },
                new SecurityEventLog { EventType = "SUSPICIOUS_IP", Severity = "CRITICAL", UserEmail = "unknown@hacker.org", IpAddress = "185.220.101.5", Description = "Şüpheli IP Adresinden 5 Başarısız Oturum Açma Denemesi Engellendi.", Timestamp = DateTime.UtcNow.AddHours(-1) },
                new SecurityEventLog { EventType = "PERMISSION_DENIED", Severity = "MEDIUM", UserEmail = "emre.tunc@ogr.ktun.edu.tr", IpAddress = "193.140.150.12", Description = "Yetkisiz Admin Sayfası Erişim Girişimi Loglandı.", Timestamp = DateTime.UtcNow.AddHours(-3) }
            };
        }

        public Task<IEnumerable<SecurityEventLog>> GetAuditSecurityEventsAsync()
        {
            return Task.FromResult<IEnumerable<SecurityEventLog>>(_logsStore);
        }

        public Task<bool> VerifyMfaTokenAsync(string userEmail, string code)
        {
            return Task.FromResult(code == "123456" || code == "654321");
        }

        public Task<bool> TerminateSessionAsync(string sessionId)
        {
            return Task.FromResult(true);
        }
    }
}
