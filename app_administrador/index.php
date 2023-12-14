<?php
    require __DIR__.'/vendor/autoload.php';
	
	$dotenv         = Dotenv\Dotenv::createImmutable(__DIR__.'/');
	$dotenv->load();

	$env            = $_ENV['API_ENV'];

	if(!isset($_SESSION)){ 
		session_start(); 
	}

    unset($_SESSION['log_01']);
    unset($_SESSION['log_02']);
    unset($_SESSION['log_03']);
	unset($_SESSION['log_04']);
    
    unset($_SESSION['login_usuario']);
    unset($_SESSION['login_funcionario_codigo']);
    unset($_SESSION['login_funcionario_nombre']);
    unset($_SESSION['login_ejecutivo_codigo']);
    unset($_SESSION['login_cargo_codigo']);
    unset($_SESSION['login_cargo_nombre']);
    unset($_SESSION['login_gerencia_codigo']);
    unset($_SESSION['login_gerencia_nombre']);
    unset($_SESSION['login_departamento_codigo']);
    unset($_SESSION['login_departamento_nombre']);
    unset($_SESSION['login_unidad_codigo']);
    unset($_SESSION['login_unidad_nombre']);
    unset($_SESSION['login_supervision_codigo']);
    unset($_SESSION['login_supervision_nombre']);
    unset($_SESSION['login_foto']);
    unset($_SESSION['login_email']);

    unset($_SESSION['expire']);

	session_unset();
	session_destroy();

	if(isset($_GET['code'])){
        $codeRest       = $_GET['code'];
        $msgRest        = $_GET['msg'];
    } else {
        $codeRest       = 0;
    }
?>
<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="description" content="">
		<meta name="author" content="HOLIX - https://holixpy.com.py">

		<link rel="icon" href="./images/wscheduov1/favicon.png">	
		
		<!-- Vendors Style-->
		<link rel="stylesheet" href="./src/css/vendors_css.css?<?php echo date('YmdHis'); ?>">
		
		<!-- Style -->  
		<link rel="stylesheet" href="./src/css/style.css?<?php echo date('YmdHis'); ?>">
		<link rel="stylesheet" href="./src/css/skin_color.css?<?php echo date('YmdHis'); ?>">	

		<title>.: Proceso Crediticio Digital | C.A.R.S.A. :.</title>
	</head>
	
	<body class="hold-transition theme-primary bg-img" style="background-image: url(./images/wscheduov1/wallpaper.png); background-color: #aacde3;">
		<div class="container h-p100">
			<div class="row align-items-center justify-content-md-center h-p100">	
				<div class="col-12">
					<div class="row justify-content-center g-0">
						<div class="col-lg-5 col-md-5 col-12">
							<div class="bg-white rounded10 shadow-lg">
								<div class="content-top-agile p-20 pb-0">
									<h2 class="text-primary fw-600">Bienvenido a Proceso Crediticio Digital</h2>						
								</div>

								<div class="p-40">
									<form action="./class/session/session_keycloak.php" method="post">
										<div class="form-group">
											<div class="input-group mb-3">
												<span class="input-group-text bg-transparent"><i class="text-fade ti-user"></i></span>
												<input type="text" id="txtUser" name="txtUser" value="" autocomplete="username" class="form-control ps-15 bg-transparent" style="text-transform:uppercase;" placeholder="USUARIO" required>
											</div>
										</div>

										<div class="form-group">
											<div class="input-group mb-3">
												<span class="input-group-text bg-transparent"><i class="text-fade ti-lock"></i></span>
												<input type="password" id="txtPass" name="txtPass" value="" autocomplete="current-password" class="form-control ps-15 bg-transparent" placeholder="CONTRASE&Ntilde;A" required>
											</div>
										</div>

										<div class="row">
											<div class="col-12 text-center">
												<button type="submit" name="submit" class="btn btn-primary w-p100 mt-10"> Iniciar </button>
												<!-- <a href="./public/home.php" type="button" class="btn btn-primary w-p100 mt-10">Iniciar</a> -->
											</div>
										</div>
									</form>
								</div>						
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Vendor JS -->
		<script src="./src/js/vendors.min.js?<?php echo date('YmdHis'); ?>"></script>
		<script src="./src/js/pages/chat-popup.js?<?php echo date('YmdHis'); ?>"></script>
		<!-- <script src="./src/js/chatbot.js"></script> -->

		<script src="./assets/icons/feather-icons/feather.min.js?<?php echo date('YmdHis'); ?>"></script>
		<script src="./assets/vendor_components/jquery-toast-plugin-master/src/jquery.toast.js?<?php echo date('YmdHis'); ?>"></script>

		<script>
			localStorage.clear();

<?php 
	if ($codeRest == 200) {
?>
			$(document).ready(function () {
					$(function() {
							$.toast({
									heading: 'Correcto!',
									text: "<?php echo $msgRest; ?>",
									position: 'top-right',
									loaderBg: '#ff6849',
									icon: 'success',
									hideAfter: 3500,
									stack: 6
							});
					});
			});
<?php
	}

	if (($codeRest == 201) || ($codeRest == 204) || ($codeRest == 400) || ($codeRest == 401) || ($codeRest == 500)) {
?>
			$(document).ready(function () {
				$.toast({
					heading: 'Error!',
					text: "<?php echo $msgRest; ?>",
					position: 'top-right',
					loaderBg: '#ff6849',
					icon: 'error',
					hideAfter: 3500,
					stack: 6
				});
			});
<?php
    }
?>
		</script>
	</body>
</html>