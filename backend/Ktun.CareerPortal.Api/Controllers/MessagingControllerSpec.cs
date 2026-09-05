namespace Ktun.CareerPortal.Api.Controllers;

using Microsoft.AspNetCore.Mvc;
using Ktun.CareerPortal.Api.Attributes;

[ApiController]
[Route("api/v1/[controller]")]
public class MessagingControllerSpec : ControllerBase
{
    [HttpGet("conversations")]
    public IActionResult GetConversations()
    {
        var conversations = new[]
        {
            new
            {
                id = "conv-1",
                participantName = "ASELSAN Konya İK",
                participantRole = "Employer",
                lastMessage = "Mülakat öncesi teknik sunum dosyanızı iletebilir misiniz?",
                lastMessageTime = "14:20",
                unreadCount = 1
            },
            new
            {
                id = "conv-2",
                participantName = "Dr. Mehmet Şahin",
                participantRole = "CareerCenter",
                lastMessage = "Kariyer danışmanlığı randevunuz onaylanmıştır.",
                lastMessageTime = "Dün",
                unreadCount = 0
            }
        };

        return Ok(new { isSuccess = true, message = "Sohbet listesi getirildi.", data = conversations });
    }

    [HttpGet("conversations/{conversationId}/messages")]
    public IActionResult GetMessages(string conversationId)
    {
        var messages = new[]
        {
            new { id = "m-1", senderName = "ASELSAN Konya İK", text = "Merhaba Emre Bey, mülakat tarihinizi teyit etmek isteriz.", timestamp = "14:15", isMine = false, fileUrl = (string?)null },
            new { id = "m-2", senderName = "Emre Tunç", text = "Merhaba, evet 24 Mayıs saat 14:00 benim için uygundur.", timestamp = "14:18", isMine = true, fileUrl = (string?)null }
        };

        return Ok(new { isSuccess = true, message = "Mesaj geçmişi getirildi.", data = messages });
    }

    [HttpPost("conversations/{conversationId}/messages")]
    public IActionResult SendMessage(string conversationId, [FromBody] SendMessageRequest request)
    {
        if (string.IsNullOrEmpty(request.Text) && string.IsNullOrEmpty(request.AttachmentUrl))
        {
            return BadRequest(new { isSuccess = false, message = "Mesaj metni veya dosya eki zorunludur." });
        }

        var newMsg = new
        {
            id = $"m-{Guid.NewGuid():N}",
            senderName = request.SenderName,
            text = request.Text,
            timestamp = DateTime.UtcNow.ToString("HH:mm"),
            isMine = true,
            attachmentUrl = request.AttachmentUrl
        };

        return Ok(new { isSuccess = true, message = "Mesaj iletildi.", data = newMsg });
    }
}

public class SendMessageRequest
{
    public string SenderName { get; set; } = null!;
    public string Text { get; set; } = null!;
    public string? AttachmentUrl { get; set; }
}
