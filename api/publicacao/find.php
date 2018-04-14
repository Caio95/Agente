<?php
header("Access-Control-Allow-Origin: *");

require_once('../database/Publicacao.php');

if (!isset($_GET['id'])) {
    echo '';
    exit();
}

$id = $_GET['id'];

$publicacao = Publicacao::find($id);

echo json_encode($publicacao);

?>