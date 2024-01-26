<?php
    if(!isset($_SESSION)){ 
        session_start(); 
    }
    
    ob_start();
    
	require '../../class/function/curl_api.php';
	require '../../class/function/function.php';
    require '../../class/session/session_system.php';

	//CUENTA
	$persona_cuenta						                    = (isset($_POST['persona_cuenta'])) ? intval($_POST['persona_cuenta']) : 0;
	$persona_documento_numero			                    = (isset($_POST['persona_documento_numero'])) ? trim(strtoupper(strtolower($_POST['persona_documento_numero']))) : '';
	$tipo_persona_parametro				                    = (isset($_POST['tipo_persona_parametro'])) ? intval($_POST['tipo_persona_parametro']) : 0;
    $persona_apellido_paterno			                    = (isset($_POST['persona_apellido_paterno'])) ? trim(strtoupper(strtolower($_POST['persona_apellido_paterno']))) : '';
	$persona_apellido_materno			                    = (isset($_POST['persona_apellido_materno'])) ? trim(strtoupper(strtolower($_POST['persona_apellido_materno']))) : '';
	$persona_apellido                                       = $persona_apellido_paterno.' '.$persona_apellido_materno;
    $persona_apellido_casada			                    = (isset($_POST['persona_apellido_casada'])) ? trim(strtoupper(strtolower($_POST['persona_apellido_casada']))) : '';
	$persona_nombre_primer				                    = (isset($_POST['persona_nombre_primer'])) ? trim(strtoupper(strtolower($_POST['persona_nombre_primer']))) : '';
	$persona_nombre_segundo				                    = (isset($_POST['persona_nombre_segundo'])) ? trim(strtoupper(strtolower($_POST['persona_nombre_segundo']))) : '';
	$persona_nombre                                         = $persona_nombre_primer.' '.$persona_nombre_segundo;
    $localidad_pais_codigo				                    = (isset($_POST['localidad_pais_codigo'])) ? intval($_POST['localidad_pais_codigo']) : 0;
    $tipo_sexo_parametro				                    = (isset($_POST['tipo_sexo_parametro'])) ? intval($_POST['tipo_sexo_parametro']) : 0;
    $persona_fecha_nacimiento                               = (isset($_POST['persona_fecha_nacimiento'])) ? $_POST['persona_fecha_nacimiento'] : '';
	$tipo_estadocivil_parametro 		                    = (isset($_POST['tipo_estadocivil_parametro'])) ? intval($_POST['tipo_estadocivil_parametro']) : 0;
    $persona_documento_fechaemision                         = (isset($_POST['persona_documento_fechaemision'])) ? $_POST['persona_documento_fechaemision'] : '';

    //DATOS PARTICULARES
	$persona_datoparticular_codigo                          = (isset($_POST['persona_datoparticular_codigo'])) ? intval($_POST['persona_datoparticular_codigo']) : 0;
    $persona_datoparticular_localidad_departamento_codigo   = (isset($_POST['persona_datoparticular_localidad_departamento_codigo'])) ? intval($_POST['persona_datoparticular_localidad_departamento_codigo']) : '';
    $persona_datoparticular_localidad_ciudad_codigo         = (isset($_POST['persona_datoparticular_localidad_ciudad_codigo'])) ? intval($_POST['persona_datoparticular_localidad_ciudad_codigo']) : '';
    $persona_datoparticular_localidad_barrio_codigo         = (isset($_POST['persona_datoparticular_localidad_barrio_codigo'])) ? intval($_POST['persona_datoparticular_localidad_barrio_codigo']) : '';
	$persona_datoparticular_barrio_nombre                   = (isset($_POST['persona_datoparticular_barrio_nombre'])) ? trim(strtoupper(strtolower($_POST['persona_datoparticular_barrio_nombre']))) : '';
    $persona_datoparticular_principal						= (isset($_POST['persona_datoparticular_principal'])) ? trim(strtoupper(strtolower($_POST['persona_datoparticular_principal']))) : '';
	$persona_datoparticular_casanumero						= (isset($_POST['persona_datoparticular_casanumero'])) ? intval($_POST['persona_datoparticular_casanumero']) : 0;
    $persona_datoparticular_esquina							= (isset($_POST['persona_datoparticular_esquina'])) ? trim(strtoupper(strtolower($_POST['persona_datoparticular_esquina']))) : '';
	$persona_datoparticular_telefono1						= (isset($_POST['persona_datoparticular_telefono1'])) ? trim(strtoupper(strtolower($_POST['persona_datoparticular_telefono1']))) : '';
	$persona_datoparticular_telefono2						= (isset($_POST['persona_datoparticular_telefono2'])) ? trim(strtoupper(strtolower($_POST['persona_datoparticular_telefono2']))) : '';
	$persona_datoparticular_telefonofamiliar				= (isset($_POST['persona_datoparticular_telefonofamiliar'])) ? trim(strtoupper(strtolower($_POST['persona_datoparticular_telefonofamiliar']))) : '';
	$persona_datoparticular_celular1						= (isset($_POST['persona_datoparticular_celular1'])) ? trim(strtoupper(strtolower($_POST['persona_datoparticular_celular1']))) : '';
	$persona_datoparticular_celular2						= (isset($_POST['persona_datoparticular_celular2'])) ? trim(strtoupper(strtolower($_POST['persona_datoparticular_celular2']))) : '';
	$persona_datoparticular_celular3						= (isset($_POST['persona_datoparticular_celular3'])) ? trim(strtoupper(strtolower($_POST['persona_datoparticular_celular3']))) : '';
	$persona_datoparticular_email							= (isset($_POST['persona_datoparticular_email'])) ? trim(strtolower($_POST['persona_datoparticular_email'])) : '';
    $persona_datoparticular_tipo_vivienda_parametro			= (isset($_POST['persona_datoparticular_tipo_vivienda_parametro'])) ? intval($_POST['persona_datoparticular_tipo_vivienda_parametro']) : 0;

    //DATOS LABORALES
	$persona_datolaboral_codigo                             = (isset($_POST['persona_datolaboral_codigo'])) ? intval($_POST['persona_datolaboral_codigo']) : 0;
    $persona_datolaboral_principal							= (isset($_POST['persona_datolaboral_principal'])) ? trim(strtoupper(strtolower($_POST['persona_datolaboral_principal']))) : '';
    $persona_datolaboral_empresa							= (isset($_POST['persona_datolaboral_empresa'])) ? trim(strtoupper(strtolower($_POST['persona_datolaboral_empresa']))) : '';
    $persona_datolaboral_aportejubilatorio_codigo           = 1;
    $persona_datolaboral_fechaingreso						= (isset($_POST['persona_datolaboral_fechaingreso'])) ? $_POST['persona_datolaboral_fechaingreso'] : '';
    $persona_datolaboral_salario							= (isset($_POST['persona_datolaboral_salario'])) ? intval($_POST['persona_datolaboral_salario']) : 0;
    $persona_datolaboral_email								= (isset($_POST['persona_datolaboral_email'])) ? trim(strtolower($_POST['persona_datolaboral_email'])) : '';
    $persona_datolaboral_esquina							= (isset($_POST['persona_datolaboral_esquina'])) ? trim(strtoupper(strtolower($_POST['persona_datolaboral_esquina']))) : '';
    $persona_datolaboral_casanumero							= (isset($_POST['persona_datolaboral_casanumero'])) ? intval($_POST['persona_datolaboral_casanumero']) : 0;
    $persona_datolaboral_telefono1							= (isset($_POST['persona_datolaboral_telefono1'])) ? trim(strtoupper(strtolower($_POST['persona_datolaboral_telefono1']))) : '';
	$persona_datolaboral_telefono2							= (isset($_POST['persona_datolaboral_telefono2'])) ? trim(strtoupper(strtolower($_POST['persona_datolaboral_telefono2']))) : '';
	$persona_datolaboral_telefono3							= (isset($_POST['persona_datolaboral_telefono3'])) ? trim(strtoupper(strtolower($_POST['persona_datolaboral_telefono3']))) : '';
	$persona_datolaboral_interno							= (isset($_POST['persona_datolaboral_interno'])) ? intval($_POST['persona_datolaboral_interno']) : 0;
    $persona_datolaboral_localidad_departamento_codigo      = (isset($_POST['persona_datolaboral_localidad_departamento_codigo'])) ? intval($_POST['persona_datolaboral_localidad_departamento_codigo']) : 0;
    $persona_datolaboral_localidad_ciudad_codigo            = (isset($_POST['persona_datolaboral_localidad_ciudad_codigo'])) ? intval($_POST['persona_datolaboral_localidad_ciudad_codigo']) : 0;
    $persona_datolaboral_localidad_barrio_codigo            = (isset($_POST['persona_datolaboral_localidad_barrio_codigo'])) ? intval($_POST['persona_datolaboral_localidad_barrio_codigo']) : 0;
    $persona_datolaboral_barrio_nombre                      = (isset($_POST['persona_datolaboral_barrio_nombre'])) ? trim(strtoupper(strtolower($_POST['persona_datolaboral_barrio_nombre']))) : '';

    $persona_datolaboral_hora_desde							= (isset($_POST['persona_datolaboral_hora_desde'])) ? trim(strtoupper(strtolower($_POST['persona_datolaboral_hora_desde']))) : '';
	$persona_datolaboral_hora_hasta							= (isset($_POST['persona_datolaboral_hora_hasta'])) ? trim(strtoupper(strtolower($_POST['persona_datolaboral_hora_hasta']))) : '';
    $persona_datolaboral_empresa_codigo						= (isset($_POST['persona_datolaboral_empresa_codigo'])) ? intval($_POST['persona_datolaboral_empresa_codigo']) : 0;
	$persona_datolaboral_cargo_codigo						= (isset($_POST['persona_datolaboral_cargo_codigo'])) ? intval($_POST['persona_datolaboral_cargo_codigo']) : 0;
	$persona_datolaboral_diacobro							= (isset($_POST['persona_datolaboral_diacobro'])) ? intval($_POST['persona_datolaboral_diacobro']) : 0;
	$persona_datolaboral_dialunes							= (isset($_POST['persona_datolaboral_dialunes'])) ? trim(ucfirst(strtolower($_POST['persona_datolaboral_dialunes']))) : '';
	$persona_datolaboral_diamartes							= (isset($_POST['persona_datolaboral_diamartes'])) ? trim(ucfirst(strtolower($_POST['persona_datolaboral_diamartes']))) : '';
	$persona_datolaboral_diamiercoles						= (isset($_POST['persona_datolaboral_diamiercoles'])) ? trim(ucfirst(strtolower($_POST['persona_datolaboral_diamiercoles']))) : '';
	$persona_datolaboral_diajueves							= (isset($_POST['persona_datolaboral_diajueves'])) ? trim(ucfirst(strtolower($_POST['persona_datolaboral_diajueves']))) : '';
	$persona_datolaboral_diaviernes							= (isset($_POST['persona_datolaboral_diaviernes'])) ? trim(ucfirst(strtolower($_POST['persona_datolaboral_diaviernes']))) : '';
	$persona_datolaboral_diasabado							= (isset($_POST['persona_datolaboral_diasabado'])) ? trim(ucfirst(strtolower($_POST['persona_datolaboral_diasabado']))) : '';
	$persona_datolaboral_diadomingo							= (isset($_POST['persona_datolaboral_diadomingo'])) ? trim(ucfirst(strtolower($_POST['persona_datolaboral_diadomingo']))) : '';
	$persona_datolaboral_actividad_codigo					= (isset($_POST['persona_datolaboral_actividad_codigo'])) ? intval($_POST['persona_datolaboral_actividad_codigo']) : 0;
	$persona_datolaboral_profesion_codigo					= (isset($_POST['persona_datolaboral_profesion_codigo'])) ? intval($_POST['persona_datolaboral_profesion_codigo']) : 0;
	$persona_datolaboral_area_codigo						= (isset($_POST['persona_datolaboral_area_codigo'])) ? intval($_POST['persona_datolaboral_area_codigo']) : 0;
	$persona_datolaboral_forma_pago_codigo					= (isset($_POST['persona_datolaboral_forma_pago_codigo'])) ? intval($_POST['persona_datolaboral_forma_pago_codigo']) : 0;
	$persona_datolaboral_banco_codigo						= (isset($_POST['persona_datolaboral_banco_codigo'])) ? intval($_POST['persona_datolaboral_banco_codigo']) : 0;

    //DATOS REFERENCIAS
    $persona_datoreferencia_contacto1_nombre				= (isset($_POST['persona_datoreferencia_contacto1_nombre'])) ? trim(strtoupper(strtolower($_POST['persona_datoreferencia_contacto1_nombre']))) : '';
	$persona_datoreferencia_contacto1_parentesco			= (isset($_POST['persona_datoreferencia_contacto1_parentesco'])) ? trim(strtoupper(strtolower($_POST['persona_datoreferencia_contacto1_parentesco']))) : '';
	$persona_datoreferencia_contacto1_telefono				= (isset($_POST['persona_datoreferencia_contacto1_telefono'])) ? trim(strtoupper(strtolower($_POST['persona_datoreferencia_contacto1_telefono']))) : '';
	$persona_datoreferencia_contacto2_nombre				= (isset($_POST['persona_datoreferencia_contacto2_nombre'])) ? trim(strtoupper(strtolower($_POST['persona_datoreferencia_contacto2_nombre']))) : '';
	$persona_datoreferencia_contacto2_parentesco			= (isset($_POST['persona_datoreferencia_contacto2_parentesco'])) ? trim(strtoupper(strtolower($_POST['persona_datoreferencia_contacto2_parentesco']))) : '';
	$persona_datoreferencia_contacto2_telefono				= (isset($_POST['persona_datoreferencia_contacto2_telefono'])) ? trim(strtoupper(strtolower($_POST['persona_datoreferencia_contacto2_telefono']))) : '';
	$persona_datoreferencia_contacto3_nombre				= (isset($_POST['persona_datoreferencia_contacto3_nombre'])) ? trim(strtoupper(strtolower($_POST['persona_datoreferencia_contacto3_nombre']))) : '';
	$persona_datoreferencia_contacto3_parentesco			= (isset($_POST['persona_datoreferencia_contacto3_parentesco'])) ? trim(strtoupper(strtolower($_POST['persona_datoreferencia_contacto3_parentesco']))) : '';
	$persona_datoreferencia_contacto3_telefono				= (isset($_POST['persona_datoreferencia_contacto3_telefono'])) ? trim(strtoupper(strtolower($_POST['persona_datoreferencia_contacto3_telefono']))) : '';

    //SOLICITUD OPERACION
    $solicitud_parentesco                                   = 'F';
	$solicitud_monto										= (isset($_POST['solicitud_monto'])) ? validarImporte($_POST['solicitud_monto']) : 0;
	$solicitud_plazo										= (isset($_POST['solicitud_plazo'])) ? intval($_POST['solicitud_plazo']) : 0;
	$solicitud_primer_vencimiento							= (isset($_POST['solicitud_primer_vencimiento'])) ? $_POST['solicitud_primer_vencimiento'] : '';
    $solicitud_cuota_importe								= (isset($_POST['solicitud_cuota_importe'])) ? intval($_POST['solicitud_cuota_importe']) : 0;
    $solicitud_ejecutivoventa_codigo                        = 10110;
    $solicitud_tipooperacion_codigo                         = 4001012;
	$solicitud_estadooperacion_codigo                       = 'PV';
    $solicitud_medio_codigo                                 = 362;
    $solicitud_formapago_codigo								= (isset($_POST['solicitud_formapago_codigo'])) ? intval($_POST['solicitud_formapago_codigo']) : 0;
	$solicitud_banco_codigo									= (isset($_POST['solicitud_banco_codigo'])) ? intval($_POST['solicitud_banco_codigo']) : 0;
    $solicitud_banco_cuenta									= (isset($_POST['solicitud_banco_cuenta'])) ? trim(strtoupper(strtolower($_POST['solicitud_banco_cuenta']))) : NULL;
	$solicitud_banco_tipo									= (isset($_POST['solicitud_banco_tipo'])) ? intval($_POST['solicitud_banco_tipo']) : 0;
    $solicitud_campanha_codigo                              = 0;
    $solicitud_garante_codigo                               = 1;
    $solicitud_documento_adjunto                            = 'S';
    $solicitud_tipooperador_codigo                          = 'N';
    $solicitud_cuota_dinamica                               = 'N';
    $solicitud_banca_codigo									= (isset($_POST['solicitud_banca_codigo'])) ? intval($_POST['solicitud_banca_codigo']) : 0;
    $solicitud_tiposolicitud_codigo                         = 'TITULAR';

    $work01                                                 = intval($_POST['workCodigo']);
	$work02                                                 = trim(strtoupper(strtolower($_POST['workModo'])));
	$work03                                                 = trim($_POST['workPage']);
    $work04                                                 = intval($_POST['workAction']);

    $cuentaJSON                                             = setPersonaCuenta($work02, $work04, $persona_cuenta, $persona_documento_numero, $persona_documento_fechaemision, $tipo_persona_parametro, $persona_nombre_primer, $persona_nombre_segundo, $persona_apellido_paterno, $persona_apellido_materno, $persona_apellido_casada, $localidad_pais_codigo, $tipo_sexo_parametro, $tipo_estadocivil_parametro, $persona_fecha_nacimiento, $log_01, $log_03);
    $code                                                   = intval($cuentaJSON[0]['code']);
    $msg                                                    = str_replace("\n", ' ', $cuentaJSON[0]['message']);
    $persona_cuenta                                         = intval($cuentaJSON[0]['codigo']);

    if ($work01 !== 0){
        $datPersonalJSON= setPersonaDatoParticular('C', $work04, $persona_cuenta, $persona_datoparticular_codigo, $persona_datoparticular_localidad_departamento_codigo, $persona_datoparticular_localidad_ciudad_codigo, $persona_datoparticular_localidad_barrio_codigo, $persona_datoparticular_barrio_nombre, $persona_datoparticular_principal, $persona_datoparticular_esquina, $persona_datoparticular_casanumero, $persona_datoparticular_telefono1, $persona_datoparticular_telefono2, $persona_datoparticular_telefonofamiliar, $persona_datoparticular_celular1, $persona_datoparticular_celular2, $persona_datoparticular_celular3, $persona_datoparticular_email, $persona_datoparticular_tipo_vivienda_parametro, $log_01, $log_03);
        $datLaboralJSON = setPersonaDatoLaboral('C', $work04, $persona_cuenta, $persona_datolaboral_codigo, $persona_datolaboral_localidad_departamento_codigo, $persona_datolaboral_localidad_ciudad_codigo, $persona_datolaboral_localidad_barrio_codigo, $persona_datolaboral_barrio_nombre, $persona_datolaboral_principal, $persona_datolaboral_esquina, $persona_datolaboral_casanumero, $persona_datolaboral_empresa, $persona_datolaboral_fechaingreso, $persona_datolaboral_salario, $persona_datolaboral_email, $persona_datolaboral_telefono1, $persona_datolaboral_telefono2, $persona_datolaboral_telefono3, $persona_datolaboral_interno, $persona_datolaboral_hora_desde, $persona_datolaboral_hora_hasta, $persona_datolaboral_empresa_codigo, $persona_datolaboral_cargo_codigo, $persona_datolaboral_diacobro, $persona_datolaboral_dialunes, $persona_datolaboral_diamartes, $persona_datolaboral_diamiercoles, $persona_datolaboral_diajueves, $persona_datolaboral_diaviernes, $persona_datolaboral_diasabado, $persona_datolaboral_diadomingo, $persona_datolaboral_actividad_codigo, $persona_datolaboral_profesion_codigo, $persona_datolaboral_area_codigo, $persona_datolaboral_forma_pago_codigo, $persona_datolaboral_banco_codigo, $persona_datolaboral_aportejubilatorio_codigo, $log_01, $log_03);
        $datReferenJSON = setPersonaDatoRefencia('C', $work04, $persona_cuenta, 0, $persona_datoreferencia_contacto1_nombre, $persona_datoreferencia_contacto1_parentesco, $persona_datoreferencia_contacto1_telefono, $persona_datoreferencia_contacto2_nombre, $persona_datoreferencia_contacto2_parentesco, $persona_datoreferencia_contacto2_telefono, $persona_datoreferencia_contacto3_nombre, $persona_datoreferencia_contacto3_parentesco, $persona_datoreferencia_contacto3_telefono, $log_01, $log_03);
        $allJSON        = array_merge(json_decode($cuentaJSON[1], true), json_decode($datPersonalJSON[1], true), json_decode($datLaboralJSON[1], true), json_decode($datReferenJSON[1], true));

        $solicJSON  = setOperacionSolicitud('C', $work04, $persona_cuenta, 0, $solicitud_parentesco, $solicitud_tipooperacion_codigo, $solicitud_medio_codigo, $solicitud_campanha_codigo, $solicitud_formapago_codigo, $solicitud_tipooperador_codigo, $solicitud_banca_codigo, $solicitud_garante_codigo, $solicitud_monto, $solicitud_plazo, $solicitud_primer_vencimiento, $solicitud_estadooperacion_codigo, $log_01, $solicitud_ejecutivoventa_codigo, $solicitud_banco_codigo, $solicitud_banco_tipo, $solicitud_banco_cuenta, $solicitud_cuota_dinamica, $solicitud_documento_adjunto, $solicitud_tiposolicitud_codigo, $allJSON, $log_04, $log_01, $log_03);
        $code       = intval($solicJSON[0]['code']);
        $msg        = str_replace("\n", ' ', $solicJSON[0]['message']);
        $persona_cuenta = 0;
    }

    header('Location: ../../'.$work03.'cuenta='.$persona_cuenta.'&code='.$code.'&msg='.$msg);

	ob_end_flush();
?>