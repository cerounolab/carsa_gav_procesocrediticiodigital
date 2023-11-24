<?php
	require './../class/function/curl_api.php';
	require './../class/function/function.php';
	require './../class/session/session_system.php';
	
	$pageTitle		= 'Inicio';
	$pageTitleNav	= '';

	$dominio01JSON	= get_curl('parametros/dominio/valor/WSCHEDUOSOLICITUDESTADONIVEL2');
	$dominio02JSON	= get_curl('parametros/dominio/valor/WSCHEDUOSOLICITUDFORMAPAGO');
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
							<div class="col-12">
								<div class="box">
									<!-- <div class="row mt-30">
										<div class="col-lg-5 col-12">
											<h3 class="box-title">Your Portfolio</h3>
											<div class="d-flex justify-content-start align-items-center mt-md-20 mt-0">
												<div id="chart01"></div>
												<ul class="list-unstyled">
													<li><span class="badge badge-primary badge-dot me-10"></span> Large Cap Funds</li>
													<li><span class="badge badge-info badge-dot me-10"></span> Diversified Funds</li>
													<li><span class="badge badge-success badge-dot me-10"></span> Debt Funds</li>
												</ul>
											</div>
										</div>
									</div> -->

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
			// const _parm01BASE = '<?php //echo $log_01; ?>';
			// const _parm02BASE = '<?php //echo date('Y-m-d'); ?>';
			// const _parm03BASE = 'czelaya'; //'<?php //echo $log_03; ?>';
			// const _parm04BASE = 'public/dashboardv1.php?';
			// const _parm05BASE = '5151577'; //'<?php //echo $usu_04; ?>';
		</script>

		<!-- <script src="./../js/dashboardv1.js?<?php //echo date('YmdHis');?>"></script> -->
	</body>
</html>