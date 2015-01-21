using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using SpaceInvaders.Api.Models;
using SpaceInvaders.Api.Account;
using Microsoft.AspNet.SignalR.Hubs;

namespace SpaceInvaders.Api.Hubs
{
    [HubName("authHub")]
    public class AuthHub : Hub
    {
        public User ConnectUser(User user)
        {
            if (UserManagement.Users.ContainsKey(user.UserName))
            {
                throw new HubException("A user with this name is already been connected!");
            }

            var newUser = new User()
            {
                UserName = user.UserName
            };
            UserManagement.Users.AddOrUpdate(user.UserName, newUser, (key, src) => { return newUser; });

            Clients.AllExcept(Context.ConnectionId).userConnected(newUser);

            return newUser;
        }

        public User[] GetUsers()
        {
            return UserManagement.Users.Values.ToArray();
        }
    }
}