<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, HEAD, OPTIONS, POST, PUT");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

require_once('../database/Usuario.php');

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $nome = $request->nome;
    $sexo = $request->sexo;
    $nascimento = $request->nascimento;
    $tipo = $request->tipo;
    $esporte = $request->esporte;
    $cidade = $request->cidade;
    $estado = $request->estado;
    $historia = $request->historia;
    $evento = $request->evento;
    $premio = $request->premio;
    $fotoPerfil = $request->fotoPerfil;
    $senha = $request->senha;
    $ativo = $request->ativo;
    $idUser = $request->idUser;

    $usuario = Usuario::update($nome, $sexo, $nascimento, $tipo, $esporte, $cidade, $estado, $historia, $evento, $premio, $fotoPerfil, $senha, $ativo, $idUser);

    if($usuario) {
        echo json_encode($usuario);
    } else {
        echo json_encode(false);
    }
}
?>