using SpaceInvaders.Api.Account;
using SpaceInvaders.Api.Models;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNet.SignalR;
using SpaceInvaders.Api.Hubs;

namespace SpaceInvaders.Api.Controllers
{
    [RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {

        public AccountController()
        {
        }

        // POST api/Account/ConnectUser
        [AllowAnonymous]
        [Route("ConnectUser")]
        public async Task<IHttpActionResult> ConnectUser(User user)
        {
            if (UserManagement.Users.ContainsKey(user.UserName)) 
            {
                return BadRequest("A user with this name is already been connected!");
            }

            var newUser = new User()
            {
                UserName = user.UserName
            };
            UserManagement.Users.AddOrUpdate(user.UserName, newUser, (key, src) => { return newUser; });
            var hubContext = GlobalHost.ConnectionManager.GetHubContext<GameHub>();
            hubContext.Clients.All.onUserConnected(newUser);
            return Ok(newUser);
        }
    }
}
