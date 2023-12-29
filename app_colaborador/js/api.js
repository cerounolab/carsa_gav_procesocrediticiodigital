const urlBASE01 = localStorage.getItem('urlBASE01');
const autBASE01 = localStorage.getItem('autBASE01');

const urlBASE02 = localStorage.getItem('urlBASE02');
const autBASE02 = localStorage.getItem('autBASE02');

const urlBASE03 = localStorage.getItem('urlBASE03');
const autBASE03 = localStorage.getItem('autBASE03');

const xHTTP	    = new XMLHttpRequest();

function getJSON(codJSON, codURL) {
    var urlJSON = urlBASE01 + '/' + codURL;

    xHTTP.open('GET', urlJSON, false);
    xHTTP.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var xJSON = JSON.parse(this.responseText);
            localStorage.removeItem(codJSON);
            localStorage.setItem(codJSON, JSON.stringify(xJSON)); 
        }
    };
    xHTTP.setRequestHeader('Accept', 'application/json;charset=UTF-8');
    xHTTP.setRequestHeader('Authorization', 'Basic ' + autBASE01);
    xHTTP.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xHTTP.send();
}

function postJSON(codPAGE, codURL, codPARS, codLOAD) {
    var urlJSON = urlBASE01 + '/' + codURL;
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
    xHTTP.setRequestHeader('Authorization', 'Basic ' + autBASE01);
    xHTTP.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xHTTP.send(codPARS);
}

function putJSON(codPAGE, codURL, codPARS, codLOAD) {
    var urlJSON = urlBASE01 + '/' + codURL;

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
    xHTTP.setRequestHeader('Authorization', 'Basic ' + autBASE01);
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

function getDominio(parm01){
    localStorage.removeItem('dominioJSON');

    if (localStorage.getItem('dominioJSON') === null){
        getJSON('dominioJSON', 'parametros/dominio/valor/'+ parm01);
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