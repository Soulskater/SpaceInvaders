/**
 * Created by gmeszaros on 2/3/2015.
 */
registerNamespace("Game.Service");
Game.Service.User = inject("jQuery").singleton(function ($) {
    var _user = {
        isAuthenticated: false
    };

    var _service = {
        authenticatedUser: _user,
        getUsers: function () {
            var deferred = $.Deferred();
            Game.Hubs.userHub.getUsers()
                .done(function (users) {
                    deferred.resolve(users);
                });
            return deferred;
        },
        onUserConnected: function (handler) {
            return Game.Hubs.userHub.onUserConnected(function (user) {
                handler(user);
            });
        },
        onUserDisconnected: function (handler) {
            return Game.Hubs.userHub.onUserDisconnected(function (user) {
                handler(user);
            });
        }
    };

    return _service;
});