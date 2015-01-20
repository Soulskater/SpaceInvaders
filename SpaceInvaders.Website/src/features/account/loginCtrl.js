/**
 * Created by gmeszaros on 10/31/2014.
 */
angular.module("SpaceInvaders")
    .controller('LoginCtrl', ['$scope', 'navigationService', 'authService', function ($scope, $navigation, authService) {

        $scope.loginData = {
            userName: ""
        };
        $scope.message = "";
        $scope.authenticating = false;

        $scope.connectUser = function () {
            $scope.authenticating = true;
            authService.connectUser($scope.loginData).then(function (user) {
                $scope.authenticating = false;
                $navigation.go('/dashboard');
            }).catch(function (err) {
                $scope.authenticating = false;
                $scope.message = err.error_description;
            });
        };
    }]);