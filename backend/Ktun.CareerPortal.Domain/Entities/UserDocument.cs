using System;

namespace Ktun.CareerPortal.Domain.Entities
{
    public class UserDocument : BaseEntity<string>
    {
        public string KullaniciBelgesiID { get => Id; set => Id = value; }
        public string UserEmail { get; set; } = string.Empty;
        public string FileName { get; set; } = string.Empty;
        public string DocumentType { get; set; } = "CV"; // CV, CERTIFICATE, DIPLOMA, PORTFOLIO
        public long FileSizeBytes { get; set; } = 1048576; // 1 MB
        public string VersionString { get; set; } = "v1.1";
        public string StorageProvider { get; set; } = "AWS S3"; // AWS S3, Azure Blob, Local
        public string VirusScanStatus { get; set; } = "CLEAN"; // CLEAN, INFECTED, PENDING
        public DateTime UploadedAt { get; set; } = DateTime.UtcNow;
        public string DownloadUrl { get; set; } = string.Empty;

        public UserDocument()
        {
            Id = Guid.NewGuid().ToString();
        }
    }
}
