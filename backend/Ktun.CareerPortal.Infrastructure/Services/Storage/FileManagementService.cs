using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ktun.CareerPortal.Domain.Entities;
using Ktun.CareerPortal.Infrastructure.Services.Storage.Providers;

namespace Ktun.CareerPortal.Infrastructure.Services.Storage
{
    public class FileManagementService
    {
        private readonly Dictionary<string, IStorageProvider> _providers;
        private readonly List<UserDocument> _documentsStore;
        private readonly VirusScanHookService _virusScanner;

        public FileManagementService()
        {
            _providers = new Dictionary<string, IStorageProvider>
            {
                { "s3", new AwsS3StorageProvider() },
                { "azure", new AzureBlobStorageProvider() }
            };

            _virusScanner = new VirusScanHookService();

            _documentsStore = new List<UserDocument>
            {
                new UserDocument
                {
                    Id = "doc-1",
                    UserEmail = "emre.tunc@ogr.ktun.edu.tr",
                    FileName = "Emre_Tunc_ATS_CV_2026.pdf",
                    DocumentType = "CV",
                    FileSizeBytes = 1572864,
                    VersionString = "v1.1",
                    StorageProvider = "AWS S3 Bucket",
                    VirusScanStatus = "CLEAN",
                    UploadedAt = DateTime.UtcNow.AddDays(-2),
                    DownloadUrl = "https://ktun-career-docs.s3.eu-central-1.amazonaws.com/Emre_Tunc_CV_v1.1.pdf"
                },
                new UserDocument
                {
                    Id = "doc-2",
                    UserEmail = "emre.tunc@ogr.ktun.edu.tr",
                    FileName = "ASELSAN_Aday_Muhendis_Sertifikasi.pdf",
                    DocumentType = "CERTIFICATE",
                    FileSizeBytes = 2097152,
                    VersionString = "v1.0",
                    StorageProvider = "Azure Blob Storage",
                    VirusScanStatus = "CLEAN",
                    UploadedAt = DateTime.UtcNow.AddDays(-10),
                    DownloadUrl = "https://ktuncareer.blob.core.windows.net/documents/Aselsan_Cert.pdf"
                }
            };
        }

        public IEnumerable<UserDocument> GetUserDocuments(string userEmail)
        {
            return _documentsStore.Where(d => string.Equals(d.UserEmail, userEmail, StringComparison.OrdinalIgnoreCase));
        }

        public async Task<UserDocument> UploadDocumentAsync(string userEmail, string fileName, string docType, string providerKey = "s3")
        {
            var isClean = await _virusScanner.ScanFileAsync(new byte[10], fileName);
            var provider = _providers.ContainsKey(providerKey) ? _providers[providerKey] : _providers["s3"];
            var downloadUrl = await provider.UploadFileAsync(fileName, null);

            var doc = new UserDocument
            {
                UserEmail = userEmail,
                FileName = fileName,
                DocumentType = docType,
                VersionString = "v1.0",
                StorageProvider = provider.ProviderName,
                VirusScanStatus = isClean ? "CLEAN" : "INFECTED",
                DownloadUrl = downloadUrl
            };

            _documentsStore.Insert(0, doc);
            return doc;
        }
    }
}
