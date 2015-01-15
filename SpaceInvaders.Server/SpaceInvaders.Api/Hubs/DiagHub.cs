using Microsoft.AspNet.SignalR;

namespace SpaceInvaders.Api.Hubs
{
    public class DiagHub : Hub
    {
        public void HealthCheck()
        {
            Clients.All.healthCheck("OK");
        }
    }
}