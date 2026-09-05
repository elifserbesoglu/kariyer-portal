using System;
using System.IO;
using System.Threading.Tasks;

namespace Ktun.CareerPortal.Infrastructure.Services.Storage.Providers
{
    public class AwsS3StorageProvider : IStorageProvider
    {
        public string ProviderName => "AWS S3 Bucket";

        public Task<string> UploadFileAsync(string fileName, Stream contentStream)
        {
            var key = $"https://ktun-career-docs.s3.eu-central-1.amazonaws.com/{Guid.NewGuid()}_{fileName}";
            return Task.FromResult(key);
        }

        public Task<Stream> DownloadFileAsync(string fileKey)
        {
            return Task.FromResult<Stream>(new MemoryStream());
        }
    }
}
