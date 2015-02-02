/**
 * Created by MCG on 2015.01.17..
 */
registerNamespace("Game.Service");
Game.Service.Auth = inject("jQuery").singleton(function ($) {
    Game.Connection.onDisconnected(function () {
        _service.disconnectUser();
    });

    var _user = {
        isAuthenticated: false
    };

    var _service = {
        user: _user,
        disconnectUser: function () {
            _user = {
                isAuthenticated: false
            };
            //$navigation.go("/login");
        },
        connectUser: function (loginData) {
            var deferred = $.Deferred();
            Game.Hubs.authHub.connectUser(loginData)
                .done(function (user) {
                    _user.isAuthenticated = true;
                    _user.userName = user.UserName;
                    deferred.resolve(_user);
                })
                .fail(function (error) {
                    deferred.reject(error);
                });
            return deferred;
        },
        getUsers: function () {
            var deferred = $.Deferred();
            Game.Hubs.authHub.getUsers()
                .done(function (users) {
                    deferred.resolve(users);
                });
            return deferred;
        },
        onUserConnected: function (handler) {
            return Game.Hubs.authHub.onUserConnected(function (user) {
                handler(user);
            });
        },
        onUserDisconnected: function (handler) {
            return Game.Hubs.authHub.onUserDisconnected(function (user) {
                handler(user);
            });
        }
    };

    return _service;
});