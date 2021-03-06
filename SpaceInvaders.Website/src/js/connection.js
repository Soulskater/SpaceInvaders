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
    var _serverUrl = "http://spaceinvadersservice.azurewebsites.net/";
    //var _serverUrl = "http://localhost:90/SpaceInvaders.Api";
    var _connection = $.hubConnection(_serverUrl, {userDefaultPath: false});
    var dispatcher = new EventDispatcher();

    _connection.enableLogging = true;

    var events = {
        onDisconnected: "onDisconnected"
    };

    _connection.disconnected(function () {
        dispatcher.trigger(events.onDisconnected);
    });

    return {
        hubConnection: _connection,
        getServerUrl: function () {
            return _serverUrl;
        },
        safeInvoke: function () {
            if (_connection.state === Game.ConnectionState.connected) {
                var deferred = $.Deferred();
                deferred.resolve();
                return deferred;
            }
            else {
                return _connection.start();
            }
        },
        getState: function () {
            return _connection.state;
        },
        onDisconnected: function (handler) {
            return dispatcher.subscribe(events.onDisconnected, handler);
        }
    }
}(jQuery));

