<?php
	if(!isset($_SESSION)){ 
        session_start(); 
    }
    
    ob_start();
    
	require '../../class/function/curl_api.php';
	
    $val01          = intval($_POST['var01']);//est
    $val02          = intval($_POST['var02']); //ord
    $val03          = intval($_POST['var03']); //empresa
	$val04          = strtoupper(strtolower(trim($_POST['var04'])));//nom
	$val05          = $_POST['var05'];//url
	$val06         	= strtoupper(strtolower(trim($_POST['var06'])));//obs


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
				'formulario_orden'				=> $val02,
				'empresa_codigo'				=> $val03,
				
				'formulario_nombre'				=> $val04,
				
				'formulario_url'				=> $val05,
				'formulario_observacion'		=> $val06,

				'alta_empresa_codigo'			=> $usu_06,
				'alta_usuario'					=> $usu_03,
				'alta_ip'						=> $log_03,
				'alta_programa'					=> $work04,

				'auditoria_empresa_codigo'		=> $usu_06,
				'auditoria_usuario'				=> $usu_03,
				'auditoria_ip'					=> $log_03,
				'auditoria_programa'			=> $work04,
				'auditoria_incidencia'			=> 'CARDEVPCD-15'
			));
		
		switch($work02){
			case 'C':
				$result	= post_curl('/formulario', $dataJSON);
				break;
			case 'U':
				$result	= put_curl('/formulario/'.$work01, $dataJSON);
				break;
			case 'D':
				$result	= delete_curl('/formulario/'.$work01, $dataJSON);
				break;
		}
	}

	$result		= json_decode($result, true);
	$msg		= str_replace("\n", ' ', $result['status']);

	header('Location: ../../'.$work03.'code='.$result['code'].'&msg='.$msg);

	ob_end_flush();
?>