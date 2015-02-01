using Newtonsoft.Json;

namespace SpaceInvaders.Api.Models
{
    public class SpaceShip
    {
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("x")]
        public int X { get; set; }
        [JsonProperty("y")]
        public int Y { get; set; }
        [JsonProperty("angle")]
        public int Angle { get; set; }
    }
}