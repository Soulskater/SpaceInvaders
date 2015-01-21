/**
 * Created by MCG on 2015.01.17..
 */
angular.module("SpaceInvaders")
    .controller("DashboardCtrl", ['$scope', 'authService', function ($scope, authService) {

        authService.onUserConnected(function (user) {
            console.log(user);
        });
    }]);