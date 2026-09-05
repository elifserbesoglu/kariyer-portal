using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Ktun.CareerPortal.Domain.Entities;

namespace Ktun.CareerPortal.Infrastructure.Services.Analytics
{
    public class EnterpriseBiAnalyticsEngine : IBiAnalyticsEngine
    {
        private readonly List<BiReportMetric> _heatmapStore;

        public EnterpriseBiAnalyticsEngine()
        {
            _heatmapStore = new List<BiReportMetric>
            {
                new BiReportMetric { RegionName = "Konya OSB & Savunma Sanayii Havzası", EmploymentPercentage = 42, HiredCount = 480, TopSector = "Gömülü Yazılım & Silah Sistemleri", AvgStartingSalaryTl = 58000 },
                new BiReportMetric { RegionName = "Ankara OSTİM & Teknokent Bölgesi", EmploymentPercentage = 28, HiredCount = 320, TopSector = "Otonom Sistemler & Hava Platformları", AvgStartingSalaryTl = 64000 },
                new BiReportMetric { RegionName = "Marmara Endüstri Bölgesi (Gebze/İstanbul)", EmploymentPercentage = 18, HiredCount = 205, TopSector = "Bilişim, Siber Güvenlik & Bulut", AvgStartingSalaryTl = 62000 },
                new BiReportMetric { RegionName = "Yurt Dışı (Almanya, Hollanda, ABD)", EmploymentPercentage = 12, HiredCount = 137, TopSector = "Yapay Zekâ & Mikroçip Tasarımı", AvgStartingSalaryTl = 110000 }
            };
        }

        public Task<IEnumerable<BiReportMetric>> GetRegionalEmploymentHeatmapAsync()
        {
            return Task.FromResult<IEnumerable<BiReportMetric>>(_heatmapStore);
        }

        public Task<byte[]> ExportAnalyticsReportToExcelAsync()
        {
            var csv = new StringBuilder();
            csv.AppendLine("Bolge,Yuzde,IseYerlesen,Sektor,OrtalamaMaas");
            foreach (var item in _heatmapStore)
            {
                csv.AppendLine($"{item.RegionName},{item.EmploymentPercentage},{item.HiredCount},{item.TopSector},{item.AvgStartingSalaryTl}");
            }
            return Task.FromResult(Encoding.UTF8.GetBytes(csv.ToString()));
        }
    }
}
