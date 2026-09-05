namespace Ktun.CareerPortal.Api.Controllers;

using Microsoft.AspNetCore.Mvc;
using Ktun.CareerPortal.Api.Attributes;

[ApiController]
[Route("api/v1/[controller]")]
public class AlumniMentorshipControllerSpec : ControllerBase
{
    [HttpGet("alumni")]
    public IActionResult GetAlumniRecords()
    {
        var alumniList = new[]
        {
            new
            {
                id = "alm-1",
                fullName = "Ahmet Yılmaz",
                graduationYear = "2023",
                department = "Bilgisayar Mühendisliği",
                isEmployed = true,
                companyName = "ASELSAN Konya A.Ş.",
                position = "Kıdemli Gömülü C++ Yazılım Mühendisi",
                city = "Konya",
                country = "Türkiye",
                salaryRange = "50.000 TL - 65.000 TL",
                workModel = "Tam Zamanlı",
                wantsToMentor = true
            },
            new
            {
                id = "alm-2",
                fullName = "Selin Arslan",
                graduationYear = "2022",
                department = "Elektrik-Elektronik Mühendisliği",
                isEmployed = true,
                companyName = "SIEMENS AG",
                position = "Güç Sistemleri Uzmanı",
                city = "Münih",
                country = "Almanya",
                salaryRange = "3.500 € - 4.500 €",
                workModel = "Hibrit",
                wantsToMentor = true
            }
        };

        return Ok(new { isSuccess = true, message = "Mezun takip kayıtları getirildi.", data = alumniList });
    }

    [HttpGet("mentorship-requests")]
    [RequireRole("CareerCenter", "Alumni", "Student", "SystemAdmin")]
    public IActionResult GetMentorshipRequests()
    {
        var requests = new[]
        {
            new
            {
                id = "ment-1",
                mentorName = "Ahmet Yılmaz (2023 Mezunu)",
                mentorCompany = "ASELSAN Konya A.Ş.",
                mentorPosition = "Kıdemli Gömülü C++ Mühendisi",
                studentName = "Emre Tunç",
                studentDepartment = "Bilgisayar Mühendisliği (4. Sınıf)",
                topic = "Savunma Sanayii Gömülüyazılım Kariyer Rehberliği & C++ Kod İnceleme",
                requestDate = "18 Mayıs 2024",
                status = "Pending"
            }
        };

        return Ok(new { isSuccess = true, message = "Mezun-öğrenci mentorluk talepleri getirildi.", data = requests });
    }

    [HttpPost("mentorship-requests/{id}/approve")]
    [RequireRole("CareerCenter", "Alumni", "SystemAdmin")]
    public IActionResult ApproveMentorshipRequest(string id)
    {
        return Ok(new { isSuccess = true, message = $"Mentorluk eşleşmesi ({id}) başarıyla onaylandı.", data = new { id, status = "Approved" } });
    }
}
