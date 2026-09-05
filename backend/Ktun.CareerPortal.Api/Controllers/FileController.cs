using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Ktun.CareerPortal.Infrastructure.Services.Storage;

namespace Ktun.CareerPortal.Api.Controllers
{
    [ApiController]
    [Route("api/v1/files")]
    public class FileController : ControllerBase
    {
        private readonly FileManagementService _fileService;

        public FileController()
        {
            _fileService = new FileManagementService();
        }

        [HttpGet("my-documents")]
        public IActionResult GetMyDocuments([FromQuery] string userEmail = "emre.tunc@ogr.ktun.edu.tr")
        {
            var docs = _fileService.GetUserDocuments(userEmail);
            return Ok(docs);
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadDocument([FromBody] UploadDocumentRequest request)
        {
            var doc = await _fileService.UploadDocumentAsync(
                request.UserEmail ?? "emre.tunc@ogr.ktun.edu.tr",
                request.FileName,
                request.DocumentType ?? "CV",
                request.ProviderKey ?? "s3"
            );
            return Ok(doc);
        }
    }

    public class UploadDocumentRequest
    {
        public string UserEmail { get; set; } = string.Empty;
        public string FileName { get; set; } = string.Empty;
        public string DocumentType { get; set; } = "CV";
        public string ProviderKey { get; set; } = "s3";
    }
}
