/**
 * Created by gmeszaros on 1/15/2015.
 */
var diagHub = function (connection) {

    var hub = connection.createHubProxy("diagHub");

    return{
        onHealthCheck: function (handler) {
            hub.on('healthCheck', handler);
        },
        healthCheck: function () {
            connection.start().done(function () {
                hub.invoke("healthCheck");
            });
        }
    };
};