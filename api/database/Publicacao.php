<?php
require_once('Database.php');

Class Publicacao {
    public static function add($descricao, $imagem, $video, $userId, $data){
        $pdo = Database::connection();
        $sql = 'INSERT INTO publicacao(descricao, imagem, video, userId, data) VALUES (?, ?, ?, ?, ?)';
        $r = false;
        try{
            $query = $pdo->prepare($sql);
            $r = $query->execute(array($descricao, $imagem, $video, $userId, $data));
            if($query->rowCount() > 0){
                return $pdo->lastInsertId();
            }
        }
        catch (Exception $ex){
            throw new Exception("Erro ao cadastrar pubicacao", 1);
        }
    }

    public static function delete($id) {
        $pdo = Database::connection();
        $sql = 'DELETE FROM publicacao WHERE idPublic = ?';
        $query = $pdo->prepare($sql);
        $query->execute(array($id));
        return $query->rowCount() > 0;
    }

    public static function all(){
        $pdo = Database::connection();
        $sql = 'SELECT * FROM publicacao ORDER BY idPublic DESC';
        $query = $pdo->query($sql);
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function all_user($id){
        $pdo = Database::connection();
        $sql = 'SELECT * from publicacao WHERE userId = ?';
        $query = $pdo->query($sql);
    }

    
}