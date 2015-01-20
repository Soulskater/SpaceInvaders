/**
 * Created by MCG on 2015.01.17..
 */
angular.module("SpaceInvaders")
    .controller("DashboardCtrl", ['$scope', function ($scope) {
        debugger;
        Game.Hubs.gameHub.onUserConnected(function (user) {
            console.log(user);
        })
    }]);