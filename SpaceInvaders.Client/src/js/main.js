/**
 * Created by gmeszaros on 1/14/2015.
 */
var Game = Game || {};
Game.Init = (function ($, $connection) {
    $connection.onHealthCheck(function (status) {
        console.log("Server response: "+ status);
    });
}($, Game.Connection))