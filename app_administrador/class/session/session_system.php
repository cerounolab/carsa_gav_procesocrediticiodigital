<?php 
    if(!isset($_SESSION)){ 
        session_start(); 
    }

    $log_01 = isset($_SESSION['log_01']) ? $_SESSION['log_01'] : '';
    $log_02 = isset($_SESSION['log_02']) ? $_SESSION['log_02'] : '';
    $log_03 = isset($_SESSION['log_03']) ? $_SESSION['log_03'] : '';
    $log_04 = isset($_SESSION['log_04']) ? $_SESSION['log_04'] : '';
    
    $usu_01 = isset($_SESSION['usuarioUsuario']) ? $_SESSION['usuarioUsuario'] : '';
    $usu_02 = isset($_SESSION['usuarioEmail']) ? $_SESSION['usuarioEmail'] : '';
    $usu_03 = isset($_SESSION['usuarioNombre']) ? $_SESSION['usuarioNombre'] : '';
    $usu_04 = isset($_SESSION['usuarioApellido']) ? $_SESSION['usuarioApellido'] : '';
    $usu_05 = isset($_SESSION['usuarioDocumento']) ? $_SESSION['usuarioDocumento'] : '';
    $usu_06 = isset($_SESSION['empresaCodigo']) ? $_SESSION['empresaCodigo'] : '';
    $usu_07 = isset($_SESSION['empresaNombre']) ? $_SESSION['empresaNombre'] : '';
    $usu_08 = isset($_SESSION['empresaRuc']) ? $_SESSION['empresaRuc'] : '';
    $usu_09 = isset($_SESSION['rolCodigo']) ? $_SESSION['rolCodigo'] : '';
    $usu_10 = isset($_SESSION['rolNombre']) ? $_SESSION['rolNombre'] : '';
    $usu_11 = isset($_SESSION['empresaSitoWeb']) ? $_SESSION['empresaSitoWeb'] : '';
    $usu_12 = isset($_SESSION['empresaCorreo']) ? $_SESSION['empresaCorreo'] : '';
    $usu_13 = isset($_SESSION['empresaDireccion']) ? $_SESSION['empresaDireccion'] : '';
    // $usu_14 = isset($_SESSION['empresaLogo']) ? $_SESSION['empresaLogo'] : '';
    $seg_01 = isset($_SESSION['seg_prg']) ? $_SESSION['seg_prg'] : '';

    $expire = isset($_SESSION['expire']) ? $_SESSION['expire'] : '';

    $val_03 = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '';

    $priv_display       = 'N';
    $priv_insert        = 'N';
    $priv_update        = 'N';
    $priv_delete        = 'N';
    $priv_exportXls     = 'N';
    $priv_exportPdf     = 'N';
    $priv_print         = 'N';
    $priv_access        = 'N';

    $ulrPos         = 0;

    if ($expire < time()) {
        header('Location: ./../../admin/class/session/session_logout.php');

    } else {
        if ($log_01 == '' ) {
            header('Location: ./../../admin/class/session/session_logout.php');

        } else {
            if (isset($log_01) && isset($log_03) && isset($val_03)) {
                date_default_timezone_set('America/Asuncion');
                setlocale(LC_ALL, "es_PY", 'Spanish_Spain', 'Spanish');
                setlocale(LC_TIME, 'es_PY.UTF-8');
                setlocale(LC_TIME, 'spanish');
                setlocale(LC_MONETARY, 'es_PY');
    
                $_SESSION['expire'] = time() + 600;
    
                //$urlPat = strtoupper($_SERVER['SCRIPT_FILENAME']);
                //$urlAnt = substr($_SERVER['HTTP_REFERER'], $ulrPos);
                
                $urlAct = $_SERVER['REQUEST_URI'];
                $ulrPos = strripos($urlAct, '/');
                $urlApp = substr($urlAct, ($ulrPos + 1));
                
                $ulrPos = strripos($urlApp, '.php');
                $urlApp = trim(strtolower(substr($urlApp, 0, $ulrPos)));

                $urlBand= false;

                foreach ($seg_01["apps"] as $seg_01Key => $seg_01Value) {
                    if ($urlApp === trim(strtolower($seg_01Value['formularioNombre']))){
                        $priv_access = trim(strtoupper(strtolower($seg_01Value['rolFormularioAcceso'])));
                        if (trim(strtoupper(strtolower($seg_01Value['rolFormularioAcceso']))) === 'S'){
                            $priv_display   = ($seg_01Value['rolFormularioAccesoDsp'] === 'S') ? 'S' : 'N';
                            $priv_insert    = ($seg_01Value['rolFormularioAccesoIns'] === 'S') ? 'S' : 'N';
                            $priv_delete    = ($seg_01Value['rolFormularioAccesoDlt'] === 'S') ? 'S' : 'N';
                            $priv_update    = ($seg_01Value['rolFormularioAccesoUpd'] === 'S') ? 'S' : 'N';
                            $priv_exportXls = ($seg_01Value['rolFormularioAccesoXls'] === 'S') ? 'S' : 'N';
                            $priv_exportPdf = ($seg_01Value['rolFormularioAccesoPdf'] === 'S') ? 'S' : 'N';
                            $priv_print     = ($seg_01Value['rolFormularioAcesoImpresion' ]  === 'S') ? 'S' : 'N';
                            $urlBand        = true;
                            break;
                        }
                    }
                }

                if (!$urlBand){
                    header('Location: ./../../admin/public/error_403.php');
                }
            } else {
                header('Location: ./../../admin/class/session/session_logout.php');
            }
        }
    }
?>