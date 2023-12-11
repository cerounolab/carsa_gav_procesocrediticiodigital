<?php 
    if(!isset($_SESSION)){ 
        session_start(); 
    }

    $log_01 = $_SESSION['log_01'];
    $log_02 = $_SESSION['log_02'];
    $log_03 = $_SESSION['log_03'];
    $log_04 = $_SESSION['log_04'];
    
    $usu_01 = $_SESSION['usuarioUsuario'];
    $usu_02 = $_SESSION['usuarioEmail'];
    $usu_03 = $_SESSION['usuarioNombre'];
    $usu_04 = $_SESSION['usuarioApellido'];
    $usu_05 = $_SESSION['usuarioDocumento'];
    $usu_06 = $_SESSION['empresaCodigo'];
    $usu_07 = $_SESSION['empresaNombre'];
    $usu_08 = $_SESSION['empresaRuc'];
    $usu_09 = $_SESSION['rolCodigo'];
    $usu_10 = $_SESSION['rolNombre'];
    $usu_11 = $_SESSION['empresaSitoWeb'];
    $usu_12 = $_SESSION['empresaCorreo'];
    $usu_13 = $_SESSION['empresaDireccion'];


    $expire = $_SESSION['expire'];

    $val_03 = $_SERVER['REMOTE_ADDR'];
    
    if ($expire < time()) {
        // header('Location: ./../class/session/session_logout.php');
        header('Location: ./../../../class/session/session_logout.php');

    } else {
        if ($log_01 == '' ) {
            // header('Location: ./../class/session/session_logout.php');
            header('Location: ./../../../class/session/session_logout.php');

        } else {
            if (isset($log_01) && isset($log_03) && isset($val_03)) {
                date_default_timezone_set('America/Asuncion');
                setlocale(LC_ALL, "es_PY", 'Spanish_Spain', 'Spanish');
                setlocale(LC_TIME, 'es_PY.UTF-8');
                setlocale(LC_TIME, 'spanish');
                setlocale(LC_MONETARY, 'es_PY');
    
                $_SESSION['expire'] = time() + 1800;
    
                $urlAct             = $_SERVER['REQUEST_URI'];
                $urlPat             = strtoupper(substr(substr($_SERVER['SCRIPT_FILENAME'], 48), 0, -4));
                $ulrPos             = strpos($_SERVER['HTTP_REFERER'], 'public');
                $urlAnt             = substr($_SERVER['HTTP_REFERER'], $ulrPos);
                $ulrPos             = strpos($urlAnt, '.php?');

                if ($ulrPos > 0){
                    $urlQui = substr($urlAnt, $ulrPos);
                    $ulrPos = strlen($urlQui);
                    $urlAnt = substr($urlAnt, 0, ($ulrPos * -1));
                }
            } else {
                header('Location: ./../../../class/session/session_logout.php');
            }
        }
    }
?>