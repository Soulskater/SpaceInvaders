/**
 * Created by MCG on 2015.01.17..
 */
angular.module("SpaceInvaders")
    .service("authService", ["$q", "$http", function ($q, $http) {

        var authenticatedUser;

        var _service = {
            connectUser: function (loginData) {
                var deferred = $q.defer();

                $http.post(Game.Connection.getServerUrl() + "api/account/ConnectUser", loginData).success(function (user) {
                    authenticatedUser = user;
                    deferred.resolve(user);
                }).error(function (err, status) {
                    authenticatedUser = null;
                    deferred.reject(err);
                });
                return deferred.promise;
            }
        };

        return _service;
    }]);