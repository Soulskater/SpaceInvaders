/**
 * Created by gmeszaros on 1/15/2015.
 */
var gamePlayHub = function (connection) {

    var hub = connection.createHubProxy("gamePlayHub");

    return{
        onUpdateSpaceShip: function (handler) {
            hub.on('updateSpaceShip', handler);
        },
        updateSpaceShip: function (spaceShip) {
            connection.start().done(function () {
                hub.invoke("updateSpaceShip", spaceShip);
            });
        }
    };
};