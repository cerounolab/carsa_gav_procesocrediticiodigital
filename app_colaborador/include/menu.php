            <header class="main-header">
				<div class="d-flex align-items-center logo-box justify-content-start">
					<a href="./../public/dashboardv1.php" class="logo">
                        <div class="logo-mini w-40">
			                <span class="light-logo"><img src="./../images/wscheduov1/logo-letter.png" alt="logo"></span>
			                <span class="dark-logo"><img src="./../images/wscheduov1/logo-letter-white.png" alt="logo"></span>
		                </div>                   
                        <div class="logo-lg">
							<span class="light-logo"><img src="./../images/wscheduov1/logoMenu.png" style="height: 50px;" alt="CheDÚO Digital"></span>
			  				<span class="dark-logo"><img src="./../images/wscheduov1/logoMenu.png" style="height: 50px;" alt="CheDÚO Digital"></span>
                        </div>
					</a>	
				</div>

				<nav class="navbar navbar-static-top">
                    <div class="navbar-custom-menu r-side">
                        <ul class="nav navbar-nav">
                            <li class="btn-group d-md-inline-flex d-none">
                                <label class="switch">
                                    <span class="waves-effect skin-toggle waves-light">
                                        <input type="checkbox" data-mainsidebarskin="toggle" id="toggle_left_sidebar_skin">
                                        <span class="switch-on"><i data-feather="moon"></i></span>
                                        <span class="switch-off"><i data-feather="sun"></i></span>
                                    </span>
                                </label>
                            </li>
                            
                            <li class="btn-group nav-item d-xl-inline-flex d-none">
                                <a href="#" data-provide="fullscreen" class="waves-effect waves-light nav-link btn-primary-light svg-bt-icon" title="Full Screen">
                                    <i data-feather="maximize"></i>
                                </a>
                            </li>
                            
                            <li class="btn-group d-xs-inline-flex">
                                <a href="#" class="waves-effect waves-light dropdown-toggle w-auto l-h-12 bg-transparent p-0 no-shadow" data-bs-toggle="dropdown" title="<?php echo $usu_02.' '.$usu_03; ?>">
                                    <img src="./../images/avatar/avatar-13.png" class="avatar rounded bg-primary-light" alt="" />
                                </a>

                                <div class="dropdown-menu">
                                    <h4 class="dropdown-item my-5"><?php echo $usu_03.' '.$usu_04; ?></h4>
                                    <p class="dropdown-item my-5"><?php echo $usu_01; ?></p>
                                    <p class="dropdown-item my-5"><?php echo $usu_07; ?></p>
                                    <p class="dropdown-item my-5"><?php echo $log_03; ?></p>
                                
                                    <a class="dropdown-item my-5" href="./../class/session/session_logout.php"> Cerrar sesi&oacute;n </a>
                                </div>
                            </li>
                        </ul>
                    </div>
				</nav>
			</header>

            <aside class="main-sidebar">
                <!-- sidebar-->
                <section class="sidebar position-relative"> 
	  	            <div class="multinav">
		                <div class="multinav-scroll ps" style="height: 100%;">	
			                <!-- sidebar menu-->


<?php
    $bandMENU = false;
    $menuHTML = '';

    $bandSubMenu01 = false;
    $bandSubMenu02 = false;

    foreach ($seg_01['apps'] as $seg_01Key=>$seg_01Value) {
        $menuACC = trim(strtolower($seg_01Value['tipoFormularioNombre']));
        $menuDSP = trim(strtoupper(strtolower($seg_01Value['rolFormularioAcceso'])));

        if(
            (
                ($menuACC == 'dashboardv1' && $menuDSP == 'S') || 
                ($menuACC == 'operacionsolicitud_crud' && $menuDSP == 'S')
            )
        ) {
            $bandMENU   = true;
        }

        if ($menuACC == 'dashboardv1' && $menuDSP == 'S' && $bandSubMenu01 == false) {
            $bandSubMenu01 = true;
            $menuHTML = $menuHTML.'
                                    <li>
                                        <a href="./../public/dashboardv1.php">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                            <span>Dashboard</span>
                                        </a>
                                    </li> 
                                ';
        }

        if ($menuACC == 'operacionsolicitud_crud' && $menuDSP == 'S' && $bandSubMenu02 == false) {
            $bandSubMenu02 = true;
            $menuHTML = $menuHTML.'
                                    <li>
                                        <a href="./../public/operacionsolicitud_crud.php">
                                            <i data-feather="edit"></i><span>Alta de Solicitud</span>
                                        </a>
                                    </li>    
                                ';
        }

    }

    if ($bandMENU) {
?>
			                <ul class="sidebar-menu tree" data-widget="tree">				
                                <?php echo $menuHTML; ?>
                            </ul>
<?php 
    }
?>
                        </div>
                    </div>
                </section>
            </aside>