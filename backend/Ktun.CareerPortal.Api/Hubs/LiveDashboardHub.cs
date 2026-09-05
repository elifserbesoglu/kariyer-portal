using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Ktun.CareerPortal.Api.Hubs
{
    public class LiveDashboardHub : Hub
    {
        public async Task SubscribeToLiveMetrics(string roleScope)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, roleScope ?? "ALL");
            await Clients.Caller.SendAsync("ReceiveMetricsUpdate", "SignalR Connected to Live Cluster.");
        }
    }
}
