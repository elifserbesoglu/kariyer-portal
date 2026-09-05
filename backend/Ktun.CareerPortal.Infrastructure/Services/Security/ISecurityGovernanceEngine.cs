using System.Collections.Generic;
using System.Threading.Tasks;
using Ktun.CareerPortal.Domain.Entities;

namespace Ktun.CareerPortal.Infrastructure.Services.Security
{
    public interface ISecurityGovernanceEngine
    {
        Task<IEnumerable<SecurityEventLog>> GetAuditSecurityEventsAsync();
        Task<bool> VerifyMfaTokenAsync(string userEmail, string code);
        Task<bool> TerminateSessionAsync(string sessionId);
    }
}
