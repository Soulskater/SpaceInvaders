/**
 * Created by MCG on 2015.01.21..
 */
angular.module("SpaceInvaders")
    .controller("UserListCtrl", ['$scope', 'authService', function ($scope, authService) {
        $scope.users = [];
        var _init = function () {
            authService.getUsers().then(function (users) {
                $scope.users = users;
            });
        };
        _init();

        authService.onUserConnected(function (user) {
            $scope.$apply(function () {
                $scope.users.push(user);
            })
        });

        authService.onUserDisconnected(function (user) {
            $scope.$apply(function () {
                $scope.users.splice($scope.users.indexOf(user), 1);
            })
        });
    }]);