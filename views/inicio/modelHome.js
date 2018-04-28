'use strict';

angular.module('moduloHome',['br.cidades.estados','base64'])
.controller('homeController', function($rootScope, $scope, $http, $location, $localStorage, $base64){
    $rootScope.pageTitle= 'Agente | Início';

    if($localStorage.usuario){
        // $location.path("/inicio");  
        $rootScope.usuario = $localStorage.usuario;  
            $scope.publicacoes=[];
            $http.get('http://localhost/agente/api/publicacao/list.php')
            .then(function(result){
                $scope.public = result.data;
            })
            $http.get('http://localhost/agente/api/usuario/list.php')
            .then(function(result){
                $scope.usuarios = result.data;
            })

            for (var i in $scope.public){
                for(var j in $scope.usuarios){
                    if($scope.public[i].userId == $scope.usuarios[j].idUser)
                    $scope.publicacoes.push({'nome': $scope.usuarios[j].nome, 'descricao': $scope.public[i].descricao});
                }
            }

            $scope.sair = function(){
                $rootScope.usuario =false;
                $location.path('/');
                delete $localStorage.usuario;
            }
            
            $scope.publicar = function(){
                if($scope.descricao != null || $scope.descricao != ""){
                    $http.post('http://localhost/agente/api/publicacao/save.php',{
                        'descricao' : $scope.descricao,
                        'imagem' : '',
                        'video' : '',
                        'userNome': $localStorage.nome,
                        'userId' : $localStorage.usuario
                    }).then(function(result){
                        $scope.descricao = null;    

                    });
                } else{
                    // alerta de mensagem vazia
                }
            }
            } else{
                $location.path('/');
            }
    })

    .controller('dadosController', function($rootScope, $scope, $http, $location, $localStorage, brCidadesEstados, $base64){
        $rootScope.pageTitle = 'Agente | Meus dados';

        $scope.estados = brCidadesEstados.estados;

        $scope.buscarCidadesPorSigla = function(sigla){
            $scope.cidades = brCidadesEstados.buscarCidadesPorSigla(sigla);
        }

        if($localStorage.usuario){

            $http.get('http://localhost/agente/api/usuario/find.php?id='+ $localStorage.usuario)
            .then(function(result){
                $scope.nome = result.data.nome;
                $scope.sexo = result.data.sexo;
                $scope.tipo = result.data.tipo;
                $scope.esporte = result.data.esporte;
                $scope.email = result.data.login;
                $scope.senha = result.data.senha;
                $scope.nascimento = result.data.nascimento;
                $scope.estado = result.data.estado;
                $scope.cidade = result.data.cidade;
                $scope.evento = result.data.evento;
                $scope.premio = result.data.premio;
                $scope.historia = result.data.historia;
                $scope.foto = decodeURIComponent(escape($base64.decode(result.data.fotoPerfil)));
            })
            
            $scope.alterar = function(){

                 var imagem = $base64.encode($scope.fotoPerfil);
                 console.log(imagem);
                $http.post('http://localhost/agente/api/usuario/update.php',{
                    'nome' : $scope.nome,
                    'sexo' : $scope.sexo,
                    'nascimento' : $scope.nascimento,
                    'tipo' : $scope.tipo,
                    'esporte' : $scope.esporte,
                    'cidade' : '',
                    'estado' : $scope.estado,
                    'historia' : $scope.historia,
                    'evento' : $scope.evento,
                    'premio' : $scope.premio,
                    'fotoPerfil' : imagem,
                    'senha' : $scope.senha,
                    'ativo' : 0,
                    'idUser' : $localStorage.usuario
                }).then(function(result){
                    console.log(result);
                    console.log($scope.historia);
                    console.log($scope.evento);
                    console.log($scope.estado);
                })
            }
            
        } else{
            $location.path('/');
        }

        
    })
;