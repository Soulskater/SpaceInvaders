/**
 * Created by gmeszaros on 1/14/2015.
 */
var Game = Game || {};

Game.ConnectionState = {
    connected: 1,
    connecting: 0,
    disconnected: 4,
    reconnecting: 2
};

Game.Connection = (function ($) {
    var serverUrl = "http://localhost:90/SpaceInvaders.Api";
    var _connection = $.hubConnection(serverUrl, {userDefaultPath: false});

    _connection.disconnected(function () {
        _connection.start();
    });
    _connection.start();

    return {
        hubConnection: _connection,
        safeInvoke: function (handler) {
            if (_connection.state === Game.ConnectionState.connected)
                handler();
            else {
                _connection.start().done(handler);
            }
        },
        getState: function () {
            return _connection.state;
        }
    }
}(jQuery));

