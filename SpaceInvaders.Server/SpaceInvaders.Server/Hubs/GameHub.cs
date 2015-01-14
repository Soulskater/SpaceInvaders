using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace SpaceInvaders.Server.Hubs
{
    [HubName("gameHub")]
    public class GameHub : Hub
    {
        public void HealthCheck()
        {
            Clients.Caller.healthStatus("OK");
        }


    }
}