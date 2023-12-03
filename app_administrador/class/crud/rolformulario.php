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
	$val05          = intval($_POST['var05']);

	$val06          = strtoupper(strtolower(trim($_POST['var06']))); 
	$val07          = strtoupper(strtolower(trim($_POST['var07']))); 
	$val08          = strtoupper(strtolower(trim($_POST['var08'])));

	$val09          = strtoupper(strtolower(trim($_POST['var09']))); 
	$val010         = strtoupper(strtolower(trim($_POST['var010'])));
	$val011         = strtoupper(strtolower(trim($_POST['var011'])));

	$val012         = strtoupper(strtolower(trim($_POST['var012'])));
	$val013         = strtoupper(strtolower(trim($_POST['var013']))); 
	$val014         = strtoupper(strtolower(trim($_POST['var014'])));


    $work01         = $_POST['workCodigoRol'];
    $work06         = $_POST['workCodigoForm'];

	$work02         = $_POST['workModo'];
	$work03         = $_POST['workPage'];
	$work04         = $_POST['workPrograma'];
	
	$usu_03         = strtoupper($_SESSION['log_01']);
	$log_03         = $_SESSION['log_03'];
	$usu_06         = $_SESSION['empresaCodigo'];

    if (isset($val01) && isset($val03)) {
        $dataJSON = json_encode(
            array(
				'tipo_accion_codigo'     			=> 1,
				'tipo_estado_parametro'				=> $val01,
				'rol_formulario_orden'				=> $val02,

				'empresa_codigo'					=> $val03,
				'rol_codigo'						=> $val04,
				'formulario_codigo'					=> $val05,
				
				'rol_formulario_acceso'				=> $val06,
				'rol_formulario_acceso_dsp'			=> $val07,
				'rol_formulario_acceso_upd'			=> $val08,

				'rol_formulario_acceso_dlt'			=> $val09,
				'rol_formulario_acceso_ins'			=> $val010,
				'rol_formulario_acceso_xls'			=> $val011,

				'rol_formulario_acceso_pdf'			=> $val012,
				'rol_formulario_aceso_impresion'	=> $val013,
				'rol_formulario_observacion'		=> $val014,


				'alta_empresa_codigo'				=> $usu_06,
				'alta_usuario'						=> $usu_03,
				'alta_ip'							=> $log_03,
				'alta_programa'						=> $work04,

				'auditoria_empresa_codigo'			=> $usu_06,
				'auditoria_usuario'					=> $usu_03,
				'auditoria_ip'						=> $log_03,
				'auditoria_programa'				=> $work04,
				'auditoria_incidencia'				=> 'CARDEVPCD-28'
			));
		
		switch($work02){
			case 'C':
				$result	= post_curl('/rolformulario', $dataJSON);
				break;
			case 'U':
				$result	= put_curl('/rolformulario/codigorol/'.$work01.'/codigoformulario/'.$work06, $dataJSON);
				break;
			case 'D':
				$result	= delete_curl('/rolformulario/codigorol/'.$work01.'/codigoformulario/'.$work06, $dataJSON);
				break;
		}
	}

	$result		= json_decode($result, true);
	$msg		= str_replace("\n", ' ', $result['status']);

	header('Location: ../../'.$work03.'code='.$result['code'].'&msg='.$msg);

	ob_end_flush();
?>