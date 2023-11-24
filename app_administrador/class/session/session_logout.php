<?php
    if(!isset($_SESSION)){ 
        session_start(); 
    }

    unset($_SESSION['log_01']);
    unset($_SESSION['log_02']);
    unset($_SESSION['log_03']);
    unset($_SESSION['log_04']);
    
    unset($_SESSION['usuarioUsuario']);
    unset($_SESSION['usuarioDocumento']);
    unset($_SESSION['usuarioNombre']);
    unset($_SESSION['usuarioApellido']);
    unset($_SESSION['usuarioEmail']);
    unset($_SESSION['empresaCodigo']);
    unset($_SESSION['empresaNombre']);
    unset($_SESSION['empresaRuc']);
    unset($_SESSION['sucursalCodigo']);
    unset($_SESSION['sucursalNombre']);
    unset($_SESSION['sucursalCelular']);
    unset($_SESSION['sucursalCorreo']);

    unset($_SESSION['expire']);

    session_unset();
    session_destroy();
    
    // header('Location: ./../../');
    header('Location: ../../');


    exit();
?>