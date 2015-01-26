/**
 * Created by MCG on 2015.01.17..
 */
var authHub = function (connection) {

    var hub = connection.createHubProxy("authHub");
    var manager = new EventManager();

    var events = {
        onUserConnected: "onUserConnected",
        onUserDisconnected: "onUserDisconnected",
        onDisconnected: "onDisconnected"
    };

    var _subscribeHubEvents = function () {
        hub.on('onUserConnected', function (user) {
            manager.trigger(events.onUserConnected, user);
        });

        hub.on('onUserDisconnected', function (user) {
            manager.trigger(events.onUserDisconnected, user);
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
            return manager.subscribe(events.onDisconnected, handler);
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
            return manager.subscribe(events.onUserConnected, handler);
        },
        onUserDisconnected: function (handler) {
            return manager.subscribe(events.onUserDisconnected, handler);
        }
    };
};