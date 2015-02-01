/**
 * Created by gmeszaros on 1/14/2015.
 */
angular.module("SpaceInvaders")
    .controller("GameCtrl", ['$scope', 'authService', 'gameService', function ($scope, authService, gameService) {
        $scope.stage = new Game.Stage();

        var _init = function () {
            authService.getUsers().then(function (users) {
                linq(users).forEach(function (user) {
                    var isOwnPlayer = user.UserName === authService.authData.user.UserName
                    var player = $scope.stage.addPlayer(user.UserName, isOwnPlayer);
                    if (isOwnPlayer) {
                        player.ship.canvasObject.on(RenderJs.Canvas.Events.objectChanged, function (canvasObject) {
                            gameService.updateSpaceShip(canvasObject.pos, canvasObject.angle);
                        });
                    }
                });
            });
        };
        _init();

        gameService.onUpdateSpaceShip(function (updatedPlayer) {
            $scope.$apply(function () {
                var player = linq($scope.stage.players).first(function (player) {
                    return player.name === updatedPlayer.name;
                });
                player.ship.canvasObject.angle = updatedPlayer.angle;
                player.ship.canvasObject.pos = new RenderJs.Vector(updatedPlayer.x, updatedPlayer.y);
            })
        });

        authService.onUserConnected(function (user) {
            $scope.$apply(function () {
                $scope.stage.addPlayer(user.UserName, false);
            })
        });

        authService.onUserDisconnected(function (user) {
            $scope.$apply(function () {
                $scope.stage.removePlayer(user.UserName);
            })
        });
    }]);