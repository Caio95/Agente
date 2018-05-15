'use strict';

angular.module('moduloHome',['br.cidades.estados','flow', 'ui-notification','angular-timeline'])
.controller('homeController', function($rootScope, $scope, $http, $location, $localStorage, Notification){
    $rootScope.pageTitle= 'Agente | Início';
    
    if($localStorage.usuario){
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
                    if($scope.public[i].userId == $scope.usuarios[j].idUser){
                        $scope.publicacoes.push({'foto':$scope.usuarios[j].fotoPerfil, 'nome': $scope.usuarios[j].nome, 'fotoPublic' : $scope.public[i].imagem, 'descricao': $scope.public[i].descricao, 'data':$scope.public[i].data});
                    }
                }
            }

            $scope.sair = function(){
                $rootScope.usuario =false;
                $location.path('/');
                delete $localStorage.usuario;
            }

            $scope.imagePublic;
            $scope.processFiles = function(files){
                angular.forEach(files, function(flowFile){
                var fileReader = new FileReader();
                    fileReader.onload = function (event) {
                        var uri = event.target.result;
                        $scope.imagePublic = uri;
                        Notification.warning('Imagem Salva!');
                    };
                    fileReader.readAsDataURL(flowFile.file);
                });
            };
            
            $scope.publicar = function(){
                if($scope.descricao != null){
                    if($scope.imagePublic != null){
                        var data = new Date();
                        var dia = data.getDate();           // 1-31
                        var mes = data.getMonth()+1;          // 0-11 (zero=janeiro)
                        var ano = data.getFullYear();       // 4 dígitos
                        var hora = data.getHours();          // 0-23
                        var min = data.getMinutes();        // 0-59
                        var seg = data.getSeconds();        // 0-59
                        $http.post('http://localhost/agente/api/publicacao/save.php',{
                            'descricao' : $scope.descricao,
                            'imagem' : $scope.imagePublic,
                            'video' : '',
                            'userId' : $localStorage.usuario,
                            'data' : ano+"-"+mes+"-"+dia+" "+hora+":"+min+":"+seg
                        }).then(function(result){
                            console.log(result);
                            Notification.primary('Publicação postada com sucesso!');
                            $scope.descricao = null;    
                            $location.path('/inicio');
                        });

                    } else {
                        $http.post('http://localhost/agente/api/publicacao/save.php',{
                            'descricao' : $scope.descricao,
                            'imagem' : '',
                            'video' : '',
                            'userId' : $localStorage.usuario
                        }).then(function(result){
                            Notification.primary('Publicação postada com sucesso!');
                            $scope.descricao = null;    
                            $location.path('/inicio');
                        });
                    }
                } else{
                        Notification.error({message: 'O campo não pode está vazio!', delay: 2000});
                }
            }
            } else{
                $location.path('/');
            }
            
            function recarregar(){
                $location.path('/');
            }
            
    })

    .controller('dadosController', function($rootScope, $scope, $http, $location, $localStorage, brCidadesEstados, Notification){
        $rootScope.pageTitle = 'Agente | Meus dados';

        $scope.estados = brCidadesEstados.estados;

        $scope.buscarCidadesPorSigla = function(sigla){
            $scope.cidades = brCidadesEstados.buscarCidadesPorSigla(sigla);
        }

        if($localStorage.usuario){

            $http.get('http://localhost/agente/api/usuario/find.php?id='+ $localStorage.usuario)
            .then(function(result){
                var fileReader = new FileReader();
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
                $scope.fotoPerfil = result.data.fotoPerfil;
            }) 
            
            $scope.imageStrings;
            $scope.processFiles = function(files){
                angular.forEach(files, function(flowFile, i){
                var fileReader = new FileReader();
                    fileReader.onload = function (event) {
                        var uri = event.target.result;
                        $scope.imageStrings = uri;
                    };
                    fileReader.readAsDataURL(flowFile.file);
                });
            };

            $scope.alterar_foto = function(){
                $http.post('http://localhost/agente/api/usuario/update_foto.php',{
                    'idUser' : $localStorage.usuario,
                    'fotoPerfil' : $scope.imageStrings
                }).then(function(result){
                    Notification.primary('Foto alterada com sucesso');
                })
            }
            
            $scope.alterar = function(){
                
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
                    'senha' : $scope.senha,
                    'ativo' : 0,
                    'idUser' : $localStorage.usuario
                }).then(function(result){
                    Notification.primary('Dados alterados com sucesso !');
                })
            }
            
        } else{
            $location.path('/');
        }

        
    })
;