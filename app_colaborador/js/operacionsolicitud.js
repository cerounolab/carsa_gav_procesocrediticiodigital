function calcpago(){
	var solicitud_monto         = document.getElementById("solicitud_monto").value;
	var solicitud_monto_1       = solicitud_monto.replace(/[.]/g, '');
	var solicitud_plazo         = document.getElementById("workPlazo").value;
	var solicitud_cuota_importe = document.getElementById("solicitud_cuota_importe");
    var tasas                   = document.getElementById("workTasa");
    var tasa                    = getTasa(6900, solicitud_monto_1, solicitud_plazo);
        tasas.value             = tasa;

    if (solicitud_monto_1 > 0 && solicitud_plazo > 0 && tasas.value > 0) {
        solicitud_cuota_importe.value	= round(getPayment(solicitud_monto_1, solicitud_plazo, tasas.value));
    } else {
        solicitud_cuota_importe.value	= 0;
    }
}

function viewInput(valRow) {
    var codElem = document.getElementById(valRow).value;
  
    var dis_106 = document.getElementById('col_solicitud_banco_codigo');
    var dis_107 = document.getElementById('col_solicitud_banco_tipo');
    var dis_108 = document.getElementById('col_solicitud_banco_cuenta');

    var inp_106 = document.getElementById('solicitud_banco_codigo');
    var inp_107 = document.getElementById('solicitud_banco_tipo');
    var inp_108 = document.getElementById('solicitud_banco_cuenta');

    switch (codElem) {
        case '1':
            dis_106.style.display   = 'none';
            dis_107.style.display   = 'none';
            dis_108.style.display   = 'none';

            inp_106.required        = false;
            inp_107.required        = false;
            inp_108.required        = false;
        break;

        case '2':
            dis_106.style.display   = '';
            dis_107.style.display   = '';
            dis_108.style.display   = '';

            inp_106.required        = true;
            inp_107.required        = true;
            inp_108.required        = true;
        break;
    }
}

function validarDocumento() {
    const workModo          = document.getElementById('workModo');
    const personCuenta      = document.getElementById('persona_cuenta');
    const personDocumento   = document.getElementById('persona_documento_numero');
    const personCliente     = document.getElementById('persona_cliente');
    const personTipoPers    = document.getElementById('tipo_persona_parametro');
    const personFechDoc     = document.getElementById('persona_documento_fechaemision');
    const personFecNac      = document.getElementById('persona_fecha_nacimiento');
    const personNomPri      = document.getElementById('persona_nombre_primer');
    const personNomSeg      = document.getElementById('persona_nombre_segundo');
    const personApePat      = document.getElementById('persona_apellido_paterno');
    const personApeMat      = document.getElementById('persona_apellido_materno');
    const personApeCas      = document.getElementById('persona_apellido_casada');
    const personTipoSexo    = document.getElementById('tipo_sexo_parametro');
    const personTipoEstCiv  = document.getElementById('tipo_estadocivil_parametro');
    const personTipoNac     = document.getElementById('localidad_pais_codigo');
    const btnSubmit         = document.getElementById('btnSubmit');
    const xJSON             = getPersonaDocumento(personDocumento.value);

    personCliente.value                 = 'NUEVO';
    personCliente.style.backgroundColor = 'rgb(81, 206, 138)';
    personCliente.style.borderColor     = 'rgb(81, 206, 138)';
    btnSubmit.style.display             = '';
    
    if (xJSON.length > 0) {
        if (xJSON[0].persona_cliente === 'RECURRENTE') {
            personCliente.value                 = 'RECURRENTE';
            personCliente.style.backgroundColor = 'rgb(254, 200, 1)';
            personCliente.style.borderColor     = 'rgb(254, 200, 1)';
            btnSubmit.style.display             = 'none';
        }

        workModo.value          = 'U';
        personCuenta.value      = xJSON[0].persona_cuenta;
        personTipoPers.value    = xJSON[0].tipo_persona_parametro;
        personFechDoc.value     = xJSON[0].persona_documento_fechaemision_1;
        personFecNac.value      = xJSON[0].persona_fecha_nacimiento_1;
        personNomPri.value      = xJSON[0].persona_nombre_primer;
        personNomSeg.value      = xJSON[0].persona_nombre_segundo;
        personApePat.value      = xJSON[0].persona_apellido_paterno;
        personApeMat.value      = xJSON[0].persona_apellido_materno;
        personApeCas.value      = xJSON[0].persona_apellido_casada;
        personTipoSexo.value    = xJSON[0].tipo_sexo_parametro;
        personTipoEstCiv.value  = xJSON[0].tipo_estadocivil_parametro;
        personTipoNac.value     = xJSON[0].localidad_pais_codigo;
    }

    //selectDominio('tipo_persona_parametro', 'WSCHEDUOPERSONATIPO', 0, 1, personTipoPers.value);
    selectDominio('tipo_sexo_parametro', 'WSCHEDUOPERSONASEXO', 0, 1, personTipoSexo.value);
    selectDominio('tipo_estadocivil_parametro', 'WSCHEDUOPERSONAESTADOCIVIL', 0, 1, personTipoEstCiv.value);
    selectLocalidadPais('localidad_pais_codigo', null, 0, 1, personTipoNac.value);
}

function viewMotor() {
    const workBuscaMotor    = document.getElementById('workBuscaMotor');
    const personDocumento   = document.getElementById('persona_documento_numero');

    validateMotorDocument();

    if (workBuscaMotor.value === 'S') {
        let htmlMODAL =
                    '<div class="modal-content modal-filled btn-primary" style="padding:0px 20px;">'+
                    '   <div class="modal-dialog modal-dialog-centered">'+
                    '	    <div class="modal-content">'+
                    '		    <div class="modal-header">'+
                    '			    <h4 class="modal-title text-primary">.: Proceso Crediticio Digital :.</h4>'+
                    '			    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'+
                    '           </div>'+
                    ''+
                    '           <div class="modal-body">'+
                    '               <h5>Aguarde un momento por favor, estamos generando una oferta.</h5>'+
                    '               <iframe width="100%" height="200" src="https://lottie.host/embed/5be6c9fa-efb3-41ef-9ae8-7828edd31ba0/eGgOuSExfg.json"></iframe>'+
                    '           </div>'+
                    '       </div'+
                    '   </div>'+
                    '</div>';

        $("#modal-content").empty();
	    $("#modal-content").append(htmlMODAL);

        consultMotor(personDocumento.value);
    }
}

function validateMotorDocument() {
    const workModo          = document.getElementById('workModo');
    const workBuscaMotor    = document.getElementById('workBuscaMotor');
    const personCuenta      = document.getElementById('persona_cuenta');
    const personDocumento   = document.getElementById('persona_documento_numero');
    const personCliente     = document.getElementById('persona_cliente');
    const personNomPri      = document.getElementById('persona_nombre_primer');
    const personNomSeg      = document.getElementById('persona_nombre_segundo');
    const personApePat      = document.getElementById('persona_apellido_paterno');
    const personApeMat      = document.getElementById('persona_apellido_materno');
    const btnSubmit         = document.getElementById('btnConsultaMotor');

    if (personDocumento.value.length > 5) {
        const xJSON = getPersonaDocumento(personDocumento.value);

        workBuscaMotor.value                = 'S';
        personCliente.value                 = 'NUEVO';
        personCliente.style.backgroundColor = 'rgb(81, 206, 138)';
        personCliente.style.borderColor     = 'rgb(81, 206, 138)';
        btnSubmit.style.display             = '';

        if (xJSON.length > 0) {
            if (xJSON[0].persona_cliente === 'RECURRENTE') {
                workBuscaMotor.value                = 'N';
                personCliente.value                 = 'RECURRENTE';
                personCliente.style.backgroundColor = 'rgb(254, 200, 1)';
                personCliente.style.borderColor     = 'rgb(254, 200, 1)';
                btnSubmit.style.display             = 'none';
            }
    
            workModo.value          = 'U';
            personCuenta.value      = xJSON[0].persona_cuenta;
            personNomPri.value      = xJSON[0].persona_nombre_primer;
            personNomSeg.value      = xJSON[0].persona_nombre_segundo;
            personApePat.value      = xJSON[0].persona_apellido_paterno;
            personApeMat.value      = xJSON[0].persona_apellido_materno;

        } else {
            workModo.value          = 'C';
            personCliente.value     = 'NUEVO - SIN FICHA';
            personCuenta.value      = 0;
            personNomPri.value      = '';
            personNomSeg.value      = '';
            personApePat.value      = '';
            personApeMat.value      = '';
        }
    }
}

function consultMotor(personDocument) {
    $(function () {
        "use strict";
        $.ajax({
            url: urlBASE03+'/scarfos/lineaoferta/33/entidad/1/registrar/N/documento/'+personDocument+'/oferta/0',
            type: 'GET',
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Basic '+autBASE03);
            },
            xhr: function() {
                var xhr = $.ajaxSettings.xhr();
                xhr.upload.onprogress = function(e) {
                    console.log(Math.floor(e.loaded / e.total *100) + '%');
                };
                return xhr;
            },
            data: {},
            success: function (data) {
                if (data.code == 200) {
                    
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Cliente sin oferta.',
                        text:'Ahora mismo no contamos con una linea para el cliente.',
                        showConfirmButton: true,
                        confirmButtonText: 'Entiendo.'
                    }).then((result) => {
                        $(function () {
                            $("#modal-content").empty();
                            $('#modal-dialog').modal('toggle');
                         });
                    });
                }
                
            },
            error: function (e) {
                console.log('error', e);
            },
        });
    });
}

function validarTasa() {
    const workTasa      = document.getElementById('workPlazo');
    const solicPlazo    = document.getElementById('solicitud_plazo');
    const xJSON         = getDominio('WSCHEDUOSOLICITUDCUOTA');

    if (xJSON.length > 0) {
        xJSON.forEach(element => {
            if (element.tipo_parametro == solicPlazo.value) {
                workTasa.value = element.tipo_equivalencia;
            }
        });
    }
}