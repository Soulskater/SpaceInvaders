/**
 * Created by gmeszaros on 1/14/2015.
 */
var Game = Game || {};
Game.Init = (function ($, hubs) {
    hubs.chatHub.onReceiveMessage(function (message) {
        console.log(message);
    });
}($, Game.Hubs))