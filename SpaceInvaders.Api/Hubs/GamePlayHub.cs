using Microsoft.AspNet.SignalR;
using SpaceInvaders.Api.Models;

namespace SpaceInvaders.Api.Hubs
{
    public class GamePlayHub : Hub
    {
        public void UpdateSpaceShip(SpaceShip ship)
        {
            Clients.AllExcept(Context.ConnectionId).updateSpaceShip(ship);
        }
    }
}