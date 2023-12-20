urlBASE   = localStorage.getItem('urlBASE');
autBASE   = localStorage.getItem('autBASE');
xHTTP	    = new XMLHttpRequest();

function getJSON(codJSON, codURL) {
    var urlJSON = urlBASE + '/' + codURL;

    xHTTP.open('GET', urlJSON, false);
    xHTTP.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var xJSON = JSON.parse(this.responseText);
            localStorage.removeItem(codJSON);
            localStorage.setItem(codJSON, JSON.stringify(xJSON)); 
        }
    };
    xHTTP.setRequestHeader('Accept', 'application/json;charset=UTF-8');
    xHTTP.setRequestHeader('Authorization', 'Basic ' + autBASE);
    xHTTP.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xHTTP.send();
}

function postJSON(codPAGE, codURL, codPARS, codLOAD) {
    var urlJSON = urlBASE + '/' + codURL;
    xHTTP.open('POST', urlJSON, true);
    xHTTP.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var xJSON = JSON.parse(this.responseText);

            switch (codLOAD) {
                case 1:
                    window.location.replace('../' + codPAGE + 'code='+ xJSON.code + '&msg=' + xJSON.message);
                    break;

                default:
                    window.location.replace('../' + codPAGE + 'code='+ xJSON.code + '&msg=' + xJSON.message);
                    break;
            }
        }
    };
    xHTTP.setRequestHeader('Accept', 'application/json;charset=UTF-8');
    xHTTP.setRequestHeader('Authorization', 'Basic ' + autBASE);
    xHTTP.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xHTTP.send(codPARS);
}

function putJSON(codPAGE, codURL, codPARS, codLOAD) {
    var urlJSON = urlBASE + '/' + codURL;

    xHTTP.open('PUT', urlJSON, true);
    xHTTP.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var xJSON = JSON.parse(this.responseText);

            switch (codLOAD) {
                case 1:
                    window.location.replace('../' + codPAGE + 'code='+ xJSON.code + '&msg=' + xJSON.message);
                    break;

                default:
                    window.location.replace('../' + codPAGE + 'code='+ xJSON.code + '&msg=' + xJSON.message);
                    break;
            }
        }
    };
    xHTTP.setRequestHeader('Accept', 'application/json;charset=UTF-8');
    xHTTP.setRequestHeader('Authorization', 'Basic ' + autBASE);
    xHTTP.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xHTTP.send(codPARS);
}

function pad(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

function currencyFormat(numero, moneda, digito) {
    return (moneda + numero.toFixed(digito).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'))
}

function changeTextToInt(elem) {
	changeCharAlfa(elem);
	formatNumber(elem);
}

function changeCharEspecial(elem){
    var inpText     = document.getElementById(elem);
    inpReplace      = inpText.value.replace(' ', '').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').replace(' ', '');
    inpText.value   = inpReplace;
}

function changeCharAlfa(elem){
    var inpText     = document.getElementById(elem);
    inpReplace      = inpText.value.replace(/[a-zA-Z]/g, '').replace(' ', '').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').replace(' ', '');
    inpText.value   = inpReplace;
}

function formatNumber(elem) {
    var intNumber   = document.getElementById(elem);
	intNumber.value = round(intNumber.value);
}

function round(n){
	return thousandSeparator(Math.round(n), '.');
}
    
function thousandSeparator(n, sep) {
	var sRegExp = new RegExp('(-?[0-9]+)([0-9]{3})'),
	sValue=n+"";
        
	if (sep === undefined) {
		sep=',';
	}

	while(sRegExp.test(sValue)) {
		sValue = sValue.replace(sRegExp, '$1'+sep+'$2');
	}

	return sValue;
}

function getPayment(a,n,p) {
	var acc = 0;
	var base= 1 + p/988;//1200;

	for (i=1;i<=n;i++) {
		acc += Math.pow(base,-i);
	}

	return a/acc;
}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function getFile(urlPath){
    var data = [];
    readTextFile(urlPath, function(text){
        data = JSON.parse(text);
    });
    
    return data;
}

function getValidarFecha(var01, var02, var03){
    var fecDesde    = document.getElementById(var01);
    var fecHasta    = document.getElementById(var02);
    var fec1        = new Date(fecDesde.value.substring(0, 4), (fecDesde.value.substring(5, 7) - 1), fecDesde.value.substring(8, 10));
    var fec2        = new Date(fecHasta.value.substring(0, 4), (fecHasta.value.substring(5, 7) - 1), fecHasta.value.substring(8, 10));

    if (fec1 <= fec2) {
        var diffDays    = ((fec2.getTime() - fec1.getTime()) / (1000 * 3600 * 24));
        var cantDays    = 0;

        for (var i=0; i < diffDays; i++) {
            var fecAux = fec1.getFullYear() + '-' + (fec1.getMonth()+1) + '-' + fec1.getDate();

            if (fecAux != '2020-1-1' && fecAux != '2020-3-1' && fecAux != '2020-4-9' && fecAux != '2020-4-10' && fecAux != '2020-5-1' && fecAux != '2020-5-14' && fecAux != '2020-5-15' && fecAux != '2020-6-12' && fecAux != '2020-8-15' && fecAux != '2020-9-29' && fecAux != '2020-12-8' && fecAux != '2020-12-24' && fecAux != '2020-12-25' && fecAux != '2020-12-28' && fecAux != '2020-12-29' && fecAux != '2020-12-30' && fecAux != '2020-12-31' && fecAux != '2021-1-1') {
                if (fec1.getDay() != 0 && fec1.getDay() != 6) {
                    cantDays++;
                }
            }

            fec1.setDate(fec1.getDate() + 1);
        }

        if (cantDays == 0) {
            cantDays = 1;
        }

    } else {
        if (fec1.toLocaleDateString() !='30/11/1899' && fec2.toLocaleDateString() != '30/11/1899') {
           swal('La fecha '+var03+' no puede ser menor que ' + fecDesde.value); 
        }
    }
}

// function getDominio(parm01){
//     localStorage.removeItem('dominioJSON');
//     if (localStorage.getItem('dominioJSON') === null){
//         getJSON('dominioJSON', '100/dominio');
//     }

//     var xJSON = JSON.parse(localStorage.getItem('dominioJSON'));
//     var xDATA = [];

//     if (xJSON['code'] == 200) {
//         xJSON['data'].forEach(element => {
//             if (element.tipo_valor == parm01) {
//                 xDATA.push(element);
//             }
//         });
//     }

//     return xDATA;
// }
function getDominio(parm01){
    localStorage.removeItem('dominioJSON');

    if (localStorage.getItem('dominioJSON') === null){
        getJSON('dominioJSON', 'dominio/valor/'+ parm01);
    }

    var xJSON = JSON.parse(localStorage.getItem('dominioJSON'));
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            if (element.tipo_dominio == parm01) {
                xDATA.push(element);
            }
        });
    }

    return xDATA;
}

function getDominioValor(parm01){
    localStorage.removeItem('dominioValorJSON');

    if (localStorage.getItem('dominioValorJSON') === null){
        getJSON('dominioValorJSON', 'dominio/valor/'+parm01);
    }

    var xJSON = JSON.parse(localStorage.getItem('dominioValorJSON'));
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            if (element.tipoEstadoParametro == 1) {
                xDATA.push(element);
            }
        });
    }

    return xDATA;
}

function getDominioValorAll(parm01, parm02){
    localStorage.removeItem('dominioValorAllJSON');

    if (localStorage.getItem('dominioValorAllJSON') === null){
        getJSON('dominioValorAllJSON', 'dominio/valor/'+parm01);
    }
 
    var xJSON = JSON.parse(localStorage.getItem('dominioValorAllJSON'));
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            if (parm02 == 0) {
                xDATA.push(element);
            } else if(element.tipo_grupo_parametro == parm02){
                xDATA.push(element);
            }
        });
    }

    return xDATA;
}


function getDominioId(codElem){
    localStorage.removeItem('dominioIdJSON');

    if (localStorage.getItem('dominioIdJSON') === null){
        getJSON('dominioIdJSON', 'dominio/codigo/'+codElem);
    }
 
    var xJSON = JSON.parse(localStorage.getItem('dominioIdJSON'));
    var xDATA = [];
    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            xDATA.push(element);
        });
    }

    return xDATA;
}

function getLocalidadPais(){
    if (localStorage.getItem('paisJSON') === null){
        getJSON('paisJSON', 'parametros/pais/listado');
    }

    var xJSON = JSON.parse(localStorage.getItem('paisJSON'));
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            xDATA.push(element);
        });
    }

    return xDATA;
}

function getLocalidadDepto(){
    if (localStorage.getItem('departamentoJSON') === null){
        getJSON('departamentoJSON', 'parametros/departamento/listado');
    }

    var xJSON = JSON.parse(localStorage.getItem('departamentoJSON'));
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            xDATA.push(element);
        });
    }

    return xDATA;
}

function getLocalidadCiudad(parm01){
    if (localStorage.getItem('ciudadJSON') === null){
        getJSON('ciudadJSON', 'parametros/ciudad/listado');
    }

    var xJSON = JSON.parse(localStorage.getItem('ciudadJSON'));
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            if (parm01 == element.localidad_departamento_codigo) {
                xDATA.push(element);
            }
        });
    }

    return xDATA;
}

function getLocalidadBarrio(parm01, parm02){
    if (localStorage.getItem('barrioJSON') === null){
        getJSON('barrioJSON', 'parametros/barrio/listado');
    }

    var xJSON = JSON.parse(localStorage.getItem('barrioJSON'));
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            if (element.localidad_departamento_codigo == parm01 && element.localidad_ciudad_codigo == parm02) {
                xDATA.push(element);
            }
        });
    }

    return xDATA;
}

function getParametroEmpresa(){

    var xJSON = getFile('./../files/empresa.json');
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            xDATA.push(element);
        });
    }

    return xDATA;
}

function getParametroCargo(){
    if (localStorage.getItem('parmCargoJSON') === null){
        getJSON('parmCargoJSON', 'parametros/cargo/listado');
    }

    var xJSON = JSON.parse(localStorage.getItem('parmCargoJSON'));
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            xDATA.push(element);
        });
    }

    return xDATA;
}

function getParametroProfesion(){
    if (localStorage.getItem('parmProfesionJSON') === null){
        getJSON('parmProfesionJSON', 'parametros/profesion/listado');
    }

    var xJSON = JSON.parse(localStorage.getItem('parmProfesionJSON'));
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            xDATA.push(element);
        });
    }

    return xDATA;
}

function getParametroArea(){
    if (localStorage.getItem('parmAreaJSON') === null){
        getJSON('parmAreaJSON', 'parametros/area/listado');
    }

    var xJSON = JSON.parse(localStorage.getItem('parmAreaJSON'));
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            xDATA.push(element);
        });
    }

    return xDATA;
}

function getParametroActividad(){
    if (localStorage.getItem('parmActividadJSON') === null){
        getJSON('parmActividadJSON', 'parametros/actividad/listado');
    }

    var xJSON = JSON.parse(localStorage.getItem('parmActividadJSON'));
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            xDATA.push(element);
        });
    }

    return xDATA;
}

function getParametroBanco(){
    if (localStorage.getItem('parmBancoJSON') === null){
        getJSON('parmBancoJSON', 'parametros/banco/listado');
    }

    var xJSON = JSON.parse(localStorage.getItem('parmBancoJSON'));
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            xDATA.push(element);
        });
    }

    return xDATA;
}

function getParametroBancoSalario(){
    if (localStorage.getItem('parmBancoSalarioJSON') === null){
        getJSON('parmBancoSalarioJSON', 'parametros/bancosalario/listado');
    }

    var xJSON = JSON.parse(localStorage.getItem('parmBancoSalarioJSON'));
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            xDATA.push(element);
        });
    }

    return xDATA;
}

function getParametroFormaPago(){
    if (localStorage.getItem('parmFormaPagoJSON') === null){
        getJSON('parmFormaPagoJSON', 'parametros/formapago/listado');
    }

    var xJSON = JSON.parse(localStorage.getItem('parmFormaPagoJSON'));
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            xDATA.push(element);
        });
    }

    return xDATA;
}

function getOperacionDetalleId(parm01){
    if (localStorage.getItem('operacionDetalleId') === null){
        getJSON('operacionDetalleId', 'operaciondetalle/numero/'+parm01);
    }

    var xJSON = JSON.parse(localStorage.getItem('operacionDetalleId'));
    var xDATA = [];

    if (xJSON['code'] == 200){
        xJSON['data'].forEach(element => {
            xDATA.push(element);
        });
    }

    return xDATA;
}

function getOperacionSolicitudFiltro(parm01, parm02, parm03, parm04, parm05, parm06){
    getJSON('operacionSolicitudFilter', 'operacionsolicitud/usuariocarga/'+parm01+'/ejecutivo/'+parm02+'/fechadesde/'+parm03+'/fechahasta/'+parm04);

    var xJSON = JSON.parse(localStorage.getItem('operacionSolicitudFilter'));
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            if (element.tipo_estado_nivel1_parametro !== 5) {
                if (parm05 == 0) {
                    if (parm06 == 0){
                        xDATA.push(element);
                    } else if (element.tipo_estado_nivel2_parametro == parm06) {
                        xDATA.push(element);
                    }
                } else if(element.tipo_formapago_parametro == parm05) {
                    if (parm06 == 0){
                        xDATA.push(element);
                    } else if (element.tipo_estado_nivel2_parametro == parm06) {
                        xDATA.push(element);
                    }
                } 
            }
        });
    }

    return xDATA;
}

function getTasa(valMoneda, valMonto, valPlazo){
    if (localStorage.getItem('tasaJSON') === null){
        getJSON('tasaJSON', 'operacionsolicitud/tasa/parametro/4001001');
    }

    var xJSON = JSON.parse(localStorage.getItem('tasaJSON'));
    var xDATA = 0;

    if (xJSON['code'] == 200){
        xJSON['data'].forEach(element => {
            if (valMoneda == element.importe_moneda && valPlazo >= element.plazo_desde && valPlazo <= element.plazo_hasta && valMonto >= element.importe_desde && valMonto <= element.importe_hasta) {
                xDATA = element.plazo_tasa;
            }
        });
    }

    return xDATA;
}

function getPersonaDocumento(parm01){
    localStorage.removeItem('personaDocumentoJSON');

    if (localStorage.getItem('personaDocumentoJSON') === null){
        getJSON('personaDocumentoJSON', 'persona/documento/'+parm01);
    }

    var xJSON = JSON.parse(localStorage.getItem('personaDocumentoJSON'));
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            xDATA.push(element);
        });
    }

    return xDATA;
}

function getEmpresaList(codEmp, codEst){
    getJSON('empresaListJSON', 'empresa/listado/empresa/'+codEmp);

    var xJSON = JSON.parse(localStorage.getItem('empresaListJSON'));
    var xDATA = [];
    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            if (codEst == 0) {
                xDATA.push(element);
            } else if (element.tipoEstadoParametro == codEst){
                xDATA.push(element);
            }
        });
    }

    return xDATA;
}

function getEmpresaId(codElem){
    localStorage.removeItem('empresaIdJSON');

    if (localStorage.getItem('empresaIdJSON') === null){
        getJSON('empresaIdJSON', 'empresa/codigo/' + codElem);
    }

    var xJSON = JSON.parse(localStorage.getItem('empresaIdJSON'));
    var xDATA = [];
    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            xDATA.push(element);
        });
    }

    return xDATA;
}

function getEmpresaRuc(codElem){
    var urlPage =  '100/empresa/ruc/' + codElem;
    var xJSON   = JSON.parse(getURL_1(urlPage));
    var xDATA   = [];

    if (xJSON['code'] == 200){
        xJSON['data'].forEach(element => {
            xDATA.push(element);
        });
    }

    return xDATA; 
}

function getEmpresaTipoRubro(codElem){
    var urlPage =  '100/empresa/tiporubro/' + codElem;
    var xJSON   = JSON.parse(getURL_1(urlPage));
    var xDATA   = [];

    if (xJSON['code'] == 200){
        xJSON['data'].forEach(element => {
            xDATA.push(element);
        });
    }

    return xDATA; 
}

function getSucursalList(codElem, codEst){
    localStorage.removeItem('sucursalListJSON');

    if (localStorage.getItem('sucursalListJSON') === null){
        getJSON('sucursalListJSON', 'sucursal/listado/empresa/' + codElem);
    }

    var xJSON = JSON.parse(localStorage.getItem('sucursalListJSON'));
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            if (codEst == 0) {
                xDATA.push(element);
            } else if (element.tipoEstadoParametro == codEst){
                xDATA.push(element);
            }
        });
    }

    return xDATA;
}

function getSucursalId(codElem){
    localStorage.removeItem('sucursalIdJSON');

    if (localStorage.getItem('sucursalIdJSON') === null){
        getJSON('sucursalIdJSON', 'sucursal/codigo/' + codElem);
    }

    var xJSON = JSON.parse(localStorage.getItem('sucursalIdJSON'));
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            xDATA.push(element);
        });
    }

    return xDATA;
}

function getSucursalEmp(codElem){
    localStorage.removeItem('sucursalEmpresaJSON');

    if (localStorage.getItem('sucursalEmpresaJSON') === null){
        getJSON('sucursalEmpresaJSON', 'sucursal/empresa/' + codElem);
    }

    var xJSON = JSON.parse(localStorage.getItem('sucursalEmpresaJSON'));
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            xDATA.push(element);
        });
    }

    return xDATA;
}

function getUsuarioList(codEmp, codEst){
    localStorage.removeItem('UsuarioListJSON');

    if (localStorage.getItem('UsuarioListJSON') === null){
        getJSON('UsuarioListJSON', 'usuario/listado/empresa/'+ codEmp);
    }

    var xJSON = JSON.parse(localStorage.getItem('UsuarioListJSON'));
    var xDATA = [];
    
    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            if (codEst == 0) {
                xDATA.push(element);
            } else if (element.tipoEstadoParametro == codEst){
                xDATA.push(element);
            }
        });
    }

    return xDATA;
}

function getUsuarioId(codElem){
    localStorage.removeItem('usuarioIdJSON');

    if (localStorage.getItem('usuarioIdJSON') === null){
        getJSON('usuarioIdJSON', 'usuario/codigo/' + codElem);
    }

    var xJSON = JSON.parse(localStorage.getItem('usuarioIdJSON'));
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            xDATA.push(element);
        });
    }

    return xDATA;
}

function geUsuarioUsu(codElem){
    localStorage.removeItem('usuarioUsuJSON');

    if (localStorage.getItem('usuarioUsuJSON') === null){
        getJSON('usuarioUsuJSON', 'usuario/usuario/' + codElem);
    }

    var xJSON = JSON.parse(localStorage.getItem('usuarioUsuJSON'));
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            xDATA.push(element);
        });
    }

    return xDATA;
}

function getUsuarioEmp(codEmp, codRol, codEst){
    localStorage.removeItem('usuarioEmpresaJSON');

    if (localStorage.getItem('usuarioEmpresaJSON') === null){
        getJSON('usuarioEmpresaJSON', 'usuariorol/codigorol/'+ codRol +'/empresa/' + codEmp);
    }

    var xJSON = [];
    var xJSON = JSON.parse(localStorage.getItem('usuarioEmpresaJSON'));
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            if (codEst == 0) {
                xDATA.push(element);
            } else if (element.tipoEstadoParametro == codEst){
                xDATA.push(element);
            }
        });
    }

    return xDATA;
}


function getRolList(codElem, codEst){
    localStorage.removeItem('rolListJSON');

    if (localStorage.getItem('rolListJSON') === null){
        getJSON('rolListJSON', 'rol/listado/empresa/'+codElem);
    }

    var xJSON = JSON.parse(localStorage.getItem('rolListJSON'));
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            if (codEst == 0) {
                xDATA.push(element);
            } else if (element.tipoEstadoParametro == codEst){
                xDATA.push(element);
            }
        });
    }

    return xDATA;
}

function getRolId(codElem){
    localStorage.removeItem('rolIdJSON');

    if (localStorage.getItem('rolIdJSON') === null){
        getJSON('rolIdJSON', 'rol/codigo/' + codElem);
    }

    var xJSON = JSON.parse(localStorage.getItem('rolIdJSON'));
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            xDATA.push(element);
        });
    }

    return xDATA;
}

function getRolEmp(codEmp, codEst){
    localStorage.removeItem('rolEmpresaJSON');

    if (localStorage.getItem('rolEmpresaJSON') === null){
        getJSON('rolEmpresaJSON', 'rol/listado/empresa/'+ codEmp);
    }
    var xJSON = [];

    var xJSON = JSON.parse(localStorage.getItem('rolEmpresaJSON'));
    var xDATA = [];
 
    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            if (codEst == 0) {
                xDATA.push(element);
            } else if (element.tipoEstadoParametro == codEst && element.empresaCodigo == codEmp){
                xDATA.push(element);
            }
        });
    }

    return xDATA;
}

function getcampanhaList(codElem, codEst){
    localStorage.removeItem('campanhaListJSON');

    if (localStorage.getItem('campanhaListJSON') === null){
        getJSON('campanhaListJSON', 'campanha/listado/empresa/'+codElem);
    }

    var xJSON = JSON.parse(localStorage.getItem('campanhaListJSON'));
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            if (codEst == 0) {
                xDATA.push(element);
            } else if (element.tipoEstadoParametro == codEst){
                xDATA.push(element);
            }
        });
    }

    return xDATA;
}

function getcampanhaId(codElem){
    localStorage.removeItem('campanhaIdJSON');

    if (localStorage.getItem('campanhaIdJSON') === null){
        getJSON('campanhaIdJSON', 'campanha/codigo/' + codElem);
    }

    var xJSON = JSON.parse(localStorage.getItem('campanhaIdJSON'));
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            xDATA.push(element);
        });
    }

    return xDATA;
}

function getcampanhaEmp(codEmp, codEst){
    localStorage.removeItem('campanhaEmpresaJSON');

    if (localStorage.getItem('campanhaEmpresaJSON') === null){
        getJSON('campanhaEmpresaJSON', 'campanha/empresa/' + codEmp);
    }
    var xJSON = [];

    var xJSON = JSON.parse(localStorage.getItem('campanhaEmpresaJSON'));
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            if (codEst == 0) {
                xDATA.push(element);
            } else if (element.tipoEstadoParametro == codEst){
                xDATA.push(element);
            }
        });
    }

    return xDATA;
}


function getFormularioList(codElem, codEst){
    localStorage.removeItem('formularioListJSON');

    if (localStorage.getItem('formularioListJSON') === null){
        getJSON('formularioListJSON', 'formulario/listado/empresa/' + codElem);
    }

    var xJSON = JSON.parse(localStorage.getItem('formularioListJSON'));
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            if (codEst == 0) {
                xDATA.push(element);
            } else if (element.tipoEstadoParametro == codEst){
                xDATA.push(element);
            }
        });
    }

    return xDATA;
}

function getFormularioId(codElem){
    localStorage.removeItem('formularioIdJSON');

    if (localStorage.getItem('formularioIdJSON') === null){
        getJSON('formularioIdJSON', 'formulario/codigo/' + codElem);
    }

    var xJSON = JSON.parse(localStorage.getItem('formularioIdJSON'));
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            xDATA.push(element);
        });
    }

    return xDATA;
}

function getRolFormularioList(codElem){
    localStorage.removeItem('rolformularioListJSON');

    if (localStorage.getItem('rolformularioListJSON') === null){
        getJSON('rolformularioListJSON', 'rolformulario/listado/empresa/' + codElem);
    }

    var xJSON = JSON.parse(localStorage.getItem('rolformularioListJSON'));
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            xDATA.push(element);
        });
    }

    return xDATA;
}

function getRolFormularioId(codigorol, tipoformulario){
    localStorage.removeItem('rolformularioIdJSON');

    if (localStorage.getItem('rolformularioIdJSON') === null){
        getJSON('rolformularioIdJSON', 'rolformulario/codigorol/'+codigorol+'/tipoformulario/'+tipoformulario);
    }

    var xJSON = JSON.parse(localStorage.getItem('rolformularioIdJSON'));
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            xDATA.push(element);
        });
    }

    return xDATA;
}

function getUsuDocumento(codDoc, codEmp){
    localStorage.removeItem('usuDocumentoJSON');
    if (localStorage.getItem('usuDocumentoJSON') === null){
        getJSON('usuDocumentoJSON', 'usuario/documento/'+codDoc+'/empresa/'+codEmp);
    }

    var xJSON = JSON.parse(localStorage.getItem('usuDocumentoJSON'));
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            xDATA.push(element);
        });
    }

    return xDATA;
}

function getUsuarioDashboard(codEmp){
    localStorage.removeItem('usuDashboardJSON');

    if (localStorage.getItem('usuDashboardJSON') === null){
        getJSON('usuDashboardJSON', 'usuario/dashboard/empresa/'+codEmp);
    }

    var xJSON = JSON.parse(localStorage.getItem('usuDashboardJSON'));
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            xDATA.push(element);
        });
    }

    return xDATA;
}

function getRolDashboard(codEmp){
    localStorage.removeItem('rolDashboardJSON');

    if (localStorage.getItem('rolDashboardJSON') === null){
        getJSON('rolDashboardJSON', 'rol/dashboard/empresa/'+codEmp);
    }
 
    var xJSON = JSON.parse(localStorage.getItem('rolDashboardJSON'));
    var xDATA = [];
   
    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            xDATA.push(element);
        });
    }

    return xDATA;
}

function getUsuLogDashboard(codEmp, fecha, cantReg){
    localStorage.removeItem('empDashboardJSON');

    if (localStorage.getItem('empDashboardJSON') === null){
        getJSON('empDashboardJSON', 'usuariolog/dashboard/empresa/'+codEmp +'/fecha/'+ fecha+'/cantidadregistro/'+cantReg);
    }

    var xJSON = JSON.parse(localStorage.getItem('empDashboardJSON'));
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            if (element.usuarioLogEstado != 'CORRECTO') {
                xDATA.push(element);
            }
        });
    }

    return xDATA;
}

function getUsuarioRolList(codEmp){
    localStorage.removeItem('usuRolListJSON');

    if (localStorage.getItem('usuRolListJSON') === null){
        getJSON('usuRolListJSON', 'usuariorol/listado/empresa/'+codEmp);
    }

    var xJSON = JSON.parse(localStorage.getItem('usuRolListJSON'));
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            xDATA.push(element);
        });
    }

    return xDATA;
}


function getUsuarioRolId(codUsu, codRol, codEmp){
    localStorage.removeItem('usuRolIdJSON');

    if (localStorage.getItem('usuRolIdJSON') === null){
        getJSON('usuRolIdJSON', 'usuariorol/codigousuario/'+codUsu+'/codigorol/'+codRol+'/empresa/'+codEmp);
    }

    var xJSON = JSON.parse(localStorage.getItem('usuRolIdJSON'));
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            xDATA.push(element);
        });
    }

    return xDATA;
    
}

function getUsuarioCampanhaList(codEmp){
    localStorage.removeItem('usuCampanhaListJSON');
  
    if (localStorage.getItem('usuCampanhaListJSON') === null){
        getJSON('usuCampanhaListJSON', 'usuariocampanha/listado/empresa/'+codEmp);
    }

    var xJSON = JSON.parse(localStorage.getItem('usuCampanhaListJSON'));
    var xDATA = [];
  
    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            xDATA.push(element);
        });
    }

    return xDATA; 
}

function getUsuarioCampanhaId(codUsu, codCamp, codEmp){
    localStorage.removeItem('usuCampanhaIdJSON');

    if (localStorage.getItem('usuCampanhaIdJSON') === null){
        getJSON('usuCampanhaIdJSON', 'usuariocampanha/codigousuario/'+codUsu+'/codigocampanha/'+codCamp+'/empresa/'+codEmp);
    }

    var xJSON = JSON.parse(localStorage.getItem('usuCampanhaIdJSON'));
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            xDATA.push(element);
        });
    }

    return xDATA; 
}

function getusuarioFlujoList(codEmp){
    localStorage.removeItem('usuarioflujoListJSON');

    if (localStorage.getItem('usuarioflujoListJSON') === null){
        getJSON('usuarioflujoListJSON', 'usuarioflujo/listado/empresa/'+codEmp);
    }

    var xJSON = JSON.parse(localStorage.getItem('usuarioflujoListJSON'));
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            xDATA.push(element);
        });
    }

    return xDATA; 
}

function getUsuarioFlujoId(codRolC, codUsuC, codRolS, codUsuS, codEmp){
    localStorage.removeItem('usuarioflujoIdJSON');

    if (localStorage.getItem('usuarioflujoIdJSON') === null){

        getJSON('usuarioflujoIdJSON', 'usuarioflujo/usuariosuperior/'+codUsuS+'/rolsuperior/'+codRolS+'/usuariosubordinado/'+codUsuC+'/rolsubordinado/'+ codRolC +'/empresa/'+codEmp);
    }

    var xJSON = JSON.parse(localStorage.getItem('usuarioflujoIdJSON'));
    var xDATA = [];

    if (xJSON['code'] == 200) {
        xJSON['data'].forEach(element => {
            xDATA.push(element);
        });
    }

    return xDATA; 
}