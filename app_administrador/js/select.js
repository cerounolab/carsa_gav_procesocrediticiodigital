function selectDominio(parm01, parm02, parm03, parm04, parm05) {
    var selOption   = document.getElementById(parm01);
    var xJSON       = [];

    while (selOption.length > 0) {
        selOption.remove(0);
    }

    switch (parm03) {
        case 1:
            var option      = document.createElement('option');
            option.value    = '-';
            option.text     = 'SELECCIONAR';
            option.selected = true;
            option.disabled = true;
            selOption.add(option, null);
            break;

        case 2:
            var option      = document.createElement('option');
            option.text     = 'TODOS';
            option.selected = true;
            option.disabled = false;
            selOption.add(option, null);
            break;
    }

    if (parm04 == 1) {
        xJSON   = getDominio(parm02);
        
        xJSON.forEach(element => {
            if (element.tipo_estado_parametro == 1){
                var option      = document.createElement('option');
                option.value    = element.tipo_parametro;
                option.text     = element.tipo_nombre;
                
                if (element.tipo_parametro == parm05) {
                    option.selected = true;
                } else {
                    option.selected = false;
                }
                
                selOption.add(option, null);
            }
        });
    } else if (parm04 == 2) {
        xJSON   = getDominioId(parm02, parm05);

        xJSON.forEach(element => {
            if (element.tipo_parametro == parm05){
                var option      = document.createElement('option');
                option.value    = element.tipo_parametro;
                option.text     = element.tipo_nombre;
                option.selected = true;
                selOption.add(option, null);
            }
        });
    }
}

function selectDominioEquivalencia(parm01, parm02, parm03, parm04, parm05) {
    var selOption   = document.getElementById(parm01);
    var xJSON       = [];

    while (selOption.length > 0) {
        selOption.remove(0);
    }

    switch (parm03) {
        case 1:
            var option      = document.createElement('option');
            option.value    = '-';
            option.text     = 'SELECCIONAR';
            option.selected = true;
            option.disabled = true;
            selOption.add(option, null);
            break;

        case 2:
            var option      = document.createElement('option');
            option.text     = 'TODOS';
            option.selected = true;
            option.disabled = false;
            selOption.add(option, null);
            break;
    }

    if (parm04 == 1) {
        xJSON   = getDominio(parm02);

        xJSON.forEach(element => {
            if (element.tipo_estado_parametro == 1){
                var option      = document.createElement('option');
                option.value    = element.tipo_parametro;
                option.text     = element.tipo_nombre;
                
                if (element.tipo_parametro == parm05) {
                    option.selected = true;
                } else {
                    option.selected = false;
                }
                
                selOption.add(option, null);
            }
        });
    } else if (parm04 == 2) {
        xJSON   = getDominioId(parm02, parm05);

        xJSON.forEach(element => {
            if (element.tipo_parametro == parm05){
                var option      = document.createElement('option');
                option.value    = element.tipo_parametro;
                option.text     = element.tipo_nombre;
                option.selected = true;
                selOption.add(option, null);
            }
        });
    }
}

function selectLocalidadPais(parm01, parm02, parm03, parm04, parm05) {
    var selOption   = document.getElementById(parm01);
    var xJSON       = getLocalidadPais();

    while (selOption.length > 0) {
        selOption.remove(0);
    }

    switch (parm03) {
        case 1:
            var option      = document.createElement('option');
            option.value    = '-';
            option.text     = 'SELECCIONAR';
            option.selected = true;
            option.disabled = true;
            selOption.add(option, null);
            break;

        case 2:
            var option      = document.createElement('option');
            option.text     = 'TODOS';
            option.selected = true;
            option.disabled = false;
            selOption.add(option, null);
            break;
    }

    if (parm04 == 1) {
        xJSON.forEach(element => {
            var option      = document.createElement('option');
            option.value    = element.localidad_pais_codigo;
            option.text     = element.localidad_pais_nombre;
            
            if (element.localidad_pais_codigo == parm05) {
                option.selected = true;
            } else {
                option.selected = false;
            }
            
            selOption.add(option, null);
        });
    } else if (parm04 == 2) {
        xJSON.forEach(element => {
            if (element.localidad_pais_codigo == parm05){
                var option      = document.createElement('option');
                option.value    = element.localidad_pais_codigo;
                option.text     = element.localidad_pais_nombre;
                option.selected = true;                
                selOption.add(option, null);
            }
        });
    }
}

function selectLocalidadDepto(parm01, parm02, parm03, parm04, parm05) {
    var selOption   = document.getElementById(parm01);
    var xJSON       = getLocalidadDepto();

    while (selOption.length > 0) {
        selOption.remove(0);
    }

    switch (parm03) {
        case 1:
            var option      = document.createElement('option');
            option.value    = '-';
            option.text     = 'SELECCIONAR';
            option.selected = true;
            option.disabled = true;
            selOption.add(option, null);
            break;

        case 2:
            var option      = document.createElement('option');
            option.text     = 'TODOS';
            option.selected = true;
            option.disabled = false;
            selOption.add(option, null);
            break;
    }

    if (parm04 == 1) {
        xJSON.forEach(element => {
            var option      = document.createElement('option');
            option.value    = element.localidad_departamento_codigo;
            option.text     = element.localidad_departamento_nombre;
            
            if (element.localidad_departamento_codigo == parm05) {
                option.selected = true;
            } else {
                option.selected = false;
            }
            
            selOption.add(option, null);
        });
    } else if (parm04 == 2) {
        xJSON.forEach(element => {
            if (element.localidad_departamento_codigo == parm05){
                var option      = document.createElement('option');
                option.value    = element.localidad_departamento_codigo;
                option.text     = element.localidad_departamento_nombre;
                option.selected = true;                
                selOption.add(option, null);
            }
        });
    }
}

function selectLocalidadCiudad(parm01, parm02, parm03, parm04, parm05) {
    var selOption   = document.getElementById(parm01);
    var selCurrent  = document.getElementById(parm02);
    var xJSON       = getLocalidadCiudad(selCurrent.value);

    while (selOption.length > 0) {
        selOption.remove(0);
    }

    switch (parm03) {
        case 1:
            var option      = document.createElement('option');
            option.value    = '-';
            option.text     = 'SELECCIONAR';
            option.selected = true;
            option.disabled = true;
            selOption.add(option, null);
            break;

        case 2:
            var option      = document.createElement('option');
            option.text     = 'TODOS';
            option.selected = true;
            option.disabled = false;
            selOption.add(option, null);
            break;
    }

    if (parm04 == 1) {
        xJSON.forEach(element => {
            var option      = document.createElement('option');
            option.value    = element.localidad_ciudad_codigo;
            option.text     = element.localidad_ciudad_nombre;
            
            if (element.localidad_ciudad_codigo == parm05) {
                option.selected = true;
            } else {
                option.selected = false;
            }
            
            selOption.add(option, null);
        });
    } else if (parm04 == 2) {
        xJSON.forEach(element => {
            if (element.localidad_ciudad_codigo == parm05){
                var option      = document.createElement('option');
                option.value    = element.localidad_ciudad_codigo;
                option.text     = element.localidad_ciudad_nombre;
                option.selected = true;                
                selOption.add(option, null);
            }
        });
    }
}

function selectLocalidadBarrio(parm01, parm021, parm022, parm03, parm04, parm05) {
    var selOption   = document.getElementById(parm01);
    var selCurrent01= document.getElementById(parm021);
    var selCurrent02= document.getElementById(parm022);
    var xJSON       = getLocalidadBarrio(selCurrent01.value, selCurrent02.value);

    while (selOption.length > 0) {
        selOption.remove(0);
    }

    switch (parm03) {
        case 1:
            var option      = document.createElement('option');
            option.value    = '-';
            option.text     = 'SELECCIONAR';
            option.selected = true;
            option.disabled = true;
            selOption.add(option, null);
            break;

        case 2:
            var option      = document.createElement('option');
            option.text     = 'TODOS';
            option.selected = true;
            option.disabled = false;
            selOption.add(option, null);
            break;
    }

    if (parm04 == 1) {
        xJSON.forEach(element => {
            var option      = document.createElement('option');

            option.value    = element.localidad_barrio_codigo;
            option.text     = element.localidad_barrio_nombre;
            
            if (element.localidad_barrio_codigo == parm05) {
                option.selected = true;
            } else {
                option.selected = false;
            }
            
            selOption.add(option, null);
        });
    } else if (parm04 == 2) {
        xJSON.forEach(element => {
            if (element.localidad_barrio_codigo == parm05){
                var option      = document.createElement('option');
                var option      = document.createElement('option');

                option.value    = element.localidad_barrio_codigo;
                option.text     = element.localidad_barrio_nombre;
                option.selected = true;                
                selOption.add(option, null);
            }
        });
    }
}

function selectEmpresa(parm01, parm02, parm03, parm04, parm05) {
    var selOption   = document.getElementById(parm01);
    var xJSON       = getParametroEmpresa();

    while (selOption.length > 0) {
        selOption.remove(0);
    }

    switch (parm03) {
        case 1:
            var option      = document.createElement('option');
            option.value    = '-';
            option.text     = 'SELECCIONAR';
            option.selected = true;
            option.disabled = true;
            selOption.add(option, null);
            break;

        case 2:
            var option      = document.createElement('option');
            option.text     = 'TODOS';
            option.selected = true;
            option.disabled = false;
            selOption.add(option, null);
            break;
    }

    if (parm04 == 1) {
        xJSON.forEach(element => {
            var option      = document.createElement('option');
            option.value    = element.empresa_codigo;
            option.text     = element.empresa_nombre;
            
            if (element.empresa_codigo == parm05) {
                option.selected = true;
            } else {
                option.selected = false;
            }
            
            selOption.add(option, null);
        });
    } else if (parm04 == 2) {
        xJSON.forEach(element => {
            if (element.empresa_codigo == parm05){
                var option      = document.createElement('option');
                option.value    = element.empresa_codigo;
                option.text     = element.empresa_nombre;
                option.selected = true;                
                selOption.add(option, null);
            }
        });
    }
}

function selectCargo(parm01, parm02, parm03, parm04, parm05) {
    var selOption   = document.getElementById(parm01);
    var xJSON       = getParametroCargo();

    while (selOption.length > 0) {
        selOption.remove(0);
    }

    switch (parm03) {
        case 1:
            var option      = document.createElement('option');
            option.value    = '-';
            option.text     = 'SELECCIONAR';
            option.selected = true;
            option.disabled = true;
            selOption.add(option, null);
            break;

        case 2:
            var option      = document.createElement('option');
            option.text     = 'TODOS';
            option.selected = true;
            option.disabled = false;
            selOption.add(option, null);
            break;
    }

    if (parm04 == 1) {
        xJSON.forEach(element => {
            var option      = document.createElement('option');
            option.value    = element.cargo_codigo;
            option.text     = element.cargo_nombre;
            
            if (element.cargo_codigo == parm05) {
                option.selected = true;
            } else {
                option.selected = false;
            }
            
            selOption.add(option, null);
        });
    } else if (parm04 == 2) {
        xJSON.forEach(element => {
            if (element.cargo_codigo == parm05){
                var option      = document.createElement('option');
                option.value    = element.cargo_codigo;
                option.text     = element.cargo_nombre;
                option.selected = true;                
                selOption.add(option, null);
            }
        });
    }
}

function selectProfesion(parm01, parm02, parm03, parm04, parm05) {
    var selOption   = document.getElementById(parm01);
    var xJSON       = getParametroProfesion();

    while (selOption.length > 0) {
        selOption.remove(0);
    }

    switch (parm03) {
        case 1:
            var option      = document.createElement('option');
            option.value    = '-';
            option.text     = 'SELECCIONAR';
            option.selected = true;
            option.disabled = true;
            selOption.add(option, null);
            break;

        case 2:
            var option      = document.createElement('option');
            option.text     = 'TODOS';
            option.selected = true;
            option.disabled = false;
            selOption.add(option, null);
            break;
    }

    if (parm04 == 1) {
        xJSON.forEach(element => {
            var option      = document.createElement('option');
            option.value    = element.profesion_codigo;
            option.text     = element.profesion_nombre;
            
            if (element.profesion_codigo == parm05) {
                option.selected = true;
            } else {
                option.selected = false;
            }
            
            selOption.add(option, null);
        });
    } else if (parm04 == 2) {
        xJSON.forEach(element => {
            if (element.profesion_codigo == parm05){
                var option      = document.createElement('option');
                option.value    = element.profesion_codigo;
                option.text     = element.profesion_nombre;
                option.selected = true;                
                selOption.add(option, null);
            }
        });
    }
}

function selectArea(parm01, parm02, parm03, parm04, parm05) {
    var selOption   = document.getElementById(parm01);
    var xJSON       = getParametroArea();

    while (selOption.length > 0) {
        selOption.remove(0);
    }

    switch (parm03) {
        case 1:
            var option      = document.createElement('option');
            option.value    = '-';
            option.text     = 'SELECCIONAR';
            option.selected = true;
            option.disabled = true;
            selOption.add(option, null);
            break;

        case 2:
            var option      = document.createElement('option');
            option.text     = 'TODOS';
            option.selected = true;
            option.disabled = false;
            selOption.add(option, null);
            break;
    }

    if (parm04 == 1) {
        xJSON.forEach(element => {
            var option      = document.createElement('option');
            option.value    = element.area_codigo;
            option.text     = element.area_nombre;
            
            if (element.area_codigo == parm05) {
                option.selected = true;
            } else {
                option.selected = false;
            }
            
            selOption.add(option, null);
        });
    } else if (parm04 == 2) {
        xJSON.forEach(element => {
            if (element.area_codigo == parm05){
                var option      = document.createElement('option');
                option.value    = element.area_codigo;
                option.text     = element.area_nombre;
                option.selected = true;                
                selOption.add(option, null);
            }
        });
    }
}

function selectActividad(parm01, parm02, parm03, parm04, parm05) {
    var selOption   = document.getElementById(parm01);
    var xJSON       = getParametroActividad();

    while (selOption.length > 0) {
        selOption.remove(0);
    }

    switch (parm03) {
        case 1:
            var option      = document.createElement('option');
            option.value    = '-';
            option.text     = 'SELECCIONAR';
            option.selected = true;
            option.disabled = true;
            selOption.add(option, null);
            break;

        case 2:
            var option      = document.createElement('option');
            option.text     = 'TODOS';
            option.selected = true;
            option.disabled = false;
            selOption.add(option, null);
            break;
    }

    if (parm04 == 1) {
        xJSON.forEach(element => {
            var option      = document.createElement('option');
            option.value    = element.actividad_codigo;
            option.text     = element.actividad_nombre;
            
            if (element.actividad_codigo == parm05) {
                option.selected = true;
            } else {
                option.selected = false;
            }
            
            selOption.add(option, null);
        });
    } else if (parm04 == 2) {
        xJSON.forEach(element => {
            if (element.actividad_codigo == parm05){
                var option      = document.createElement('option');
                option.value    = element.actividad_codigo;
                option.text     = element.actividad_nombre;
                option.selected = true;                
                selOption.add(option, null);
            }
        });
    }
}

function selectBanco(parm01, parm02, parm03, parm04, parm05) {
    var selOption   = document.getElementById(parm01);
    var xJSON       = getParametroBanco();

    while (selOption.length > 0) {
        selOption.remove(0);
    }

    switch (parm03) {
        case 1:
            var option      = document.createElement('option');
            option.value    = '-';
            option.text     = 'SELECCIONAR';
            option.selected = true;
            option.disabled = true;
            selOption.add(option, null);
            break;

        case 2:
            var option      = document.createElement('option');
            option.text     = 'TODOS';
            option.selected = true;
            option.disabled = false;
            selOption.add(option, null);
            break;
    }

    if (parm04 == 1) {
        xJSON.forEach(element => {
            var option      = document.createElement('option');
            option.value    = element.banco_codigo;
            option.text     = element.banco_nombre;
            
            if (element.banco_codigo == parm05) {
                option.selected = true;
            } else {
                option.selected = false;
            }
            
            selOption.add(option, null);
        });
    } else if (parm04 == 2) {
        xJSON.forEach(element => {
            if (element.banco_codigo == parm05){
                var option      = document.createElement('option');
                option.value    = element.banco_codigo;
                option.text     = element.banco_nombre;
                option.selected = true;                
                selOption.add(option, null);
            }
        });
    }
}

function selectBancoSalario(parm01, parm02, parm03, parm04, parm05) {
    var selOption   = document.getElementById(parm01);
    var xJSON       = getParametroBancoSalario();

    while (selOption.length > 0) {
        selOption.remove(0);
    }

    switch (parm03) {
        case 1:
            var option      = document.createElement('option');
            option.value    = '-';
            option.text     = 'SELECCIONAR';
            option.selected = true;
            option.disabled = true;
            selOption.add(option, null);
            break;

        case 2:
            var option      = document.createElement('option');
            option.text     = 'TODOS';
            option.selected = true;
            option.disabled = false;
            selOption.add(option, null);
            break;
    }

    if (parm04 == 1) {
        xJSON.forEach(element => {
            var option      = document.createElement('option');
            option.value    = element.banco_codigo;
            option.text     = element.banco_nombre;
            
            if (element.banco_codigo == parm05) {
                option.selected = true;
            } else {
                option.selected = false;
            }
            
            selOption.add(option, null);
        });
    } else if (parm04 == 2) {
        xJSON.forEach(element => {
            if (element.banco_codigo == parm05){
                var option      = document.createElement('option');
                option.value    = element.banco_codigo;
                option.text     = element.banco_nombre;
                option.selected = true;                
                selOption.add(option, null);
            }
        });
    }
}

function selectFormaPago(parm01, parm02, parm03, parm04, parm05) {
    var selOption   = document.getElementById(parm01);
    var xJSON       = getParametroFormaPago();

    while (selOption.length > 0) {
        selOption.remove(0);
    }

    switch (parm03) {
        case 1:
            var option      = document.createElement('option');
            option.value    = '-';
            option.text     = 'SELECCIONAR';
            option.selected = true;
            option.disabled = true;
            selOption.add(option, null);
            break;

        case 2:
            var option      = document.createElement('option');
            option.text     = 'TODOS';
            option.selected = true;
            option.disabled = false;
            selOption.add(option, null);
            break;
    }

    if (parm04 == 1) {
        xJSON.forEach(element => {
            var option      = document.createElement('option');
            option.value    = element.forma_pago_codigo;
            option.text     = element.forma_pago_nombre;
            
            if (element.forma_pago_codigo == parm05) {
                option.selected = true;
            } else {
                option.selected = false;
            }
            
            selOption.add(option, null);
        });
    } else if (parm04 == 2) {
        xJSON.forEach(element => {
            if (element.forma_pago_codigo == parm05){
                var option      = document.createElement('option');
                option.value    = element.forma_pago_codigo;
                option.text     = element.forma_pago_nombre;
                option.selected = true;                
                selOption.add(option, null);
            }
        });
    }
}

function selectEmpresa2(parm01, parm02, parm03, parm04) {
    var selOption   = document.getElementById(parm01);
    var xJSON       = getEmpresaList();
    
    while (selOption.length > 0) {
        selOption.remove(0);
    }

    switch (parm02) {
        case 1:
            var option      = document.createElement('option');
            option.value    = '-';
            option.text     = 'SELECCIONAR';
            option.selected = true;
            option.disabled = true;
            selOption.add(option, null);
            break;

        case 2:
            var option      = document.createElement('option');
            option.text     = 'TODOS';
            option.selected = true;
            option.disabled = false;
            selOption.add(option, null);
            break;
    }

    if (parm03 == 1) {
        xJSON.forEach(element => {
            var option      = document.createElement('option');
            option.value    = element.empresa_codigo;
            option.text     = element.empresa_nombre;
            
            if (element.empresa_codigo == parm04) {
                option.selected = true;
            } else {
                option.selected = false;
            }
            
            selOption.add(option, null);
        });
    } else if (parm03 == 2) {
        xJSON.forEach(element => {
            if (element.empresa_codigo == parm04){
                var option      = document.createElement('option');
                option.value    = element.empresa_codigo;
                option.text     = element.empresa_nombre;
                option.selected = true;                
                selOption.add(option, null);
            }
        });
    }
}

function selectEmpresaSuc(parm01, parm02, parm03, parm04) {
    var selOption   = document.getElementById(parm01);
    var codEmp      = document.getElementById(parm02);
    var codSuc      = document.getElementById(parm01);
 

    while (selOption.length > 0) {
        selOption.remove(0);
    }

    switch (parm02) {
        case 1:
            var option      = document.createElement('option');
            option.value    = 0;
            option.text     = 'SELECCIONAR';
            option.selected = true;
            option.disabled = true;
            selOption.add(option, null);
            break;

        case 2:
            var option      = document.createElement('option');
            option.value    = 0;
            option.text     = 'TODOS';
            option.selected = true;
            option.disabled = false;
            selOption.add(option, null);
            break;
    }
    
    xJSON           = getSucursalEmp(codEmp.value);

    if (parm03 == 1) {
        xJSON.forEach(element => {
            var option      = document.createElement('option');
            option.value    = element.sucursalCodigo;
            option.text     = element.sucursalCodigo +' - '+ element.sucursalNombre;

            if (element.sucursalCodigo ==  parm04) {
                option.selected = true;
            } else {
                option.selected = false;
            }
            selOption.add(option, null);
    
           
        });
    } else {
        xJSON.forEach(element => {
            var option      = document.createElement('option');
            option.value    = element.sucursalCodigo;
            option.text     = element.sucursalCodigo +' - '+ element.sucursalNombre;

            if (element.empresaCodigo == codEmp) {
                option.selected = true;
            } else {
                option.selected = false;
            }
            selOption.add(option, null);

        
        });
    }
    
}

function selectEmpresaRol(parm01, parm02, parm03, parm04, parm05) {
    var selOption   = document.getElementById(parm01);
    var codEmp      = document.getElementById(parm02);
    var codRol      = document.getElementById(parm01);
    var codRol2      = document.getElementById(parm05);
 
    while (selOption.length > 0) {
        selOption.remove(0);
    }

    switch (parm03) {
        case 1:
            var option      = document.createElement('option');
            option.value    = 0;
            option.text     = 'SELECCIONAR';
            option.selected = true;
            option.disabled = true;
            selOption.add(option, null);
            break;

        case 2:
            var option      = document.createElement('option');
            option.value    = 0;
            option.text     = 'TODOS';
            option.selected = true;
            option.disabled = false;
            selOption.add(option, null);
            break;
    }

    xJSON   = getRolEmp(codEmp.value);

    if (parm04 == 1) {
        xJSON.forEach(element => {
            var option      = document.createElement('option');
            option.value    = element.rolCodigo;
            option.text     = element.rolCodigo +' - '+ element.rolNombre;
            
            if (element.rolCodigo ==  parm04) {
                option.selected = true;
            } else {
                option.selected = false;
            }
            selOption.add(option, null);
    
           
        });
    } else if (parm04 == 2) {
        xJSON.forEach(element => {
            var option      = document.createElement('option');

            if (element.rolCodigo !=  codRol2.value) {
                option.value    = element.rolCodigo;
                option.text     = element.rolCodigo +' - '+ element.rolNombre;
                selOption.add(option, null);
            } 
    
           
        });
    }
    // else {
    //     xJSON.forEach(element => {
    //         var option      = document.createElement('option');
    //         option.value    = element.rolCodigo;
    //         option.text     = element.rolCodigo +' - '+ element.rolCodigo;

    //         if (element.empresaCodigo == codEmp) {
    //             option.selected = true;
    //         } else {
    //             option.selected = false;
    //         }
    //         selOption.add(option, null);

        
    //     });
    // }
    
}

function selectEmpresaCampanha(parm01, parm02, parm03, parm04) {
    var selOption   = document.getElementById(parm01);
    var codEmp      = document.getElementById(parm02);
    var codCamp      = document.getElementById(parm01);
 
    while (selOption.length > 0) {
        selOption.remove(0);
    }

    switch (parm03) {
        case 1:
            var option      = document.createElement('option');
            option.value    = 0;
            option.text     = 'SELECCIONAR';
            option.selected = true;
            option.disabled = true;
            selOption.add(option, null);
            break;

        case 2:
            var option      = document.createElement('option');
            option.value    = 0;
            option.text     = 'TODOS';
            option.selected = true;
            option.disabled = false;
            selOption.add(option, null);
            break;
    }

    xJSON           = getcampanhaEmp(codEmp.value);

    if (parm04 == 1) {
        xJSON.forEach(element => {
            var option      = document.createElement('option');
            option.value    = element.campanhaCodigo;
            option.text     = element.campanhaCodigo +' - '+ element.campanhaNombre;
            
            if (element.campanhaCodigo ==  parm04) {
                option.selected = true;
            } else {
                option.selected = false;
            }
            selOption.add(option, null);
        });
    } else {
        xJSON.forEach(element => {
            var option      = document.createElement('option');
            option.value    = element.campanhaCodigo;
            option.text     = element.campanhaCodigo +' - '+ element.campanhaNombre;

            if (element.empresaCodigo == codEmp) {
                option.selected = true;
            } else {
                option.selected = false;
            }
            selOption.add(option, null);

        
        });
    }
    
}

function selectEmpresaRolUsuario(parm01, parm02, parm03, parm04, parm05) {
    var selOption   = document.getElementById(parm01);
    var codEmp      = document.getElementById(parm02);
    var codRol      = document.getElementById(parm01);
 
    while (selOption.length > 0) {
        selOption.remove(0);
    }
    xJSON           = getRolEmp(codEmp.value);

    switch (parm03) {
        case 1:
            var option      = document.createElement('option');
            option.value    = 0;
            option.text     = 'SELECCIONAR';
            option.selected = true;
            option.disabled = true;
            selOption.add(option, null);
            break;

        case 2:
            var option      = document.createElement('option');
            option.value    = 0;
            option.text     = 'TODOS';
            option.selected = true;
            option.disabled = false;
            selOption.add(option, null);
            break;
    }
    
    if (parm04 == 1) {
        xJSON.forEach(element => {
            var option      = document.createElement('option');
            option.value    = element.rolCodigo;
            option.text     = element.rolCodigo +' - '+ element.rolNombre;
            
            if (element.rolCodigo ==  parm04) {
                option.selected = true;
            } else {
                option.selected = false;
            }
            selOption.add(option, null);
    
           
        });
    } else if (parm04 == 2) {
        xJSON.forEach(element => {
            var option      = document.createElement('option');
            option.value    = element.rolCodigo;
            option.text     = element.rolCodigo +' - '+ element.rolNombre;
            
            if (element.rolCodigo !=  codRol) {
                selOption.add(option, null);
            }           
        });
    } else {
        xJSON.forEach(element => {
            var option      = document.createElement('option');
            option.value    = element.rolCodigo;
            option.text     = element.rolCodigo +' - '+ element.rolCodigo;

            if (element.empresaCodigo == codEmp) {
                option.selected = true;
            } else {
                option.selected = false;
            }
            selOption.add(option, null);

        
        });
    }
    
}

function selectEmpresaUsuario(parm00, parm01, parm02, parm03, parm04, parm05) {
    var selOption   = document.getElementById(parm00);
    var codRol      = document.getElementById(parm01);
    var codEmp      = document.getElementById(parm02);
    var codUsu2     = document.getElementById(parm05);
        
    while (selOption.length > 0) {
        selOption.remove(0);
    }

    switch (parm03) {
        case 1:
            var option      = document.createElement('option');
            option.value    = 0;
            option.text     = 'SELECCIONAR';
            option.selected = true;
            option.disabled = true;
            selOption.add(option, null);
            break;

        case 2:
            var option      = document.createElement('option');
            option.value    = 0;
            option.text     = 'TODOS';
            option.selected = true;
            option.disabled = false;
            selOption.add(option, null);
            break;
    }

    xJSON   = getUsuarioEmp(codEmp.value, codRol.value);

    if (parm04 == 1) {
        xJSON.forEach(element => {
            var option      = document.createElement('option');
            option.value    = element.usuarioCodigo;
            option.text     = element.usuarioCodigo +' - '+ element.usuarioNombre;
            
            if (element.usuarioCodigo ==  parm04) {
                option.selected = true;
            } else {
                option.selected = false;
            }

            selOption.add(option, null);
        });
    } else if (parm04 == 2) {
        xJSON.forEach(element => {
            var option      = document.createElement('option');
            
            if (element.usuarioCodigo !=  codUsu2.value) {
                option.value    = element.usuarioCodigo;
                option.text     = element.usuarioCodigo +' - '+ element.usuarioNombre;
                selOption.add(option, null);
            }
        });
    }
}

function selectEmpresaForm(parm01, parm02, parm03, parm04) {
    var selOption   = document.getElementById(parm01);
    var codEmp      = document.getElementById(parm02);
    var codUsu      = document.getElementById(parm01);
 
        
    while (selOption.length > 0) {
        selOption.remove(0);
    }

    switch (parm03) {
        case 1:
            var option      = document.createElement('option');
            option.value    = 0;
            option.text     = 'SELECCIONAR';
            option.selected = true;
            option.disabled = true;
            selOption.add(option, null);
            break;

        case 2:
            var option      = document.createElement('option');
            option.value    = 0;
            option.text     = 'TODOS';
            option.selected = true;
            option.disabled = false;
            selOption.add(option, null);
            break;
    }

    xJSON   = getFormularioList(codEmp.value);

    if (parm04 == 1) {
        xJSON.forEach(element => {
            var option      = document.createElement('option');
            option.value    = element.formularioCodigo;
            option.text     = element.formularioCodigo +' - '+ element.formularioNombre;
            
            if (element.formularioCodigo ==  parm04) {
                option.selected = true;
            } else {
                option.selected = false;
            }
            selOption.add(option, null);
    
           
        });
    } else if (parm04 == 2) {
        xJSON.forEach(element => {
            var option      = document.createElement('option');
            option.value    = element.formularioCodigo;
            option.text     = element.formularioCodigo +' - '+ element.formularioNombre;
            
            if (element.formularioCodigo !=  codUsu) {
                selOption.add(option, null);
            } 
    
           
        });
    }
}