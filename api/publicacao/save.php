<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, HEAD, OPTIONS, POST, PUT");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

require_once('../database/Publicacao.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $descricao = $request->descricao;
    $imagem = $request->imagem;
    $video = $request->video;
    $userId = $request->userId;

    $publicacao = Publicacao::add($descricao, $imagem, $video, $userId);

    if($publicacao){
        echo json_encode($publicacao);
    } else{
        echo json_encode(false);
    }
}

?>