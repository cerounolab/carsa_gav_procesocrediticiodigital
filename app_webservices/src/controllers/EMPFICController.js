require('dotenv').config({ path:__dirname+'/./../../.env' });

const camelcaseKeys = require('camelcase-keys');

const {selectEMPRESA}= require('../helpers/sql_select');
const {insertEMPFIC}= require('../helpers/sql_insert');
const {updateEMPFIC}= require('../helpers/sql_update');
const {deleteEMPFIC}= require('../helpers/sql_delete');
const {jsonBody}    = require('../utils/_json');
const {errorBody}   = require('../utils/_json');


//const affiliateId = process.env.ENV_AFFILIATEID;

const getEmpresa    = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];   
    let _codigo     = parseInt(apiREQ.params.empresa); 

    if (_codigo != 'undefined' && _codigo != '' && _codigo != null && _codigo > 0){  

        (async () => {
            const xDATA = await selectEMPRESA(1, _codigo, '');
            _code       = xDATA[0];
            _dataJSON   = xDATA[1];

            if (_code == 200) {
                _dataJSON = await jsonBody(_code, 'Success', null, null, null, 0, 0, 0, 0, _dataJSON);

            } else if (_code == 404){
                _dataJSON   = xDATA[1];
                _dataJSON   = await jsonBody(_code, 'No hay registros', null, null, null, 0, 0, 0, 0, []);
            }else{
                _dataJSON   = xDATA[1];
                _dataJSON   = await jsonBody(_code, 'Error', null, null, null, 0, 0, 0, 0, []);
            }
            _dataJSON = camelcaseKeys(_dataJSON, {deep: true});

            return apiRES.status(200).json(_dataJSON);
    
        })();
    }else{
        (async () => {
            _code       = 400;            
            _dataJSON   = await jsonBody(_code, 'Error', 'getUsuarioLog', 'Error: Verifique algún campo esta vacío', null, 0, 0, 0, 0, []);
            _dataJSON   = camelcaseKeys(_dataJSON, {deep: true});
             return apiRES.status(200).json(_dataJSON);
        })();
    }
}

const getEmpresaId  = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];
    let _codigo     = parseInt(apiREQ.params.codigo);

    if (_codigo != 'undefined' && _codigo != '' && _codigo != null && _codigo > 0){

        (async () => {
            const xDATA = await selectEMPRESA(2, _codigo, '');
            _code       = xDATA[0];
            _dataJSON   = xDATA[1];
    
            if (_code == 200) {
                _dataJSON = await jsonBody(_code, 'Success', null, null, null, 0, 0, 0, 0, _dataJSON);

            } else if (_code == 404){
                _dataJSON   = xDATA[1];
                _dataJSON   = await jsonBody(_code, 'No hay registros', null, null, null, 0, 0, 0, 0, []);
            }else{
                _dataJSON   = xDATA[1];
                _dataJSON   = await jsonBody(_code, 'Error', null, null, null, 0, 0, 0, 0, []);
            }
    
            _dataJSON = camelcaseKeys(_dataJSON, {deep: true});
    
             return apiRES.status(200).json(_dataJSON);
        })();

    }else{
        (async () => {
            _code       = 400;
            _dataJSON   = await errorBody(_code, 'Verifique, algún campo esta vacio.', true);

             return apiRES.status(200).json(_dataJSON);
        })();
        
    }
}

const getEmpresaRUC = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];
    let _valor      = String(apiREQ.params.ruc).toUpperCase().trim();

    if (_valor != 'undefined' && _valor != ''){

        (async () => {
            const xDATA = await selectEMPRESA(3, 0, _valor);
            _code       = xDATA[0];
            _dataJSON   = xDATA[1];
    
            if (_code == 200) {
                _dataJSON = await jsonBody(_code, 'Success', null, null, null, 0, 0, 0, 0, _dataJSON);

            } else if (_code == 404){
                _dataJSON   = xDATA[1];
                _dataJSON   = await jsonBody(_code, 'No hay registros', null, null, null, 0, 0, 0, 0, []);
            }else{
                _dataJSON   = xDATA[1];
                _dataJSON   = await jsonBody(_code, 'Error', null, null, null, 0, 0, 0, 0, []);
            }
    
            _dataJSON = camelcaseKeys(_dataJSON, {deep: true});
    
             return apiRES.status(200).json(_dataJSON);
        })();

    }else{
        (async () => {
            _code       = 400;
            _dataJSON   = await errorBody(_code, 'Verifique, algún campo esta vacio.', true);

             return apiRES.status(200).json(_dataJSON);
        })();
        
    }
}

const getEmpresaTipoRubro   = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];
    let _codigo     = parseInt(apiREQ.params.tiporubro);

    if (_codigo != 'undefined' && _codigo > 0){

        (async () => {
            const xDATA = await selectEMPRESA(4, _codigo, '');
            _code       = xDATA[0];
            _dataJSON   = xDATA[1];
    
            if (_code == 200) {
                _dataJSON = await jsonBody(_code, 'Success', null, null, null, 0, 0, 0, 0, _dataJSON);

            } else if (_code == 404){
                _dataJSON   = xDATA[1];
                _dataJSON   = await jsonBody(_code, 'No hay registros', null, null, null, 0, 0, 0, 0, []);
            }else{
                _dataJSON   = xDATA[1];
                _dataJSON   = await jsonBody(_code, 'Error', null, null, null, 0, 0, 0, 0, []);
            }
    
            _dataJSON = camelcaseKeys(_dataJSON, {deep: true});
    
             return apiRES.status(200).json(_dataJSON);
        })();

    }else{
        (async () => {
            _code       = 400;
            _dataJSON   = await errorBody(_code, 'Verifique, algún campo esta vacio.', true);

             return apiRES.status(200).json(_dataJSON);
        })();
        
    }
}

const postEmpresa   = (apiREQ, apiRES) => {

    let xDATA       =  []; 
    let _EMPFICEST  = (apiREQ.body.tipo_estado_parametro != undefined && apiREQ.body.tipo_estado_parametro != null && apiREQ.body.tipo_estado_parametro != '' && apiREQ.body.tipo_estado_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_estado_parametro) : false; 
    let _EMPFICTRC  = (apiREQ.body.tipo_rubro_parametro != undefined && apiREQ.body.tipo_rubro_parametro != null && apiREQ.body.tipo_rubro_parametro != '' && apiREQ.body.tipo_rubro_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_rubro_parametro) : false; 
    let _EMPFICTAC  = (apiREQ.body.tipo_acceso_parametro != undefined && apiREQ.body.tipo_acceso_parametro != null && apiREQ.body.tipo_acceso_parametro != '' && apiREQ.body.tipo_acceso_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_acceso_parametro) : false;
    let _EMPFICORD  = (apiREQ.body.empresa_orden != undefined && apiREQ.body.empresa_orden != null && apiREQ.body.empresa_orden != '') ? Number.parseInt(apiREQ.body.empresa_orden) : 999;
    let _EMPFICNOM  = (apiREQ.body.empresa_nombre != undefined && apiREQ.body.empresa_nombre != null && apiREQ.body.empresa_nombre != '') ? "'"+apiREQ.body.empresa_nombre.trim()+"'" : false; 
    let _EMPFICRUC  = (apiREQ.body.empresa_ruc != undefined && apiREQ.body.empresa_ruc != null && apiREQ.body.empresa_ruc != '') ? "'"+apiREQ.body.empresa_ruc.trim().toUpperCase()+"'" : false; 
    let _EMPFICTEL  = (apiREQ.body.empresa_telefono != undefined && apiREQ.body.empresa_telefono != null && apiREQ.body.empresa_telefono != '') ? "'"+apiREQ.body.empresa_telefono.trim().toLowerCase()+"'" : null;
    let _EMPFICCEL  = (apiREQ.body.empresa_celular != undefined && apiREQ.body.empresa_celular != null && apiREQ.body.empresa_celular != '') ? "'"+apiREQ.body.empresa_celular.trim().toLowerCase()+"'" : null;
    let _EMPFICWEB  = (apiREQ.body.empresa_web != undefined && apiREQ.body.empresa_web != null && apiREQ.body.empresa_web != '') ? "'"+apiREQ.body.empresa_web.trim()+"'" : null;
    let _EMPFICCOR  = (apiREQ.body.empresa_correo != undefined && apiREQ.body.empresa_correo != null && apiREQ.body.empresa_correo != '') ? "'"+apiREQ.body.empresa_correo.trim().toLowerCase()+"'" : false;
    let _EMPFICUBI  = (apiREQ.body.empresa_ubicacion != undefined && apiREQ.body.empresa_ubicacion != null && apiREQ.body.empresa_ubicacion != '') ? "'"+apiREQ.body.empresa_ubicacion.trim()+"'" : null; 
    let _EMPFICDIR  = (apiREQ.body.empresa_direccion != undefined && apiREQ.body.empresa_direccion != null && apiREQ.body.empresa_direccion != '') ? "'"+apiREQ.body.empresa_direccion.trim()+"'" : null; 
    let _EMPFICLOG  = (apiREQ.body.empresa_logo != undefined && apiREQ.body.empresa_logo != null && apiREQ.body.empresa_logo != '') ? "'"+apiREQ.body.empresa_logo.trim()+"'" : null; 
    let _EMPFICVEC  = (apiREQ.body.empresa_venta_codigo != undefined && apiREQ.body.empresa_venta_codigo != null && apiREQ.body.empresa_venta_codigo != '' && apiREQ.body.empresa_venta_codigo > 0) ? Number.parseInt(apiREQ.body.empresa_venta_codigo) : false; 
    let _EMPFICTCN  = (apiREQ.body.empresa_cliente_nuevo != undefined && apiREQ.body.empresa_cliente_nuevo != null && apiREQ.body.empresa_cliente_nuevo != '') ? "'"+apiREQ.body.empresa_cliente_nuevo.trim().toUpperCase()+"'" : false; 
    let _EMPFICTCR  = (apiREQ.body.empresa_cliente_recurrente != undefined && apiREQ.body.empresa_cliente_recurrente != null && apiREQ.body.empresa_cliente_recurrente != '') ? "'"+apiREQ.body.empresa_cliente_recurrente.trim().toUpperCase()+"'" : false; 
    let _EMPFICOBS  = (apiREQ.body.empresa_observacion != undefined && apiREQ.body.empresa_observacion != null && apiREQ.body.empresa_observacion != '') ? "'"+apiREQ.body.empresa_observacion.trim()+"'" : null;
    
    let _EMPFICCEM  = (apiREQ.body.alta_empresa_codigo != undefined && apiREQ.body.alta_empresa_codigo != null && apiREQ.body.alta_empresa_codigo != '' && apiREQ.body.alta_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.alta_empresa_codigo) : false; 
    let _EMPFICCUS  = (apiREQ.body.alta_usuario != undefined && apiREQ.body.alta_usuario != null && apiREQ.body.alta_usuario != '') ? "'"+apiREQ.body.alta_usuario.trim().toUpperCase()+"'" : false;
    let _EMPFICCIP  = (apiREQ.body.alta_ip != undefined && apiREQ.body.alta_ip != null && apiREQ.body.alta_ip != '') ? "'"+apiREQ.body.alta_ip.trim().toUpperCase()+"'" : false;
    let _EMPFICCPR  = (apiREQ.body.alta_programa != undefined && apiREQ.body.alta_programa != null && apiREQ.body.alta_programa != '') ? "'"+apiREQ.body.alta_programa.trim()+"'" : false; 
    
    let _EMPFICAEM  = (apiREQ.body.auditoria_empresa_codigo != undefined && apiREQ.body.auditoria_empresa_codigo != null && apiREQ.body.auditoria_empresa_codigo != '' && apiREQ.body.auditoria_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.auditoria_empresa_codigo) : false; 
    let _EMPFICAUS  = (apiREQ.body.auditoria_usuario != undefined && apiREQ.body.auditoria_usuario != null && apiREQ.body.auditoria_usuario != '') ? "'"+apiREQ.body.auditoria_usuario.trim().toUpperCase()+"'" : false; 
    let _EMPFICAIP  = (apiREQ.body.auditoria_ip != undefined && apiREQ.body.auditoria_ip != null && apiREQ.body.auditoria_ip != '') ? "'"+apiREQ.body.auditoria_ip.trim().toUpperCase()+"'" : false; 
    let _EMPFICAPR  = (apiREQ.body.auditoria_programa != undefined && apiREQ.body.auditoria_programa != null && apiREQ.body.auditoria_programa != '') ? "'"+apiREQ.body.auditoria_programa.trim()+"'" : false; 
    let _EMPFICAIN  = (apiREQ.body.auditoria_incidencia != undefined && apiREQ.body.auditoria_incidencia != null && apiREQ.body.auditoria_incidencia != '') ? "'"+apiREQ.body.auditoria_incidencia.trim()+"'" : null;
  
    if (_EMPFICEST && _EMPFICTRC && _EMPFICTAC && _EMPFICNOM && _EMPFICRUC && _EMPFICCOR && _EMPFICVEC && _EMPFICTCN && _EMPFICTCR && _EMPFICCEM && _EMPFICCUS && _EMPFICCIP && _EMPFICCPR && _EMPFICAEM && _EMPFICAUS && _EMPFICAIP && _EMPFICAPR) {

        (async () => {
            xDATA = await insertEMPFIC(_EMPFICEST,
            _EMPFICTRC,
            _EMPFICTAC,
            _EMPFICORD,
            _EMPFICNOM,
            _EMPFICRUC,
            _EMPFICTEL,
            _EMPFICCEL,
            _EMPFICWEB,
            _EMPFICCOR,
            _EMPFICUBI,
            _EMPFICDIR,
            _EMPFICLOG,
            _EMPFICVEC,
            _EMPFICTCN,
            _EMPFICTCR,
            _EMPFICOBS,
            _EMPFICCEM,
            _EMPFICCUS,
            _EMPFICCIP,
            _EMPFICCPR,
            _EMPFICAEM,
            _EMPFICAUS,
            _EMPFICAIP,
            _EMPFICAPR,
            _EMPFICAIN);

            _code   = xDATA[0];
            xJSON   = xDATA[1];

            if (_code == 200) {
                xJSON = await jsonBody(_code, 'Success', null, 'Correcto', null, 0, 0, 0, 0, xJSON);

            } else if (_code == 404){
                xJSON   = xDATA[1];
                xJSON   = await jsonBody(_code, 'Error', 'postEmpresa', 'Error: El registro ya existe', null, 0, 0, 0, 0, xJSON);
            }else{
                xJSON   = xDATA[1];
                xJSON   = await jsonBody(_code, 'Error', xJSON.reference, null, xJSON.message, 0, 0, 0, 0, []);
            }

            xJSON = camelcaseKeys(xJSON, {deep: true});

           return apiRES.status(_code).json(xJSON);

        })();

    }else{
        (async () => {
            _code   = 400;
            xJSON   = await jsonBody(_code, 'Error', 'postEmpresa', 'Error: Verifique algún campo esta vacío', null, 0, 0, 0, 0, []);
            xJSON   = camelcaseKeys(xJSON, {deep: true});
            return apiRES.status(200).json(xJSON);
        })();
    
    }       

}

const putEmpresa    = (apiREQ, apiRES) => {

    let xDATA       = [];
    let _EMPFICCOD  = Number.parseInt(apiREQ.params.codigo); 
    let _ACCION     = (apiREQ.body.tipo_accion_codigo != undefined && apiREQ.body.tipo_accion_codigo != null && apiREQ.body.tipo_accion_codigo != '' && apiREQ.body.tipo_accion_codigo > 0) ? Number.parseInt(apiREQ.body.tipo_accion_codigo) : false;
    let _EMPFICEST  = (apiREQ.body.tipo_estado_parametro != undefined && apiREQ.body.tipo_estado_parametro != null && apiREQ.body.tipo_estado_parametro != '' && apiREQ.body.tipo_estado_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_estado_parametro) : false; 
    let _EMPFICTRC  = (apiREQ.body.tipo_rubro_parametro != undefined && apiREQ.body.tipo_rubro_parametro != null && apiREQ.body.tipo_rubro_parametro != '' && apiREQ.body.tipo_rubro_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_rubro_parametro) : false; 
    let _EMPFICTAC  = (apiREQ.body.tipo_acceso_parametro != undefined && apiREQ.body.tipo_acceso_parametro != null && apiREQ.body.tipo_acceso_parametro != '' && apiREQ.body.tipo_acceso_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_acceso_parametro) : false;
    let _EMPFICORD  = (apiREQ.body.empresa_orden != undefined && apiREQ.body.empresa_orden != null && apiREQ.body.empresa_orden != '') ? Number.parseInt(apiREQ.body.empresa_orden) : 999;
    let _EMPFICNOM  = (apiREQ.body.empresa_nombre != undefined && apiREQ.body.empresa_nombre != null && apiREQ.body.empresa_nombre != '') ? "'"+apiREQ.body.empresa_nombre.trim()+"'" : false; 
    let _EMPFICRUC  = (apiREQ.body.empresa_ruc != undefined && apiREQ.body.empresa_ruc != null && apiREQ.body.empresa_ruc != '') ? "'"+apiREQ.body.empresa_ruc.trim().toUpperCase()+"'" : false; 
    let _EMPFICTEL  = (apiREQ.body.empresa_telefono != undefined && apiREQ.body.empresa_telefono != null && apiREQ.body.empresa_telefono != '') ? "'"+apiREQ.body.empresa_telefono.trim().toLowerCase()+"'" : null;
    let _EMPFICCEL  = (apiREQ.body.empresa_celular != undefined && apiREQ.body.empresa_celular != null && apiREQ.body.empresa_celular != '') ? "'"+apiREQ.body.empresa_celular.trim().toLowerCase()+"'" : null;
    let _EMPFICWEB  = (apiREQ.body.empresa_web != undefined && apiREQ.body.empresa_web != null && apiREQ.body.empresa_web != '') ? "'"+apiREQ.body.empresa_web.trim()+"'" : null;
    let _EMPFICCOR  = (apiREQ.body.empresa_correo != undefined && apiREQ.body.empresa_correo != null && apiREQ.body.empresa_correo != '') ? "'"+apiREQ.body.empresa_correo.trim().toLowerCase()+"'" : false;
    let _EMPFICUBI  = (apiREQ.body.empresa_ubicacion != undefined && apiREQ.body.empresa_ubicacion != null && apiREQ.body.empresa_ubicacion != '') ? "'"+apiREQ.body.empresa_ubicacion.trim()+"'" : null; 
    let _EMPFICDIR  = (apiREQ.body.empresa_direccion != undefined && apiREQ.body.empresa_direccion != null && apiREQ.body.empresa_direccion != '') ? "'"+apiREQ.body.empresa_direccion.trim()+"'" : null; 
    let _EMPFICLOG  = (apiREQ.body.empresa_logo != undefined && apiREQ.body.empresa_logo != null && apiREQ.body.empresa_logo != '') ? "'"+apiREQ.body.empresa_logo.trim()+"'" : null; 
    let _EMPFICVEC  = (apiREQ.body.empresa_venta_codigo != undefined && apiREQ.body.empresa_venta_codigo != null && apiREQ.body.empresa_venta_codigo != '' && apiREQ.body.empresa_venta_codigo > 0) ? Number.parseInt(apiREQ.body.empresa_venta_codigo) : false; 
    let _EMPFICTCN  = (apiREQ.body.empresa_cliente_nuevo != undefined && apiREQ.body.empresa_cliente_nuevo != null && apiREQ.body.empresa_cliente_nuevo != '') ? "'"+apiREQ.body.empresa_cliente_nuevo.trim().toUpperCase()+"'" : false; 
    let _EMPFICTCR  = (apiREQ.body.empresa_cliente_recurrente != undefined && apiREQ.body.empresa_cliente_recurrente != null && apiREQ.body.empresa_cliente_recurrente != '') ? "'"+apiREQ.body.empresa_cliente_recurrente.trim().toUpperCase()+"'" : false; 
    let _EMPFICOBS  = (apiREQ.body.empresa_observacion != undefined && apiREQ.body.empresa_observacion != null && apiREQ.body.empresa_observacion != '') ? "'"+apiREQ.body.empresa_observacion.trim()+"'" : null;
    
    let _EMPFICCEM  = (apiREQ.body.alta_empresa_codigo != undefined && apiREQ.body.alta_empresa_codigo != null && apiREQ.body.alta_empresa_codigo != '' && apiREQ.body.alta_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.alta_empresa_codigo) : false; 
    let _EMPFICCUS  = (apiREQ.body.alta_usuario != undefined && apiREQ.body.alta_usuario != null && apiREQ.body.alta_usuario != '') ? "'"+apiREQ.body.alta_usuario.trim().toUpperCase()+"'" : false;
    let _EMPFICCIP  = (apiREQ.body.alta_ip != undefined && apiREQ.body.alta_ip != null && apiREQ.body.alta_ip != '') ? "'"+apiREQ.body.alta_ip.trim().toUpperCase()+"'" : false;
    let _EMPFICCPR  = (apiREQ.body.alta_programa != undefined && apiREQ.body.alta_programa != null && apiREQ.body.alta_programa != '') ? "'"+apiREQ.body.alta_programa.trim().toUpperCase()+"'" : false; 
    
    let _EMPFICAEM  = (apiREQ.body.auditoria_empresa_codigo != undefined && apiREQ.body.auditoria_empresa_codigo != null && apiREQ.body.auditoria_empresa_codigo != '' && apiREQ.body.auditoria_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.auditoria_empresa_codigo) : false; 
    let _EMPFICAUS  = (apiREQ.body.auditoria_usuario != undefined && apiREQ.body.auditoria_usuario != null && apiREQ.body.auditoria_usuario != '') ? "'"+apiREQ.body.auditoria_usuario.trim().toUpperCase()+"'" : false; 
    let _EMPFICAIP  = (apiREQ.body.auditoria_ip != undefined && apiREQ.body.auditoria_ip != null && apiREQ.body.auditoria_ip != '') ? "'"+apiREQ.body.auditoria_ip.trim().toUpperCase()+"'" : false; 
    let _EMPFICAPR  = (apiREQ.body.auditoria_programa != undefined && apiREQ.body.auditoria_programa != null && apiREQ.body.auditoria_programa != '') ? "'"+apiREQ.body.auditoria_programa.trim().toUpperCase()+"'" : false; 
    let _EMPFICAIN  = (apiREQ.body.auditoria_incidencia != undefined && apiREQ.body.auditoria_incidencia != null && apiREQ.body.auditoria_incidencia != '') ? "'"+apiREQ.body.auditoria_incidencia.trim()+"'" : null;
  
    if (_ACCION && _EMPFICCOD && _EMPFICEST && _EMPFICTRC && _EMPFICTAC && _EMPFICNOM && _EMPFICRUC && _EMPFICCOR && _EMPFICCEM && _EMPFICCUS && _EMPFICCIP && _EMPFICCPR && _EMPFICAEM && _EMPFICAUS && _EMPFICAIP && _EMPFICAPR) {

        (async () => {
            xDATA = await updateEMPFIC(_ACCION,
            _EMPFICCOD,
            _EMPFICEST,
            _EMPFICTRC,
            _EMPFICTAC,
            _EMPFICORD,
            _EMPFICNOM,
            _EMPFICRUC,
            _EMPFICTEL,
            _EMPFICCEL,
            _EMPFICWEB,
            _EMPFICCOR,
            _EMPFICUBI,
            _EMPFICDIR,
            _EMPFICLOG,
            _EMPFICVEC,
            _EMPFICTCN,
            _EMPFICTCR,
            _EMPFICOBS,
            _EMPFICAEM,
            _EMPFICAUS,
            _EMPFICAIP,
            _EMPFICAPR,
            _EMPFICAIN);

            _code   = xDATA[0];
            xJSON   = xDATA[1];

            if (_code == 200) {
                xJSON = await jsonBody(_code, 'Success', null, 'Correcto', null, 0, 0, 0, 0, xJSON);

            } else if (_code == 404){
                xJSON   = xDATA[1];
                xJSON   = await jsonBody(_code, 'Error', 'Eror: El registro ya existe', null, null, 0, 0, 0, 0, xJSON);
            }else{
                xJSON   = xDATA[1];
                xJSON   = await jsonBody(_code, 'Error', xJSON.reference, null, xJSON.message, 0, 0, 0, 0, []);
            }

            xJSON = camelcaseKeys(xJSON, {deep: true});

           return apiRES.status(_code).json(xJSON);

        })();

    }else{
        (async () => {
            _code   = 400;
            xJSON   = await jsonBody(_code, 'Error', 'putEmpresa', 'Error: Verifique algún campo esta vacío', null, 0, 0, 0, 0, []);
            xJSON   = camelcaseKeys(xJSON, {deep: true});
            return apiRES.status(200).json(xJSON);
        })();
    
    }       

}

const deleteEmpresa = (apiREQ, apiRES) => {

    let xDATA       = [];
    let _EMPFICCOD  = Number.parseInt(apiREQ.params.codigo); 
    let _ACCION     = (apiREQ.body.tipo_accion_codigo != undefined && apiREQ.body.tipo_accion_codigo != null && apiREQ.body.tipo_accion_codigo != '' && apiREQ.body.tipo_accion_codigo > 0) ? Number.parseInt(apiREQ.body.tipo_accion_codigo) : false;
    let _EMPFICEST  = (apiREQ.body.tipo_estado_parametro != undefined && apiREQ.body.tipo_estado_parametro != null && apiREQ.body.tipo_estado_parametro != '' && apiREQ.body.tipo_estado_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_estado_parametro) : false; 
    let _EMPFICTRC  = (apiREQ.body.tipo_rubro_parametro != undefined && apiREQ.body.tipo_rubro_parametro != null && apiREQ.body.tipo_rubro_parametro != '' && apiREQ.body.tipo_rubro_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_rubro_parametro) : false; 
    let _EMPFICTAC  = (apiREQ.body.tipo_acceso_parametro != undefined && apiREQ.body.tipo_acceso_parametro != null && apiREQ.body.tipo_acceso_parametro != '' && apiREQ.body.tipo_acceso_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_acceso_parametro) : false;
    let _EMPFICORD  = (apiREQ.body.empresa_orden != undefined && apiREQ.body.empresa_orden != null && apiREQ.body.empresa_orden != '') ? Number.parseInt(apiREQ.body.empresa_orden) : 999;
    let _EMPFICNOM  = (apiREQ.body.empresa_nombre != undefined && apiREQ.body.empresa_nombre != null && apiREQ.body.empresa_nombre != '') ? "'"+apiREQ.body.empresa_nombre.trim()+"'" : false; 
    let _EMPFICRUC  = (apiREQ.body.empresa_ruc != undefined && apiREQ.body.empresa_ruc != null && apiREQ.body.empresa_ruc != '') ? "'"+apiREQ.body.empresa_ruc.trim().toUpperCase()+"'" : false; 
    let _EMPFICTEL  = (apiREQ.body.empresa_telefono != undefined && apiREQ.body.empresa_telefono != null && apiREQ.body.empresa_telefono != '') ? "'"+apiREQ.body.empresa_telefono.trim().toLowerCase()+"'" : null;
    let _EMPFICCEL  = (apiREQ.body.empresa_celular != undefined && apiREQ.body.empresa_celular != null && apiREQ.body.empresa_celular != '') ? "'"+apiREQ.body.empresa_celular.trim().toLowerCase()+"'" : null;
    let _EMPFICWEB  = (apiREQ.body.empresa_web != undefined && apiREQ.body.empresa_web != null && apiREQ.body.empresa_web != '') ? "'"+apiREQ.body.empresa_web.trim()+"'" : null;
    let _EMPFICCOR  = (apiREQ.body.empresa_correo != undefined && apiREQ.body.empresa_correo != null && apiREQ.body.empresa_correo != '') ? "'"+apiREQ.body.empresa_correo.trim().toLowerCase()+"'" : false;
    let _EMPFICUBI  = (apiREQ.body.empresa_ubicacion != undefined && apiREQ.body.empresa_ubicacion != null && apiREQ.body.empresa_ubicacion != '') ? "'"+apiREQ.body.empresa_ubicacion.trim()+"'" : null; 
    let _EMPFICDIR  = (apiREQ.body.empresa_direccion != undefined && apiREQ.body.empresa_direccion != null && apiREQ.body.empresa_direccion != '') ? "'"+apiREQ.body.empresa_direccion.trim()+"'" : null; 
    let _EMPFICLOG  = (apiREQ.body.empresa_logo != undefined && apiREQ.body.empresa_logo != null && apiREQ.body.empresa_logo != '') ? "'"+apiREQ.body.empresa_logo.trim()+"'" : null; 
    let _EMPFICVEC  = (apiREQ.body.empresa_venta_codigo != undefined && apiREQ.body.empresa_venta_codigo != null && apiREQ.body.empresa_venta_codigo != '' && apiREQ.body.empresa_venta_codigo > 0) ? Number.parseInt(apiREQ.body.empresa_venta_codigo) : false; 
    let _EMPFICTCN  = (apiREQ.body.empresa_cliente_nuevo != undefined && apiREQ.body.empresa_cliente_nuevo != null && apiREQ.body.empresa_cliente_nuevo != '') ? "'"+apiREQ.body.empresa_cliente_nuevo.trim()+"'" : false; 
    let _EMPFICTCR  = (apiREQ.body.empresa_cliente_recurrente != undefined && apiREQ.body.empresa_cliente_recurrente != null && apiREQ.body.empresa_cliente_recurrente != '') ? "'"+apiREQ.body.empresa_cliente_recurrente.trim()+"'" : false; 
    let _EMPFICOBS  = (apiREQ.body.empresa_observacion != undefined && apiREQ.body.empresa_observacion != null && apiREQ.body.empresa_observacion != '') ? "'"+apiREQ.body.empresa_observacion.trim()+"'" : null;
    
    let _EMPFICCEM  = (apiREQ.body.alta_empresa_codigo != undefined && apiREQ.body.alta_empresa_codigo != null && apiREQ.body.alta_empresa_codigo != '' && apiREQ.body.alta_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.alta_empresa_codigo) : false; 
    let _EMPFICCUS  = (apiREQ.body.alta_usuario != undefined && apiREQ.body.alta_usuario != null && apiREQ.body.alta_usuario != '') ? "'"+apiREQ.body.alta_usuario.trim().toUpperCase()+"'" : false;
    let _EMPFICCIP  = (apiREQ.body.alta_ip != undefined && apiREQ.body.alta_ip != null && apiREQ.body.alta_ip != '') ? "'"+apiREQ.body.alta_ip.trim().toUpperCase()+"'" : false;
    let _EMPFICCPR  = (apiREQ.body.alta_programa != undefined && apiREQ.body.alta_programa != null && apiREQ.body.alta_programa != '') ? "'"+apiREQ.body.alta_programa.trim().toUpperCase()+"'" : false; 
    
    let _EMPFICAEM  = (apiREQ.body.auditoria_empresa_codigo != undefined && apiREQ.body.auditoria_empresa_codigo != null && apiREQ.body.auditoria_empresa_codigo != '' && apiREQ.body.auditoria_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.auditoria_empresa_codigo) : false; 
    let _EMPFICAUS  = (apiREQ.body.auditoria_usuario != undefined && apiREQ.body.auditoria_usuario != null && apiREQ.body.auditoria_usuario != '') ? "'"+apiREQ.body.auditoria_usuario.trim().toUpperCase()+"'" : false; 
    let _EMPFICAIP  = (apiREQ.body.auditoria_ip != undefined && apiREQ.body.auditoria_ip != null && apiREQ.body.auditoria_ip != '') ? "'"+apiREQ.body.auditoria_ip.trim().toUpperCase()+"'" : false; 
    let _EMPFICAPR  = (apiREQ.body.auditoria_programa != undefined && apiREQ.body.auditoria_programa != null && apiREQ.body.auditoria_programa != '') ? "'"+apiREQ.body.auditoria_programa.trim().toUpperCase()+"'" : false; 
    let _EMPFICAIN  = (apiREQ.body.auditoria_incidencia != undefined && apiREQ.body.auditoria_incidencia != null && apiREQ.body.auditoria_incidencia != '') ? "'"+apiREQ.body.auditoria_incidencia.trim()+"'" : null;
  
    if (_EMPFICCOD && _EMPFICEST && _EMPFICTRC && _EMPFICTAC && _EMPFICNOM && _EMPFICRUC && _EMPFICCOR && _EMPFICCEM && _EMPFICCUS && _EMPFICCIP && _EMPFICCPR && _EMPFICAEM && _EMPFICAUS && _EMPFICAIP && _EMPFICAPR) {

        (async () => {
            xDATA = await deleteEMPFIC(_EMPFICCOD);

            _code   = xDATA[0];
            xJSON   = xDATA[1];

            if (_code == 200) {
                xJSON = await jsonBody(_code, 'Success', null, 'Correcto', null, 0, 0, 0, 0, xJSON);

            } else {
                xJSON   = xDATA[1];
                xJSON   = await jsonBody(_code, 'Error', xJSON.reference, null, xJSON.message, 0, 0, 0, 0, []);
            }

            xJSON = camelcaseKeys(xJSON, {deep: true});

           return apiRES.status(_code).json(xJSON);

        })();

    }else{
        (async () => {
            _code   = 400;
            xJSON   = await jsonBody(_code, 'Error', 'deleteEmpresa', 'Error: Verifique algún campo esta vacío', null, 0, 0, 0, 0, []);
            xJSON   = camelcaseKeys(xJSON, {deep: true});
            return apiRES.status(_code).json(xJSON);
        })();
    
    }       

}

module.exports  = {
    getEmpresa,
    getEmpresaId,
    getEmpresaRUC,
    getEmpresaTipoRubro,
    postEmpresa,
    putEmpresa,
    deleteEmpresa
}
