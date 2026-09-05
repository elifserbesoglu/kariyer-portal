using System;
using System.IO;
using System.Threading.Tasks;

namespace Ktun.CareerPortal.Infrastructure.Services.Storage.Providers
{
    public class AzureBlobStorageProvider : IStorageProvider
    {
        public string ProviderName => "Azure Blob Storage";

        public Task<string> UploadFileAsync(string fileName, Stream contentStream)
        {
            var key = $"https://ktuncareer.blob.core.windows.net/documents/{Guid.NewGuid()}_{fileName}";
            return Task.FromResult(key);
        }

        public Task<Stream> DownloadFileAsync(string fileKey)
        {
            return Task.FromResult<Stream>(new MemoryStream());
        }
    }
}
