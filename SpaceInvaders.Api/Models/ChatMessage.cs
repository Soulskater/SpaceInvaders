using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SpaceInvaders.Api.Models
{
    public class ChatMessage
    {
        public string Message { get; set; }

        public User User { get; set; }
    }
}