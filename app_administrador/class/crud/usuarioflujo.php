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
	$val04          = intval($_POST['var04']);//rolsuperior
	$val05          = intval($_POST['var05']);//usu sup

	$val06          = trim($_POST['var06']);//rol colab
	$val07          = trim($_POST['var07']);//usu colab
	$val08         	= strtoupper(strtolower(trim($_POST['var08'])));


    $work01         = $_POST['workcodRolSup'];
    $work06         = $_POST['workCodUsuSup'];

    $work07         = $_POST['workcodRolCol'];
    $work08         = $_POST['workCodUsuCol'];

	$work02         = $_POST['workModo'];
	$work03         = $_POST['workPage'];
	$work04         = $_POST['workPrograma'];
	$work05         = $_POST['workAccion']; 
	
	$usu_03         = strtoupper($_SESSION['log_01']);
	$log_03         = $_SESSION['log_03'];
	$usu_06         = $_SESSION['empresaCodigo'];

	$val01			= ($work05 == 1) ? $val01 : 3;

    if (isset($val01) && isset($val03)) {
        $dataJSON = json_encode(
            array(
				'tipo_accion_codigo'     			=> $work05,
				'tipo_estado_parametro'				=> $val01,
				'usuario_flujo_orden'				=> $val02,
				'empresa_codigo'					=> $val03,
				
				'rol_superior_codigo'				=> $val04,
				'usuario_superior_codigo'			=> $val05,

				'rol_subordinado_codigo'			=> $val06,
				'usuario_subordinado_codigo'		=> $val07,

				'usuario_flujo_observacion'			=> $val08,

				'alta_empresa_codigo'				=> $usu_06,
				'alta_usuario'						=> $usu_03,
				'alta_ip'							=> $log_03,
				'alta_programa'						=> $work04,

				'auditoria_empresa_codigo'			=> $usu_06,
				'auditoria_usuario'					=> $usu_03,
				'auditoria_ip'						=> $log_03,
				'auditoria_programa'				=> $work04,
				'auditoria_incidencia'				=> 'CARDEVPCD-27'
			));
		
		switch($work02){
			case 'C':
				$result	= post_curl('/usuarioflujo', $dataJSON);
				break;
			case 'U':
				$result	= put_curl('/usuarioflujo/usuariosuperior/'.$work06.'/rolsuperior/'.$work01.'/usuariosubordinado/'.$work08.'/rolsubordinado/'.$work07, $dataJSON);
				break;
			case 'D':
				$result	= delete_curl('/usuarioflujo/usuariosuperior/'.$work06.'/rolsuperior/'.$work01.'/usuariosubordinado/'.$work08.'/rolsubordinado/'.$work07, $dataJSON);
				break;
		}
	}

	$result		= json_decode($result, true);
	$msg		= str_replace("\n", ' ', $result['messageShort']);

	header('Location: ../../'.$work03.'code='.$result['code'].'&msg='.$msg);

	ob_end_flush();
?>