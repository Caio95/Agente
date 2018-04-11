'use strict';

angular.module('moduloHome',[])
    .controller('homeController', function($rootScope, $scope, $http, $location, $localStorage){
        $rootScope.pageTitle= 'Agente | Início';

        $scope.sair = function(){
            $rootScope.usuario =false;
            $location.path('/');
            delete $localStorage.usuario;
        };


        $scope.publicar = function(){

        }
        
    })
;