<?php
	require './../class/function/curl_api.php';
	require './../class/function/function.php';
	require './../class/session/session_system.php';
	
	$pageTitle		= 'Inicio';
	$pageTitleNav	= '';

	if(isset($_GET['dominio'])){
        $valueDominio   = $_GET['dominio'];
		$dataDominio	= getTitleDominio($valueDominio);
		$titleDominio   = $dataDominio[0];
        $groupDominio   = $dataDominio[1];
        $groupParametro = $dataDominio[2];
		$groupSeleccion = $dataDominio[3];
		$headerSubTitle	= '';
    }
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
											<li class="breadcrumb-item active" aria-current="page"> <?php echo $titleDominio; ?> </li>
										</ol>
									</nav>
								</div>
							</div>		
						</div>
					</div>
					<!-- <h1 class="page-header"><?php echo $titleDominio; ?><small><?php echo $headerSubTitle; ?></small></h1> -->

					<section class="content">
                        <!-- ContentInit -->
						<div class="row">
							<div class="col-xl-12 col-12">
								<div class="box">
									<div class="box-body">
										<div class="row">
											<h4 class="col-10 card-title"> <?php echo $titleDominio; ?> </h4>
											<h4 class="col-2 card-title" style="text-align: right;">
<?php
    if ($priv_insert === 'S'){
?>												
												<a class="btn btn-info" style="background-color:#163562; border-color:#163562;" role="button" onclick="setDominio(0, 1);" data-bs-toggle="modal" data-bs-target="#modal-dialog" title="Nuevo Dominio" aria-hidden="true"><i class="ti-plus"></i> AGREGAR</a>
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
														<thead id="tableCodigo" class="<?php echo $valueDominio; ?>">
															<tr class="btn-primary" style="text-align:center;">
																<th >C&Oacute;DIGO</th>
																<th >ORDEN</th>
																<th class="border-top-0">PAR&Aacute;METRO</th>
																<th class="border-top-0">ESTADO</th>
																<th class="border-top-0">NOMBRE</th>
																<th class="border-top-0">ICONO</th>
																<th class="border-top-0">COLOR</th>
																<th class="border-top-0">PATH</th>
																<th class="border-top-0">EQUIVALENCIA</th>
																<th class="border-top-0">DOMINIO</th>
																<th class="border-top-0">OBSERVACI&Oacute;N</th>
																<th class="border-top-0">USUARIO</th>
																<th class="border-top-0">FECHA HORA</th>
																<th class="border-top-0">IP</th>
																<th class="border-top-0" style="width:140px;">ACCI&Oacute;N</th>
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
			const _parm04BASE		= 'public/dominio.php?dominio=<?php echo trim(strtoupper($valueDominio)); ?>&';
			const _parm05BASE   	= '<?php echo trim($usu_05); ?>';
            const _parm06BASE   	= <?php echo trim($usu_06); ?>;
			const _parm07BASE		= '<?php echo trim(strtoupper($valueDominio)); ?>';
            const _parm08BASE		= '<?php echo trim(strtoupper($groupDominio)); ?>';
            const _parm09BASE		= '<?php echo intval($groupParametro); ?>';
			const _parm10BASE		= '<?php echo intval($groupSeleccion); ?>';
		</script>

		<script src="./../js/dominio.js?<?php echo date('Ymd');?>"></script>
	</body>
</html>