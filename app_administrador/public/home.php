<?php
	require './../class/function/curl_api.php';
	require './../class/function/function.php';
	require './../class/session/session_system.php';

	$pageTitle		= 'Dashboard';
	$pageTitleNav	= 'Dashboard';
	$NavTitle01		= 'Cantidad de Rol por Empresa';
	$NavTitle02		= 'Cantidad de Usuario por Empresa';
	$NavTitle03		= 'Log Usuario';
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
											<!-- <li class="breadcrumb-item active" aria-current="page"> <?php //cho $pageTitleNav; ?> </li> -->
										</ol>
									</nav>
								</div>
							</div>		
						</div>
					</div>

					<section class="content">
                        <!-- ContentInit -->
						<div class="row">
							<div class="col-6">
								<div class="box">
									<div class="box-body">
										<div class="row">
											<h5 class="col-10 card-title"> <?php echo $NavTitle01; ?> </h5>
										</div>
										<div class="table-responsive">
											<table id="tableLoad01" class="text-fade table table-bordered display" style="width:100%">
												<thead>
													<tr class="btn-primary" style="text-align:center;">
														<th class="border-top-0">EMPRESA</th>
														<th class="border-top-0">ROL NOMBRE</th>
														<th class="border-top-0">ROL CANTIDAD</th>
													</tr>
												</thead>
											</table>
										</div>
									</div>
								</div>
							</div>

							<div class="col-6">
								<div class="box">
									<div class="box-body">
										<div class="row">
											<h4 class="col-10 card-title"> <?php echo $NavTitle02; ?> </h4>
										</div>
										<div class="table-responsive">
											<table id="tableLoad02" class="text-fade table table-bordered display" style="width:100%">
												<thead>
													<tr class="btn-primary" style="text-align:center;">
														<th class="border-top-0">EMPRESA</th>
														<th class="border-top-0">USUARIO NOMBRE</th>
														<th class="border-top-0">USUARIO CANTIDAD</th>
												</thead>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-12">
								<div class="box">
									<div class="box-body">
										<div class="row">
											<h4 class="col-10 card-title"> <?php echo $NavTitle03; ?> </h4>
										</div>
										<div class="table-responsive">
											<table id="tableLoad03" class="text-fade table table-bordered display" style="width:100%">
												<thead>
													<tr class="btn-primary" style="text-align:center;">
														<th class="border-top-0" style="width:10%">ESTADO</th>
														<th class="border-top-0" style="width:10%">EMPRESA</th>
														<th class="border-top-0" style="width:10%">USUARIO</th>
														<th class="border-top-0" style="width:10%">FECHA</th>
														<th class="border-top-0" style="width:10%">HOST</th>
														<th class="border-top-0" style="width:15%">AGENT</th>
														<th class="border-top-0" style="width:15%">REFERENCES</th>
														<th class="border-top-0" style="width:10%">AUD. FECHA/HORA</th>
														<th class="border-top-0" style="width:10%">AUD. IP</th>
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
			const _parm01BASE  		= '<?php echo trim($usu_01); ?>';
            const _parm02BASE   	= '<?php echo date('Y-m-d H:i:s'); ?>';
            const _parm03BASE   	= '<?php echo trim($log_03); ?>';
			const _parm04BASE		= 'public/home.php?';
			const _parm05BASE   	= '<?php echo trim($usu_05); ?>';
            const _parm06BASE   	= <?php echo trim($usu_06); ?>;
            const _parm07BASE   	= '<?php echo date('Y-m-d'); ?>';
		</script>
		
		<script src="./../js/home.js?<?php echo date('Ymd');?>"></script>
	</body>
</html>