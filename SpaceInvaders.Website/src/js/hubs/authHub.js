/**
 * Created by MCG on 2015.01.17..
 */
var authHub = function (connection) {

    var hub = connection.createHubProxy("authHub");

    return{
        loginUser: function (userName) {
            Game.Connection.safeInvoke(function () {
                hub.invoke("loginUser",userName);
            });
        }
    };
};