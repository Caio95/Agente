<?php
require_once('Database.php');

Class Usuario {
    public static function add($nome, $idade, $sexo, $nascimento, $tipo, $esporte, $cidade, $estado, $login, $senha){
        $pdo = Database::connection();
        $sql = 'INSERT INTO usuario(nome, idade, sexo, nascimento, tipo, esporte, cidade, estado, login, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        $r = false;
        try{
            $query = $pdo->prepare($sql);
            $r = $query->execute(array($nome, $idade, $sexo, $nascimento, $tipo, $esporte, $cidade, $estado, $login, $senha));
            if($query->rowCount() > 0){
                return $pdo->lastInsertId();
            }
        }
        catch (Exception $ex){
            throw new Exception("Erro ao cadastrar usuario", 1);
        }
    }

    public static function delete($id){
        $pdo = Database::connection();
        $sql = 'DELETE FROM usuario WHERE idUser = ?';
        $query = $pdo->prepare($sql);
        $query->execute(array($id));
        return $query->rowCount() > 0;
    }

    public static function all(){
        $pdo = Database::connection();
        $sql = 'SELECT * FROM usuario';
        $query = $pdo->query($sql);
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function find($id) {
        $pdo = Database::connection();
        $sql = 'SELECT * FROM usuario WHERE idUser = ?';
        $query = $pdo->prepare($sql);
        $query->execute(array($id));
        $loja = $query->fetch(PDO::FETCH_ASSOC);
        return $loja;
    }

    public static function validate($usuario, $senha){
        $pdo = Database::connection();
        $sql = 'SELECT * FROM usuario WHERE login = ? AND senha = ?';
        $query = $pdo->prepare($sql);
        $query->execute(array($login, $senha));
        $usuario = $query->fetch(PDO::FETCH_ASSOC);
        return $usuario;
    }

}