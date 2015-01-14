/**
 * Created by gmeszaros on 1/14/2015.
 */
var Game = Game || {};
Game.Connection = (function ($) {
    var serverUrl = "http://localhost/GameServer/signalr";
    var connection = $.connection; //$.hubConnection(serverUrl, {userDefaultPath: false});
    var gameHubProxy = $.connection.gameHub;//connection.createHubProxy("gameHub");

    gameHubProxy.client.healthStatus = function (status) {
        console.log(status);
    };

    connection.hub.start();

    return {
        onHealthCheck: function (handler) {
            gameHubProxy.on('healthCheck', handler);
        },
        healthCheck: function () {
            gameHubProxy.server.healthCheck();
        }
    }


}(jQuery));

