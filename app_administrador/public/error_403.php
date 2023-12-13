<?php
    require __DIR__.'./../vendor/autoload.php';
        
    $dotenv         = Dotenv\Dotenv::createImmutable(__DIR__.'./../');
    $dotenv->load();

    function getKey() {}
?>

<!DOCTYPE html>
<html lang="es" dir="ltr">
    <head>
<?php
	include './../include/header.php';
?>
    </head>

    <body>
        <!-- ============================================================== -->
        <!-- Preloader - style you can find in spinners.css -->
        <!-- ============================================================== -->
        <div class="preloader">
            <div class="lds-ripple">
                <div class="lds-pos"></div>
                <div class="lds-pos"></div>
            </div>
        </div>
        <!-- ============================================================== -->
        <!-- Main wrapper - style you can find in pages.scss -->
        <!-- ============================================================== -->
        

        <div class="error-box">
            <div class="error-body text-center">
                <h1 class="error-title">403</h1>
                <h3 class="text-uppercase error-subtitle">No tiene permiso para acceder!</h3>
                <p class="text-muted m-t-30 m-b-30">
                </p>
                <h6 class="text-uppercase error-subtitle">Puede contactar a nuestro equipo de soporte t&eacute;cnico.</h6>
            </div>
        </div>

        <div class="chat-windows"></div>
    
<?php
    include './../include/footer.php';
?>
    </body>
</html>