<?php
	require './../class/function/curl_api.php';
	require './../class/function/function.php';
	require './../class/session/session_system.php';

	$pageTitle		= '';
	$pageTitleNav	= '';
	$NavTitle		= '';
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
			const _parm04BASE = 'public/template.php?';
			const _parm05BASE = '<?php echo $usu_04; ?>';
		</script>
	</body>
</html>