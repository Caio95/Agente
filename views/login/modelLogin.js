'use strict';

angular.module('moduloLogin',[])
    .controller('loginController', function($rootScope, $scope, $http, $location, $localStorage){
        $rootScope.pageTitle = 'Agente | Registre-se grátis';
        $rootScope.usuario = false;

        if($localStorage.usuario){
            $location.path('/inicio');
            $rootScope.usuario = $localStorage.usuario;
        }
        else{
            $location.path('/');
        }

        $scope.login = function(){
            if($scope.email2 ==null && $scope.senha3 == null){
                $('#log').show('in'); 
            }
            else{
                $http.post('http://localhost/agente/api/usuario/validate.php', {
                    'login' : $scope.email2,
                    'senha' : $scope.senha3
                }).then(function(result){
                    if(result.data != 'false'){
                        $rootScope.usuario = result.data;
                        $localStorage.usuario = result.data.idUser;
                        $location.path('/inicio');
                    } else {
                        $('#senhaErr').show('in');
                    }
                });
            }

            $('#closeLog').click(function(){
                $('#log').hide('fade');  //alerta de preenchimento de campos
            });
        
            $('#closeSenhaErr').click(function(){
                $('#senhaErr').hide('fade');  //alerta de login ou senha incorreto
            });

        }

        $scope.cadastrar = function(){
            var data = new Date();
            
                if(validEmail($scope.email)){
                    if(validar($scope.senha, $scope.senha2)){
                        var idade = data.getFullYear() - $scope.nascimento.getFullYear();
                        var nascimento = $scope.nascimento.getUTCFullYear() + '-' +('00' + ($scope.nascimento.getUTCMonth()+1)).slice(-2) + '-' 
                        +('00' + $scope.nascimento.getUTCDate()).slice(-2);
                        if($scope.confirmacao == "S"){
                            $http.post('http://localhost/agente/api/usuario/save.php',{
                                'nome' : $scope.nome,
                                'idade' : idade,
                                'sexo' : $scope.sexo,
                                'nascimento' : nascimento,
                                'tipo' : $scope.tipo,
                                'esporte' : $scope.esporte,
                                'cidade' : '',
                                'estado' : '',
                                'login' : $scope.email,
                                'senha' : $scope.senha
                            }).then(function(result){
                                $scope.nome = null;
                                $scope.sexo = null;
                                $scope.nascimento = null;
                                $scope.tipo = null;
                                $scope.esporte = null;
                                $scope.email = null;
                                $scope.senha = null;
                                $scope.senha2 = null;
                            });
                        } else{
                            $('#termo').show('in');
                        }
                    } else{
                        $('#senha').show('in');
                    }
                } else{
                    $('#emailErr').show('in');
                }

            $('#closeSenha').click(function(){
                $('#senha').hide('fade');   // fecha alerta das senhas que nao iguais
            });
            $('#closeTermo').click(function(){
                $("#termo").hide('fade');	// fecha alerta de termos de uso 
            });
            $('#closeEmail').click(function(){
                $('#emailErr').hide('fade');   //fecha alerta de email invalido 
            });
        }

        function validar(senha1,senha2){
            if(senha1 !=null && senha2 != null){
                if(senha1 == senha2){
                    return true;
                }
            }
            return false;
        }

        function validEmail(email){
            var er = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2,3}/; 
            if(!er.exec(email) )
            {
                return false;
            }
            return true;
        }
})
;