using System.IO;
using System.Threading.Tasks;

namespace Ktun.CareerPortal.Infrastructure.Services.Storage
{
    public interface IStorageProvider
    {
        string ProviderName { get; }
        Task<string> UploadFileAsync(string fileName, Stream contentStream);
        Task<Stream> DownloadFileAsync(string fileKey);
    }
}
