<?php
// Autoload do Composer, carrega todas as classes das dependencias instaladas via composer
require __DIR__ . '/vendor/autoload.php';

// Configura pasta src como include_path para carregar as classes locais
set_include_path(__DIR__ . '/src');

// Carregar classes locais, com callback para substituir \ por /, assim funciona em servidores Linux
spl_autoload_register(function ($class) {
    require_once(str_replace('\\', '/', $class . '.php'));
});