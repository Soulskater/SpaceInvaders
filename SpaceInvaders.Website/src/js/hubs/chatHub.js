/**
 * Created by MCG on 2015.01.15..
 */
var chatHub = function (connection) {
    var hub = connection.createHubProxy("chatHub");

    return{
        onReceiveMessage: function (handler) {
            hub.on('receiveMessage', handler);
        },
        sendMessage: function (message) {
            Game.Connection.safeInvoke(function () {
                hub.invoke("sendMessage", message);
            });
        }
    };
};