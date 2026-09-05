namespace Ktun.CareerPortal.Api.Controllers;

using Microsoft.AspNetCore.Mvc;
using Ktun.CareerPortal.Api.Attributes;

[ApiController]
[Route("api/v1/[controller]")]
public class EventManagementControllerSpec : ControllerBase
{
    [HttpGet("events")]
    public IActionResult GetEvents()
    {
        var events = new[]
        {
            new
            {
                id = "evt-1",
                title = "KTÜN 5. Savunma Sanayii Kariyer Günü",
                description = "ROKETSAN, HAVELSAN, TUSAŞ ve ASELSAN Konya İK yöneticilerinin katılımıyla gerçekleştirilecek olan kariyer zirvesi.",
                date = "28 Mayıs 2024",
                time = "09:30 - 17:00",
                location = "Gelişim Yerleşkesi Halil Ürün Konferans Salonu",
                capacity = 500,
                registeredCount = 450,
                speakers = new[] { "Mehmet Yılmaz (ASELSAN Konya İK Müdürü)", "Dr. Ahmet Kaya (ROKETSAN)" },
                hasCertificate = true
            }
        };

        return Ok(new { isSuccess = true, message = "Kariyer etkinlikleri listelendi.", data = events });
    }

    [HttpPost("events")]
    [RequireRole("CareerCenter", "SystemAdmin")]
    public IActionResult CreateEvent([FromBody] CreateEventRequest request)
    {
        if (string.IsNullOrEmpty(request.Title))
        {
            return BadRequest(new { isSuccess = false, message = "Etkinlik başlığı zorunludur." });
        }

        var newEvt = new
        {
            id = $"evt-{Guid.NewGuid():N}",
            title = request.Title,
            location = request.Location,
            date = request.Date,
            capacity = request.Capacity,
            registeredCount = 0
        };

        return Ok(new { isSuccess = true, message = "Yeni kariyer etkinliği başarıyla oluşturuldu.", data = newEvt });
    }

    [HttpPost("verify-qr")]
    [RequireRole("CareerCenter", "SystemAdmin")]
    public IActionResult VerifyQrTicket([FromBody] QrVerificationRequest request)
    {
        if (string.IsNullOrEmpty(request.TicketCode))
        {
            return BadRequest(new { isSuccess = false, message = "QR bilet kodu okunamadı." });
        }

        var ticketResult = new
        {
            isValid = true,
            studentName = "Emre Tunç",
            studentNumber = "20120033001",
            eventName = "KTÜN 5. Savunma Sanayii Kariyer Günü",
            scanTimestamp = DateTime.UtcNow.ToString("dd.MM.yyyy HH:mm:ss")
        };

        return Ok(new { isSuccess = true, message = "QR Bilet Doğrulandı — Salon Girişi Onaylandı.", data = ticketResult });
    }
}

public class CreateEventRequest
{
    public string Title { get; set; } = null!;
    public string Location { get; set; } = null!;
    public string Date { get; set; } = null!;
    public int Capacity { get; set; }
}

public class QrVerificationRequest
{
    public string TicketCode { get; set; } = null!;
}
