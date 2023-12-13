<?php
	require './../class/function/curl_api.php';
	require './../class/function/function.php';
	require './../class/session/session_system.php';
	
	$pageTitle		= 'Sucursal';
	$pageTitleNav	= '';
	$NavTitle		= 'Sucursal';

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
											<li class="breadcrumb-item"><a href="./../public/home.php"><i class="mdi mdi-home-outline"></i> Dashboard </a></li>
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
							<div class="col-xl-12 col-12">
								<div class="box">
									<div class="box-body">
										<div class="row">
											<h4 class="col-10 card-title"> <?php echo $NavTitle; ?> </h4>
											<h4 class="col-2 card-title" style="text-align: right;">
												<a class="btn btn-info" style="background-color:#163562; border-color:#163562;" role="button" onclick="setEmpSucursal(0, 1);" data-bs-toggle="modal" data-bs-target="#modal-dialog" title="Nuevo" aria-hidden="true"><i class="ti-plus"></i> AGREGAR</a>
											</h4>
										</div><br>
									</div>
									<div class="col-xl-12 col-12">
										<div class="box">
											<div class="box-body">
												<div class="table-responsive">
													<table id="tableLoads" class="text-fade table table-bordered display" style="width:100%">
														<thead>
															<tr class="btn-primary" style="text-align:center;">
																<th class="border-top-0">C&Oacute;DIGO</th>
																<th class="border-top-0">ORDEN</th>
																<th class="border-top-0">ESTADO</th>
																<th class="border-top-0">TIPO SUCURSAL</th>
																<th class="border-top-0">EMPRESA</th>
																<th class="border-top-0">NOMBRE</th>
																<th class="border-top-0">TELEFONO</th>
																<th class="border-top-0">CELULAR</th>
																<th class="border-top-0">CORREO</th>
																<th class="border-top-0">UBICACI&Oacute;N</th>
																<th class="border-top-0">DIRECCI&Oacute;N</th>
																<th class="border-top-0">OBSERVACI&Oacute;N</th>
																<th class="border-top-0">USUARIO</th>
																<th class="border-top-0">PROGRAMA</th>
																<th class="border-top-0">IP</th>
																<th class="border-top-0">ACCI&Oacute;N</th>
															</tr>
														</thead>
												</table>
											</div>
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

		<div id="modal-dialog" class="modal fade" role="dialog" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content" id="modal-content">
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
			const _parm01BASE   = '<?php echo trim($usu_01); ?>';
            const _parm02BASE   = '<?php echo date('Y-m-d H:i:s'); ?>';
            const _parm03BASE   = '<?php echo trim($log_03); ?>';
			const _parm04BASE	= 'public/sucursal.php?';
			const _parm05BASE   = '<?php echo trim($usu_05); ?>';
            const _parm06BASE   = <?php echo trim($usu_06); ?>;
		</script>

		<script src="./../js/api.js?<?php echo date('Ymd');?>"></script>
		<script src="./../js/sucursal.js?<?php echo date('Ymd');?>"></script>
		<script src="./../js/select.js?<?php echo date('Ymd');?>"></script>
		

	</body>
</html>