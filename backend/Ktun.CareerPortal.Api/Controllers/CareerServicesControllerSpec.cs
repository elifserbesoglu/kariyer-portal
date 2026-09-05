namespace Ktun.CareerPortal.Api.Controllers;

using Microsoft.AspNetCore.Mvc;
using Ktun.CareerPortal.Api.Attributes;

[ApiController]
[Route("api/v1/[controller]")]
public class CareerServicesControllerSpec : ControllerBase
{
    [HttpGet("counselors")]
    public IActionResult GetCounselors()
    {
        var counselors = new[]
        {
            new
            {
                id = "c-1",
                fullName = "Dr. Öğr. Üyesi Mehmet Şahin",
                title = "Kariyer Merkezi Müdürü & Danışman",
                specialty = "Savunma Sanayii & Mühendislik Kariyer Planlaması",
                workingHours = "Pazartesi - Çarşamba (10:00 - 16:00)",
                officeLocation = "KTÜN Rektörlük Binası Z-12",
                teamsUrl = "https://teams.microsoft.com/l/meetup-join/counselor-mehmet-sahin",
                activeAppointmentsCount = 4
            },
            new
            {
                id = "c-2",
                fullName = "Öğr. Gör. Zeynep Arslan",
                title = "Kariyer Danışmanı & Yurt Dışı Eğitimi Uzmanı",
                specialty = "Yurt Dışı Lisansüstü, Erasmus & Staj Danışmanlığı",
                workingHours = "Salı - Perşembe (09:00 - 15:00)",
                officeLocation = "KTÜN Mühendislik Fakültesi B-Blok 204",
                teamsUrl = "https://teams.microsoft.com/l/meetup-join/counselor-zeynep-arslan",
                activeAppointmentsCount = 3
            }
        };

        return Ok(new { isSuccess = true, message = "Kariyer danışmanları listelendi.", data = counselors });
    }

    [HttpGet("appointments")]
    [RequireRole("CareerCenter", "Student", "SystemAdmin")]
    public IActionResult GetAppointments()
    {
        var appointments = new[]
        {
            new
            {
                id = "app-101",
                counselorId = "c-1",
                counselorName = "Dr. Öğr. Üyesi Mehmet Şahin",
                studentName = "Emre Tunç",
                studentNumber = "20120033001",
                department = "Bilgisayar Mühendisliği",
                date = "24 Mayıs 2024",
                time = "10:30 - 11:00",
                topic = "ASELSAN Aday Mühendislik Mülakat Simülasyonu & CV İnceleme",
                status = "Approved",
                notes = "Mülakat öncesi teknik projeleri gözden geçirilecek."
            }
        };

        return Ok(new { isSuccess = true, message = "Öğrenci danışmanlık randevuları getirildi.", data = appointments });
    }

    [HttpGet("calendar-events")]
    public IActionResult GetMergedCalendarEvents()
    {
        var calendarItems = new[]
        {
            new { id = "e-1", title = "ASELSAN Konya Gömülü C++ Mülakatı", category = "Mülakat", date = "24 Mayıs 2024", time = "14:00 - 14:45", locationOrUrl = "Teams Online", participants = "Emre Tunç & Mehmet Yılmaz" },
            new { id = "e-2", title = "Yurt Dışı Yüksek Lisans Danışmanlığı", category = "Danışmanlık", date = "25 Mayıs 2024", time = "10:30 - 11:00", locationOrUrl = "Rektörlük Binası Z-12", participants = "Ayşe Yılmaz & Dr. Mehmet Şahin" },
            new { id = "e-3", title = "KTÜN 5. Savunma Sanayii Kariyer Günü", category = "Etkinlik", date = "28 Mayıs 2024", time = "09:30 - 17:00", locationOrUrl = "Halil Ürün Konferans Salonu", participants = "450 Kayıtlı Öğrenci & ROKETSAN" }
        };

        return Ok(new { isSuccess = true, message = "Ortak takvim etkinlikleri getirildi.", data = calendarItems });
    }
}
