using System.Collections.Generic;
using System.Threading.Tasks;
using Ktun.CareerPortal.Domain.Entities;

namespace Ktun.CareerPortal.Infrastructure.Services.Analytics
{
    public interface IBiAnalyticsEngine
    {
        Task<IEnumerable<BiReportMetric>> GetRegionalEmploymentHeatmapAsync();
        Task<byte[]> ExportAnalyticsReportToExcelAsync();
    }
}
