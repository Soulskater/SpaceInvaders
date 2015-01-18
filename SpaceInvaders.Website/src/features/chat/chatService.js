/**
 * Created by gmeszaros on 1/16/2015.
 */
angular.module("SpaceInvaders")
    .service("chatService", ["$q", "$http", function ($q, $http) {
        return {
            sendMessage: function (message) {
                Game.Hubs.chatHub.sendMessage(message);
            },
            onReceiveMessage: function (handler) {
                Game.Hubs.chatHub.onReceiveMessage(function (message) {
                    handler(message);
                });
            }
        };
    }]);