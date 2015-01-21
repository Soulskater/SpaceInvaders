/**
 * Created by MCG on 2015.01.17..
 */
angular.module("SpaceInvaders")
    .service("authService", ["$q", "$http", function ($q, $http) {

        var authenticatedUser;

        var _service = {
            connectUser: function (loginData) {
                var deferred = $q.defer();
                Game.Hubs.authHub.connectUser(loginData);
                deferred.resolve("");
                /*.done(function (user) {
                 authenticatedUser = user;
                 deferred.resolve(user);
                 });*/
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
                Game.Hubs.authHub.onUserConnected(function (message) {
                    handler(message);
                });
            }
        };

        return _service;
    }]);