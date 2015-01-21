/**
 * Created by MCG on 2015.01.15..
 */
var chatHub = function (connection) {
    var hub = connection.createHubProxy("chatHub");
    var manager = new EventManager();
    var events = {
        onReceiveMessage: "onReceiveMessage"
    };

    var _subscribeHubEvents = function () {
        hub.on('receiveMessage', function (message) {
            manager.trigger(events.onReceiveMessage, message);
        });
    };
    _subscribeHubEvents();

    return{
        onReceiveMessage: function (handler) {
            manager.subscribe(events.onReceiveMessage, handler);
        },
        sendMessage: function (message) {
            Game.Connection.safeInvoke(function () {
                hub.invoke("sendMessage", message);
            });
        }
    };
};