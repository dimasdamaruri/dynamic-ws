'use strict';

/**
 * @ngdoc function
 * @name admindukWsTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the admindukWsTestApp
 */
angular.module('admindukWsTestApp')
    .controller('MainCtrl', function ($scope, mainService) {
        $scope.cancel = function(){
            $scope.nik = null;
            $scope.header = null;
            $scope.responseData = null;
        };
        $scope.submitInput = function () {
            mainService.submit($scope.nik).success(function (data) {
                $scope.header = [];
                $scope.responseData = data;
                for (var key in data.content[0]) {
                    $scope.header.push(key);
                }
            }).error(function(a,b){
                $scope.header = ['RESPON'];
                $scope.responseData = {"content":[{"RESPON":"TERJADI KESALAHAN"}]};
            });
        };
        $scope.export = function () {
            window.location.href = mainService.urlExport();
        };
    
        $scope.matchPassword = function(){
            if ($scope.confirm_password && $scope.new_password == $scope.confirm_password) {
              $scope.errorMatchPassword = false;
            } else {
              $scope.errorMatchPassword = true;
            }
        }
        
        $('#changePassword').on('hidden.bs.modal', function (e) {
            $scope.confirm_password = "";
            $scope.old_password ="";
            $scope.new_password = "" ; 
        });
    
    $scope.changePass = function(){
        var obj = {
            "oldPassword":$scope.old_password,
            "newPassword":$scope.new_password,
        };

        mainService.changePassword(obj).success(function(response){
            $('#changePassword').modal("hide");
            bootbox.alert(response.message, function() {
                if(response.status==="200"){
                   $(location).attr('href',"logout");
                }
            });
        });
    };
});