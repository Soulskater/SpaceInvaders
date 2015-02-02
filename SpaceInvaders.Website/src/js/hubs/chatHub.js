/**
 * Created by MCG on 2015.01.15..
 */
var chatHub = function (connection) {
    var hub = connection.createHubProxy("chatHub");
    var dispatcher = new EventDispatcher();
    var events = {
        onReceiveMessage: "onReceiveMessage"
    };

    var _subscribeHubEvents = function () {
        hub.on('receiveMessage', function (message) {
            dispatcher.trigger(events.onReceiveMessage, message);
        });
    };
    _subscribeHubEvents();

    return{
        onReceiveMessage: function (handler) {
            return dispatcher.subscribe(events.onReceiveMessage, handler);
        },
        sendMessage: function (message) {
            Game.Connection.safeInvoke().done(function () {
                hub.invoke("sendMessage", message);
            });
        }
    };
};