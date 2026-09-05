namespace Ktun.CareerPortal.Api.Controllers;

using Microsoft.AspNetCore.Mvc;
using Ktun.CareerPortal.Api.Attributes;

[ApiController]
[Route("api/v1/[controller]")]
[RequireRole("CareerCenter", "DepartmentRepresentative", "SystemAdmin")]
public class ReportExportControllerSpec : ControllerBase
{
    [HttpPost("download")]
    public IActionResult DownloadReport([FromBody] ReportExportRequest request)
    {
        var format = string.IsNullOrEmpty(request.Format) ? "excel" : request.Format.ToLower();
        var extension = format switch
        {
            "pdf" => "pdf",
            "csv" => "csv",
            _ => "xlsx"
        };

        var fileName = $"KTUN_Kariyer_Merkezi_Raporu_2026.{extension}";
        var mimeType = format switch
        {
            "pdf" => "application/pdf",
            "csv" => "text/csv",
            _ => "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        };

        var exportResult = new
        {
            fileName = fileName,
            mimeType = mimeType,
            format = format,
            downloadUrl = $"https://api.kariyer.ktun.edu.tr/exports/temp/{fileName}",
            generatedAt = DateTime.UtcNow.ToString("dd.MM.yyyy HH:mm:ss")
        };

        return Ok(new { isSuccess = true, message = $"Kurumsal rapor ({extension.ToUpper()}) başarıyla üretildi.", data = exportResult });
    }
}

public class ReportExportRequest
{
    public string Format { get; set; } = "excel"; // excel, pdf, csv
    public string? FilterDepartment { get; set; }
    public string? FilterStartDate { get; set; }
    public string? FilterEndDate { get; set; }
}
