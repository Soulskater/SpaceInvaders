/**
 * Created by gmeszaros on 1/14/2015.
 */
var Game = Game || {};
Game.Init = (function ($, hubs) {
    hubs.gamePlayHub.onUpdateSpaceShip(function (spaceShip) {
        console.log("Spaceship position: {x:" + spaceShip.x + ", y:" + spaceShip.y + "}");
    });
}($, Game.Hubs))