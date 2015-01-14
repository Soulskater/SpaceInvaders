/**
 * Created by gmeszaros on 1/14/2015.
 */
var Game = Game || {};
Game.Connection = (function ($) {
    var connection = $.hubConnection();
    var serverUrl = "SpaceInvadersGameHub";
    var gameHubProxy = connection.createHubProxy(serverUrl);

    return {
        onHealthCheck: function (handler) {
            gameHubProxy.on('healthCheck', handler);
        },
        healthCheck: function () {
            connection.start().done(function () {
                gameHubProxy.invoke('getServerStatus');
            });
        }
    }


}(jQuery));

