<?php

// Todos os includes devem ser definidos no includes.php
require_once( __DIR__ . "/includes.php");

// Dependencias locais
use API\Database\Models\Usuario;

// Dependencias composer
use Phroute\Phroute\RouteCollector;

// Iniciar router
$router = new RouteCollector();

## Definição das rotas
## Pode receber uma função ou uma função de uma classe

// Definir rota / com função
$router->get('/', function(){
    return readfile("main.html");
});

// Definir rota /users/{id} com uma função de uma classe
$router->any('/users/{id}', ['API\Database\Models\Usuario','test']);

// Dispatcher e response
$dispatcher = new Phroute\Phroute\Dispatcher($router->getData());
$response = $dispatcher->dispatch($_SERVER['REQUEST_METHOD'], parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
    
// Response
echo $response;