<?php
    if(!isset($_SESSION)){ 
        session_start(); 
    }

    require './../../class/function/curl_api.php';
    require './../../class/function/function.php';

    $val_01     = strtoupper( $_POST['txtUser']);
    $val_02     = $_POST['txtPass'];

    $val_03     = $_SERVER['REMOTE_ADDR'];
  
    $codEmp     = substr( $val_01, 0, 3);

    $dataJSON   = json_encode(
        array(
            'usuario_usuario'               => $val_01,
            'usuario_password'              => $val_02,
            'tipo_plataforma_parametro'		=> 2,

            'auditoria_empresa_codigo'		=> $codEmp,
            'auditoria_usuario'				=> $val_01,
            'auditoria_ip'					=> $val_03,
            'auditoria_programa'			=> 'PROCREDIG',

            'usuario_log_host'              => $_SERVER['HTTP_HOST'],
            'usuario_log_age'               => $_SERVER['HTTP_USER_AGENT'],
            'usuario_log_referencia'        => $_SERVER['HTTP_REFERER']
        ));
        
        $resultJSON = post_curl('usuario/login', $dataJSON);
        $resultJSON = json_decode($resultJSON, true);

    if ($resultJSON['code'] === 200) {
        $_SESSION['log_01'] = trim(strtoupper($val_01));
        $_SESSION['log_02'] = $val_02;
        $_SESSION['log_03'] = $val_03;
        $_SESSION['log_04'] = 'WSALIADO';

        $_SESSION['usuarioUsuario']         = trim(strtoupper(strtolower($resultJSON['data']['0']['usuarioUsuario'])));
        $_SESSION['usuarioDocumento']       = trim($resultJSON['data']['0']['usuarioDocumento']);
        $_SESSION['usuarioNombre']          = trim(strtoupper(strtolower($resultJSON['data']['0']['usuarioNombre'])));
        $_SESSION['usuarioApellido']        = trim(strtoupper(strtolower($resultJSON['data']['0']['usuarioApellido'])));

        $_SESSION['usuarioEmail']           = trim(strtoupper(strtolower($resultJSON['data']['0']['usuarioEmail'])));
        $_SESSION['empresaCodigo']          = intval($resultJSON['data']['0']['empresaCodigo']);
        $_SESSION['empresaNombre']          = trim(strtoupper(strtolower($resultJSON['data']['0']['empresaNombre'])));
        $_SESSION['empresaRuc']             = trim(strtoupper(strtolower($resultJSON['data']['0']['empresaRuc'])));
        $_SESSION['rolCodigo']              = intval($resultJSON['data']['0']['rolCodigo']);
        $_SESSION['rolNombre']              = trim(strtoupper(strtolower($resultJSON['data']['0']['rolNombre'])));
        $_SESSION['empresaSitoWeb']         = trim($resultJSON['data']['0']['empresaSitoWeb']);
        $_SESSION['empresaCorreo']          = trim(strtolower($resultJSON['data']['0']['empresaCorreo']));
        $_SESSION['empresaDireccion']       = trim($resultJSON['data']['0']['empresaDireccion']);
        // $_SESSION['empresaLogo']            = (trim($resultJSON['data']['0']['empresaLogo']) == null) ? '' : trim($resultJSON['data']['0']['empresaLogo']);

        $_SESSION['expire'] = time() + 1800;

        $_SESSION['seg_prg']    = $jsIAM;

        header('Location: ./../../colab/public/dashboardv1.php');

    } else {
        $val_01 = NULL;
        $val_02 = NULL;
        $val_03 = NULL;
        $code   = $resultJSON['code'];
        $msg    = $resultJSON['status'];
        $msg    = str_replace("\n", ' ', $msg);
        $msg    = str_replace('"', '*', $msg);
        
        header('Location: ./../../../colab/index.php?code='.$code.'&msg='.$msg); 

    }
?>