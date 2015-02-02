/**
 * Created by gmeszaros on 1/16/2015.
 */
registerNamespace("Game.Service");
Game.Service.Update = inject().singleton(function () {
    return {
        updateSpaceShip: function (position, angle) {
            Game.Hubs.gameHub.updateSpaceShip({
                name: authService.authData.user.UserName,
                x: Math.floor(position.x),
                y: Math.floor(position.y),
                angle: Math.floor(angle)
            });
        },
        onUpdateSpaceShip: function (handler) {
            Game.Hubs.gameHub.onUpdateSpaceShip(function (spaceship) {
                handler(spaceship);
            });
        }
    };
});