namespace Ktun.CareerPortal.Api.Controllers;

using Microsoft.AspNetCore.Mvc;
using Ktun.CareerPortal.Api.Attributes;

[ApiController]
[Route("api/v1/[controller]")]
public class EmployerControllerSpec : ControllerBase
{
    [HttpPost("register")]
    public IActionResult RegisterCompany([FromBody] CompanyRegisterRequest request)
    {
        if (string.IsNullOrEmpty(request.TaxNumber) || string.IsNullOrEmpty(request.CompanyName))
        {
            return BadRequest(new { isSuccess = false, message = "Vergi Numarası ve Firma Adı zorunludur." });
        }

        var result = new
        {
            companyId = $"cmp-{Guid.NewGuid():N}",
            companyName = request.CompanyName,
            taxNumber = request.TaxNumber,
            approvalStatus = "PendingApproval"
        };

        return Ok(new { isSuccess = true, message = "Firma kaydı alındı. Kariyer Merkezi onayına sunuldu.", data = result });
    }

    [HttpGet("profile")]
    [RequireRole("Employer", "SystemAdmin")]
    public IActionResult GetEmployerProfile()
    {
        var profile = new
        {
            companyId = "cmp-101",
            companyName = "ASELSAN Konya Silah Sistemleri A.Ş.",
            taxNumber = "1234567890",
            taxOffice = "Selçuklu Vergi Dairesi",
            authorizedPerson = "Mehmet Yılmaz (İK Müdürü)",
            phone = "+90 332 333 44 55",
            email = "ik@aselsankonya.com.tr",
            sector = "Savunma Sanayii",
            approvalStatus = "Approved",
            perks = new[] { "Özel Sağlık Sigortası", "Servis İmkânı", "Yüksek Lisans İzni", "Yemek Kartı" }
        };

        return Ok(new { isSuccess = true, message = "Firma profili getirildi.", data = profile });
    }
}

public class CompanyRegisterRequest
{
    public string CompanyName { get; set; } = null!;
    public string TaxNumber { get; set; } = null!;
    public string TaxOffice { get; set; } = null!;
    public string AuthorizedPerson { get; set; } = null!;
    public string Phone { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Sector { get; set; } = null!;
    public string TaxDocumentUrl { get; set; } = null!;
}
