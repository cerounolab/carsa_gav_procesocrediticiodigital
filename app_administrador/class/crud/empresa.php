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
	$val05          = strtoupper(strtolower(trim($_POST['var05']))); 
	$val06          = trim($_POST['var06']); 
    $val07          = trim($_POST['var07']); 
	$val08          = trim($_POST['var08']); 
	$var09          = trim($_POST['var09']); 
	$val010         = trim($_POST['var010']); 
	$val011         = trim($_POST['var011']); 
	$val012         = strtoupper(strtolower(trim($_POST['var012'])));
	$val013         = '';
	// $val014         = trim($_POST['val014']); //equi
	$val015          = strtoupper(strtolower(trim($_POST['var015'])));

    $work01         = $_POST['workCodigo'];
	$work02         = $_POST['workModo'];
	$work03         = $_POST['workPage'];
	$work04         = $_POST['workPrograma'];
	$work05         = $_POST['workAccion'];

	$usu_03         = strtoupper($_SESSION['log_01']);
	$log_03         = $_SESSION['log_03'];
	$usu_06         = $_SESSION['empresaCodigo'];
	$val01			= ($work05 == 1) ? $val01 : 3;

	$fileTarget01	= '../../uploads/empresa/';
	$fileSize		= 20000001;
	$bandADJ01		= true;
	

	if($_FILES["var013"]["tmp_name"] != "" ) {
		$fileAttached01		= uploadAttached($work01, $fileTarget01, $_FILES['var013'], $_POST["submit"], $fileSize);

		$val013			    = ($_FILES['var013']['error'] == 0) ? $fileAttached01[2] : trim(strtolower($_POST['var013_1']));
			
		$bandADJ01			= $fileAttached01[0];
	}

    if (isset($val01) && isset($val03)) {
        $dataJSON = json_encode(
            array(
				'tipo_accion_codigo'     	=> $work05,
				'tipo_estado_parametro'     => $val01,
				'empresa_orden'    		    => $val02,
                'tipo_rubro_parametro'		=> $val03,
                'tipo_acceso_parametro'		=> $val04,
                'empresa_nombre'			=> $val05,
				'empresa_ruc'				=> $val06,
				'empresa_telefono'			=> $val07,
				'empresa_celular'			=> $val08,
				'empresa_web'				=> $var09,
				'empresa_correo'			=> $val010,
				'empresa_ubicacion'			=> $val011,
				'empresa_direccion'			=> $val012,

				'empresa_logo'          	=> $val013,
				'empresa_observacion'       => $val015,

				'alta_empresa_codigo' 		=> $usu_06,
				'alta_programa'        		=> $work04,
				'alta_usuario'         		=> $usu_03,
                'alta_ip'        	    	=> $log_03,

				'auditoria_empresa_codigo'  => $usu_06,
				'auditoria_programa'        => $work04,
				'auditoria_usuario'         => $usu_03,
                'auditoria_ip'        	    => $log_03
			));
		
		switch($work02){
			case 'C':
				$result	= post_curl('/empresa', $dataJSON);
				break;
			case 'U':
				$result	= put_curl('/empresa/'.$work01, $dataJSON);
				break;
			case 'D':
				$result	= delete_curl('/empresa/'.$work01, $dataJSON);
				break;
		}
	}

	$result		= json_decode($result, true);
	$code		= $result['code'];
	$msg		= str_replace("\n", ' ', $result['messageShort']);

	header('Location: ../../'.$work03.'code='.$code.'&msg='.$msg);

	ob_end_flush();
?>