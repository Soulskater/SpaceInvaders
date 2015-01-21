/**
 * Created by MCG on 2015.01.17..
 */
var authHub = function (connection) {

    var hub = connection.createHubProxy("authHub");
    var manager = new EventManager();

    var events = {
        onUserConnected: "onUserConnected"
    };

    var _subscribeHubEvents = function () {
        hub.on('userConnected', function (user) {
            manager.trigger(events.onUserConnected, user);
        });
    };
    _subscribeHubEvents();

    return {
        connectUser: function (user) {
            var promise = null;
            Game.Connection.safeInvoke().done(function () {
                promise = hub.invoke("connectUser", user);
            });
            return promise;
        },
        getUsers: function () {
            var deferred = $.Deferred();
            Game.Connection.safeInvoke().done(function () {
                hub.invoke("getUsers").done(function (users) {
                    deferred.resolve(users);
                });
            });
            return deferred;
        },
        onUserConnected: function (handler) {
            manager.subscribe(events.onUserConnected, handler);
        }
    };
};