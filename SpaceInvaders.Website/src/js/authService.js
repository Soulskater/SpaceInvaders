/**
 * Created by MCG on 2015.01.17..
 */
angular.module("SpaceInvaders")
    .service("authService", ["$q", "$http", function ($q, $http) {
        return {
            loginUser: function (loginData) {
                Game.Hubs.authHub.loginUser(loginData.userName);
            }
        };
    }]);