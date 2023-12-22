<?php
	require './../class/function/curl_api.php';
	require './../class/function/function.php';
	require './../class/session/session_system.php';
	
	$pageTitle		= 'Inicio';
	$pageTitleNav	= '';

	$dominio01JSON	= get_curl02('parametros/dominio/valor/WSCHEDUOSOLICITUDESTADONIVEL2');
	$dominio02JSON	= get_curl02('parametros/dominio/valor/WSCHEDUOSOLICITUDFORMAPAGO');
?>
<!DOCTYPE html>
<html lang="es">
	<head>
<?php
	include './../include/header.php';
?>

	</head>

    <body class="hold-transition light-skin sidebar-mini theme-primary fixed sidebar-collapse">
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
							<div class="col-xl-3 col-12">
								<div class="box">
									<div class="box-body">
										<form>
											<div class="form-group mb-30">
												<h3 class="fw-500 fs-15 mt-0 mb-20">Fecha de Ingreso</h3>
												<div class="checkbox-list">
													<div class="mb-2">
														<label for="filter_02" class="form-label">Desde</label>
														<input name="filter_02" type="date" id="filter_02" name="filter_02" value="<?php echo date('Y-m-d'); ?>" class="form-control" />
													</div>

													<div class="mb-2">
														<label for="filter_03" class="form-label">Hasta</label>
														<input name="filter_03" type="date" id="filter_03" name="filter_03" value="<?php echo date('Y-m-d'); ?>" class="form-control" />
													</div>
												</div>
											</div>

											<div class="form-group mb-30">
												<h3 class="fw-500 fs-15 mt-0 mb-20">Estados</h3>
												<div class="checkbox-list">
													<div class="mb-2">
														<input name="filter_05" type="radio" id="filter_05_0" value="0" checked>
														<label for="filter_05_0" class="fs-13 fw-400 d-flex justify-content-between text-fade">Todos</label>											
													</div>
<?php
	if ($dominio01JSON['code'] === 200) {
		foreach ($dominio01JSON['data'] as $dominio01KEY => $dominio01VALUE) {
?>
													<div class="mb-2">
														<input type="radio" id="filter_05_<?php echo $dominio01VALUE['tipo_parametro']; ?>" name="filter_05" value="<?php echo $dominio01VALUE['tipo_parametro']; ?>">
														<label for="filter_05_<?php echo $dominio01VALUE['tipo_parametro']; ?>" class="fs-13 fw-400 d-flex justify-content-between text-fade"><?php echo $dominio01VALUE['tipo_nombre']; ?> <span class="ml-auto text-fade font-600"></span></label>											
													</div>
<?php
		}
	}
?>
												</div>
											</div>
											
											<div class="form-group mb-30">
												<h3 class="fw-500 fs-15 mt-0 mb-20">Modalidad de Cobro</h3>
												<div class="checkbox-list">
													<div class="mb-2">
														<input name="filter_04" type="radio" id="filter_04_0" value="0" checked>
														<label for="filter_04_0" class="fs-13 fw-400 d-flex justify-content-between text-fade">Todos</label>											
													</div>
<?php
	if ($dominio02JSON['code'] === 200) {
		foreach ($dominio02JSON['data'] as $dominio02KEY => $dominio02VALUE) {
?>
													<div class="mb-2">
														<input type="radio" id="filter_04_<?php echo $dominio02VALUE['tipo_parametro']; ?>" name="filter_04" value="<?php echo $dominio02VALUE['tipo_parametro']; ?>">
														<label for="filter_04_<?php echo $dominio02VALUE['tipo_parametro']; ?>" class="fs-13 fw-400 d-flex justify-content-between text-fade"><?php echo $dominio02VALUE['tipo_nombre']; ?> <span class="ml-auto text-fade font-600"></span>
														</label>											
													</div>
<?php
		}
	}
?>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>

							<div class="col-xl-9 col-12">
								<div class="box">
									<div class="box-body">
										<div class="table-responsive">
											<table id="tableLoads" class="text-fade table table-bordered display" style="width:100%">
												<thead>
													<tr class="text-dark">
														<th>Estado</th>
														<th>Solicitud</th>
														<th>Operaci&oacute;n</th>
														<th>C.I.</th>
														<th>Cuenta</th>
														<th>Cliente</th>
														<th>Monto Solicitado</th>
														<th>Modalidad de Cobro</th>
														<th>Fecha Ingreso</th>
														<th>Asignado A</th>
														<th>&Uacute;lt. Comentario</th>
													</tr>
												</thead>
											</table>
										</div>
									</div>
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
			const _parm04BASE = 'public/dashboardv1.php?';
			const _parm05BASE = '<?php echo $usu_04; ?>';
		</script>

		<script src="./../js/dashboardv1.js?<?php echo date('Ymd');?>"></script>
	</body>
</html>