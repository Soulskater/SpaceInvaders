using SpaceInvaders.Api.Models;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SpaceInvaders.Api.Account
{
    public static class UserManagement
    {
        public static readonly ConcurrentDictionary<string, User> Users
        = new ConcurrentDictionary<string, User>();
    }
}