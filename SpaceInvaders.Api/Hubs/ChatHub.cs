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
            User user;
            if(!UserManagement.Users.TryGetValue(Context.ConnectionId, out user))
            {
                throw new HubException("Cannot find the user in the store!");
            }

            Clients.AllExcept(Context.ConnectionId).receiveMessage(
                new ChatMessage() {
                    Message = message,
                    User = user
            });
        }
    }
}