/**
 * Created by MCG on 2014.10.24..
 */
angular.module("SpaceInvaders")
    .constant("serviceUrl", {
        baseUrl: "http://service.mcgtech.net/"
        //baseUrl: "http://localhost:49994/"
    })
    .config(['$routeProvider', '$locationProvider',
        function ($routeProvider, $locationProvider) {
            $routeProvider.
                when("/login", {
                    templateUrl: "src/features/account/login.html",
                    controller: "LoginCtrl"
                }).
                otherwise({
                    redirectTo: '/login'
                });
        }]);