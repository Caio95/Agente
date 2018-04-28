<?php
require_once('Database.php');

Class Usuario {
    public static function add($nome, $sexo, $nascimento, $tipo, $esporte, $login, $senha, $ativo){
        $pdo = Database::connection();
        $sql = 'INSERT INTO usuario(nome, sexo, nascimento, tipo, esporte, login, senha, ativo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        $r = false;
        try{
            $query = $pdo->prepare($sql);
            $r = $query->execute(array($nome, $sexo, $nascimento, $tipo, $esporte, $login, $senha, $ativo));
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
        $user = $query->fetch(PDO::FETCH_ASSOC);
        return $user;
    }

    public static function validate($usuario, $senha){
        $pdo = Database::connection();
        $sql = 'SELECT * FROM usuario WHERE login = ? AND senha = ?';
        $query = $pdo->prepare($sql);
        $query->execute(array($usuario, $senha));
        $usuario = $query->fetch(PDO::FETCH_ASSOC);
        return $usuario;
    }

    public static function update($nome, $sexo, $nascimento, $tipo, $esporte, $cidade, $estado, $historia, $evento, $premio, $fotoPerfil, $senha, $ativo, $idUser){
        $pdo = Database::connection();
        $sql = 'UPDATE usuario SET nome=?, sexo=?, nascimento=?, tipo=?, esporte=?, cidade=?, estado=?, historia=?, evento=?, premio=?, fotoPerfil=?, senha=?, ativo=? WHERE idUser=?';
        $query = $pdo->prepare($sql);
        $query->execute(array($nome, $sexo, $nascimento, $tipo, $esporte, $cidade, $estado, $historia, $evento, $premio, $fotoPerfil, $senha, $ativo, $idUser));
        $usuario = $query->fetch(PDO::FETCH_ASSOC);
        return $usuario;
    }

}