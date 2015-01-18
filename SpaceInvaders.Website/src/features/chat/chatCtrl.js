/**
 * Created by MCG on 2015.01.15..
 */
angular.module("SpaceInvaders")
    .controller("ChatCtrl", ['$scope', 'chatService', function ($scope, $service) {
        $scope.messages = [];
        $scope.message = "";
        $scope.sendMessage = function (message) {
            $service.sendMessage(message);
            $scope.messages.push(message);
            $scope.message = "";
        };

        $service.onReceiveMessage(function (message) {
            $scope.$apply(function () {
                $scope.messages.push(message);
            })
        });
    }]);