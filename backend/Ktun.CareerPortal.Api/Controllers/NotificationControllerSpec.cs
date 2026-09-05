namespace Ktun.CareerPortal.Api.Controllers;

using Microsoft.AspNetCore.Mvc;
using Ktun.CareerPortal.Api.Attributes;

[ApiController]
[Route("api/v1/[controller]")]
public class NotificationControllerSpec : ControllerBase
{
    [HttpGet]
    public IActionResult GetUserNotifications()
    {
        var notifications = new[]
        {
            new
            {
                id = "notif-1",
                category = "Mülakat",
                title = "Mülakat Daveti Alındı!",
                message = "ASELSAN Konya başvurdunuz ilan için mülakat aşamasına ilerlediniz.",
                timestamp = "15.05.2024 14:30",
                status = "unread",
                type = "success",
                isPinned = true
            },
            new
            {
                id = "notif-2",
                category = "Etkinlik",
                title = "Yaklaşan Kariyer Günü",
                message = "KTÜN 5. Savunma Sanayii Kariyer Günü yarın başlıyor.",
                timestamp = "14.05.2024 09:00",
                status = "read",
                type = "info",
                isPinned = false
            }
        };

        return Ok(new { isSuccess = true, message = "Bildirimler getirildi.", unreadCount = 1, data = notifications });
    }

    [HttpPut("{id}/read")]
    public IActionResult MarkAsRead(string id)
    {
        return Ok(new { isSuccess = true, message = $"Bildirim ({id}) okundu olarak işaretlendi." });
    }

    [HttpPost("send-bulk")]
    [RequireRole("CareerCenter", "DepartmentRepresentative", "SystemAdmin")]
    public IActionResult SendBulkNotification([FromBody] BulkNotificationRequest request)
    {
        if (string.IsNullOrEmpty(request.Title) || string.IsNullOrEmpty(request.Message))
        {
            return BadRequest(new { isSuccess = false, message = "Bildirim başlığı ve mesajı zorunludur." });
        }

        return Ok(new
        {
            isSuccess = true,
            message = $"Hedefli toplu bildirim iletildi.",
            data = new { targetDepartment = request.TargetDepartment, targetGrade = request.TargetGrade, recipientCount = 420 }
        });
    }
}

public class BulkNotificationRequest
{
    public string TargetDepartment { get; set; } = null!;
    public string TargetGrade { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string Message { get; set; } = null!;
}
