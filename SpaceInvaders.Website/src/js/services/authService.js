/**
 * Created by MCG on 2015.01.17..
 */
registerNamespace("Game.Service");
Game.Service.Auth = inject("jQuery", "userService").singleton(function ($, userService) {

    Game.Connection.onDisconnected(function () {
        _service.disconnectUser();
    });

    var _service = {
        disconnectUser: function () {
            userService.authenticatedUser = {
                isAuthenticated: false
            };
            //$navigation.go("/login");
        },
        connectUser: function (loginData) {
            var deferred = $.Deferred();
            Game.Hubs.userHub.connectUser(loginData)
                .done(function (user) {
                    userService.authenticatedUser.isAuthenticated = true;
                    userService.authenticatedUser.userName = user.userName;
                    deferred.resolve(userService.authenticatedUser);
                })
                .fail(function (error) {
                    deferred.reject(error);
                });
            return deferred;
        }
    };

    return _service;
});