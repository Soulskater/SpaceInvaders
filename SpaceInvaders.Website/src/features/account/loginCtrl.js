/**
 * Created by gmeszaros on 10/31/2014.
 */
angular.module("SpaceInvaders")
    .controller('LoginCtrl', ['$scope', 'navigationService', function ($scope, $navigation) {

        $scope.loginData = {
            userName: ""
        };
        $scope.message = "";
        $scope.authenticating = false;

        $scope.connectUser = function () {
            $scope.authenticating = true;
            Game.Service.Auth.connectUser($scope.loginData).done(function (user) {
                $scope.authenticating = false;
                $navigation.go('/dashboard');
            }).fail(function (err) {
                $scope.authenticating = false;
                $scope.message = err.message;
            });
        };
    }]);