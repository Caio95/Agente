'use strict'

angular.module('agente', ['ngRoute'])
.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl: 'index.html',
		controller: 'homeController'
	})
	when('/amigos',{
		templateUrl: 'views/amigos.html',
		controller: 'amigoController'
	})
	when('/views/notificacoes',{
		templateUrl: 'views/notificacoes.html',
		controller: 'notifiController'
	})
	when('/views/mensagens',{
		templateUrl: 'views/mensangens.html',
		controller: 'msgController'
	})
	when('/views/config',{
		templateUrl: 'views/config.html',
		controller: 'configController'
	})
	when('/views/')

})