/**
 * Created by MCG on 2015.01.17..
 */
var userHub = function (connection) {

    var hub = connection.createHubProxy("userHub");
    var dispatcher = new EventDispatcher();

    var events = {
        onUserConnected: "onUserConnected",
        onUserDisconnected: "onUserDisconnected",
        onDisconnected: "onDisconnected"
    };

    var _subscribeHubEvents = function () {
        hub.on('onUserConnected', function (user) {
            dispatcher.trigger(events.onUserConnected, user);
        });

        hub.on('onUserDisconnected', function (user) {
            dispatcher.trigger(events.onUserDisconnected, user);
        });
    };
    _subscribeHubEvents();

    return {
        connectUser: function (user) {
            var deferred = $.Deferred();
            Game.Connection.safeInvoke().done(function () {
                hub.invoke("connectUser", user)
                    .done(function (user) {
                        deferred.resolve(user);
                    })
                    .fail(function (error) {
                        deferred.reject(error);
                    });
            });
            return deferred;
        },
        onDisconnected: function (handler) {
            return dispatcher.subscribe(events.onDisconnected, handler);
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
            return dispatcher.subscribe(events.onUserConnected, handler);
        },
        onUserDisconnected: function (handler) {
            return dispatcher.subscribe(events.onUserDisconnected, handler);
        }
    };
};