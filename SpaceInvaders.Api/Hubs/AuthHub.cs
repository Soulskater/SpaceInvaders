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
            User existingUser;
            if (UserManagement.Users.TryGetValue(Context.ConnectionId, out existingUser))
            {
                throw new HubException(String.Format("You already been connected as {0}!", existingUser.UserName));
            }
            else
            {
                if (UserManagement.Users.Any(u => u.Value.UserName == user.UserName))
                {
                    throw new HubException("A user with this name is already been connected!");
                }
                else
                {
                    user.ConnectionId = Context.ConnectionId;

                    lock (UserManagement.Users)
                    {
                        UserManagement.Users.AddOrUpdate(Context.ConnectionId, user, (key, src) => { return user; });
                    }
                }
            }
            //
            //Notify clients
            Clients.AllExcept(Context.ConnectionId).onUserConnected(user);

            return user;
        }

        public void DisconnectUser(User user)
        {
            if (!UserManagement.Users.ContainsKey(Context.ConnectionId))
            {
                throw new HubException("A user with this name is already been disconnected!");
            }

            UserManagement.Users.TryRemove(Context.ConnectionId, out user);

            Clients.AllExcept(Context.ConnectionId).onUserDisconnected(user);
        }

        public User[] GetUsers()
        {
            return UserManagement.Users.Values.ToArray();
        }

        public override System.Threading.Tasks.Task OnDisconnected(bool stopCalled)
        {
            User user;
            if (UserManagement.Users.TryRemove(Context.ConnectionId, out user))
            {
                Clients.AllExcept(Context.ConnectionId).onUserDisconnected(user);
            }

            return base.OnDisconnected(stopCalled);
        }
    }
}