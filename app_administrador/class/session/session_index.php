<?php
    if(!isset($_SESSION)){ 
        session_start(); 
    }

    require './../../class/function/curl_api.php';
    require './../../class/function/function.php';

    $val_01     = strtoupper( $_POST['txtUser']);
    $val_02     = $_POST['txtPass'];

    $val_03     = $_SERVER['REMOTE_ADDR'];
    
    $dataJSON   = json_encode(
        array(
            'usuario_usuario'               => $val_01,
            'usuario_password'              => $val_02,

            'auditoria_empresa_codigo'		=> 1,
            'auditoria_usuario'				=> 'HOLIX',
            'auditoria_ip'					=> '0.0.0.0',
            'auditoria_programa'			=> 'PRG'
        ));
        
        $resultJSON = post_curl('usuario/login', $dataJSON);
        $resultJSON = json_decode($resultJSON, true);

    if ($resultJSON['code'] === 200) {
        $_SESSION['log_01'] = trim(strtoupper($val_01));
        $_SESSION['log_02'] = $val_02;
        $_SESSION['log_03'] = $val_03;
        $_SESSION['log_04'] = 'PROCREDIG';

        $_SESSION['usuarioUsuario']         = trim(strtoupper(strtolower($resultJSON['data']['0']['usuarioUsuario'])));
        $_SESSION['usuarioDocumento']       = trim($resultJSON['data']['0']['usuarioDocumento']);
        $_SESSION['usuarioNombre']          = trim(strtoupper(strtolower($resultJSON['data']['0']['usuarioNombre'])));
        $_SESSION['usuarioApellido']        = trim(strtoupper(strtolower($resultJSON['data']['0']['usuarioApellido'])));

        $_SESSION['usuarioEmail']           = trim(strtoupper(strtolower($resultJSON['data']['0']['usuarioEmail'])));
        $_SESSION['empresaCodigo']          = intval($resultJSON['data']['0']['empresaCodigo']);
        $_SESSION['empresaNombre']          = trim(strtoupper(strtolower($resultJSON['data']['0']['empresaNombre'])));
        $_SESSION['empresaRuc']             = trim(strtoupper(strtolower($resultJSON['data']['0']['empresaRuc'])));
        $_SESSION['sucursalCodigo']         = intval($resultJSON['data']['0']['sucursalCodigo']);
        $_SESSION['sucursalNombre']         = trim(strtoupper(strtolower($resultJSON['data']['0']['sucursalNombre'])));
        $_SESSION['sucursalCelular']        = intval($resultJSON['data']['0']['sucursalCelular']);
        $_SESSION['sucursalCorreo']         = trim(strtoupper(strtolower($resultJSON['data']['0']['sucursalCorreo'])));

        $_SESSION['expire'] = time() + 1800;

        header('Location: ./../../../admin/public/home.php');

    } else {
        $val_01 = NULL;
        $val_02 = NULL;
        $val_03 = NULL;
        $code   = $resultJSON['code'];
        $msg    = $resultJSON['status'];
        $msg    = str_replace("\n", ' ', $msg);
        $msg    = str_replace('"', '*', $msg);
        
        header('Location: ./../../../admin/index.php?code='.$code.'&msg='.$msg); 

    }
?>