'use strict';

angular.module('agente', ['ngRoute','ngStorage','moduloLogin','moduloHome'])
.config(function($routeProvider, $locationProvider){
	$locationProvider.hashPrefix(''); //corrigi - %2F
	$routeProvider
	.when('/',{
		templateUrl: 'views/login/login.html',
		controller: 'loginController'
	})
	.when('/inicio',{
		templateUrl: 'views/inicio/home.html',
		controller: 'homeController'
	})
	.when('/dados', {
		templateUrl: 'views/inicio/dados.html',
		controller: 'homeController'
	})
	.when('/conta', {
		templateUrl: 'views/inicio/conta.html',
		controller: 'homeController'
	})
	.when('/amigos', {
		templateUrl: 'views/amigos/amigos.html',
		controller: 'amigosController'
	})
	.when('/amigos/:id', {
		templateUrl: 'views/amigos/amigo.html',
		controller: 'amigoController'
	})
	.otherwise({
		redirectTo:'/'
	});

})

;