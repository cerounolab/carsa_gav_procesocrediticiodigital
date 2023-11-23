<?php
    if(!isset($_SESSION)){ 
        session_start(); 
    }

    require './../../class/function/curl_api.php';
    require './../../class/function/function.php';

    $val_01     = $_POST['txtUser'];
    $val_02     = validarContrasenha($val_01, $_POST['txtPass']);
    $val_03     = $_SERVER['REMOTE_ADDR'];
    
    $dataJSON   = json_encode(
        array(
            'usuario_var01'     => $val_01,
            'usuario_var02'     => $val_02
        ));
        
    $resultJSON = post_curl('aliado/login', $dataJSON);
    $resultJSON = json_decode($resultJSON, true);
    
    if ($resultJSON['code'] === 200) {
        $_SESSION['log_01'] = trim(strtoupper($val_01));
        $_SESSION['log_02'] = $val_02;
        $_SESSION['log_03'] = $val_03;
        $_SESSION['log_04'] = 'PROCREDIG';

        $_SESSION['login_usuario']                  = trim(strtoupper(strtolower($resultJSON['data']['login_usuario'])));
        $_SESSION['login_funcionario_codigo']       = intval($resultJSON['data']['login_funcionario_codigo']);
        $_SESSION['login_funcionario_nombre']       = trim(strtoupper(strtolower($resultJSON['data']['login_funcionario_nombre'])));
        $_SESSION['login_ejecutivo_codigo']         = intval($resultJSON['data']['login_ejecutivo_codigo']);
        $_SESSION['login_cargo_codigo']             = intval($resultJSON['data']['login_cargo_codigo']);
        $_SESSION['login_cargo_nombre']             = 'CARGO';//trim(strtoupper(strtolower($resultJSON['data']['login_cargo_nombre'])));
        $_SESSION['login_gerencia_codigo']          = intval($resultJSON['data']['login_gerencia_codigo']);
        $_SESSION['login_gerencia_nombre']          = 'GERENCIA'; //trim(strtoupper(strtolower($resultJSON['data']['login_gerencia_nombre'])));
        $_SESSION['login_departamento_codigo']      = intval($resultJSON['data']['login_departamento_codigo']);
        $_SESSION['login_departamento_nombre']      = 'DPTO';//trim(strtoupper(strtolower($resultJSON['data']['login_departamento_nombre'])));
        $_SESSION['login_unidad_codigo']            = intval($resultJSON['data']['login_unidad_codigo']);
        // $_SESSION['login_unidad_nombre']            = trim(strtoupper(strtolower($resultJSON['data']['login_unidad_nombre'])));
        $_SESSION['login_supervision_codigo']       = intval($resultJSON['data']['login_supervision_codigo']);
        $_SESSION['login_supervision_nombre']       = 'SUPERVISOR';//trim(strtoupper(strtolower($resultJSON['data']['login_supervision_nombre'])));
        $_SESSION['login_foto']                     = '';//trim(strtoupper(strtolower($resultJSON['data']['login_foto'])));
        $_SESSION['login_email']                    = 'prueba@gmail.com'; //trim(strtolower($resultJSON['data']['login_email']));

        $_SESSION['expire'] = time() + 1800;

        // header('Location: ./../../public/dashboardv1.php');
        header('Location: ./../../../admin/public/dashboardv1.php');

    } else {
        $val_01 = NULL;
        $val_02 = NULL;
        $val_03 = NULL;
        $code   = $resultJSON['code'];
        $msg    = $resultJSON['message'];
        $msg    = str_replace("\n", ' ', $msg);
        $msg    = str_replace('"', '*', $msg);
        
        // header('Location: ./../../index.php?code='.$code.'&msg='.$msg);
        header('Location: ./../../../index.php?code='.$code.'&msg='.$msg); 

    }
?>