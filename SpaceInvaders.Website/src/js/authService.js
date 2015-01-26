/**
 * Created by MCG on 2015.01.17..
 */
angular.module("SpaceInvaders")
    .service("authService", ["$q", "$http", "navigationService", function ($q, $http, $navigation) {

        var _authData = {
            isAuthenticated: false,
            user: {}
        };

        Game.Connection.onDisconnected(function () {
            _service.disconnectUser();
        });

        var _service = {
            authData: _authData,
            disconnectUser: function () {
                _authData.isAuthenticated = false;
                _authData.user = {};
                $navigation.go("/login");
            },
            connectUser: function (loginData) {
                var deferred = $q.defer();
                Game.Hubs.authHub.connectUser(loginData)
                    .done(function (user) {
                        _authData.isAuthenticated = true;
                        _authData.user = user;
                        deferred.resolve(user);
                    })
                    .fail(function (error) {
                        deferred.reject(error);
                    });
                return deferred.promise;
            },
            getUsers: function () {
                var deferred = $q.defer();
                Game.Hubs.authHub.getUsers()
                    .done(function (users) {
                        deferred.resolve(users);
                    });
                return deferred.promise;
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
    }]);