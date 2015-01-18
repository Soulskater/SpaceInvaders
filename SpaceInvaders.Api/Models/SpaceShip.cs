using Newtonsoft.Json;

namespace SpaceInvaders.Api.Models
{
    public class SpaceShip
    {
        [JsonProperty("x")]
        public int X { get; set; }
        [JsonProperty("y")]
        public int Y { get; set; }
    }
}