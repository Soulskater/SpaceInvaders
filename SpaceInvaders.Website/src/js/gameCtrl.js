/**
 * Created by gmeszaros on 1/14/2015.
 */
angular.module("SpaceInvaders")
    .controller("GameCtrl", ['$scope', function ($scope) {
        $scope.stage = new Game.Stage();

        var _init = function () {
            Game.Service.Auth.getUsers().done(function (users) {
                linq(users).forEach(function (user) {
                    var isOwnPlayer = user.UserName === Game.Service.Auth.user.userName
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

        Game.Service.Update.onUpdateSpaceShip(function (updatedPlayer) {
            $scope.$apply(function () {
                var player = linq($scope.stage.players).first(function (player) {
                    return player.name === updatedPlayer.name;
                });
                player.ship.canvasObject.angle = updatedPlayer.angle;
                player.ship.canvasObject.pos = new RenderJs.Vector(updatedPlayer.x, updatedPlayer.y);
            })
        });

        Game.Service.Auth.onUserConnected(function (user) {
            $scope.$apply(function () {
                $scope.stage.addPlayer(user.UserName, false);
            })
        });

        Game.Service.Auth.onUserDisconnected(function (user) {
            $scope.$apply(function () {
                $scope.stage.removePlayer(user.UserName);
            })
        });
    }]);