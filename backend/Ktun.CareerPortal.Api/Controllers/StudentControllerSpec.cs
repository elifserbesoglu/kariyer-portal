namespace Ktun.CareerPortal.Api.Controllers;

using Microsoft.AspNetCore.Mvc;
using Ktun.CareerPortal.Api.Attributes;

[ApiController]
[Route("api/v1/[controller]")]
public class StudentControllerSpec : ControllerBase
{
    [HttpGet("profile")]
    [RequireRole("Student", "Alumni")]
    public IActionResult GetStudentProfile()
    {
        var profile = new
        {
            studentNumber = "20120033001",
            fullName = "Emre Tunç",
            email = "emre.tunc@ogr.ktun.edu.tr",
            faculty = "Mühendislik ve Doğa Bilimleri Fakültesi",
            department = "Bilgisayar Mühendisliği",
            grade = "4. Sınıf",
            gpa = 3.42,
            isObsVerified = true,
            cvTitle = "ATS_Format_Emre_Tunc_CV.pdf"
        };

        return Ok(new { isSuccess = true, message = "Öğrenci profili getirildi.", data = profile });
    }

    [HttpPost("obs-verify")]
    [RequireRole("Student")]
    public IActionResult VerifyObsData([FromBody] ObsVerifyRequest request)
    {
        if (string.IsNullOrEmpty(request.StudentNumber) || string.IsNullOrEmpty(request.TcKn))
        {
            return BadRequest(new { isSuccess = false, message = "Öğrenci numarası ve TCKN zorunludur." });
        }

        var result = new
        {
            isVerified = true,
            studentNumber = request.StudentNumber,
            fullName = "Emre Tunç",
            department = "Bilgisayar Mühendisliği",
            gpa = "3.42"
        };

        return Ok(new { isSuccess = true, message = "OBS bilgileri doğrulandı.", data = result });
    }
}

public class ObsVerifyRequest
{
    public string StudentNumber { get; set; } = null!;
    public string TcKn { get; set; } = null!;
}
