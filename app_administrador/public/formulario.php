<?php
	require './../class/function/curl_api.php';
	require './../class/function/function.php';
	// require './../class/session/session_system.php';
	
	$pageTitle		= 'Formulario';
	$pageTitleNav	= '';
	$NavTitle		= 'Formulario';

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
												<!-- <a class="btn btn-info" style="background-color:#163562; border-color:#163562;" href="./dominioABM.php?mode=C&codigo=0" role="button" data-toggle="modal" data-target="#modaldiv" title="Nueva Solicitud"><i class="ti-plus"></i>AGREGAR</a> -->
												<!-- <a class="btn btn-info" style="background-color:#163562; border-color:#163562;" id="btn-new-event"  role="button" data-toggle="modal" data-target="#modaldiv" title="Nueva Solicitud"><i class="ti-plus"></i>AGREGAR</a> -->
												<a class="btn btn-info" style="background-color:#163562; border-color:#163562;" role="button" onclick="setFormulario(0, 1);" data-bs-toggle="modal" data-bs-target="#modal-dialog" title="Nuevo Dominio" aria-hidden="true"><i class="ti-plus"></i> AGREGAR</a>

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
																<th class="border-top-0">EMPRESA</th>
																<th class="border-top-0">FORMULARIO</th>
																<th class="border-top-0">OBSERVACI&Oacute;N</th>
																<th class="border-top-0">USUARIO</th>
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
			const _parm04BASE = 'public/formulario.php?';
		</script>

		<script src="./../js/api.js?<?php echo date('Ymd');?>"></script>
		<script src="./../js/formulario.js?<?php echo date('Ymd');?>"></script>
		<script src="./../js/select.js?<?php echo date('Ymd');?>"></script>
		

	</body>
</html>