/**
 * Created by gmeszaros on 1/15/2015.
 */
var Game = Game || {};
Game.Hubs = (function (connection) {
    var _connection = connection.hubConnection;
    return {
        //diagHub: diagHub(_connection),
        gameHub: gameHub(_connection),
        chatHub: chatHub(_connection),
        userHub: userHub(_connection)
    }
}(Game.Connection));