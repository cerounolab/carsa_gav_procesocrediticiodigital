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
    $jsIAM      = new ArrayObject();
    $bandOK     = false;

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

    if ($resultJSON != []) {
        if ($resultJSON['code'] === 200) {
            foreach ($resultJSON['data'] as $value) {
                $codRol         = intval($value['rolCodigo']);
                $codEmpresa     = intval($value['empresaCodigo']);
                $xJSON001       =  get_curl('rolformulario/codigorol/'.$codRol.'/empresa/'.$codEmpresa);
                
                if ($resultJSON != []) {
                    if ($xJSON001['code'] == 200) {
                        foreach ($xJSON001['data'] as $key => $value) {
                            if ($value['tipoEstadoParametro'] == 1) {                           
                                $bandOK  = true;
                                $arrayIAM = array(
                                    'tipoFormularioNombre'          => $value['tipoFormularioNombre'],
                                    'rolFormularioAcceso'           => $value['rolFormularioAcceso'],
                                    'rolFormularioAccesoDsp'        => $value['rolFormularioAccesoDsp'],
                                    'rolFormularioAccesoUpd'        => $value['rolFormularioAccesoUpd'],
                                    'rolFormularioAccesoDlt'        => $value['rolFormularioAccesoDlt'],
                                    
                                    'rolFormularioAccesoIns'        => $value['rolFormularioAccesoIns'],
                                    'rolFormularioAccesoXls'        => $value['rolFormularioAccesoXls'],
                                    'rolFormularioAccesoPdf'        => $value['rolFormularioAccesoPdf'],
                                    'rolFormularioAcesoImpresion'   => $value['rolFormularioAcesoImpresion']
                                );
                                $jsIAM[] = $arrayIAM;
                            }
                        }
                    }
                } else {
                    $val_01 = NULL;
                    $val_02 = NULL;
                    $val_03 = NULL;
                    $code   = 500;
                    $msg    = 'Inconveniente con la WebServices, favor de verificar.';
                    $msg    = str_replace("\n", ' ', $msg);
                    $msg    = str_replace('"', '*', $msg);
                    
                   header('Location: ./../../../colab/index.php?code='.$code.'&msg='.$msg);
                }
            }

            $jsIAM = array('apps' => $jsIAM);

            $_SESSION['log_01'] = trim(strtoupper($val_01));
            $_SESSION['log_02'] = $val_02;
            $_SESSION['log_03'] = $val_03;
            $_SESSION['log_04'] = 'PROCREDIG';

            $_SESSION['usuarioUsuario']         = ($resultJSON['data']['0']['usuarioUsuario'] == null) ? '' : trim(strtoupper(strtolower($resultJSON['data']['0']['usuarioUsuario'])));
            $_SESSION['usuarioDocumento']       = ($resultJSON['data']['0']['usuarioDocumento']) == null ? '' : (trim($resultJSON['data']['0']['usuarioDocumento']));
            $_SESSION['usuarioNombre']          = ($resultJSON['data']['0']['usuarioNombre'] == null) ? '' : trim(strtoupper(strtolower($resultJSON['data']['0']['usuarioNombre'])));
            $_SESSION['usuarioApellido']        = ($resultJSON['data']['0']['usuarioApellido'] == null) ? '' : trim(strtoupper(strtolower($resultJSON['data']['0']['usuarioApellido'])));

            $_SESSION['usuarioEmail']           = ($resultJSON['data']['0']['usuarioEmail'] == null) ? '' : trim(strtoupper(strtolower($resultJSON['data']['0']['usuarioEmail'])));
            $_SESSION['empresaCodigo']          = ($resultJSON['data']['0']['empresaCodigo'] == null) ? 0 : intval($resultJSON['data']['0']['empresaCodigo']);
            $_SESSION['empresaNombre']          = ($resultJSON['data']['0']['empresaNombre'] == null) ? '' : trim(strtoupper(strtolower($resultJSON['data']['0']['empresaNombre'])));
            $_SESSION['empresaRuc']             = ($resultJSON['data']['0']['empresaRuc'] == null) ? '' : trim(strtoupper(strtolower($resultJSON['data']['0']['empresaRuc'])));
            $_SESSION['rolCodigo']              = ($resultJSON['data']['0']['rolCodigo'] == null) ? 0 : intval($resultJSON['data']['0']['rolCodigo']);
            $_SESSION['rolNombre']              = ($resultJSON['data']['0']['rolNombre'] == null) ? '' : trim(strtoupper(strtolower($resultJSON['data']['0']['rolNombre'])));
            $_SESSION['empresaSitoWeb']         = ($resultJSON['data']['0']['empresaSitoWeb'] == null) ? '' : trim($resultJSON['data']['0']['empresaSitoWeb']);
            $_SESSION['empresaCorreo']          = (trim(strtolower($resultJSON['data']['0']['empresaCorreo'])) == null) ? '' : trim(strtolower($resultJSON['data']['0']['empresaCorreo']));
            $_SESSION['empresaDireccion']       = (trim($resultJSON['data']['0']['empresaDireccion']) == null) ? '' : trim($resultJSON['data']['0']['empresaDireccion']);

            $_SESSION['expire'] = time() + 1800;

            $xJSON00                = $jsIAM;
            $bandADMIN              = false;
            $_SESSION['seg_prg']    = $jsIAM;

            header('Location: ./../../public/dashboardv1.php');  
        } else {
            $val_01 = NULL;
            $val_02 = NULL;
            $val_03 = NULL;
            $code   = $resultJSON['code'];
            $msg    = $resultJSON['messageShort'];
            $msg    = str_replace("\n", ' ', $msg);
            $msg    = str_replace('"', '*', $msg);
            
           header('Location: ./../../../colab/index.php?code='.$code.'&msg='.$msg); 
        }
    } else {
        $val_01 = NULL;
        $val_02 = NULL;
        $val_03 = NULL;
        $code   = 500;
        $msg    = 'Inconveniente con la WebServices, favor de verificar.';
        $msg    = str_replace("\n", ' ', $msg);
        $msg    = str_replace('"', '*', $msg);
        
       header('Location: ./../../../colab/index.php?code='.$code.'&msg='.$msg);
    }
?>