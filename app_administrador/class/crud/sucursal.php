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
	$val06          = trim($_POST['var06']);
    $val07          = trim($_POST['var07']);
	$val08          = trim($_POST['var08']);
	$val09          = trim($_POST['var09']);
	$val010         = trim($_POST['var010']);
	$val011         = strtoupper(strtolower(trim($_POST['var011'])));


    $work01         = $_POST['workCodigo'];
	$work02         = $_POST['workModo'];
	$work03         = $_POST['workPage'];
	$work04         = $_POST['workPrograma'];
	
	$usu_03         = strtoupper($_SESSION['log_01']);
	$log_03         = $_SESSION['log_03'];
	$usu_06         = $_SESSION['empresaCodigo'];
	
    if (isset($val01) && isset($val03)) {
        $dataJSON = json_encode(
            array(
				'tipo_accion_codigo'     		=> 1,
				'tipo_estado_parametro'			=> $val01,
				'tipo_sucursal_parametro'		=> $val02,
				'empresa_codigo'				=> $val03,
				
				'sucursal_orden'				=> $val04,
				
				'sucursal_nombre'				=> $val05,
				
				'sucursal_telefono'				=> $val06,
				'sucursal_celular'				=> $val07,
				'sucursal_correo'				=> $val08,
				'sucursal_ubicacion'			=> $val09,
				
				'sucursal_direccion'			=> $val010,
				'sucursal_observacion'			=> $val011,

				'alta_empresa_codigo'			=> $usu_06,
				'alta_usuario'					=> $usu_03,
				'alta_ip'						=> $log_03,
				'alta_programa'					=> $work04,

				'auditoria_empresa_codigo'		=> $usu_06,
				'auditoria_usuario'				=> $usu_03,
				'auditoria_ip'					=> $log_03,
				'auditoria_programa'			=> $work04,
				'auditoria_incidencia'			=> '0'
			));
		
		switch($work02){
			case 'C':
				$result	= post_curl('/sucursal', $dataJSON);
				break;
			case 'U':
				$result	= put_curl('/sucursal/'.$work01, $dataJSON);
				break;
			case 'D':
				$result	= delete_curl('/sucursal/'.$work01, $dataJSON);
				break;
		}
	}

	$result		= json_decode($result, true);
	$msg		= str_replace("\n", ' ', $result['status']);

	header('Location: ../../'.$work03.'code='.$result['code'].'&msg='.$msg);

	ob_end_flush();
?>