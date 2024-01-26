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

function selectBanca(parm01, parm02, parm03, parm04, parm05) {
    var selOption   = document.getElementById(parm01);
    var xJSON       = getBancaList(parm02, parm03);

    while (selOption.length > 0) {
        selOption.remove(0);
    }

    switch (parm04) {
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

    if (parm05 == 1) {
        xJSON.forEach(element => {
            var option      = document.createElement('option');
            option.value    = element.bancaCodigo;
            option.text     = element.bancaNombre;
    
            selOption.add(option, null);
        });
    }
}

function cantidadFecha(parm01, parm02, parm03, parm04, parm05) {
    var codBanca    = document.getElementById(parm01).value;
    var fecha       = new Date(_parm02BASE.substring(0, 4), (_parm02BASE.substring(5, 7) - 1), _parm02BASE.substring(8, 10));
    var fechaVen    = document.getElementById(parm02);
    var xJSON       = getBancaList(parm03, parm04);

    if (parm05 == 1) {
        xJSON.forEach(element => {            
            if (element.bancaCodigo == codBanca) {
                fecha.setDate(fecha.getDate() + element.productoDiaMaximoVencimiento);
                var dd      = fecha.getDate();
                var mm      = fecha.getMonth() + 1;
                var aa      = fecha.getFullYear();
        
                if (mm < 10){
                    mm = '0' + mm;
                }
        
                if (dd < 10){
                    dd = '0' + dd;
                }
        
                fechaVen.value =  aa + '-' + mm + '-' + dd;
            }            
        });
    } 
}