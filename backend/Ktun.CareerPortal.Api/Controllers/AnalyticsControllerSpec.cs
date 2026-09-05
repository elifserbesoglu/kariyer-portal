namespace Ktun.CareerPortal.Api.Controllers;

using Microsoft.AspNetCore.Mvc;
using Ktun.CareerPortal.Api.Attributes;

[ApiController]
[Route("api/v1/[controller]")]
[RequireRole("CareerCenter", "DepartmentRepresentative", "SystemAdmin")]
public class AnalyticsControllerSpec : ControllerBase
{
    [HttpGet("cockpit-widgets")]
    public IActionResult GetCockpitWidgets()
    {
        var widgets = new
        {
            bekleyenFirma = 18,
            bekleyenIlan = 12,
            bugunkuBasvuru = 95,
            bugunkuRandevu = 4,
            yaklasanEtkinlik = 2,
            aktifIsveren = 241,
            aktifOgrenci = 15840,
            mezunSayisi = 12450
        };

        return Ok(new { isSuccess = true, message = "Cockpit canlı gösterge sayaçları getirildi.", data = widgets });
    }

    [HttpGet("department-breakdown")]
    public IActionResult GetDepartmentBreakdown()
    {
        var breakdown = new[]
        {
            new { department = "Bilgisayar Mühendisliği", applicationsCount = 4850, percentage = 38 },
            new { department = "Elektrik-Elektronik Mühendisliği", applicationsCount = 3400, percentage = 27 },
            new { department = "Makine Mühendisliği", applicationsCount = 2600, percentage = 21 },
            new { department = "İnşaat Mühendisliği", applicationsCount = 1750, percentage = 14 }
        };

        return Ok(new { isSuccess = true, message = "Bölümlere göre başvuru dağılımı getirildi.", data = breakdown });
    }
}
