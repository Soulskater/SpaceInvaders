/**
 * Created by MCG on 2015.01.17..
 */
angular.module("SpaceInvaders")
    .controller("DashboardCtrl", ['$scope', function ($scope) {
        if (!Game.Service.Auth.user.isAuthenticated) {
            Game.Service.Auth.disconnectUser();
        }

        Game.Service.Auth.onUserConnected(function (user) {
            console.log(user);
        });
    }]);