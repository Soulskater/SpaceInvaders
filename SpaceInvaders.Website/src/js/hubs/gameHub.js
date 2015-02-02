/**
 * Created by gmeszaros on 1/15/2015.
 */
var gameHub = function (connection) {
    var hub = connection.createHubProxy("gameHub");
    var dispatcher = new EventDispatcher();
    var events = {
        onUpdateSpaceShip: "onUpdateSpaceShip"
    };

    var _subscribeHubEvents = function () {
        hub.on('onUpdateSpaceShip', function (player) {
            dispatcher.trigger(events.onUpdateSpaceShip, player);
        });
    };
    _subscribeHubEvents();

    return {
        onUpdateSpaceShip: function (handler) {
            return dispatcher.subscribe(events.onUpdateSpaceShip, handler);
        },
        updateSpaceShip: function (spaceShip) {
            Game.Connection.safeInvoke().done(function () {
                hub.invoke("updateSpaceShip", spaceShip);
            });
        }
    };
};