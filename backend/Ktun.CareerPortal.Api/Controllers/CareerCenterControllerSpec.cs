namespace Ktun.CareerPortal.Api.Controllers;

using Microsoft.AspNetCore.Mvc;
using Ktun.CareerPortal.Api.Attributes;

[ApiController]
[Route("api/v1/[controller]")]
[RequireRole("CareerCenter", "SystemAdmin")]
public class CareerCenterControllerSpec : ControllerBase
{
    [HttpGet("pending-companies")]
    public IActionResult GetPendingCompanies()
    {
        var pendingList = new[]
        {
            new
            {
                id = "cmp-102",
                companyName = "Yeni Teknoloji ve Robotik Ltd.",
                taxNumber = "9876543210",
                taxOffice = "Meram Vergi Dairesi",
                authorizedPerson = "Ahmet Kaya",
                phone = "+90 332 999 88 77",
                email = "info@yeni-teknoloji.com",
                sector = "Robotik & Otomasyon",
                applicationDate = "14.05.2024",
                approvalStatus = "PendingApproval",
                riskLevel = "Low"
            }
        };

        return Ok(new { isSuccess = true, message = "Bekleyen firmalar getirildi.", data = pendingList });
    }

    [HttpPost("companies/{companyId}/approve")]
    public IActionResult ApproveCompany(string companyId, [FromBody] CompanyApprovalActionRequest request)
    {
        return Ok(new
        {
            isSuccess = true,
            message = $"Firma ({companyId}) başarıyla onaylandı ve işveren paneline giriş yetkisi verildi.",
            data = new { companyId, status = "Approved", reviewer = request.ReviewerEmail, notes = request.Notes }
        });
    }

    [HttpPost("companies/{companyId}/reject")]
    public IActionResult RejectCompany(string companyId, [FromBody] CompanyApprovalActionRequest request)
    {
        if (string.IsNullOrEmpty(request.Notes))
        {
            return BadRequest(new { isSuccess = false, message = "Firma reddi için gerekçe notu zorunludur." });
        }

        return Ok(new
        {
            isSuccess = true,
            message = $"Firma ({companyId}) kaydı reddedildi.",
            data = new { companyId, status = "Rejected", reviewer = request.ReviewerEmail, notes = request.Notes }
        });
    }
}

public class CompanyApprovalActionRequest
{
    public string ReviewerEmail { get; set; } = null!;
    public string? Notes { get; set; }
}
