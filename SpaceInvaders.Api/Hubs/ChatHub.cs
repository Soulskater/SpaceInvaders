using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using SpaceInvaders.Api.Account;
using SpaceInvaders.Api.Models;

namespace SpaceInvaders.Api.Hubs
{
    public class ChatHub : Hub
    {
        public void SendMessage(string message)
        {
            Clients.AllExcept(Context.ConnectionId).receiveMessage(message);
        }
    }
}