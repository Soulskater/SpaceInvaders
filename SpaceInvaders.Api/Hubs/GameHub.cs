using Microsoft.AspNet.SignalR;
using SpaceInvaders.Api.Models;

namespace SpaceInvaders.Api.Hubs
{
    public class GameHub : Hub
    {
        public void UpdateSpaceShip(SpaceShip ship)
        {
            Clients.AllExcept(Context.ConnectionId).updateSpaceShip(ship);
        }
    }
}