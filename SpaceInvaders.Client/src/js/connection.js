/**
 * Created by gmeszaros on 1/14/2015.
 */
var Game = Game || {};
Game.Connection = (function ($) {
    var serverUrl = "http://localhost:90/SpaceInvaders.Api/signalr";

    return {
        getConnection: function () {
           return $.hubConnection(serverUrl, {userDefaultPath: false});
        }
    }
}(jQuery));

