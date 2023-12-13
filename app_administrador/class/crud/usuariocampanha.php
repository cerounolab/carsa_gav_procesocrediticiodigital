<?php
	if(!isset($_SESSION)){ 
        session_start(); 
    }
    
    ob_start();
    
	require '../../class/function/curl_api.php';
	require '../../class/function/function.php';

	
    $val01          = intval($_POST['var01']);
    $val02          = intval($_POST['var02']);
    $val03          = intval($_POST['var03']);
	$val04          = intval($_POST['var04']);
	$val05          = intval($_POST['var05']);

	$val06          = trim($_POST['var06']);

    $work01         = $_POST['workCodUsu'];
    $work06         = $_POST['workcodCamp'];

	$work02         = $_POST['workModo'];
	$work03         = $_POST['workPage'];
	$work04         = $_POST['workPrograma'];
	$work05         = intval($_POST['workAccion']); 

	$usu_03         = strtoupper($_SESSION['log_01']);
	$log_03         = $_SESSION['log_03'];
	$usu_06         = $_SESSION['empresaCodigo'];

	$val01			= ($work05 == 1) ? $val01 : 3;

    if (isset($val01) && isset($val03)) {
        $dataJSON = json_encode(
            array(
				'tipo_accion_codigo'     			=> $work05,
				'tipo_estado_parametro'				=> $val01,
				'usuario_campanha_orden'			=> $val02,
				'empresa_codigo'					=> $val03,

				'campanha_codigo'					=> $val04,
				'usuario_codigo'					=> $val05,
				
				'usuario_campanha_observacion'		=> $val06,

				'alta_empresa_codigo'				=> $usu_06,
				'alta_usuario'						=> $usu_03,
				'alta_ip'							=> $log_03,
				'alta_programa'						=> $work04,

				'auditoria_empresa_codigo'			=> $usu_06,
				'auditoria_usuario'					=> $usu_03,
				'auditoria_ip'						=> $log_03,
				'auditoria_programa'				=> $work04,
				'auditoria_incidencia'				=> 'CARDEVPCD-34'
			));
		
		switch($work02){
			case 'C':
				$result	= post_curl('/usuariocampanha', $dataJSON);
				break;
			case 'U':
				$result	= put_curl('/usuariocampanha/codigousuario/'.$work01.'/codigocampanha/'.$work06, $dataJSON);
				break;
			case 'D':
				$result	= delete_curl('/usuariocampanha/codigousuario/'.$work01.'/codigocampanha/'.$work06, $dataJSON);
				break;
		}
	}

	$result		= json_decode($result, true);
	$msg		= str_replace("\n", ' ', $result['messageShort']);

	header('Location: ../../'.$work03.'code='.$result['code'].'&msg='.$msg);

	ob_end_flush();
?>