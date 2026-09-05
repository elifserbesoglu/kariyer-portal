namespace Ktun.CareerPortal.Api.Hubs;

using Microsoft.AspNetCore.SignalR;
using Ktun.CareerPortal.Api.Attributes;

[RequireRole("Student", "Alumni", "Employer", "CareerCenter", "DepartmentRepresentative", "SystemAdmin")]
public class NotificationHubSpec : Hub
{
    public async Task JoinDepartmentGroup(string departmentName)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, $"Dept_{departmentName}");
    }

    public async Task LeaveDepartmentGroup(string departmentName)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"Dept_{departmentName}");
    }

    public async Task BroadcastLiveNotification(string targetGroup, string title, string message)
    {
        await Clients.Group(targetGroup).SendAsync("ReceiveNotification", new
        {
            title = title,
            message = message,
            timestamp = DateTime.UtcNow.ToString("dd.MM.yyyy HH:mm:ss")
        });
    }

    public async Task NotifyAtsStageChange(string candidateId, string newStage)
    {
        await Clients.All.SendAsync("AtsStageChanged", new
        {
            candidateId = candidateId,
            newStage = newStage,
            timestamp = DateTime.UtcNow.ToString("HH:mm:ss")
        });
    }

    public override async Task OnConnectedAsync()
    {
        await Clients.Caller.SendAsync("ConnectionEstablished", new { connectionId = Context.ConnectionId, message = "KTÜN Canlı SignalR Bildirim Hub'ına Bağlanıldı." });
        await base.OnConnectedAsync();
    }
}
