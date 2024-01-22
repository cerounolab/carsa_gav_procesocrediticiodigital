<?php
	if(!isset($_SESSION)){ 
        session_start(); 
    }
    
    ob_start();
    
	require '../../class/function/curl_api.php';
	
    $val01          = intval($_POST['var01']);
    $val02          = intval($_POST['var02']); 
    $val03          = intval($_POST['var03']); 
	$val04          = intval($_POST['var04']); 
	$val05          = strtoupper(strtolower(trim($_POST['var05']))); 
	$val06          = strtoupper(strtolower(trim($_POST['var06']))); 
    $val07          = strtoupper(strtolower(trim($_POST['var07']))); 
	$val08          = trim($_POST['var08']); 
	$val08          = trim($_POST['var08_1'].''.$_POST['var08']);
	$val09          = trim($_POST['var09']); 
	$val010         = trim($_POST['var010']); 

	$val011         = trim($_POST['var011']); 
	$val012         = trim($_POST['var012']);
	
	$val013         = intval($_POST['var013']);
	$val014         = trim($_POST['var014']);
	$val015         = trim($_POST['var015']);

    $work01         = $_POST['workCodigo'];
	$work02         = $_POST['workModo'];
	$work03         = $_POST['workPage'];
	$work04         = $_POST['workPrograma'];
	$work05         = $_POST['workAccion'];
	$usu_03         = strtoupper($_SESSION['log_01']);
	$log_03         = $_SESSION['log_03'];
	$usu_06         = $_SESSION['empresaCodigo'];
	
	$val01			= ($work05 == 1 || $work05 == 3) ? $val01 : 3;

    if (isset($val01) && isset($val03)) {
        $dataJSON = json_encode(
            array(
				'tipo_accion_codigo'     			=> $work05,
				'tipo_estado_parametro'     		=> $val01,
				'usuario_orden'    					=> $val02,
				'empresa_codigo'    				=> $val03,
                'sucursal_codigo'        			=> $val04,
                'usuario_documento'     			=> $val05,
				'usuario_nombre'					=> $val06,
				'usuario_apellido'					=> $val07,
				'usuario_usuario'					=> $val08,
				'usuario_password'					=> $val09,
				'usuario_celular'           		=> $val011,
				'usuario_correo'            		=> $val010,
				'usuario_observacion'       		=> $val012,

				'usuario_ejecutivo_venta_codigo'	=> $val013,
				'usuario_cliente_nuevo'     		=> $val014,
				'usuario_cliente_recurrente'		=> $val015,

				'alta_empresa_codigo'				=> $usu_06,
				'alta_programa'        				=> $work04,
				'alta_usuario'         				=> $usu_03,
                'alta_ip'        	    			=> $log_03,

				'auditoria_empresa_codigo'  		=> $usu_06,
				'auditoria_programa'        		=> $work04,
				'auditoria_usuario'         		=> $usu_03,
                'auditoria_ip'        	    		=> $log_03
			));
		
		switch($work02){
			case 'C':
				$result	= post_curl('/usuario/registro', $dataJSON);
				break;
			case 'U':
				$result	= put_curl('/usuario/'.$work01, $dataJSON);
				break;
			case 'D':
				$result	= delete_curl('/usuario/'.$work01, $dataJSON);
				break;
		}
	}

	$result		= json_decode($result, true);
	$msg		= str_replace("\n", ' ', $result['messageShort']);

	header('Location: ../../'.$work03.'code='.$result['code'].'&msg='.$msg);

	ob_end_flush();
?>