/**
 * Created by gmeszaros on 1/15/2015.
 */
var Game = Game || {};
Game.Hubs = (function (connection) {
    var _connection = connection.getConnection();
    return {
        diagHub: diagHub(_connection),
        gamePlayHub: gamePlayHub(_connection)
    }
}(Game.Connection));