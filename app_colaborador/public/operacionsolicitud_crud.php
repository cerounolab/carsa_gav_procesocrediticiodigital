<?php
	require './../class/function/curl_api.php';
	require './../class/function/function.php';
	require './../class/session/session_system.php';
	
	$pageTitle		= 'Alta de Solicitud';
	$pageTitleNav	= 'Solicitud de Operación';

	$solicCuenta	= (isset($_GET['cuenta']) && intval($_GET['cuenta']) > 0) ? $_GET['cuenta'] : 0;
	$cuentaJSON		= ($solicCuenta !== 0) ? get_curl('persona/cuenta/'.$solicCuenta) : [];
	$datosPartJSON	= ($solicCuenta !== 0) ? get_curl('persona/datoparticular/cuenta/'.$solicCuenta.'/codigoactual') : [];
	$datosLabJSON	= ($solicCuenta !== 0) ? get_curl('persona/datolaboral/cuenta/'.$solicCuenta.'/codigoactual') : [];

	$primVencJSON	= get_curl('parametros/parametro/codigo/4001039');
	$fecha_actual	= date('Y-m-d');
	$solicitud_primer_vencimiento_min	= date('Y-m-d', strtotime($fecha_actual.'+30 days'));
	$solicitud_primer_vencimiento_max	= date('Y-m-d', strtotime($fecha_actual.'+60 days'));
	$persona_fecha_nacimiento_min		= date('Y-m-d', strtotime($fecha_actual.'-80 years'));
	$persona_fecha_nacimiento_max		= date('Y-m-d', strtotime($fecha_actual.'-18 years'));
	$persona_documento_fechaemision_min	= date('Y-m-d', strtotime($fecha_actual.'-10 years'));
	$persona_documento_fechaemision_max	= date('Y-m-d', strtotime($fecha_actual));

	if ($primVencJSON['code'] === 200) {
		$parametro_entero_chico				= $primVencJSON['data'][0]['parametro_entero_chico'];
		$parametro_entero_grande			= $primVencJSON['data'][0]['parametro_entero_grande'];
		$solicitud_primer_vencimiento_min	= date('Y-m-d', strtotime($fecha_actual.'+'.$parametro_entero_chico.'days'));
		$solicitud_primer_vencimiento_max	= date('Y-m-d', strtotime($fecha_actual.'+'.$parametro_entero_grande.'days'));
	}

	//CUENTA
	$persona_cuenta						= 0;
	$persona_documento_numero			= '';
	$persona_documento_fechaemision_1	= '2030-12-31';
	$persona_documento_fechaemision_2	= '';
	$persona_nombre_completo			= '';
	$persona_apellido_paterno			= '';
	$persona_apellido_materno			= '';
	$persona_apellido_casada			= '';
	$persona_nombre_primer				= '';
	$persona_nombre_segundo				= '';
	$persona_fecha_nacimiento_1			= '';
	$persona_fecha_nacimiento_2			= '';
	$persona_cliente					= 'NUEVO';
	$tipo_persona_parametro				= 1;
	$tipo_sexo_parametro				= 1;
	$tipo_estadocivil_parametro 		= 1;
	$localidad_pais_codigo				= 586;
	$workModoCuenta						= 'C';
	$persona_cliente_style				= 'background-color:#51ce8a; border-color:#51ce8a; color:#ffffff';
	$form01_submit						= 'Guardar';
	$form01_action						= '../class/crud/operacionsolicitud.php';

	if ($solicCuenta !== 0 && $cuentaJSON['code'] === 200) {
		$persona_cuenta						= $cuentaJSON['data'][0]['persona_cuenta'];
		$persona_documento_numero			= $cuentaJSON['data'][0]['persona_documento_numero'];
		$persona_documento_fechaemision_1	= $cuentaJSON['data'][0]['persona_documento_fechaemision_1'];
		$persona_documento_fechaemision_2	= $cuentaJSON['data'][0]['persona_documento_fechaemision_2'];
		$persona_nombre_completo			= $cuentaJSON['data'][0]['persona_nombre_completo'];
		$persona_apellido_paterno			= $cuentaJSON['data'][0]['persona_apellido_paterno'];
		$persona_apellido_materno			= $cuentaJSON['data'][0]['persona_apellido_materno'];
		$persona_apellido_casada			= $cuentaJSON['data'][0]['persona_apellido_casada'];
		$persona_nombre_primer				= $cuentaJSON['data'][0]['persona_nombre_primer'];
		$persona_nombre_segundo				= $cuentaJSON['data'][0]['persona_nombre_segundo'];
		$persona_fecha_nacimiento_1			= $cuentaJSON['data'][0]['persona_fecha_nacimiento_1'];
		$persona_fecha_nacimiento_2			= $cuentaJSON['data'][0]['persona_fecha_nacimiento_2'];
		$persona_cliente					= $cuentaJSON['data'][0]['persona_cliente'];
		$tipo_persona_parametro				= $cuentaJSON['data'][0]['tipo_persona_parametro'];
		$tipo_sexo_parametro				= $cuentaJSON['data'][0]['tipo_sexo_parametro'];
		$tipo_estadocivil_parametro 		= $cuentaJSON['data'][0]['tipo_estadocivil_parametro'];
		$localidad_pais_codigo				= $cuentaJSON['data'][0]['localidad_pais_codigo'];
		
		$workModoCuenta						= 'U';
		$persona_cliente_style				= ($persona_cliente != 'NUEVO') ? 'background-color:#fec801; border-color:#fec801; color:#ffffff' : $persona_cliente_style;
		$form01_submit						= 'Generar Solicitud';
		$form01_action						= '../class/crud/operacionsolicitud.php';
	}

	//DATOS PARTICULARES
	$persona_datoparticular_localidad_departamento_codigo	= 0;
	$persona_datoparticular_localidad_ciudad_codigo			= 0;
	$persona_datoparticular_localidad_barrio_codigo			= 0;
	$persona_datoparticular_barrio_nombre					= '';
	$persona_datoparticular_tipo_vivienda_parametro			= 0;
	$persona_datoparticular_principal						= '';
	$persona_datoparticular_esquina							= '';
	$persona_datoparticular_casanumero						= 0;
	$persona_datoparticular_telefono1						= '';
	$persona_datoparticular_telefono2						= '';
	$persona_datoparticular_telefonofamiliar				= '';
	$persona_datoparticular_celular1						= '';
	$persona_datoparticular_celular2						= '';
	$persona_datoparticular_celular3						= '';
	$persona_datoparticular_email							= '';

	if ($solicCuenta !== 0 && $datosPartJSON['code'] === 200) {
		$persona_datoparticular_localidad_departamento_codigo	= $datosPartJSON['data'][0]['localidad_departamento_codigo'];
		$persona_datoparticular_localidad_ciudad_codigo			= $datosPartJSON['data'][0]['localidad_ciudad_codigo'];
		$persona_datoparticular_localidad_barrio_codigo			= $datosPartJSON['data'][0]['localidad_barrio_codigo'];
		$persona_datoparticular_barrio_nombre					= $datosPartJSON['data'][0]['localidad_barrio_nombre'];
		$persona_datoparticular_tipo_vivienda_parametro			= $datosPartJSON['data'][0]['tipo_vivienda_parametro'];
		$persona_datoparticular_principal						= $datosPartJSON['data'][0]['persona_datoparticular_principal'];
		$persona_datoparticular_esquina							= $datosPartJSON['data'][0]['persona_datoparticular_esquina'];
		$persona_datoparticular_casanumero						= $datosPartJSON['data'][0]['persona_datoparticular_casanumero'];
		$persona_datoparticular_telefono1						= ($datosPartJSON['data'][0]['persona_datoparticular_telefono1']) ? '0'.$datosPartJSON['data'][0]['persona_datoparticular_telefono1'] : '';
		$persona_datoparticular_telefono2						= ($datosPartJSON['data'][0]['persona_datoparticular_telefono2']) ? '0'.$datosPartJSON['data'][0]['persona_datoparticular_telefono2'] : '';
		$persona_datoparticular_telefonofamiliar				= ($datosPartJSON['data'][0]['persona_datoparticular_telefonofamiliar']) ? '0'.$datosPartJSON['data'][0]['persona_datoparticular_telefonofamiliar'] : '';
		$persona_datoparticular_celular1						= ($datosPartJSON['data'][0]['persona_datoparticular_celular1']) ? '0'.$datosPartJSON['data'][0]['persona_datoparticular_celular1'] : '';
		$persona_datoparticular_celular2						= ($datosPartJSON['data'][0]['persona_datoparticular_celular2']) ? '0'.$datosPartJSON['data'][0]['persona_datoparticular_celular2'] : '';
		$persona_datoparticular_celular3						= ($datosPartJSON['data'][0]['persona_datoparticular_celular3']) ? '0'.$datosPartJSON['data'][0]['persona_datoparticular_celular3'] : '';
		$persona_datoparticular_email							= $datosPartJSON['data'][0]['persona_datoparticular_email'];
	}

	//DATOS LABORALES
	$persona_datolaboral_localidad_departamento_codigo		= 0;
	$persona_datolaboral_localidad_ciudad_codigo			= 0;
	$persona_datolaboral_localidad_barrio_codigo			= 0;
	$persona_datolaboral_barrio_nombre						= '';
	$persona_datolaboral_empresa_codigo						= 0;
	$persona_datolaboral_cargo_codigo						= 0;
	$persona_datolaboral_empresa							= '';
	$persona_datolaboral_principal							= '';
	$persona_datolaboral_esquina							= '';
	$persona_datolaboral_casanumero							= 0;
	$persona_datolaboral_fechaingreso						= '';
	$persona_datolaboral_salario							= 0;
	$persona_datolaboral_email								= '';
	$persona_datolaboral_telefono1							= '';
	$persona_datolaboral_telefono2							= '';
	$persona_datolaboral_telefono3							= '';
	$persona_datolaboral_interno							= 0;
	$persona_datolaboral_hora_desde							= '08:00';
	$persona_datolaboral_hora_hasta							= '18:00';
	$persona_datolaboral_diacobro							= 30;
	$persona_datolaboral_dialunes							= 'checked';
	$persona_datolaboral_diamartes							= 'checked';
	$persona_datolaboral_diamiercoles						= 'checked';
	$persona_datolaboral_diajueves							= 'checked';
	$persona_datolaboral_diaviernes							= 'checked';
	$persona_datolaboral_diasabado							= '';
	$persona_datolaboral_diadomingo							= '';
	$persona_datolaboral_actividad_codigo					= 0;
	$persona_datolaboral_profesion_codigo					= 9999;
	$persona_datolaboral_area_codigo						= 0;
	$persona_datolaboral_forma_pago_codigo					= 0;
	$persona_datolaboral_banco_codigo						= 0;

	if ($solicCuenta !== 0 && $datosLabJSON['code'] === 200) {
		$persona_datolaboral_localidad_departamento_codigo		= $datosLabJSON['data'][0]['localidad_departamento_codigo'];
		$persona_datolaboral_localidad_ciudad_codigo			= $datosLabJSON['data'][0]['localidad_ciudad_codigo'];
		$persona_datolaboral_localidad_barrio_codigo			= $datosLabJSON['data'][0]['localidad_barrio_codigo'];
		$persona_datolaboral_barrio_nombre						= $datosLabJSON['data'][0]['localidad_barrio_nombre'];

		$persona_datolaboral_empresa_codigo						= $datosLabJSON['data'][0]['empresa_codigo'];
		$persona_datolaboral_cargo_codigo						= $datosLabJSON['data'][0]['cargo_codigo'];
		$persona_datolaboral_empresa							= $datosLabJSON['data'][0]['persona_datolaboral_empresa'];
		$persona_datolaboral_principal							= $datosLabJSON['data'][0]['persona_datolaboral_principal'];
		$persona_datolaboral_esquina							= $datosLabJSON['data'][0]['persona_datolaboral_esquina'];
		$persona_datolaboral_casanumero							= $datosLabJSON['data'][0]['persona_datolaboral_casanumero'];
		$persona_datolaboral_fechaingreso						= $datosLabJSON['data'][0]['persona_datolaboral_fechaingreso_2'];
		$persona_datolaboral_salario							= $datosLabJSON['data'][0]['persona_datolaboral_salario'];
		$persona_datolaboral_email								= $datosLabJSON['data'][0]['persona_datolaboral_email'];
		$persona_datolaboral_telefono1							= ($datosLabJSON['data'][0]['persona_datolaboral_telefono1']) ? '0'.$datosLabJSON['data'][0]['persona_datolaboral_telefono1'] : '';
		$persona_datolaboral_telefono2							= ($datosLabJSON['data'][0]['persona_datolaboral_telefono2']) ? '0'.$datosLabJSON['data'][0]['persona_datolaboral_telefono2'] : '';
		$persona_datolaboral_telefono3							= ($datosLabJSON['data'][0]['persona_datolaboral_telefono3']) ? '0'.$datosLabJSON['data'][0]['persona_datolaboral_telefono3'] : '';
		$persona_datolaboral_interno							= $datosLabJSON['data'][0]['persona_datolaboral_interno'];
		$persona_datolaboral_hora_desde							= $datosLabJSON['data'][0]['persona_datolaboral_hora_desde'];
		$persona_datolaboral_hora_hasta							= $datosLabJSON['data'][0]['persona_datolaboral_hora_hasta'];
		$persona_datolaboral_diacobro							= $datosLabJSON['data'][0]['persona_datolaboral_diacobro'];
		$persona_datolaboral_dialunes							= ($datosLabJSON['data'][0]['persona_datolaboral_dialunes'] != '') ? 'checked' : $datosLabJSON['data'][0]['persona_datolaboral_dialunes'];
		$persona_datolaboral_diamartes							= ($datosLabJSON['data'][0]['persona_datolaboral_diamartes'] != '') ? 'checked' : $datosLabJSON['data'][0]['persona_datolaboral_diamartes'];
		$persona_datolaboral_diamiercoles						= ($datosLabJSON['data'][0]['persona_datolaboral_diamiercoles'] != '') ? 'checked' : $datosLabJSON['data'][0]['persona_datolaboral_diamiercoles'];
		$persona_datolaboral_diajueves							= ($datosLabJSON['data'][0]['persona_datolaboral_diajueves'] != '') ? 'checked' : $datosLabJSON['data'][0]['persona_datolaboral_diajueves'];
		$persona_datolaboral_diaviernes							= ($datosLabJSON['data'][0]['persona_datolaboral_diaviernes'] != '') ? 'checked' : $datosLabJSON['data'][0]['persona_datolaboral_diaviernes'];
		$persona_datolaboral_diasabado							= ($datosLabJSON['data'][0]['persona_datolaboral_diasabado'] != '') ? 'checked' : $datosLabJSON['data'][0]['persona_datolaboral_diasabado'];
		$persona_datolaboral_diadomingo							= ($datosLabJSON['data'][0]['persona_datolaboral_diadomingo'] != '') ? 'checked' : $datosLabJSON['data'][0]['persona_datolaboral_diadomingo'];
		$persona_datolaboral_actividad_codigo					= $datosLabJSON['data'][0]['actividad_codigo'];
		$persona_datolaboral_profesion_codigo					= $datosLabJSON['data'][0]['profesion_codigo'];
		$persona_datolaboral_area_codigo						= $datosLabJSON['data'][0]['area_codigo'];
		$persona_datolaboral_forma_pago_codigo					= $datosLabJSON['data'][0]['forma_pago_codigo'];
		$persona_datolaboral_banco_codigo						= $datosLabJSON['data'][0]['banco_codigo'];
	}

	//DATOS REFERENCIAS
	$persona_datoreferencia_contacto1_nombre				= '';
	$persona_datoreferencia_contacto1_parentesco			= '';
	$persona_datoreferencia_contacto1_telefono				= '';
	$persona_datoreferencia_contacto2_nombre				= '';
	$persona_datoreferencia_contacto2_parentesco			= '';
	$persona_datoreferencia_contacto2_telefono				= '';
	$persona_datoreferencia_contacto3_nombre				= '';
	$persona_datoreferencia_contacto3_parentesco			= '';
	$persona_datoreferencia_contacto3_telefono				= '';

	//SOLICITUD OPERACION
	$solicitud_monto										= 0;
	$solicitud_plazo										= 1;
	$solicitud_cuota_importe								= 0;
	$solicitud_formapago_codigo								= 2;
	$solicitud_banco_codigo									= 0;
	$solicitud_banco_tipo									= 0;
	$solicitud_primer_vencimiento							= '';
	$solicitud_banco_cuenta									= '';
?>
<!DOCTYPE html>
<html lang="es">
	<head>
<?php
	include './../include/header.php';
?>

	</head>

    <body class="light-skin sidebar-mini theme-primary fixed">
		<div class="wrapper">
			<div id="loader"></div>

<?php
	include './../include/menu.php';
?>

			<div class="content-wrapper">
				<div class="container-full">
					<div class="content-header">
						<div class="d-flex align-items-center">
							<div class="me-auto">
								<h4 class="page-title"> <?php echo $pageTitle; ?> </h4>
								<div class="d-inline-block align-items-center">
									<nav>
										<ol class="breadcrumb">
											<li class="breadcrumb-item"><a href="./../public/dashboardv1.php"><i class="mdi mdi-home-outline"></i> Dashboard </a></li>
											<li class="breadcrumb-item active" aria-current="page"> <?php echo $pageTitleNav; ?> </li>
										</ol>
									</nav>
								</div>
							</div>		
						</div>
					</div>

					<section class="content">
                        <!-- ContentInit -->
						<div class="row">			  
							<div class="col-lg-12 col-12">
								<div class="box">
									<form method="post" action="<?php echo $form01_action; ?>" enctype="multipart/form-data" class="validation-wizard wizard-circle form">
										<div class="form-group">
											<input id="workCodigo"										name="workCodigo"										class="form-control" type="hidden" value="<?php echo $solicCuenta; ?>" />
											<input id="workModo"										name="workModo"											class="form-control" type="hidden" value="C" />
											<input id="workPage"										name="workPage"											class="form-control" type="hidden" value="public/operacionsolicitud_crud.php?" />
											<input id="workAction"										name="workAction"										class="form-control" type="hidden" value="1" />
											<input id="workTasa"										name="workTasa"											class="form-control" type="hidden" value="6"/>
											<input id="workPlazo"										name="workPlazo"										class="form-control" type="hidden" value="6"/>
											<input id="tipo_persona_parametro"							name="tipo_persona_parametro"							class="form-control" type="hidden" value="<?php echo $tipo_persona_parametro; ?>"/>
											<input id="persona_documento_fechaemision"					name="persona_documento_fechaemision"					class="form-control" type="hidden" value="<?php echo $persona_documento_fechaemision_1; ?>" />
											<input id="persona_datoparticular_tipo_vivienda_parametro"	name="persona_datoparticular_tipo_vivienda_parametro"	class="form-control" type="hidden" value="<?php echo $persona_datoparticular_tipo_vivienda_parametro; ?>" />
											<input id="persona_datoparticular_telefonofamiliar"			name="persona_datoparticular_telefonofamiliar"			class="form-control" type="hidden" value="<?php echo $persona_datoparticular_telefonofamiliar; ?>" />
											<input id="persona_datolaboral_profesion_codigo"			name="persona_datolaboral_profesion_codigo"				class="form-control" type="hidden" value="<?php echo $persona_datolaboral_profesion_codigo; ?>" />
											<input id="persona_datolaboral_actividad_codigo"			name="persona_datolaboral_actividad_codigo"				class="form-control" type="hidden" value="<?php echo $persona_datolaboral_actividad_codigo; ?>" />
											<input id="persona_datolaboral_area_codigo"					name="persona_datolaboral_area_codigo"					class="form-control" type="hidden" value="<?php echo $persona_datolaboral_area_codigo; ?>" />
											<input id="persona_datolaboral_barrio_nombre"				name="persona_datolaboral_barrio_nombre"				class="form-control" type="hidden" value="<?php echo $persona_datolaboral_barrio_nombre; ?>" />
											<input id="persona_datolaboral_interno"						name="persona_datolaboral_interno"						class="form-control" type="hidden" value="<?php echo $persona_datolaboral_interno; ?>" />
											<input id="persona_datolaboral_email"						name="persona_datolaboral_email"						class="form-control" type="hidden" value="<?php echo $persona_datolaboral_email; ?>" />
											<input id="persona_datolaboral_fechaingreso"				name="persona_datolaboral_fechaingreso"					class="form-control" type="hidden" value="<?php echo $persona_datolaboral_fechaingreso; ?>" />
											<input id="persona_datolaboral_hora_desde"					name="persona_datolaboral_hora_desde"					class="form-control" type="hidden" value="<?php echo $persona_datolaboral_hora_desde; ?>" />
											<input id="persona_datolaboral_hora_hasta"					name="persona_datolaboral_hora_hasta"					class="form-control" type="hidden" value="<?php echo $persona_datolaboral_hora_hasta; ?>" />
											<input id="persona_datolaboral_dialunes"					name="persona_datolaboral_dialunes"						class="form-control" type="hidden" value="<?php echo $persona_datolaboral_dialunes; ?>" />
											<input id="persona_datolaboral_diamartes"					name="persona_datolaboral_diamartes"					class="form-control" type="hidden" value="<?php echo $persona_datolaboral_diamartes; ?>" />
											<input id="persona_datolaboral_diamiercoles"				name="persona_datolaboral_diamiercoles"					class="form-control" type="hidden" value="<?php echo $persona_datolaboral_diamiercoles; ?>" />
											<input id="persona_datolaboral_diajueves"					name="persona_datolaboral_diajueves"					class="form-control" type="hidden" value="<?php echo $persona_datolaboral_diajueves; ?>" />
											<input id="persona_datolaboral_diaviernes"					name="persona_datolaboral_diaviernes"					class="form-control" type="hidden" value="<?php echo $persona_datolaboral_diaviernes; ?>" />
											<input id="persona_datolaboral_diasabado"					name="persona_datolaboral_diasabado"					class="form-control" type="hidden" value="<?php echo $persona_datolaboral_diasabado; ?>" />
											<input id="persona_datolaboral_diadomingo"					name="persona_datolaboral_diadomingo"					class="form-control" type="hidden" value="<?php echo $persona_datolaboral_diadomingo; ?>" />
											<input id="persona_datoreferencia_contacto1_nombre"			name="persona_datoreferencia_contacto1_nombre"			class="form-control" type="hidden" value="<?php echo $persona_datoreferencia_contacto1_nombre; ?>" />
											<input id="persona_datoreferencia_contacto1_parentesco"		name="persona_datoreferencia_contacto1_parentesco"		class="form-control" type="hidden" value="<?php echo $persona_datoreferencia_contacto1_parentesco; ?>" />
											<input id="persona_datoreferencia_contacto1_telefono"		name="persona_datoreferencia_contacto1_telefono"		class="form-control" type="hidden" value="<?php echo $persona_datoreferencia_contacto1_telefono; ?>" />
											<input id="persona_datoreferencia_contacto2_nombre"			name="persona_datoreferencia_contacto2_nombre"			class="form-control" type="hidden" value="<?php echo $persona_datoreferencia_contacto2_nombre; ?>" />
											<input id="persona_datoreferencia_contacto2_parentesco"		name="persona_datoreferencia_contacto2_parentesco"		class="form-control" type="hidden" value="<?php echo $persona_datoreferencia_contacto2_parentesco; ?>" />
											<input id="persona_datoreferencia_contacto2_telefono"		name="persona_datoreferencia_contacto2_telefono"		class="form-control" type="hidden" value="<?php echo $persona_datoreferencia_contacto2_telefono; ?>" />
											<input id="persona_datoreferencia_contacto3_nombre"			name="persona_datoreferencia_contacto3_nombre"			class="form-control" type="hidden" value="<?php echo $persona_datoreferencia_contacto3_nombre; ?>" />
											<input id="persona_datoreferencia_contacto3_parentesco"		name="persona_datoreferencia_contacto3_parentesco"		class="form-control" type="hidden" value="<?php echo $persona_datoreferencia_contacto3_parentesco; ?>" />
											<input id="persona_datoreferencia_contacto3_telefono"		name="persona_datoreferencia_contacto3_telefono"		class="form-control" type="hidden" value="<?php echo $persona_datoreferencia_contacto3_telefono; ?>" />
										</div>

										<div class="box-body">
											<h4 class="box-title text-primary mb-0"><i class="ti-settings me-15"></i> Persona </h4>
											
											<hr class="my-15">
											
											<div class="row">
												<div class="col-md-3">
													<div class="form-group">
														<label class="form-label">Cliente</label>
														<input type="text" id="persona_cliente" name="persona_cliente" value="<?php echo $persona_cliente; ?>" class="form-control" style="<?php echo $persona_cliente_style; ?>" readonly />
													</div>
												</div>

												<div class="col-md-3">
													<div class="form-group">
														<label class="form-label">N&uacute;mero de Cuenta</label>
														<input type="text" id="persona_cuenta" name="persona_cuenta" value="<?php echo $persona_cuenta; ?>" class="form-control" readonly />
													</div>
												</div>

												<div class="col-md-6">
													<div class="form-group">
													</div>
												</div>

												<div class="col-md-3">
													<div class="form-group">
														<label class="form-label">Documento <span class="text-danger">*</span></label>
														<input type="text" id="persona_documento_numero" name="persona_documento_numero" value="<?php echo $persona_documento_numero; ?>" onblur="validarDocumento(); this.reportValidity();" class="form-control required" required />
													</div>
												</div>
<!--
												<div class="col-md-3" style="display:none;">
													<div class="form-group">
														<label class="form-label">Tipo</label>
														<select id="tipo_persona_parametro" name="tipo_persona_parametro" onblur="this.reportValidity()" class="form-select select2">
															<option selected disabled>--- Seleccionar ---</option>
															<optgroup label="Seleccionar"></optgroup>
														</select> 
													</div>
												</div>

												<div class="col-md-3" style="display:none;">
													<div class="form-group">
														<label class="form-label">Fecha Emisi&oacute;n C.I.</label>
														<input type="date" id="persona_documento_fechaemision" name="persona_documento_fechaemision" value="<?php //echo $persona_documento_fechaemision_1; ?>" min="<?php //echo $persona_documento_fechaemision_min; ?>" max="<?php //echo $persona_documento_fechaemision_max; ?>" onblur="this.reportValidity()" class="form-control" />
													</div>
												</div>
-->
												<div class="col-md-3">
													<div class="form-group">
														<label class="form-label">Fecha Nacimiento <span class="text-danger">*</span></label>
														<input type="date" id="persona_fecha_nacimiento" name="persona_fecha_nacimiento" value="<?php echo $persona_fecha_nacimiento_1; ?>" min="<?php echo $persona_fecha_nacimiento_min; ?>" max="<?php echo $persona_fecha_nacimiento_max; ?>" onblur="this.reportValidity()" class="form-control required" required />
													</div>
												</div>

												<div class="col-md-3">
													<div class="form-group">
														<label class="form-label">Sexo <span class="text-danger">*</span></label>
														<select id="tipo_sexo_parametro" name="tipo_sexo_parametro" onblur="this.reportValidity()" class="form-select select2 required" required>
															<option selected disabled>--- Seleccionar ---</option>
															<optgroup label="Seleccionar"></optgroup>
														</select> 
													</div>
												</div>

												<div class="col-md-3">
													<div class="form-group">
														<label class="form-label">Estado Civil <span class="text-danger">*</span></label>
														<select id="tipo_estadocivil_parametro" name="tipo_estadocivil_parametro" onblur="this.reportValidity()" class="form-select select2 required" required>
															<option selected disabled>--- Seleccionar ---</option>
															<optgroup label="Seleccionar"></optgroup>
														</select> 
													</div>
												</div>

												<div class="col-md-3">
													<div class="form-group">
														<label class="form-label">Primer Nombre <span class="text-danger">*</span></label>
														<input type="text" id="persona_nombre_primer" name="persona_nombre_primer" value="<?php echo $persona_nombre_primer; ?>" onblur="this.reportValidity()" class="form-control required" required />
													</div>
												</div>

												<div class="col-md-3">
													<div class="form-group">
														<label class="form-label">Segundo Nombre</label>
														<input type="text" id="persona_nombre_segundo" name="persona_nombre_segundo" value="<?php echo $persona_nombre_segundo; ?>" class="form-control" />
													</div>
												</div>

												<div class="col-md-3">
													<div class="form-group">
														<label class="form-label">Primer Apellido <span class="text-danger">*</span></label>
														<input type="text" id="persona_apellido_paterno" name="persona_apellido_paterno" value="<?php echo $persona_apellido_paterno; ?>" onblur="this.reportValidity()" class="form-control required" required />
													</div>
												</div>

												<div class="col-md-3">
													<div class="form-group">
														<label class="form-label">Segundo Apellido</label>
														<input type="text" id="persona_apellido_materno" name="persona_apellido_materno" value="<?php echo $persona_apellido_materno; ?>" class="form-control" />
													</div>
												</div>

												<div class="col-md-3">
													<div class="form-group">
														<label class="form-label">Apellido Casada</label>
														<input type="text" id="persona_apellido_casada" name="persona_apellido_casada" value="<?php echo $persona_apellido_casada; ?>" class="form-control" />
													</div>
												</div>

												<div class="col-md-3">
													<div class="form-group">
														<label class="form-label">Nacionalidad <span class="text-danger">*</span></label>
														<select id="localidad_pais_codigo" name="localidad_pais_codigo" onblur="this.reportValidity()" class="form-select select2 required" required>
															<option selected disabled>--- Seleccionar ---</option>
															<optgroup label="Seleccionar"></optgroup>
														</select> 
													</div>
												</div>
											</div>
<?php
	if ($solicCuenta !== 0) {
?>
											<h4 class="box-title text-primary mb-0 mt-20"><i class="ti-settings me-15"></i> Datos Particulares</h4>
											
											<hr class="my-15">

											<div class="row">
												<div class="col-md-4">
													<div class="form-group">
														<label class="form-label">Departamento <span class="text-danger">*</span></label>
														<select id="persona_datoparticular_localidad_departamento_codigo" name="persona_datoparticular_localidad_departamento_codigo" onchange="selectLocalidadCiudad('persona_datoparticular_localidad_ciudad_codigo', 'persona_datoparticular_localidad_departamento_codigo', 0, 1, 0);" onblur="this.reportValidity()" class="form-select select2 required" required>
															<option selected disabled>--- Seleccionar ---</option>
															<optgroup label="Seleccionar"></optgroup>
														</select>
													</div>
												</div>

												<div class="col-md-4">
													<div class="form-group">
														<label class="form-label">Ciudad <span class="text-danger">*</span></label>
														<select id="persona_datoparticular_localidad_ciudad_codigo" name="persona_datoparticular_localidad_ciudad_codigo" onchange="selectLocalidadBarrio('persona_datoparticular_localidad_barrio_codigo', 'persona_datoparticular_localidad_departamento_codigo', 'persona_datoparticular_localidad_ciudad_codigo', 0, 1, 0);" onblur="this.reportValidity()" class="form-select select2 required" required>
															<option selected disabled>--- Seleccionar ---</option>
															<optgroup label="Seleccionar"></optgroup>
														</select>
													</div>
												</div>

												<div class="col-md-4">
													<div class="form-group">
														<label class="form-label">Barrio </label>
														<select id="persona_datoparticular_localidad_barrio_codigo" name="persona_datoparticular_localidad_barrio_codigo" class="form-select select2">
															<option selected disabled>--- Seleccionar ---</option>
															<optgroup label="Seleccionar"></optgroup>
														</select>
													</div>
												</div>
<!--
												<div class="col-md-12">
													<div class="form-group">
														<label class="form-label">Barrio </label>
														<input type="text" id="persona_datoparticular_barrio_nombre" name="persona_datoparticular_barrio_nombre" value="<?php //echo $persona_datoparticular_barrio_nombre; ?>" class="form-control" />
													</div>
												</div>
-->
												<div class="col-md-4">
													<div class="form-group">
														<label class="form-label">Calle Principal <span class="text-danger">*</span></label>
														<input type="text" id="persona_datoparticular_principal" name="persona_datoparticular_principal" value="<?php echo $persona_datoparticular_principal; ?>" onblur="this.reportValidity()" class="form-control required" required />
													</div>
												</div>

												<div class="col-md-4">
													<div class="form-group">
														<label class="form-label">Calle Esquina <span class="text-danger">*</span></label>
														<input type="text" id="persona_datoparticular_esquina" name="persona_datoparticular_esquina" value="<?php echo $persona_datoparticular_esquina; ?>" onblur="this.reportValidity()" class="form-control required" required />
													</div>
												</div>
<!--
												<div class="col-md-2">
													<div class="form-group">
														<label class="form-label">Vivienda <span class="text-danger">*</span></label>
														<select id="persona_datoparticular_tipo_vivienda_parametro" name="persona_datoparticular_tipo_vivienda_parametro" onblur="this.reportValidity()" class="form-select select2 required" required>
															<option selected disabled>--- Seleccionar ---</option>
															<optgroup label="Seleccionar"></optgroup>
														</select> 
													</div>
												</div>
-->
												<div class="col-md-4">
													<div class="form-group">
														<label class="form-label">Nro. Casa </label>
														<input type="text" id="persona_datoparticular_casanumero" name="persona_datoparticular_casanumero" value="<?php echo $persona_datoparticular_casanumero; ?>" class="form-control" />
													</div>
												</div>

												<div class="col-md-4">
													<div class="form-group">
														<label class="form-label">Telf. Principal </label>
														<input type="text" id="persona_datoparticular_telefono1" name="persona_datoparticular_telefono1" value="<?php echo $persona_datoparticular_telefono1; ?>" minlength="13" maxlength="13" data-inputmask="'mask':[ '(999) 999-999']" data-mask class="form-control" />
													</div>
												</div>

												<div class="col-md-4">
													<div class="form-group">
														<label class="form-label">Telf. Opcional 2 </label>
														<input type="text" id="persona_datoparticular_telefono2" name="persona_datoparticular_telefono2" value="<?php echo $persona_datoparticular_telefono2; ?>" minlength="13" maxlength="13" data-inputmask="'mask':[ '(999) 999-999']" data-mask class="form-control" />
													</div>
												</div>
<!--
												<div class="col-md-4">
													<div class="form-group">
														<label class="form-label">Telf. Familiar </label>
														<input type="text" id="persona_datoparticular_telefonofamiliar" name="persona_datoparticular_telefonofamiliar" value="<?php //echo $persona_datoparticular_telefonofamiliar; ?>" minlength="13" maxlength="13" data-inputmask="'mask':[ '(999) 999-999']" data-mask class="form-control" />
													</div>
												</div>
-->
												<div class="col-md-4">
													<div class="form-group">
														<label class="form-label">Celular Principal <span class="text-danger">*</span></label>
														<input type="text" id="persona_datoparticular_celular1" name="persona_datoparticular_celular1" value="<?php echo $persona_datoparticular_celular1; ?>" minlength="14" maxlength="14" data-inputmask="'mask':[ '(9999) 999-999']" data-mask onblur="this.reportValidity()" class="form-control required" required>
													</div>
												</div>

												<div class="col-md-4">
													<div class="form-group">
														<label class="form-label">Celular Opcional 2 </label>
														<input type="text" id="persona_datoparticular_celular2" name="persona_datoparticular_celular2" value="<?php echo $persona_datoparticular_celular2; ?>" minlength="14" maxlength="14" data-inputmask="'mask':[ '(9999) 999-999']" data-mask class="form-control" />
													</div>
												</div>

												<div class="col-md-4">
													<div class="form-group">
														<label class="form-label">Celular Opcional 3 </label>
														<input type="text" id="persona_datoparticular_celular3" name="persona_datoparticular_celular3" value="<?php echo $persona_datoparticular_celular3; ?>" minlength="14" maxlength="14" data-inputmask="'mask':[ '(9999) 999-999']" data-mask class="form-control" />
													</div>
												</div>

												<div class="col-md-4">
													<div class="form-group">
														<label class="form-label">Correo Electr&oacute;nico </label>
														<input type="email" id="persona_datoparticular_email" name="persona_datoparticular_email" value="<?php echo $persona_datoparticular_email; ?>" onblur="this.reportValidity()" class="form-control" />
													</div>
												</div>
											</div>

											<h4 class="box-title text-primary mb-0 mt-20"><i class="ti-settings me-15"></i> Datos Laborales</h4>
											
											<hr class="my-15">

											<div class="row">
												<div class="col-md-4">
													<div class="form-group">
														<label class="form-label">Empresa </label>
														<select id="persona_datolaboral_empresa_codigo" name="persona_datolaboral_empresa_codigo" class="form-select select2">
														</select>
													</div>
												</div>

												<div class="col-md-4">
													<div class="form-group">
														<label class="form-label">Cargo <span class="text-danger">*</span></label>
														<select id="persona_datolaboral_cargo_codigo" name="persona_datolaboral_cargo_codigo" onblur="this.reportValidity()" class="form-select select2 required" required>
															<option selected disabled>--- Seleccionar ---</option>
															<optgroup label="Seleccionar"></optgroup>
														</select>
													</div>
												</div>
<!--
												<div class="col-md-3">
													<div class="form-group">
														<label class="form-label">Profesi&oacute;n</label>
														<select id="persona_datolaboral_profesion_codigo" name="persona_datolaboral_profesion_codigo" class="form-select select2">
															<option selected disabled>--- Seleccionar ---</option>
															<optgroup label="Seleccionar"></optgroup>
														</select>
													</div>
												</div>
-->
												<div class="col-md-4">
													<div class="form-group">
														<label class="form-label">Salario Mensual <span class="text-danger">*</span></label>
														<input type="number" id="persona_datolaboral_salario" name="persona_datolaboral_salario" value="<?php echo $persona_datolaboral_salario; ?>" onblur="this.reportValidity()" class="form-control required" required />
													</div>
												</div>
<!--
												<div class="col-md-3">
													<div class="form-group">
														<label class="form-label">Actividad </label>
														<select id="persona_datolaboral_actividad_codigo" name="persona_datolaboral_actividad_codigo" class="form-select select2">
															<option selected disabled>--- Seleccionar ---</option>
															<optgroup label="Seleccionar"></optgroup>
														</select>
													</div>
												</div>
-->
<!--
												<div class="col-md-3">
													<div class="form-group">
														<label class="form-label">&Aacute;rea </label>
														<select id="persona_datolaboral_area_codigo" name="persona_datolaboral_area_codigo" class="form-select select2">
															<option selected disabled>--- Seleccionar ---</option>
															<optgroup label="Seleccionar"></optgroup>
														</select>
													</div>
												</div>
-->
												<div class="col-md-12">
													<div class="form-group">
													</div>
												</div>

												<div class="col-md-4">
													<div class="form-group">
														<label class="form-label">Departamento <span class="text-danger">*</span></label>
														<select id="persona_datolaboral_localidad_departamento_codigo" name="persona_datolaboral_localidad_departamento_codigo" onchange="selectLocalidadCiudad('persona_datolaboral_localidad_ciudad_codigo', 'persona_datolaboral_localidad_departamento_codigo', 0, 1, 0);" onblur="this.reportValidity()" class="form-select select2 required" required>
															<option selected disabled>--- Seleccionar ---</option>
															<optgroup label="Seleccionar"></optgroup>
														</select>
													</div>
												</div>

												<div class="col-md-4">
													<div class="form-group">
														<label class="form-label">Ciudad <span class="text-danger">*</span></label>
														<select id="persona_datolaboral_localidad_ciudad_codigo" name="persona_datolaboral_localidad_ciudad_codigo" onchange="selectLocalidadBarrio('persona_datolaboral_localidad_barrio_codigo', 'persona_datolaboral_localidad_departamento_codigo', 'persona_datolaboral_localidad_ciudad_codigo', 0, 1, 0);" onblur="this.reportValidity()" class="form-select select2 required" required>
															<option selected disabled>--- Seleccionar ---</option>
															<optgroup label="Seleccionar"></optgroup>
														</select>
													</div>
												</div>

												<div class="col-md-4">
													<div class="form-group">
														<label class="form-label">Barrio </label>
														<select id="persona_datolaboral_localidad_barrio_codigo" name="persona_datolaboral_localidad_barrio_codigo" class="form-select select2">
															<option selected disabled>--- Seleccionar ---</option>
															<optgroup label="Seleccionar"></optgroup>
														</select>
													</div>
												</div>
<!--
												<div class="col-md-3">
													<div class="form-group">
														<label class="form-label">Barrio </label>
														<input type="text" id="persona_datolaboral_barrio_nombre" name="persona_datolaboral_barrio_nombre" value="<?php //echo $persona_datolaboral_barrio_nombre; ?>" class="form-control" />
													</div>
												</div>
-->
												<div class="col-md-4">
													<div class="form-group">
														<label class="form-label">Calle Principal <span class="text-danger">*</span></label>
														<input type="text" id="persona_datolaboral_principal" name="persona_datolaboral_principal" value="<?php echo $persona_datolaboral_principal; ?>" onblur="this.reportValidity()" class="form-control required" required />
													</div>
												</div>

												<div class="col-md-4">
													<div class="form-group">
														<label class="form-label">Calle Esquina <span class="text-danger">*</span></label>
														<input type="text" id="persona_datolaboral_esquina" name="persona_datolaboral_esquina" value="<?php echo $persona_datolaboral_esquina; ?>" onblur="this.reportValidity()" class="form-control required" required />
													</div>
												</div>

												<div class="col-md-4">
													<div class="form-group">
														<label class="form-label">Nro. Casa </label>
														<input type="text" id="persona_datolaboral_casanumero" name="persona_datolaboral_casanumero" value="<?php echo $persona_datolaboral_casanumero; ?>" class="form-control" />
													</div>
												</div>

												<div class="col-md-12">
													<div class="form-group">
													</div>
												</div>

												<div class="col-md-4">
													<div class="form-group">
														<label class="form-label">Telf. Principal <span class="text-danger">*</span></label>
														<input type="text" id="persona_datolaboral_telefono1" name="persona_datolaboral_telefono1" value="<?php echo $persona_datolaboral_telefono1; ?>" minlength="13" maxlength="13" data-inputmask="'mask':[ '(999) 999-999']" data-mask onblur="this.reportValidity()" class="form-control required" required />
													</div>
												</div>

												<div class="col-md-4">
													<div class="form-group">
														<label class="form-label">Telf. Opcional 1 </label>
														<input type="text" id="persona_datolaboral_telefono2" name="persona_datolaboral_telefono2" value="<?php echo $persona_datolaboral_telefono2; ?>" minlength="13" maxlength="13" data-inputmask="'mask':[ '(999) 999-999']" data-mask class="form-control" />
													</div>
												</div>

												<div class="col-md-4">
													<div class="form-group">
														<label class="form-label">Telf. Opcional 2 </label>
														<input type="text" id="persona_datolaboral_telefono3" name="persona_datolaboral_telefono3" value="<?php echo $persona_datolaboral_telefono3; ?>" minlength="13" maxlength="13" data-inputmask="'mask':[ '(999) 999-999']" data-mask class="form-control" />
													</div>
												</div>
<!--
												<div class="col-md-3">
													<div class="form-group">
														<label class="form-label">Interno </label>
														<input type="number" id="persona_datolaboral_interno" name="persona_datolaboral_interno" value="<?php //echo $persona_datolaboral_interno; ?>" class="form-control" />
													</div>
												</div>
-->
<!--
												<div class="col-md-3">
													<div class="form-group">
														<label class="form-label">Correo Electr&oacute;nico </label>
														<input type="email" id="persona_datolaboral_email" name="persona_datolaboral_email" value="<?php //echo $persona_datolaboral_email; ?>" onblur="this.reportValidity()" class="form-control" />
													</div>
												</div>
-->
<!--
												<div class="col-md-3">
													<div class="form-group">
														<label class="form-label">Fecha Ingreso </label>
														<input type="date" id="persona_datolaboral_fechaingreso" name="persona_datolaboral_fechaingreso" value="<?php //echo $persona_datolaboral_fechaingreso; ?>" class="form-control" />
													</div>
												</div>
-->
<!--
												<div class="col-md-3">
													<div class="form-group">
														<label class="form-label">Horario Laboral Desde </label>
														<input type="time" id="persona_datolaboral_hora_desde" name="persona_datolaboral_hora_desde" value="<?php //echo $persona_datolaboral_hora_desde; ?>" class="form-control" />
													</div>
												</div>
-->
<!--
												<div class="col-md-3">
													<div class="form-group">
														<label class="form-label">Horario Laboral Hasta </label>
														<input type="time" id="persona_datolaboral_hora_hasta" name="persona_datolaboral_hora_hasta" value="<?php //echo $persona_datolaboral_hora_hasta; ?>" class="form-control" />
													</div>
												</div>
-->
<!--
												<label class="form-label">D&iacute;as Laborales </label>
												<div class="demo-checkbox">
													<input type="checkbox" id="persona_datolaboral_dialunes" name="persona_datolaboral_dialunes" value="Lunes" <?php //echo $persona_datolaboral_dialunes; ?> />
													<label for="persona_datolaboral_dialunes">Lunes</label>

													<input type="checkbox" id="persona_datolaboral_diamartes" name="persona_datolaboral_diamartes" value="Martes" <?php //echo $persona_datolaboral_diamartes; ?> />
													<label for="persona_datolaboral_diamartes">Martes</label>

													<input type="checkbox" id="persona_datolaboral_diamiercoles" name="persona_datolaboral_diamiercoles" value="Miercoles" <?php //echo $persona_datolaboral_diamiercoles; ?> />
													<label for="persona_datolaboral_diamiercoles">Mi&eacute;rcoles</label>

													<input type="checkbox" id="persona_datolaboral_diajueves" name="persona_datolaboral_diajueves" value="Jueves" <?php //echo $persona_datolaboral_diajueves; ?> />
													<label for="persona_datolaboral_diajueves">Jueves</label>

													<input type="checkbox" id="persona_datolaboral_diaviernes" name="persona_datolaboral_diaviernes" value="Viernes" <?php //echo $persona_datolaboral_diaviernes; ?> />
													<label for="persona_datolaboral_diaviernes">Viernes</label>

													<input type="checkbox" id="persona_datolaboral_diasabado" name="persona_datolaboral_diasabado" value="Sabado" <?php //echo $persona_datolaboral_diasabado; ?> />
													<label for="persona_datolaboral_diasabado">S&aacute;bado</label>

													<input type="checkbox" id="persona_datolaboral_diadomingo" name="persona_datolaboral_diadomingo" value="Domingo" <?php //echo $persona_datolaboral_diadomingo; ?> />
													<label for="persona_datolaboral_diadomingo">Domingo</label>
												</div>
-->
												<div class="col-md-4">
													<div class="form-group">
														<label class="form-label">Forma de Acreditaci&oacute;n <span class="text-danger">*</span></label>
														<select id="persona_datolaboral_forma_pago_codigo" name="persona_datolaboral_forma_pago_codigo" class="form-select select2 required" required>
															<option selected disabled>--- Seleccionar ---</option>
															<optgroup label="Seleccionar"></optgroup>
														</select>
													</div>
												</div>

												<div class="col-md-4">
													<div class="form-group">
														<label class="form-label">Entidad de Acreditaci&oacute;n </label>
														<select id="persona_datolaboral_banco_codigo" name="persona_datolaboral_banco_codigo" class="form-select select2">
															<option selected disabled>--- Seleccionar ---</option>
															<optgroup label="Seleccionar"></optgroup>
														</select>
													</div>
												</div>

												<div class="col-md-4">
													<div class="form-group">
														<label class="form-label">D&iacute;a de Acreditaci&oacute;n	</label>
														<input type="number" id="persona_datolaboral_diacobro" name="persona_datolaboral_diacobro" value="<?php echo $persona_datolaboral_diacobro; ?>" min="0" max="31" class="form-control" />
													</div>
												</div>
											</div>
<!--
											<h4 class="box-title text-primary mb-0 mt-20"><i class="ti-settings me-15"></i> Datos Referencias Personales </h4>
											
											<hr class="my-15">

											<div class="row">
												<div class="col-md-6">
													<div class="form-group">
														<label class="form-label"> Ref. 1 - Nombre y Apellido <span class="text-danger">*</span></label>
														<input type="text" id="persona_datoreferencia_contacto1_nombre" name="persona_datoreferencia_contacto1_nombre" value="<?php //echo $persona_datoreferencia_contacto1_nombre; ?>" onblur="this.reportValidity()" class="form-control required" required />
													</div>
												</div>

												<div class="col-md-3">
													<div class="form-group">
														<label class="form-label"> Parentesco <span class="text-danger">*</span></label>
														<input type="text" id="persona_datoreferencia_contacto1_parentesco" name="persona_datoreferencia_contacto1_parentesco" value="<?php //echo $persona_datoreferencia_contacto1_parentesco; ?>" onblur="this.reportValidity()" class="form-control required" required />
													</div>
												</div>

												<div class="col-md-3">
													<div class="form-group">
														<label class="form-label"> Telf. <span class="text-danger">*</span></label>
														<input type="text" id="persona_datoreferencia_contacto1_telefono" name="persona_datoreferencia_contacto1_telefono" value="<?php //echo $persona_datoreferencia_contacto1_telefono; ?>" minlength="14" maxlength="14" data-inputmask="'mask':[ '(9999) 999-999']" data-mask onblur="this.reportValidity()" class="form-control required" required />
													</div>
												</div>

												<div class="col-md-6">
													<div class="form-group">
														<label class="form-label"> Ref. 2 - Nombre y Apellido <span class="text-danger">*</span></label>
														<input type="text" id="persona_datoreferencia_contacto2_nombre" name="persona_datoreferencia_contacto2_nombre" value="<?php //echo $persona_datoreferencia_contacto2_nombre; ?>" onblur="this.reportValidity()" class="form-control required" required />
													</div>
												</div>

												<div class="col-md-3">
													<div class="form-group">
														<label class="form-label"> Parentesco <span class="text-danger">*</span></label>
														<input type="text" id="persona_datoreferencia_contacto2_parentesco" name="persona_datoreferencia_contacto2_parentesco" value="<?php //echo $persona_datoreferencia_contacto2_parentesco; ?>" onblur="this.reportValidity()" class="form-control required" required />
													</div>
												</div>

												<div class="col-md-3">
													<div class="form-group">
														<label class="form-label"> Telf. <span class="text-danger">*</span></label>
														<input type="text" id="persona_datoreferencia_contacto2_telefono" name="persona_datoreferencia_contacto2_telefono" value="<?php //echo $persona_datoreferencia_contacto2_telefono; ?>" minlength="14" maxlength="14" data-inputmask="'mask':[ '(9999) 999-999']" data-mask onblur="this.reportValidity()" class="form-control required" required />
													</div>
												</div>

												<div class="col-md-6">
													<div class="form-group">
														<label class="form-label"> Ref. 3 - Nombre y Apellido </label>
														<input type="text" id="persona_datoreferencia_contacto3_nombre" name="persona_datoreferencia_contacto3_nombre" value="<?php //echo $persona_datoreferencia_contacto3_nombre; ?>" class="form-control" />
													</div>
												</div>

												<div class="col-md-3">
													<div class="form-group">
														<label class="form-label"> Parentesco </label>
														<input type="text" id="persona_datoreferencia_contacto3_parentesco" name="persona_datoreferencia_contacto3_parentesco" value="<?php //echo $persona_datoreferencia_contacto3_parentesco; ?>" class="form-control"  />
													</div>
												</div>

												<div class="col-md-3">
													<div class="form-group">
														<label class="form-label"> Telf. </label>
														<input type="text" id="persona_datoreferencia_contacto3_telefono" name="persona_datoreferencia_contacto3_telefono" value="<?php //echo $persona_datoreferencia_contacto3_telefono; ?>" minlength="14" maxlength="14" data-inputmask="'mask':[ '(9999) 999-999']" data-mask class="form-control" />
													</div>
												</div>
											</div>
-->
											<h4 class="box-title text-primary mb-0 mt-20"><i class="ti-settings me-15"></i> Solicitud de Cr&eacute;dito</h4>
											
											<hr class="my-15">

											<div class="row">
												<div class="col-md-3">
													<div class="form-group">
														<label class="form-label">Monto Solicitado <span class="text-danger">*</span></label>
														<input type="text" id="solicitud_monto" name="solicitud_monto" value="<?php echo $solicitud_monto; ?>" onblur="changeTextToInt(this.id); calcpago(); this.reportValidity();" class="form-control required" required />
													</div>
												</div>

												<div class="col-md-3">
													<div class="form-group">
														<label class="form-label">Plazo <span class="text-danger">*</span></label>
														<select id="solicitud_plazo" name="solicitud_plazo" onchange="validarTasa(); calcpago();" onblur="this.reportValidity()" class="form-select select2 required" required>
															<option selected disabled>--- Seleccionar ---</option>
															<optgroup label="Seleccionar"></optgroup>
														</select>
													</div>
												</div>

												<div class="col-md-3">
													<div class="form-group">
														<label class="form-label">Cuota Aproximada <span class="text-danger">*</span></label>
														<input type="text" id="solicitud_cuota_importe" name="solicitud_cuota_importe" value="<?php echo $solicitud_cuota_importe; ?>" class="form-control required" required readonly />
													</div>
												</div>

												<div class="col-md-3">
													<div class="form-group">
														<label class="form-label">Primer Vencimiento <span class="text-danger">*</span></label>
														<input type="date" id="solicitud_primer_vencimiento" name="solicitud_primer_vencimiento" value="<?php echo $solicitud_primer_vencimiento; ?>" min="<?php echo $solicitud_primer_vencimiento_min; ?>" max="<?php echo $solicitud_primer_vencimiento_max; ?>" onblur="this.reportValidity()" class="form-control required" required />
													</div>
												</div>

												<div class="col-md-3">
													<div class="form-group">
														<label class="form-label">Forma de Pago <span class="text-danger">*</span></label>
														<select id="solicitud_formapago_codigo" name="solicitud_formapago_codigo" onchange="viewInput(this.id);" onblur="this.reportValidity()" class="form-select select2 required" required>
															<option selected disabled>--- Seleccionar ---</option>
															<optgroup label="Seleccionar"></optgroup>
														</select>
													</div>
												</div>

												<div class="col-md-3" id="col_solicitud_banco_codigo">
													<div class="form-group">
														<label class="form-label">Banco </label>
														<select id="solicitud_banco_codigo" name="solicitud_banco_codigo" class="form-select select2">
															<option selected disabled>--- Seleccionar ---</option>
															<optgroup label="Seleccionar"></optgroup>
														</select>
													</div>
												</div>

												<div class="col-md-3" id="col_solicitud_banco_tipo">
													<div class="form-group">
														<label class="form-label">Tipo de Cuenta </label>
														<select id="solicitud_banco_tipo" name="solicitud_banco_tipo" class="form-select select2">
															<option selected disabled>--- Seleccionar ---</option>
															<optgroup label="Seleccionar"></optgroup>
														</select>
													</div>
												</div>

												<div class="col-md-3" id="col_solicitud_banco_cuenta">
													<div class="form-group">
														<label class="form-label">N&uacute;mero de Cuenta </label>
														<input type="text" id="solicitud_banco_cuenta" name="solicitud_banco_cuenta" value="<?php echo $solicitud_banco_cuenta; ?>" class="form-control" />
													</div>
												</div>
											</div>
<?php
	}
?>
										</div>

										<div class="box-footer">
											<button type="button" id="btnCancel" name="btnCancel" class="btn btn-primary-light me-1"><i class="ti-trash"></i> Cancelar </button>
											<button type="submit" id="btnSubmit" name="btnSubmit" class="btn btn-primary"><i class="ti-save-alt"></i> <?php echo $form01_submit; ?> </button>
										</div>  
									</form>
								</div>	
							</div>
						</div>
                        <!-- ContentEnd -->
                    </section>
				</div>
			</div>
		</div>

		<footer class="main-footer">			
<?php
	include './../include/development.php';
?>

		</footer>

<?php
	include './../include/footer.php';
?>

		<script>
			const _parm01BASE = '<?php echo $log_01; ?>';
			const _parm02BASE = '<?php echo date('Y-m-d'); ?>';
			const _parm03BASE = '<?php echo $log_03; ?>';
			const _parm04BASE = 'public/operacionsolicitud_crud.php?';
			const _parm05BASE = '<?php echo $usu_04; ?>';
		</script>

		<script src="./../js/operacionsolicitud.js?<?php echo date('Ymd');?>"></script>

		<script>
			//selectDominio('tipo_persona_parametro', 'WSCHEDUOPERSONATIPO', 0, 1, <?php //echo $tipo_persona_parametro; ?>);
			selectDominio('tipo_sexo_parametro', 'WSCHEDUOPERSONASEXO', 0, 1, <?php echo $tipo_sexo_parametro; ?>);
			selectDominio('tipo_estadocivil_parametro', 'WSCHEDUOPERSONAESTADOCIVIL', 0, 1, <?php echo $tipo_estadocivil_parametro; ?>);
			selectLocalidadPais('localidad_pais_codigo', null, 0, 1, <?php echo $localidad_pais_codigo; ?>);
<?php
	if ($solicCuenta !== 0) {
?>
			selectLocalidadDepto('persona_datoparticular_localidad_departamento_codigo', null, 0, 1, <?php echo $persona_datoparticular_localidad_departamento_codigo; ?>);
			selectLocalidadCiudad('persona_datoparticular_localidad_ciudad_codigo', 'persona_datoparticular_localidad_departamento_codigo', 0, 1, <?php echo $persona_datoparticular_localidad_ciudad_codigo; ?>);
			selectLocalidadBarrio('persona_datoparticular_localidad_barrio_codigo', 'persona_datoparticular_localidad_departamento_codigo', 'persona_datoparticular_localidad_ciudad_codigo', 0, 1, <?php echo $persona_datoparticular_localidad_barrio_codigo; ?>);
			//selectDominio('persona_datoparticular_tipo_vivienda_parametro', 'WSCHEDUOPERSONAVIVIENDA', 0, 1, <?php //echo $persona_datoparticular_tipo_vivienda_parametro; ?>);

			selectLocalidadDepto('persona_datolaboral_localidad_departamento_codigo', null, 0, 1, <?php echo $persona_datolaboral_localidad_departamento_codigo; ?>);
			selectLocalidadCiudad('persona_datolaboral_localidad_ciudad_codigo', 'persona_datolaboral_localidad_departamento_codigo', 0, 1, <?php echo $persona_datolaboral_localidad_ciudad_codigo; ?>);
			selectLocalidadBarrio('persona_datolaboral_localidad_barrio_codigo', 'persona_datolaboral_localidad_departamento_codigo', 'persona_datolaboral_localidad_ciudad_codigo', 0, 1, <?php echo $persona_datolaboral_localidad_barrio_codigo; ?>);
			selectCargo('persona_datolaboral_cargo_codigo', null, 0, 1, <?php echo $persona_datolaboral_cargo_codigo;?>);
			//selectProfesion('persona_datolaboral_profesion_codigo', null, 0, 1, <?php //echo $persona_datolaboral_profesion_codigo;?>);
			//selectActividad('persona_datolaboral_actividad_codigo', null, 0, 1, <?php //echo $persona_datolaboral_actividad_codigo;?>);
			//selectArea('persona_datolaboral_area_codigo', null, 0, 1, <?php //echo $persona_datolaboral_area_codigo;?>);
			selectFormaPago('persona_datolaboral_forma_pago_codigo', null, 0, 1, <?php echo $persona_datolaboral_forma_pago_codigo;?>);
			selectBancoSalario('persona_datolaboral_banco_codigo', null, 0, 1, <?php echo $persona_datolaboral_banco_codigo;?>);

			selectDominio('solicitud_plazo', 'WSCHEDUOSOLICITUDCUOTA', 0, 1, <?php echo $solicitud_plazo; ?>);
			selectDominio('solicitud_formapago_codigo', 'WSCHEDUOSOLICITUDFORMAPAGO', 0, 1, <?php echo $solicitud_formapago_codigo; ?>);
			selectBanco('solicitud_banco_codigo', '', 0, 1, <?php echo $solicitud_banco_codigo; ?>);
			selectDominio('solicitud_banco_tipo', 'WSCHEDUOSOLICITUDBANCOCUENTA', 0, 1, <?php echo $solicitud_banco_tipo; ?>);

			validarDocumento();
			validarTasa();

			$(document).ready(function() {
				$('#persona_datolaboral_empresa_codigo').select2({
					ajax: {
						url: xxxURL + '/parametros/empresa/listado',
						delay: 250,
						type: 'GET',
						headers: {
							"Authorization": "Basic " + xxxBASE
						},
						data: function (params) {
							var query = {
								search: params.term,
								type: 'public'
							}
							return query;
						},
						processResults: function (data, params) {
							let xJSON = JSON.parse(data);
							
							let xDATA = $.map(xJSON.data, function(item) {
								if (typeof(item.empresa_codigo) !== "undefined") {
									return ({
										id: item.empresa_codigo,
										text: item.empresa_nombre
									})
								}
							});
							
							if (params.term != undefined) {
								xDATA = xDATA.filter(element => {
									let itemText	= element.text.toString().toUpperCase();
									let	itemFilter	= itemText.search(params.term.toString().toUpperCase());
									return (
										itemFilter == 0 || itemFilter > 0
									);
								});
							}

							return {
								results: xDATA
							};
						},
    					cache: true
					},
					placeholder: "Seleccionar Empresa",
					minimumInputLength: 3,
				});
			});

/*
			$.ajax({
				url: './../files/empresa.json',
				type: 'GET',
				contentType: 'application/json;charset=utf-8',
				dataType: 'json',
			}).then(function (response) {
				let xDATA = $.map(response.data, function(item) {
					if (typeof(item.empresa_codigo) !== "undefined") {
						return ({
							id: item.empresa_codigo,
							text: item.empresa_nombre.toString().toUpperCase()
						})
					}
				});

				$("#persona_datolaboral_empresa_codigo").select2({
					placeholder: "Seleccionar Empresa",
					minimumInputLength: 4,
					delay: 250,
					data: xDATA,
					processResults: function (data, params) {
						console.log(data);
						let xJSON = JSON.parse(data);
						let xDATA = $.map(xJSON.data, function(item) {
							if (typeof(item.empresa_codigo) !== "undefined") {
								return ({
									id: item.empresa_codigo,
									text: item.empresa_nombre
								})
							}
						});
						
						if (params.term != undefined) {
							xDATA = xDATA.filter(element => {
								let itemText	= element.text.toString().toUpperCase();
								let	itemFilter	= itemText.search(params.term);
								return (
									itemFilter == 0 || itemFilter > 0
								);
							});
						}

						return {
							results: xDATA
						};
					}
				});  
			});
*/
<?php
	}
?>
		</script>
	</body>
</html>