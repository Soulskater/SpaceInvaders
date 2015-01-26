/**
 * Created by MCG on 2015.01.15..
 */
angular.module("SpaceInvaders")
    .controller("ChatCtrl", ['$scope', 'chatService', 'authService', function ($scope, $service, authService) {
        $scope.messages = [];
        $scope.userName = authService.authData.user.UserName;
        $scope.message = "";
        $scope.sendMessage = function (message) {
            $service.sendMessage(message);
            $scope.messages.push({
                Message: message,
                User: authService.authData.user
            });
            $scope.message = "";
        };

        $service.onReceiveMessage(function (message) {
            $scope.$apply(function () {
                $scope.messages.push(message);
            })
        });
    }]);