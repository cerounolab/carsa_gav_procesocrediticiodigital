<?php 
    if(!isset($_SESSION)){ 
        session_start(); 
    }

    $log_01 = $_SESSION['log_01'];
    $log_02 = $_SESSION['log_02'];
    $log_03 = $_SESSION['log_03'];
    $log_04 = $_SESSION['log_04'];
    
    $usu_01 = $_SESSION['login_usuario'];
    $usu_02 = $_SESSION['login_funcionario_codigo'];
    $usu_03 = $_SESSION['login_funcionario_nombre'];
    $usu_04 = $_SESSION['login_ejecutivo_codigo'];
    $usu_05 = $_SESSION['login_cargo_codigo'];
    $usu_06 = $_SESSION['login_cargo_nombre'];
    $usu_07 = $_SESSION['login_gerencia_codigo'];
    $usu_08 = $_SESSION['login_gerencia_nombre'];
    $usu_09 = $_SESSION['login_departamento_codigo'];
    $usu_10 = $_SESSION['login_departamento_nombre'];
    $usu_11 = $_SESSION['login_unidad_codigo'];
    $usu_12 = $_SESSION['login_unidad_nombre'];
    $usu_13 = $_SESSION['login_supervision_codigo'];
    $usu_14 = $_SESSION['login_supervision_nombre'];
    $usu_15 = $_SESSION['login_foto'];
    $usu_16 = $_SESSION['login_email'];

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
                // header('Location: ./../class/session/session_logout.php');
                header('Location: ./../../../class/session/session_logout.php');
            }
        }
    }
?>