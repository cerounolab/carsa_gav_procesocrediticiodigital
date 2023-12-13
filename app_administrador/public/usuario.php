<?php
	require './../class/function/curl_api.php';
	require './../class/function/function.php';
	require './../class/session/session_system.php';
	
	$pageTitle		= 'Usuario';
	$pageTitleNav	= '';
	$NavTitle		= 'Usuario';
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
<?php
    if ($priv_insert === 'S'){
?>
												<a class="btn btn-info" style="background-color:#163562; border-color:#163562;" role="button" onclick="setUsuario(0, 1);" data-bs-toggle="modal" data-bs-target="#modal-dialog" title="Nuevo" aria-hidden="true"><i class="ti-plus"></i> AGREGAR</a>
<?php
    }
?>
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
																<th class="border-top-0">SUCURSAL</th>
																<th class="border-top-0">DOCUMENTO</th>
																<th class="border-top-0">NOMBRE</th>
																<th class="border-top-0">APELLIDO</th>
																<th class="border-top-0">USUARIO</th>
																<th class="border-top-0">EMAIL</th>
																<th class="border-top-0">CELULAR</th>
																<th class="border-top-0">OBSERVACI&Oacute;N</th>
																<th class="border-top-0">USUARIO</th>
																<th class="border-top-0">FECHA HORA</th>
																<th class="border-top-0">IP</th>
																<th class="border-top-0" style="width:200px;">ACCI&Oacute;N</th>
															</tr>
														</thead>
													</table>
												</div>
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
			const _parm00DSP    	= '<?php echo trim($priv_display); ?>';
            const _parm00INS    	= '<?php echo trim($priv_insert); ?>';
            const _parm00UPD    	= '<?php echo trim($priv_update); ?>';
            const _parm00DLT    	= '<?php echo trim($priv_delete); ?>';
            const _parm00EXPXLS		= '<?php echo trim($priv_exportXls); ?>';
            const _parm00EXPDF		= '<?php echo trim($priv_exportPdf); ?>';
            const _parm00IMP		= '<?php echo trim($priv_print); ?>';

			const _parm01BASE   	= '<?php echo trim($usu_01); ?>';
            const _parm02BASE   	= '<?php echo date('Y-m-d H:i:s'); ?>';
            const _parm03BASE   	= '<?php echo trim($log_03); ?>';
			const _parm04BASE		= 'public/usuario.php?';
			const _parm05BASE   	= '<?php echo trim($usu_05); ?>';
            const _parm06BASE   	= <?php echo trim($usu_06); ?>;
		</script>

		<script src="./../js/usuario.js?<?php echo date('Ymd');?>"></script>
	</body>
</html>