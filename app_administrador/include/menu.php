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
                        <div class="multinav-scroll ps ps--active-y" style="height: 100%;">	
                            <!-- sidebar menu-->
                            <ul class="sidebar-menu tree" data-widget="tree">
                                <li class="treeview">
                                    <a href="./../public/home.php">
                                        <i data-feather="grid"></i>
                                        <span>Dashboard</span>
                                    </a>
                                </li>

                                <li class="treeview">
                                    <a href="#">
                                        <i data-feather="grid"></i>
                                        <span>Parámetros</span>
                                        <span class="pull-right-container">
                                            <i class="fa fa-angle-right pull-right"></i>
                                        </span>
                                    </a>

                                    <ul class="treeview-menu">
                                        <li class="header"> ABM Usuario </li>
                                        <li><a href="./../public/dominio.php?dominio=ADMUSUARIOESTADO"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i> Estado </a></li>
                                        <li><a href="./../public/dominio.php?dominio=ADMUSUARIOROLESTADO"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i> Rol Estado </a></li>                                        
                                        <li><a href="./../public/dominio.php?dominio=ADMUSUARIOCAMPANHAESTADO"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i> Campaña Estado </a></li>
                                        <li><a href="./../public/dominio.php?dominio=ADMUSUARIOFLUJOESTADO"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i> Flujo Estado </a></li>

                                        <li class="header"> ABM Empresa </li>
                                        <li><a href="./../public/dominio.php?dominio=ADMEMPRESAESTADO"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i> Empresa Estado </a></li>
                                        <li><a href="./../public/dominio.php?dominio=ADMEMPRESARUBRO"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i> Empresa Rubro </a></li>
                                        <li><a href="./../public/dominio.php?dominio=ADMEMPRESAACCESO"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i> Empresa Acceso </a></li>
                                        <li><a href="./../public/dominio.php?dominio=ADMSUCURSALESTADO"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i> Sucursal Estado </a></li>
                                        <li><a href="./../public/dominio.php?dominio=ADMSUCURSALTIPO"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i> Sucursal Tipo </a></li>

                                        <li class="header"> ABM Rol </li>                                               
                                        <li><a href="./../public/dominio.php?dominio=ADMROLESTADO"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i> Estado </a></li>                                            

                                        <li class="header"> ABM Campaña </li>                                               
                                        <li><a href="./../public/dominio.php?dominio=ADMCAMPANHAESTADO"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i> Estado </a></li>                                            
                                        <li><a href="./../public/dominio.php?dominio=ADMCAMPANHATIPO"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i> Tipo </a></li>                                            
                                    </ul>
                                </li>

                                <li class="treeview">
                                    <a href="#">
                                        <i data-feather="grid"></i>
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
                                        <i data-feather="grid"></i>
                                        <span>Usuario</span>
                                        <span class="pull-right-container">
                                            <i class="fa fa-angle-right pull-right"></i>
                                        </span>
                                    </a>

                                    <ul class="treeview-menu">
                                        <li><a href="./../public/usuario.php"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i>Usuario</a></li>
                                        <li><a href="./../public/usuarioflujo.php"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i>Usuario Flujo</a></li>
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
                                        <li><a href="./../public/usuariorol.php"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i>Usuario Rol</a></li>
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
                                        <li><a href="./../public/usuarioCampanha.php"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i>Usuario Campaña</a></li>
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