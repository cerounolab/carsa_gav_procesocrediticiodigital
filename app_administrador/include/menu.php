            <header class="main-header">
				<div class="d-flex align-items-center logo-box justify-content-start">
					<a href="./../public/home.php" class="logo">
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
                    <div class="app-menu">
                        <ul class="header-megamenu nav">
                            <li class="btn-group nav-item">
				                <a href="#" class="waves-effect waves-light nav-link push-btn btn-primary-light" data-toggle="push-menu" role="button">
					                <i data-feather="menu"></i>
			                    </a>
			                </li>

                            <li class="btn-group d-lg-inline-flex d-none">
                                <div class="app-menu">
                                    <div class="search-bx mx-5">
                                        <form>
                                            <div class="input-group">
                                                <input type="search" class="form-control" placeholder="Buscar">
                                                <div class="input-group-append">
                                                    <button class="btn" type="submit" id="button-addon3"><i class="icon-Search"><span class="path1"></span><span class="path2"></span></i></button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </li>
                        </ul> 
                    </div>
					
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
                                <a href="#" class="waves-effect waves-light dropdown-toggle w-auto l-h-12 bg-transparent p-0 no-shadow" data-bs-toggle="dropdown" title="<?php //echo $usu_02.' '.$usu_03; ?>">
                                    <img src="./../images/avatar/avatar-13.png" class="avatar rounded bg-primary-light" alt="" />
                                </a>

                                <div class="dropdown-menu">
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
		                <div class="multinav-scroll" style="height: 97%;">	
			                <!-- sidebar menu-->
			                <ul class="sidebar-menu" data-widget="tree">				
				                <li>
				                    <a href="./../../admin/public/home.php">
					                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
					                    <span>Dashboard</span>
				                    </a>
				                </li>
                                <!-- 
                                <li>
				                    <a href="./../../admin/public/operacionsolicitud_crud.php">
                                        <i data-feather="edit"></i><span>Alta de Solicitud</span>
                                    </a>
				                </li> -->

                                    <!-- <a href="./../../app_administrador/public/dominio.php">
                                        <i data-feather="edit"></i><span>Parametros</span>
                                    </a> -->
                                <li class="treeview">
                                    <a href="#">
                                        <i data-feather="lock"></i>
                                        <span>Parametros</span>
                                        <span class="pull-right-container">
                                        <i class="fa fa-angle-right pull-right"></i>
                                        </span>
                                    </a>					
				                    <ul class="treeview-menu">	
                                        <li class="treeview">
                                            <a href="#">
                                                <i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i>Usuario
                                                    <i class="fa fa-angle-right pull-right"></i>
                                                </span>
                                            </a>
                                            <ul class="treeview-menu">
                                                <li><a href="./../public/dominio.php?dominio=ADMUSUARIOESTADO"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i>Usuario Estado</a></li>                                            
                                            </ul>
                                        </li>

                                        <li class="treeview">
                                            <a href="#">
                                            <i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i>Empresa
                                                <span class="pull-right-container">
                                                    <i class="fa fa-angle-right pull-right"></i>
                                                </span>
                                            </a>
                                            <ul class="treeview-menu">                                               
                                                <li><a href="./../public/dominio.php?dominio=ADMEMPRESAESTADO"><span class="path1"></span><span class="path2"></span></i>Empresa Estado</a></li>
                                                
                                                <li><a href="./../public/dominio.php?dominio=ADMEMPRESARUBRO"><span class="path1"></span><span class="path2"></span></i>Empresa Rubro</a></li>
                                                
                                                <li><a href="./../public/dominio.php?dominio=ADMEMPRESAACCESO"><span class="path1"></span><span class="path2"></span></i>Empresa Acceso</a></li>
                                            </ul>
                                        </li>

                                        <li class="treeview">
                                            <a href="#">
                                                <i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i>Sucursal
                                                <span class="pull-right-container">
                                                    <i class="fa fa-angle-right pull-right"></i>
                                                </span>
                                            </a>
                                            <ul class="treeview-menu">                                                

                                            <li><a href="./../public/dominio.php?dominio=ADMSUCURSALESTADO"><span class="path1"></span><span class="path2"></span></i>Sucursal Estado</a></li>
                                                <li><a href="./../public/dominio.php?dominio=ADMSUCURSALTIPO"><span class="path1"></span><span class="path2"></span></i>Sucursal Tipo</a></li>
                                            </ul>
                                        </li>

                                        <li class="treeview">
                                            <a href="#">
                                                <i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i>Rol
                                                <span class="pull-right-container">
                                                    <i class="fa fa-angle-right pull-right"></i>
                                                </span>
                                            </a>
                                            <ul class="treeview-menu">                                                
                                                <li><a href="./../public/dominio.php?dominio=ADMROLESTADO"><span class="path1"></span><span class="path2"></span></i>Rol Estado</a></li>                                            
                                            </ul>
                                        </li>

                                        <li class="treeview">
                                            <a href="#">
                                                <i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i>Campaña
                                                <span class="pull-right-container">
                                                    <i class="fa fa-angle-right pull-right"></i>
                                                </span>
                                            </a>
                                            <ul class="treeview-menu">                                                
                                                <li><a href="./../public/dominio.php?dominio=ADMCAMPANHAESTADO"><span class="path1"></span><span class="path2"></span></i>Campaña Estado</a></li>                                            
                                                <li><a href="./../public/dominio.php?dominio=ADMCAMPANHATIPO"><span class="path1"></span><span class="path2"></span></i>Campaña Tipo</a></li>                                            
                                            </ul>
                                        </li>
                                        
                                    </ul>
                                </li>

                                <li class="treeview">
                                    <a href="#">
                                        <i data-feather="edit"></i>
                                        <span>Empresa</span>
                                        <span class="pull-right-container">
                                        <i class="fa fa-angle-right pull-right"></i>
                                        </span>
                                    </a>
                                    <ul class="treeview-menu">
                                        <li><a href="./../public/empresa.php"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i>Alta Empresa</a></li>
                                        <li><a href="./../public/sucursal.php"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i>Alta Sucursal</a></li>
                                    </ul>
                                </li>

                                <li class="treeview">
                                    <a href="#">
                                        <i data-feather="pie-chart"></i>
                                        <span>Usuario</span>
                                        <span class="pull-right-container">
                                        <i class="fa fa-angle-right pull-right"></i>
                                        </span>
                                    </a>
                                    <ul class="treeview-menu">
                                        <li><a href="./../public/usuario.php"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i>Usuario</a></li>
                                        <!-- <li><a href="./../public/sucursal.php"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i>Alta Sucursal</a></li> -->
                                    </ul>
                                </li>

                                <li class="treeview">
                                    <a href="#">
                                        <i data-feather="grid"></i>
                                        <span>Rol</span>
                                        <span class="pull-right-container">
                                        <i class="fa fa-angle-right pull-right"></i>
                                        </span>
                                    </a>
                                    <ul class="treeview-menu">
                                        <li><a href="./../public/rol.php"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i>Rol</a></li>
                                        <!-- <li><a href="./../public/sucursal.php"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i>Alta Sucursal</a></li> -->
                                    </ul>
                                </li>

                                <li class="treeview">
                                    <a href="#">
                                        <i data-feather="grid"></i>
                                        <span>Campaña</span>
                                        <span class="pull-right-container">
                                        <i class="fa fa-angle-right pull-right"></i>
                                        </span>
                                    </a>
                                    <ul class="treeview-menu">
                                        <li><a href="./../public/campanha.php"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i>Campaña</a></li>
                                        <!-- <li><a href="./../public/sucursal.php"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i>Alta Sucursal</a></li> -->
                                    </ul>
                                </li>

                                <li class="treeview">
                                    <a href="#">
                                        <i data-feather="grid"></i>
                                        <span>Formulario</span>
                                        <span class="pull-right-container">
                                        <i class="fa fa-angle-right pull-right"></i>
                                        </span>
                                    </a>
                                    <ul class="treeview-menu">
                                        <li><a href="./../public/formulario.php"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i>Formulario</a></li>
                                        <li><a href="./../public/rolformulario.php"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i>Rol Formulario</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </aside>