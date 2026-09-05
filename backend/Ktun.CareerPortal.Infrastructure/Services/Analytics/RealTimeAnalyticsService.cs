using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ktun.CareerPortal.Domain.Entities;

namespace Ktun.CareerPortal.Infrastructure.Services.Analytics
{
    public class RealTimeAnalyticsService
    {
        private readonly List<RealTimeMetric> _metricsStore;

        public RealTimeAnalyticsService()
        {
            _metricsStore = new List<RealTimeMetric>
            {
                new RealTimeMetric { MetricCode = "ONLINE_USERS", MetricName = "Canlı Online Kullanıcılar", Value = 142, RoleScope = "ALL" },
                new RealTimeMetric { MetricCode = "TODAY_APPLICATIONS", MetricName = "Bugünkü Toplam Başvuru", Value = 38, RoleScope = "EMPLOYER" },
                new RealTimeMetric { MetricCode = "ACTIVE_INTERVIEWS", MetricName = "Devam Eden Mülakatlar", Value = 6, RoleScope = "STUDENT" },
                new RealTimeMetric { MetricCode = "SYSTEM_LOAD", MetricName = "Sistem CPU Yükü (%)", Value = 12, RoleScope = "ADMIN" }
            };
        }

        public IEnumerable<RealTimeMetric> GetLiveMetrics(string roleScope = "ALL")
        {
            if (string.Equals(roleScope, "ALL", StringComparison.OrdinalIgnoreCase))
            {
                return _metricsStore;
            }

            return _metricsStore.Where(m => m.RoleScope == "ALL" || string.Equals(m.RoleScope, roleScope, StringComparison.OrdinalIgnoreCase));
        }
    }
}
