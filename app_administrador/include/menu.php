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
                                <a href="#" class="waves-effect waves-light dropdown-toggle w-auto l-h-12 bg-transparent p-0 no-shadow" data-bs-toggle="dropdown" title="">
                                    <img src="./../images/avatar/avatar-13.png" class="avatar rounded bg-primary-light" alt="" />
                                </a>

                                <div class="dropdown-menu">
                                    <div class="dropdown-item my-5">
                                        <h4><?php echo $usu_01; ?></h4>
                                        <p><?php echo $usu_07; ?></p>
                                    </div>
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
                            <ul class="sidebar-menu tree" data-widget="tree">

<?php
    $bandMENU = false;
    $menuHTML = '';

    $bandSubMenu01 = false;
    foreach ($seg_01['apps'] as $seg_01Key=>$seg_01Value) {
        $menuACC = trim(strtolower($seg_01Value['tipoFormularioNombre']));
        $menuDSP = trim(strtoupper(strtolower($seg_01Value['rolFormularioAcceso'])));

        if($menuACC == 'home' && $menuDSP == 'S') {
            $bandMENU   = true;
        }

        if ($menuACC == 'home' && $menuDSP == 'S' && $bandSubMenu01 == false) {
            $bandSubMenu01 = true;
            $menuHTML = $menuHTML.'
                                    <ul class="treeview-menu">
                                        <li><a href="./../public/home.php"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i> Dashboard v1 </a></li>
                                    </ul>';
        }
    }

    if ($bandMENU) {
?>

                                <li class="treeview">
                                    <a href="#">
                                        <i data-feather="grid"></i>
                                        <span>Dashboard</span>
                                        <span class="pull-right-container">
                                            <i class="fa fa-angle-right pull-right"></i>
                                        </span>
                                    </a>

                                    <?php echo $menuHTML; ?>
                                </li>
<?php 
    }

    $bandMENU = false;
    $menuHTML = '';

    $bandSubMenu01 = false;
    $bandSubMenu02 = false;
    $bandSubMenu03 = false;
    $bandSubMenu04 = false;

    foreach ($seg_01['apps'] as $seg_01Key=>$seg_01Value) {
        $menuACC = trim(strtolower($seg_01Value['tipoFormularioNombre']));
        $menuDSP = trim(strtoupper(strtolower($seg_01Value['rolFormularioAcceso'])));

        if(
            (
                ($menuACC == 'empresa' && $menuDSP == 'S') || 
                ($menuACC == 'sucursal' && $menuDSP == 'S') ||
                ($menuACC == 'campanha' && $menuDSP == 'S') ||
                ($menuACC == 'rol' && $menuDSP == 'S')
            )
        ) {
            $bandMENU   = true;
        }

        if ($menuACC == 'empresa' && $menuDSP == 'S' && $bandSubMenu01 == false) {
            $bandSubMenu01 = true;
            $menuHTML = $menuHTML.'
                                    <li><a href="./../public/empresa.php"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i> ABM Empresa </a></li>
                                ';
        }

        if ($menuACC == 'sucursal' && $menuDSP == 'S' && $bandSubMenu02 == false) {
            $bandSubMenu02 = true;
            $menuHTML = $menuHTML.'
                                    <li><a href="./../public/empresa.php"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i> ABM Empresa </a></li>
                                ';
        }

        if ($menuACC == 'campanha' && $menuDSP == 'S' && $bandSubMenu03 == false) {
            $bandSubMenu03 = true;
            $menuHTML = $menuHTML.'
                                    <li><a href="./../public/campanha.php"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i> ABM Campa&ntilde;a </a></li>
                                ';
        }

        if ($menuACC == 'rol' && $menuDSP == 'S' && $bandSubMenu04 == false) {
            $bandSubMenu04 = true;
            $menuHTML = $menuHTML.'
                                    <li><a href="./../public/rol.php"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i> ABM Rol </a></li>
                                ';
        }
    }

    if ($bandMENU) {
?>
                                <li class="treeview">
                                    <a href="#">
                                        <i data-feather="grid"></i>
                                        <span>Empresa</span>
                                        <span class="pull-right-container">
                                            <i class="fa fa-angle-right pull-right"></i>
                                        </span>
                                    </a>

                                    <ul class="treeview-menu">
                                        <?php echo $menuHTML; ?>
                                        <!-- <li><a href="./../public/formulario.php"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i> ABM Formulario </a></li> -->
                                    </ul>
                                </li>
<?php 
    }

    $bandMENU = false;
    $menuHTML = '';

    $bandSubMenu01 = false;
    $bandSubMenu02 = false;
    $bandSubMenu03 = false;
    $bandSubMenu04 = false;
    $bandSubMenu05 = false;


    foreach ($seg_01['apps'] as $seg_01Key=>$seg_01Value) {
        $menuACC = trim(strtolower($seg_01Value['tipoFormularioNombre']));
        $menuDSP = trim(strtoupper(strtolower($seg_01Value['rolFormularioAcceso'])));

        if(
            (
                ($menuACC == 'usuario' && $menuDSP == 'S') || 
                ($menuACC == 'usuariorol' && $menuDSP == 'S') ||
                ($menuACC == 'usuarioflujo' && $menuDSP == 'S') ||
                ($menuACC == 'usuariocampanha' && $menuDSP == 'S')||
                ($menuACC == 'rolformulario' && $menuDSP == 'S')
            )
        ) {
            $bandMENU   = true;
        }

        if ($menuACC == 'usuario' && $menuDSP == 'S' && $bandSubMenu01 == false) {
            $bandSubMenu01 = true;
            $menuHTML = $menuHTML.'
                                    <li><a href="./../public/usuario.php"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i> ABM Usuario </a></li>
                                ';
        }

        if ($menuACC == 'usuariorol' && $menuDSP == 'S' && $bandSubMenu02 == false) {
            $bandSubMenu02 = true;
            $menuHTML = $menuHTML.'
                                    <li><a href="./../public/usuariorol.php"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i> ABM Usuario/Rol </a></li>
                                ';
        }

        if ($menuACC == 'usuarioflujo' && $menuDSP == 'S' && $bandSubMenu03 == false) {
            $bandSubMenu03 = true;
            $menuHTML = $menuHTML.'
                                    <li><a href="./../public/usuarioflujo.php"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i> ABM Usuario/Flujo </a></li>
                                ';
        }

        if ($menuACC == 'usuariocampanha' && $menuDSP == 'S' && $bandSubMenu04 == false) {
            $bandSubMenu04 = true;
            $menuHTML = $menuHTML.'
                                    <li><a href="./../public/usuariocampanha.php"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i> ABM Usuario/Campa&ntilde;a </a></li>
                                ';
        }

        if ($menuACC == 'rolformulario' && $menuDSP == 'S' && $bandSubMenu05 == false) {
            $bandSubMenu05 = true;
            $menuHTML = $menuHTML.'
                                    <li><a href="./../public/rolformulario.php"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i> ABM Rol/Formulario </a></li>
                                ';
        }
    }

    if ($bandMENU) {
?>
                                <li class="treeview">
                                    <a href="#">
                                        <i data-feather="grid"></i>
                                        <span>Usuario</span>
                                        <span class="pull-right-container">
                                            <i class="fa fa-angle-right pull-right"></i>
                                        </span>
                                    </a>

                                    <ul class="treeview-menu">
                                        <?php echo $menuHTML; ?>
                                    </ul>
                                </li>
<?php
    }

    $bandMENU = false;
    $menuHTML = '';

    $bandSubMenu01 = false;
    foreach ($seg_01['apps'] as $seg_01Key=>$seg_01Value) {
        $menuACC = trim(strtolower($seg_01Value['tipoFormularioNombre']));
        $menuDSP = trim(strtoupper(strtolower($seg_01Value['rolFormularioAcceso'])));

        if($menuACC == 'dominio' && $menuDSP == 'S') {
            $bandMENU   = true;
        }

        if ($menuACC == 'dominio' && $menuDSP == 'S' && $bandSubMenu01 == false) {
            $bandSubMenu01 = true;
            $menuHTML = $menuHTML.'
                                        <li class="header"> ABM Empresa </li>
                                        <li><a href="./../public/dominio.php?dominio=ADMEMPRESAESTADO"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i> Empresa Estado </a></li>
                                        <li><a href="./../public/dominio.php?dominio=ADMEMPRESARUBRO"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i> Empresa Rubro </a></li>
                                        <li><a href="./../public/dominio.php?dominio=ADMEMPRESAACCESO"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i> Empresa Acceso </a></li>

                                        <li class="header"> ABM Sucursal </li>
                                        <li><a href="./../public/dominio.php?dominio=ADMSUCURSALESTADO"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i> Sucursal Estado </a></li>
                                        <li><a href="./../public/dominio.php?dominio=ADMSUCURSALTIPO"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i> Sucursal Tipo </a></li>

                                        <li class="header"> ABM Campa&ntilde;a </li>
                                        <li><a href="./../public/dominio.php?dominio=ADMCAMPANHAESTADO"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i> Campa&ntilde;a Estado </a></li>                                            
                                        <li><a href="./../public/dominio.php?dominio=ADMCAMPANHATIPO"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i> Campa&ntilde;a Tipo </a></li>

                                        <li class="header"> ABM Rol </li>
                                        <li><a href="./../public/dominio.php?dominio=ADMROLESTADO"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i> Rol Estado </a></li>
                                        <li><a href="./../public/dominio.php?dominio=ADMROLPLATAFORMATIPO"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i> Plataforma Tipo</a></li>

                                        <li class="header"> ABM Formulario </li>
                                        <li><a href="./../public/dominio.php?dominio=ADMFORMULARIOESTADO"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i> Formulario Estado </a></li> 
                                        <li><a href="./../public/dominio.php?dominio=ADMFORMULARIOTIPO"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i> Formulario Tipo</a></li>

                                        <li class="header"> ABM Usuario </li>
                                        <li><a href="./../public/dominio.php?dominio=ADMUSUARIOESTADO"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i> Usuario Estado </a></li>
                                        <li><a href="./../public/dominio.php?dominio=ADMUSUARIOROLESTADO"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i> Usuario/Rol Estado </a></li>                                        
                                        <li><a href="./../public/dominio.php?dominio=ADMUSUARIOFLUJOESTADO"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i> Usuario/Flujo Estado </a></li>                                       
                                        <li><a href="./../public/dominio.php?dominio=ADMUSUARIOCAMPANHAESTADO"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i> Usuario/Campa&ntilde;a Estado </a></li>

                                        <li class="header"> ABM Rol/Formulario</li>
                                        <li><a href="./../public/dominio.php?dominio=ADMROLFORMULARIOESTADO"><i class="icon-Commit"><span class="path1"></span><span class="path2"></span></i> Rol/Formulario Estado </a></li>
                                    ';
        }
    }

    if ($bandMENU) {
?>
                                <li class="treeview">
                                    <a href="#">
                                        <i data-feather="grid"></i>
                                        <span>Par&aacute;metros</span>
                                        <span class="pull-right-container">
                                            <i class="fa fa-angle-right pull-right"></i>
                                        </span>
                                    </a>

                                    <ul class="treeview-menu">
                                        <?php echo $menuHTML; ?>
                                    </ul>
                                </li>
                            </ul>
<?php
    }
?>
                        </div>
                    </div>
                </section>
            </aside>