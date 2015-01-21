using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Owin;
using SpaceInvaders.Api;
using SpaceInvaders.Api.Common;

[assembly: OwinStartup(typeof(Startup))]
namespace SpaceInvaders.Api
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
            GlobalHost.HubPipeline.AddModule(new ErrorHandlingPipelineModule());
        }
    }
}