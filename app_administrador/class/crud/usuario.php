<?php
	if(!isset($_SESSION)){ 
        session_start(); 
    }
    
    ob_start();
    
	require '../../class/function/curl_api.php';
	
    $val01          = intval($_POST['var01']); //estado
    $val02          = intval($_POST['var02']); // orden
    $val03          = intval($_POST['var03']); //empresa
	$val04          = intval($_POST['var04']); //sucursal
	$val05          = strtoupper(strtolower(trim($_POST['var05']))); // documento
	$val06          = strtoupper(strtolower(trim($_POST['var06']))); // nombre
    $val07          = strtoupper(strtolower(trim($_POST['var07']))); // apellido
	$val08          = trim($_POST['var08']); // usuario
	$val09          = trim($_POST['var09']); // password
	$val010         = trim($_POST['var010']); //  celular

	$val011         = trim($_POST['var011']); //email
	$val012         = trim($_POST['var012']); //observacion

    $work01         = $_POST['workCodigo'];
	$work02         = $_POST['workModo'];
	$work03         = $_POST['workPage'];
	$work04         = $_POST['workPrograma'];
	$work05         = 1;
	echo $val05;

	$usu_03         = 'HOLIX'; //strtoupper($_SESSION['usu_03']);

	$log_03         = '0.0.0.0';//$_SESSION['log_03'];

    if (isset($val01) && isset($val03)) {
        $dataJSON = json_encode(
            array(
				'tipo_accion_codigo'     	=> 1,
				'tipo_estado_parametro'     => $val01,
				'usuario_orden'    			=> $val02,
				'empresa_codigo'    		=> $val03,
                'sucursal_codigo'        	=> $val04,
                'usuario_documento'     	=> $val05,
				'usuario_nombre'			=> $val06,
				'usuario_apellido'			=> $val07,
				'usuario_usuario'			=> $val08,
				'usuario_password'			=> $val09,
				'usuario_celular'           => $val010,
				'usuario_correo'            => $val011,
				'usuario_observacion'       => $val012,

				'alta_empresa_codigo'		=> $work05,
				'alta_programa'        		=> $work04,
				'alta_usuario'         		=> $usu_03,
                'alta_ip'        	    	=> $log_03,

				'auditoria_empresa_codigo'  => $work05,
				'auditoria_programa'        => $work04,
				'auditoria_usuario'         => $usu_03,
                'auditoria_ip'        	    => $log_03
			));
		
		switch($work02){
			case 'C':
				echo 'shf';
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
	$msg		= str_replace("\n", ' ', $result['status']);

	header('Location: ../../'.$work03.'code='.$result['code'].'&msg='.$msg);

	ob_end_flush();
?>