'use strict';

angular.module('moduloHome',[])
    .controller('homeController', function($rootScope, $scope, $http, $location, $localStorage){
        $rootScope.pageTitle= 'Agente | Início';
        if($localStorage.usuario){
            $rootScope.usuario = $localStorage.usuario;
            $scope.publics = new Array();

            $http.get('http://localhost/agente/api/publicacao/list.php')
            .then(function(result){
                $scope.publics = result.data;

                 for(var i=0; i<$scope.publics.length; i++){
                     var user = verificaUser($scope.publics.userId);
                    //  $scope.publicacoes.usuario = 
                 }
            })

            $scope.sair = function(){
                $rootScope.usuario =false;
                $location.path('/');
                delete $localStorage.usuario;
            }
            
            $scope.publicar = function(){
                $http.post('http://localhost/agente/api/publicacao/save.php',{
                    'descricao' : $scope.descricao,
                    'imagem' : '',
                    'video' : '',
                    'userId' : $localStorage.usuario
                }).then(function(result){
                    $scope.descricao = null;

                });
            }
            } else{
                $rootScope.usuario = false;
                $location.path('/');
            }

            function verificaUser(id){
                $http.get('http://localhost/agente/api/usuario/find.php?id='+id)
                .then(function(result){
                    // return usuario;
                })
            }
        
    })
;