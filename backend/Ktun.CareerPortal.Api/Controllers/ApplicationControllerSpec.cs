namespace Ktun.CareerPortal.Api.Controllers;

using Microsoft.AspNetCore.Mvc;
using Ktun.CareerPortal.Api.Attributes;

[ApiController]
[Route("api/v1/[controller]")]
public class ApplicationControllerSpec : ControllerBase
{
    [HttpPost]
    [RequireRole("Student", "Alumni")]
    public IActionResult SubmitApplication([FromBody] SubmitApplicationRequest request)
    {
        if (string.IsNullOrEmpty(request.JobId) || string.IsNullOrEmpty(request.CvTitle))
        {
            return BadRequest(new { isSuccess = false, message = "İlan kimliği ve CV başlığı zorunludur." });
        }

        var application = new
        {
            id = $"app-{Guid.NewGuid():N}",
            jobId = request.JobId,
            studentId = request.StudentId,
            appliedDate = DateTime.UtcNow.ToString("dd.MM.yyyy"),
            stage = "applied",
            cvTitle = request.CvTitle
        };

        return Ok(new { isSuccess = true, message = "İlan başvurunuz başarıyla alındı ve işverene iletildi.", data = application });
    }

    [HttpGet("employer/{companyId}")]
    [RequireRole("Employer", "CareerCenter", "SystemAdmin")]
    public IActionResult GetEmployerApplications(string companyId)
    {
        var applications = new[]
        {
            new
            {
                id = "app-1",
                jobId = "job-1",
                jobTitle = "Yazılım Geliştirme Mühendisi (Gömülü C++)",
                companyName = "ASELSAN Konya Silah Sistemleri A.Ş.",
                studentId = "20120033001",
                studentName = "Emre Tunç",
                studentEmail = "emre.tunc@ogr.ktun.edu.tr",
                studentPhone = "+90 555 123 45 67",
                department = "Bilgisayar Mühendisliği",
                gpa = "3.42",
                appliedDate = "15.05.2024",
                stage = "interview",
                cvTitle = "ATS_Format_Emre_Tunc_CV.pdf"
            }
        };

        return Ok(new { isSuccess = true, message = "Firma aday başvuru havuzu getirildi.", data = applications });
    }

    [HttpPut("{applicationId}/stage")]
    [RequireRole("Employer", "CareerCenter", "SystemAdmin")]
    public IActionResult UpdateCandidateStage(string applicationId, [FromBody] UpdateStageRequest request)
    {
        return Ok(new
        {
            isSuccess = true,
            message = $"Aday ({applicationId}) aşaması '{request.NewStage}' olarak güncellendi.",
            data = new { applicationId, newStage = request.NewStage, updatedBy = request.UpdatedByEmail, notes = request.Notes }
        });
    }
}

public class SubmitApplicationRequest
{
    public string JobId { get; set; } = null!;
    public string StudentId { get; set; } = null!;
    public string CvTitle { get; set; } = null!;
}

public class UpdateStageRequest
{
    public string NewStage { get; set; } = null!; // applied, screening, test, interview, offer, hired
    public string UpdatedByEmail { get; set; } = null!;
    public string? Notes { get; set; }
}
