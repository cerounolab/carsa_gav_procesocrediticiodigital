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
    unset($_SESSION['rolCodigo']);
    unset($_SESSION['rolNombre']);
    unset($_SESSION['empresaSitoWeb']);
    unset($_SESSION['empresaCorreo']);
    unset($_SESSION['empresaDireccion']);
    // unset($_SESSION['empresaLogo']);
    unset($_SESSION['ejecutivoVentaCodigo']);
    unset($_SESSION['usuarioClienteNuevo']);
    unset($_SESSION['usuarioClienteRecurrente']);

    unset($_SESSION['seg_prg']);

    unset($_SESSION['expire']);

    session_unset();
    session_destroy();
    
    header('Location: ../../');


    exit();
?>