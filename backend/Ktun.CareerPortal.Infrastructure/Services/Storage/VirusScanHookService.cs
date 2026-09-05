using System.Threading.Tasks;

namespace Ktun.CareerPortal.Infrastructure.Services.Storage
{
    public class VirusScanHookService
    {
        public Task<bool> ScanFileAsync(byte[] fileBytes, string fileName)
        {
            // Production ClamAV / Windows Defender Security Hook Simulation
            return Task.FromResult(true); // CLEAN
        }
    }
}
