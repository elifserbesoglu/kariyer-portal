namespace Ktun.CareerPortal.Api.Controllers;

using Microsoft.AspNetCore.Mvc;
using Ktun.CareerPortal.Api.Attributes;

[ApiController]
[Route("api/v1/[controller]")]
public class JobPostingControllerSpec : ControllerBase
{
    [HttpPost]
    [RequireRole("Employer", "CareerCenter", "SystemAdmin")]
    public IActionResult CreateJobPosting([FromBody] CreateJobRequest request)
    {
        if (string.IsNullOrEmpty(request.Title) || string.IsNullOrEmpty(request.Description))
        {
            return BadRequest(new { isSuccess = false, message = "İlan başlığı ve açıklaması zorunludur." });
        }

        var job = new
        {
            id = $"job-{Guid.NewGuid():N}",
            companyId = request.CompanyId ?? "cmp-101",
            title = request.Title,
            workType = request.WorkType,
            location = request.Location,
            description = request.Description,
            requirements = request.Requirements,
            targetedDepartments = request.TargetedDepartments,
            createdDate = DateTime.UtcNow.ToString("dd.MM.yyyy"),
            deadlineDate = request.DeadlineDate,
            moderationStatus = request.IsDraft ? "Draft" : "PendingModeration"
        };

        return Ok(new { isSuccess = true, message = "İlan oluşturuldu. Moderasyona sunuldu.", data = job });
    }

    [HttpGet("pending-moderation")]
    [RequireRole("CareerCenter", "SystemAdmin")]
    public IActionResult GetPendingModerationJobs()
    {
        var pendingJobs = new[]
        {
            new
            {
                id = "job-2",
                companyId = "cmp-102",
                companyName = "Yeni Teknoloji ve Robotik Ltd.",
                title = "Otonom Sistemler Araştırma Stajyeri",
                location = "Konya Teknokent",
                workType = "Aday Mühendis",
                description = "Görüntü işleme ve otonom araç algoritmaları geliştirecek stajyer mühendisler.",
                requirements = new[] { "Python, OpenCV, PyTorch", "ROS2 altyapısı" },
                targetedDepartments = new[] { "Bilgisayar Mühendisliği", "Makine Mühendisliği" },
                createdDate = "16.05.2024",
                deadlineDate = "15.07.2024",
                moderationStatus = "PendingModeration"
            }
        };

        return Ok(new { isSuccess = true, message = "Moderasyon bekleyen ilanlar getirildi.", data = pendingJobs });
    }

    [HttpPost("{jobId}/approve")]
    [RequireRole("CareerCenter", "SystemAdmin")]
    public IActionResult ApproveJobPosting(string jobId, [FromBody] JobModerationActionRequest request)
    {
        return Ok(new
        {
            isSuccess = true,
            message = $"İlan ({jobId}) onaylandı ve hedef bölümlere yayınlandı.",
            data = new { jobId, moderationStatus = "Published", reviewer = request.ReviewerEmail }
        });
    }

    [HttpPost("{jobId}/request-revision")]
    [RequireRole("CareerCenter", "SystemAdmin")]
    public IActionResult RequestJobRevision(string jobId, [FromBody] JobModerationActionRequest request)
    {
        return Ok(new
        {
            isSuccess = true,
            message = $"İlan ({jobId}) için düzenleme istendi.",
            data = new { jobId, moderationStatus = "RevisionRequested", reviewer = request.ReviewerEmail, revisionNotes = request.RevisionNotes }
        });
    }
}

public class CreateJobRequest
{
    public string? CompanyId { get; set; }
    public string Title { get; set; } = null!;
    public string WorkType { get; set; } = null!;
    public string Location { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string[] Requirements { get; set; } = Array.Empty<string>();
    public string[] TargetedDepartments { get; set; } = Array.Empty<string>();
    public string DeadlineDate { get; set; } = null!;
    public bool IsDraft { get; set; }
}

public class JobModerationActionRequest
{
    public string ReviewerEmail { get; set; } = null!;
    public string? RevisionNotes { get; set; }
}
