<?php
    if(!isset($_SESSION)){ 
        session_start(); 
    }

    unset($_SESSION['log_01']);
    unset($_SESSION['log_02']);
    unset($_SESSION['log_03']);
    unset($_SESSION['log_04']);
    
    unset($_SESSION['login_usuario']);
    unset($_SESSION['login_funcionario_codigo']);
    unset($_SESSION['login_funcionario_nombre']);
    unset($_SESSION['login_ejecutivo_codigo']);
    unset($_SESSION['login_cargo_codigo']);
    unset($_SESSION['login_cargo_nombre']);
    unset($_SESSION['login_gerencia_codigo']);
    unset($_SESSION['login_gerencia_nombre']);
    unset($_SESSION['login_departamento_codigo']);
    unset($_SESSION['login_departamento_nombre']);
    unset($_SESSION['login_unidad_codigo']);
    unset($_SESSION['login_unidad_nombre']);
    unset($_SESSION['login_supervision_codigo']);
    unset($_SESSION['login_supervision_nombre']);
    unset($_SESSION['login_foto']);
    unset($_SESSION['login_email']);

    unset($_SESSION['expire']);

    session_unset();
    session_destroy();
    
    // header('Location: ./../../');
    header('Location: ../../');


    exit();
?>