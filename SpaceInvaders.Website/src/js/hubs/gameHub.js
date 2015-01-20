/**
 * Created by gmeszaros on 1/15/2015.
 */
var gameHub = function (connection) {
    var hub = connection.createHubProxy("gameHub");

    return{
        onUpdateSpaceShip: function (handler) {
            hub.on('updateSpaceShip', handler);
        },
        updateSpaceShip: function (spaceShip) {
            Game.Connection.safeInvoke(function () {
                hub.invoke("updateSpaceShip", spaceShip);
            });
        },
        onUserConnected: function (handler) {
            hub.on('onUserConnected', handler);
        }
    };
};