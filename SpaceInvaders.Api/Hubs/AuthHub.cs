using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace SpaceInvaders.Api.Hubs
{
    public class AuthHub : Hub
    {
        public void LoginUser(string userName)
        {
            Clients.Caller.loginUser(userName);
        }
    }
}