<?php
namespace API\Database;

// TODO: refatorar e usar um arquivo de config para acessar a bd
Class Database {
    public static function connection(){
        return new PDO('mysql:host=localhost;port=3306;dbname=agente;charset=UTF8', 'root', '');
    }
}