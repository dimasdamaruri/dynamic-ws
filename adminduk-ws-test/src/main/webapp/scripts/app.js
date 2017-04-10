'use strict';

/**
 * @ngdoc overview
 * @name admindukWsTestApp
 * @description
 * # admindukWsTestApp
 *
 * Main module of the application.
 */
angular
        .module('admindukWsTestApp', [
            'ngAnimate',
            'ngCookies',
            'ngResource',
            'ngRoute',
            'ngSanitize',
            'ngTouch'
        ])
        .config(function($routeProvider) {
            $routeProvider
                    .when('/', {
                        templateUrl: 'views/main.html',
                        controller: 'MainCtrl'
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
        })
        .config(function($httpProvider) {
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common["X-Requested-With"];
        });