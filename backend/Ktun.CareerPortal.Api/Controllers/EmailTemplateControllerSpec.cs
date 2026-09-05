namespace Ktun.CareerPortal.Api.Controllers;

using Microsoft.AspNetCore.Mvc;
using Ktun.CareerPortal.Api.Attributes;

[ApiController]
[Route("api/v1/[controller]")]
[RequireRole("SystemAdmin", "CareerCenter")]
public class EmailTemplateControllerSpec : ControllerBase
{
    [HttpGet]
    public IActionResult GetEmailTemplates()
    {
        var templates = new[]
        {
            new
            {
                id = "tmpl-1",
                code = "EMPLOYER_APPROVED",
                name = "İşveren Firma Onayı E-postası",
                subject = "Tebrikler! KTÜN Kariyer Portalı İşveren Hesabınız Onaylandı",
                body = "Sayın {{AuthorizedPerson}},\n\n{{CompanyName}} kurumsal kaydınız ve vergi levhanız Kariyer Merkezi tarafından incelenmiş ve onaylanmıştır. Artık ilan oluşturabilirsiniz.",
                placeholders = new[] { "{{AuthorizedPerson}}", "{{CompanyName}}", "{{ApprovalDate}}" }
            },
            new
            {
                id = "tmpl-2",
                code = "INTERVIEW_INVITATION",
                name = "Mülakat Davet E-postası",
                subject = "Mülakat Çağrısı: {{JobTitle}} — {{CompanyName}}",
                body = "Sayın {{StudentName}},\n\n{{CompanyName}} bünyesindeki {{JobTitle}} ilanınız için {{InterviewDate}} tarihinde online mülakata davet edildiniz.\n\nTeams Linki: {{TeamsUrl}}",
                placeholders = new[] { "{{StudentName}}", "{{CompanyName}}", "{{JobTitle}}", "{{InterviewDate}}", "{{TeamsUrl}}" }
            }
        };

        return Ok(new { isSuccess = true, message = "E-Posta şablonları listelendi.", data = templates });
    }

    [HttpPut("{id}")]
    public IActionResult UpdateEmailTemplate(string id, [FromBody] UpdateTemplateRequest request)
    {
        if (string.IsNullOrEmpty(request.Subject) || string.IsNullOrEmpty(request.Body))
        {
            return BadRequest(new { isSuccess = false, message = "Konu başlığı ve gövde metni zorunludur." });
        }

        return Ok(new
        {
            isSuccess = true,
            message = $"E-Posta şablonu ({id}) güncellendi ve canlı bildirim servisine aktarıldı.",
            data = new { id, subject = request.Subject, body = request.Body }
        });
    }
}

public class UpdateTemplateRequest
{
    public string Subject { get; set; } = null!;
    public string Body { get; set; } = null!;
}
