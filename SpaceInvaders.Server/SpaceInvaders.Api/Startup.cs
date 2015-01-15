using Microsoft.Owin;
using Owin;
using SpaceInvaders.Api;

[assembly: OwinStartup(typeof(Startup))]
namespace SpaceInvaders.Api
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}