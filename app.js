'use strict';

angular.module('agente', ['ngRoute','ngStorage'])
.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl: 'index.html',
		controller: 'loginController'
	})
	.when('/inicio',{
		templateUrl: 'views/home.html',
		controller: 'homeController'
	})
	.otherwise({
		redirectTo:'/'
	});

})

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
		if($scope.login==null || $scope.senha==null){
			// aviso de campos em branco 
		}
		else{
			$http.post('http://localhost/agente/api/' + 'usuario/validate.php', {
				'login' : $scope.login,
				'senha' : $scope.senha
			}).then(function(result){
				if(result.data != 'false'){
					$rootScope.usuario = result.data;
					$localStorage.usuario = result.data;
					$location.path('/inicio');
				} else {
					// aviso de senha incorreta
				}
			})
		}
	}

	$scope.cadastrar = function(){
		var data = new Date();
		var idade = data.getFullYear() - $scope.nascimento.getFullYear();
		//alert($scope.nome + $scope.esporte + $scope.nascimento + $scope.sexo + $scope.email + $scope.senha + $scope.senha2);
		//alert(idade);
		if(validar($scope.senha, $scope.senha2)){
			$http.post('http://localhost/agente/api/'+'usuario/save.php',{
				'nome' : $scope.nome,
				'idade' : idade,
				'sexo' : $scope.sexo,
				'nascimento' : $scope.nascimento,
				'tipo' : $scope.tipo,
				'esporte' : $scope.esporte,
				'cidade' : null,
				'estado' : null,
				'login' : $scope.email,
				'senha' : $scope.senha
			}).then(function(result){
				console.log(result.data);
				$scope.nome = null;
				$scope.sexo = null;
				$scope.nascimento = null;
				$scope.tipo = null;
				$scope.esporte = null;
				$scope.email = null;
				$scope.senha = null;
				$scope.senha2 = null;
			});
			alert('OK');
		} else{
			alert('False');
		}

	}

	function validar(senha1,senha2){
		if(senha1 == senha2){
			return true;
		}
		return false;
	}
	
})
;