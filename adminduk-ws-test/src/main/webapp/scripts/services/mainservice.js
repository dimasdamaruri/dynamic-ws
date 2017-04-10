'use strict';

/**
 * @ngdoc function
 * @name admindukWsTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the admindukWsTestApp
 */
angular.module('admindukWsTestApp')
    .factory('mainService', function($http, $location) {
        var proto = $location.protocol();
        var host = $location.host();
        var port = $location.port();
        var server = proto+'://'+host+":"+port;
        var urlApi = server+"/ws-client";
        return {
            submit: function(param) {
                if (param !== null) {
                    return $http.post('api/submit/' + param);
                }
            },
            export: function() {
                return $http.get(urlApi+'/export'); 
            },
            urlExport: function(){
                return urlApi + '/api/export';
            },
            changePassword:function(obj){
                return $http.post('api/changePassword',obj);
            }
        };
    });
