<?php
	if(!isset($_SESSION)){ 
        session_start(); 
    }
    
    ob_start();
    
	require '../../class/function/curl_api.php';

	
    $val01          = intval($_POST['var01']);
    $val02          = intval($_POST['var02']);
    $val03          = intval($_POST['var03']); 
	$val04          = strtoupper(strtolower(trim($_POST['var04']))); 
	$val05          = trim($_POST['var05']);
	$val06          = trim($_POST['var06']);
    $val07          = strtoupper(strtolower(trim($_POST['var07']))); 
	$val08          = trim($_POST['var08']);
	$val09          = strtoupper(strtolower(trim($_POST['var09'])));
	
    $work01         = $_POST['workCodigo'];
	$work02         = $_POST['workModo'];
	$work03         = $_POST['workPage'];
	$work04         = $_POST['workDominio'];
	$work05         = $_POST['workPrograma'];

	$usu_03         = strtoupper($_SESSION['log_01']);
	$log_03         = $_SESSION['log_03'];
	$usu_06         = $_SESSION['empresaCodigo'];

    if (isset($val01) && isset($val03)) {
        $dataJSON = json_encode(
            array(
				'tipo_accion_codigo'     	=> 1,
				'tipo_estado_parametro'     => $val01,
				'tipo_orden'    		    => $val02,
                'tipo_nombre'        		=> $val04,
				'tipo_parametro'			=> $val03,
				'tipo_equivalencia'			=> $val08,
				'tipo_icono'				=> $val05,
				'tipo_css'					=> $val06,
				'tipo_path'                 => $val07,
				'tipo_valor'	            => $work04,

				'tipo_observacion'          => $val09,

				'alta_empresa_codigo'  		=> $usu_06,
				'alta_programa'        		=> $work05,
				'alta_usuario'         		=> $usu_03,
                'alta_ip'        	    	=> $log_03,

				'auditoria_empresa_codigo'  => $usu_06,
				'auditoria_programa'        => $work05,
				'auditoria_usuario'         => $usu_03,
                'auditoria_ip'        	    => $log_03
			));
		
		switch($work02){
			case 'C':
				$result	= post_curl('/dominio', $dataJSON);
				break;
			case 'U':
				$result	= put_curl('/dominio/'.$work01, $dataJSON);
				break;
			case 'D':
				$result	= delete_curl('/dominio/'.$work01, $dataJSON);
				break;
		}
	}

	$result		= json_decode($result, true);
	$msg		= str_replace("\n", ' ', $result['status']);

	header('Location: ../../'.$work03.'code='.$result['code'].'&msg='.$msg);

	ob_end_flush();
?>