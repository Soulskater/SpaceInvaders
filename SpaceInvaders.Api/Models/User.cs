using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SpaceInvaders.Api.Models
{
    public class User
    {
        public string UserName { get; set; }

        [JsonIgnore]
        public string ConnectionId { get; set; }
    }
}