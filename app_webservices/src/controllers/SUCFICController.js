require('dotenv').config({ path:__dirname+'/./../../.env' });

const camelcaseKeys = require('camelcase-keys');

const {selectSUCURSAL}= require('../helpers/sql_select');
const {insertSUCFIC}= require('../helpers/sql_insert');
const {updateSUCFIC}= require('../helpers/sql_update');
const {deleteSUCFIC}= require('../helpers/sql_delete');
const {jsonBody}    = require('../utils/_json');
const {errorBody}   = require('../utils/_json');

//const affiliateId = process.env.ENV_AFFILIATEID;

const getSucursal    = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];     

    (async () => {
        const xDATA = await selectSUCURSAL(1, 0, '');
        _code       = xDATA[0];
        _dataJSON   = xDATA[1];

        if (_code == 200) {
            _dataJSON = await jsonBody(_code, 'Success', null, null, null, 0, 0, 0, 0, _dataJSON);

        } else {
            _dataJSON   = xDATA[1];
            _dataJSON   = await jsonBody(_code, 'Error', null, null, null, 0, 0, 0, 0, []);
        }

        _dataJSON = camelcaseKeys(_dataJSON, {deep: true});

        return apiRES.status(_code).json(_dataJSON);
    })();
}

const getSucursalId  = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];
    let _codigo     = parseInt(apiREQ.params.codigo);

    if (_codigo != 'undefined' && _codigo != '' && _codigo != null && _codigo > 0){

        (async () => {
            const xDATA = await selectSUCURSAL(2, _codigo, '');
            _code       = xDATA[0];
            _dataJSON   = xDATA[1];
    
            if (_code == 200) {
                _dataJSON = await jsonBody(_code, 'Success', null, null, null, 0, 0, 0, 0, _dataJSON);
    
            } else {
                _dataJSON   = xDATA[1];
                _dataJSON   = await jsonBody(_code, 'Error', null, null, null, 0, 0, 0, 0, []);
            }
    
            _dataJSON = camelcaseKeys(_dataJSON, {deep: true});
    
            return apiRES.status(_code).json(_dataJSON);
        })();

    }else{
        (async () => {
            _code       = 400;
            _dataJSON   = await errorBody(_code, 'Verifique, algún campo esta vacio.', true);

            return apiRES.status(_code).json(_dataJSON);
        })();
        
    }
}

const getSucursalEmpresaId   = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];
    let _codigo     = parseInt(apiREQ.params.empresa);

    if (_codigo != 'undefined' && _codigo > 0){

        (async () => {
            const xDATA = await selectSUCURSAL(3, _codigo, '');
            _code       = xDATA[0];
            _dataJSON   = xDATA[1];
    
            if (_code == 200) {
                _dataJSON = await jsonBody(_code, 'Success', null, null, null, 0, 0, 0, 0, _dataJSON);
    
            } else {
                _dataJSON   = xDATA[1];
                _dataJSON   = await jsonBody(_code, 'Error', null, null, null, 0, 0, 0, 0, []);
            }
    
            _dataJSON = camelcaseKeys(_dataJSON, {deep: true});
    
            return apiRES.status(_code).json(_dataJSON);
        })();

    }else{
        (async () => {
            _code       = 400;
            _dataJSON   = await errorBody(_code, 'Verifique, algún campo esta vacio.', true);

            return apiRES.status(_code).json(_dataJSON);
        })();
        
    }
}

const getEmpresaTipoSucursal = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];
    let _codigo     = parseInt(apiREQ.params.codigo);

    if (_valor != 'undefined' && _valor != ''){

        (async () => {
            const xDATA = await selectSUCURSAL(4, _codigo, '');
            _code       = xDATA[0];
            _dataJSON   = xDATA[1];
    
            if (_code == 200) {
                _dataJSON = await jsonBody(_code, 'Success', null, null, null, 0, 0, 0, 0, _dataJSON);
    
            } else {
                _dataJSON   = xDATA[1];
                _dataJSON   = await jsonBody(_code, 'Error', null, null, null, 0, 0, 0, 0, []);
            }
    
            _dataJSON = camelcaseKeys(_dataJSON, {deep: true});
    
            return apiRES.status(_code).json(_dataJSON);
        })();

    }else{
        (async () => {
            _code       = 400;
            _dataJSON   = await errorBody(_code, 'Verifique, algún campo esta vacio.', true);

            return apiRES.status(_code).json(_dataJSON);
        })();
        
    }
}

const postSucursal   = (apiREQ, apiRES) => {

    let  xDATA      =   []; 
    let _SUCFICEST  = (apiREQ.body.tipo_estado_parametro != undefined && apiREQ.body.tipo_estado_parametro != null && apiREQ.body.tipo_estado_parametro != '' && apiREQ.body.tipo_estado_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_estado_parametro) : false; 
    let _SUCFICTSC  = (apiREQ.body.tipo_sucursal_parametro != undefined && apiREQ.body.tipo_sucursal_parametro != null && apiREQ.body.tipo_sucursal_parametro != '' && apiREQ.body.tipo_sucursal_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_sucursal_parametro) : false; 
    let _SUCFICEMP  = (apiREQ.body.empresa_codigo != undefined && apiREQ.body.empresa_codigo != null && apiREQ.body.empresa_codigo != '' && apiREQ.body.empresa_codigo > 0) ? Number.parseInt(apiREQ.body.empresa_codigo) : false;  
    let _SUCFICORD  = (apiREQ.body.sucursal_orden != undefined && apiREQ.body.sucursal_orden != null && apiREQ.body.sucursal_orden != '') ? Number.parseInt(apiREQ.body.sucursal_orden) : 999;
    let _SUCFICNOM  = (apiREQ.body.sucursal_nombre != undefined && apiREQ.body.sucursal_nombre != null && apiREQ.body.sucursal_nombre != '') ? "'"+apiREQ.body.sucursal_nombre.trim()+"'" : false; 
    let _SUCFICTEL  = (apiREQ.body.sucursal_telefono != undefined && apiREQ.body.sucursal_telefono != null && apiREQ.body.sucursal_telefono != '') ? "'"+apiREQ.body.sucursal_telefono.trim().toLowerCase()+"'" : null;
    let _SUCFICCEL  = (apiREQ.body.sucursal_celular != undefined && apiREQ.body.sucursal_celular != null && apiREQ.body.sucursal_celular != '') ? "'"+apiREQ.body.sucursal_celular.trim().toLowerCase()+"'" : null;
    let _SUCFICCOR  = (apiREQ.body.sucursal_correo != undefined && apiREQ.body.sucursal_correo != null && apiREQ.body.sucursal_correo != '') ? "'"+apiREQ.body.sucursal_correo.trim().toLowerCase()+"'" : null;
    let _SUCFICUBI  = (apiREQ.body.sucursal_ubicacion != undefined && apiREQ.body.sucursal_ubicacion != null && apiREQ.body.sucursal_ubicacion != '') ? "'"+apiREQ.body.sucursal_ubicacion.trim()+"'" : null; 
    let _SUCFICDIR  = (apiREQ.body.sucursal_direccion != undefined && apiREQ.body.sucursal_direccion != null && apiREQ.body.sucursal_direccion != '') ? "'"+apiREQ.body.sucursal_direccion.trim()+"'" : null; 
    let _SUCFICOBS  = (apiREQ.body.sucursal_observacion != undefined && apiREQ.body.sucursal_observacion != null && apiREQ.body.sucursal_observacion != '') ? "'"+apiREQ.body.sucursal_observacion.trim()+"'" : null;

    let _SUCFICCEM  = (apiREQ.body.alta_empresa_codigo != undefined && apiREQ.body.alta_empresa_codigo != null && apiREQ.body.alta_empresa_codigo != '' && apiREQ.body.alta_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.alta_empresa_codigo) : false; 
    let _SUCFICCUS  = (apiREQ.body.alta_usuario != undefined && apiREQ.body.alta_usuario != null && apiREQ.body.alta_usuario != '') ? "'"+apiREQ.body.alta_usuario.trim().toUpperCase()+"'" : false;
    let _SUCFICCIP  = (apiREQ.body.alta_ip != undefined && apiREQ.body.alta_ip != null && apiREQ.body.alta_ip != '') ? "'"+apiREQ.body.alta_ip.trim().toUpperCase()+"'" : false;
    let _SUCFICCPR  = (apiREQ.body.alta_programa != undefined && apiREQ.body.alta_programa != null && apiREQ.body.alta_programa != '') ? "'"+apiREQ.body.alta_programa.trim()+"'" : false; 

    let _SUCFICAEM  = (apiREQ.body.auditoria_empresa_codigo != undefined && apiREQ.body.auditoria_empresa_codigo != null && apiREQ.body.auditoria_empresa_codigo != '' && apiREQ.body.auditoria_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.auditoria_empresa_codigo) : false; 
    let _SUCFICAUS  = (apiREQ.body.auditoria_usuario != undefined && apiREQ.body.auditoria_usuario != null && apiREQ.body.auditoria_usuario != '') ? "'"+apiREQ.body.auditoria_usuario.trim().toUpperCase()+"'" : false; 
    let _SUCFICAIP  = (apiREQ.body.auditoria_ip != undefined && apiREQ.body.auditoria_ip != null && apiREQ.body.auditoria_ip != '') ? "'"+apiREQ.body.auditoria_ip.trim().toUpperCase()+"'" : false; 
    let _SUCFICAPR  = (apiREQ.body.auditoria_programa != undefined && apiREQ.body.auditoria_programa != null && apiREQ.body.auditoria_programa != '') ? "'"+apiREQ.body.auditoria_programa.trim()+"'" : false; 
    let _SUCFICAIN  = (apiREQ.body.auditoria_incidencia != undefined && apiREQ.body.auditoria_incidencia != null && apiREQ.body.auditoria_incidencia != '') ? "'"+apiREQ.body.auditoria_incidencia.trim()+"'" : null;

    if (_SUCFICEST && _SUCFICTSC && _SUCFICEMP && _SUCFICNOM && _SUCFICCOR && _SUCFICCEM && _SUCFICCUS && _SUCFICCIP && _SUCFICCPR && _SUCFICAEM && _SUCFICAUS && _SUCFICAIP && _SUCFICAPR) {

        (async () => {
            xDATA = await insertSUCFIC(_SUCFICEST,
                _SUCFICTSC,
                _SUCFICEMP,
                _SUCFICORD,
                _SUCFICNOM,
                _SUCFICTEL,
                _SUCFICCEL,
                _SUCFICCOR,
                _SUCFICUBI,
                _SUCFICDIR,
                _SUCFICOBS,
                _SUCFICCEM,
                _SUCFICCUS,
                _SUCFICCIP,
                _SUCFICCPR,
                _SUCFICAEM,
                _SUCFICAUS,
                _SUCFICAIP,
                _SUCFICAPR,
                _SUCFICAIN);

            _code   = xDATA[0];
            xJSON   = xDATA[1];

            if (_code == 200) {
                xJSON = await jsonBody(_code, 'Success', null, null, null, 0, 0, 0, 0, xJSON);

            } else {
                xJSON   = xDATA[1];
                xJSON = await jsonBody(_code, 'Error', null, null, null, 0, 0, 0, 0, xJSON);
            }

            xJSON1 = camelcaseKeys(xJSON, {deep: true});

           return apiRES.status(_code).json(xJSON);

        })();

    }else{
        (async () => {
            _code   = 400;
            xJSON   = await errorBody(_code, 'Verifique, algún campo esta vacio.', true);

            return apiRES.status(_code).json(xJSON);
        })();
    
    }       

}

const putSucursal    = (apiREQ, apiRES) => {
    let xDATA       =   []; 
    let _SUCFICCOD  = Number.parseInt(apiREQ.params.codigo); 
    let _ACCION     = (apiREQ.body.tipo_accion_codigo != undefined && apiREQ.body.tipo_accion_codigo != null && apiREQ.body.tipo_accion_codigo != '' && apiREQ.body.tipo_accion_codigo > 0) ? Number.parseInt(apiREQ.body.tipo_accion_codigo) : false;
    let _SUCFICEST  = (apiREQ.body.tipo_estado_parametro != undefined && apiREQ.body.tipo_estado_parametro != null && apiREQ.body.tipo_estado_parametro != '' && apiREQ.body.tipo_estado_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_estado_parametro) : false; 
    let _SUCFICTSC  = (apiREQ.body.tipo_sucursal_parametro != undefined && apiREQ.body.tipo_sucursal_parametro != null && apiREQ.body.tipo_sucursal_parametro != '' && apiREQ.body.tipo_sucursal_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_sucursal_parametro) : false; 
    let _SUCFICEMP  = (apiREQ.body.empresa_codigo != undefined && apiREQ.body.empresa_codigo != null && apiREQ.body.empresa_codigo != '' && apiREQ.body.empresa_codigo > 0) ? Number.parseInt(apiREQ.body.empresa_codigo) : false;  
    let _SUCFICORD  = (apiREQ.body.sucursal_orden != undefined && apiREQ.body.sucursal_orden != null && apiREQ.body.sucursal_orden != '') ? Number.parseInt(apiREQ.body.sucursal_orden) : 999;
    let _SUCFICNOM  = (apiREQ.body.sucursal_nombre != undefined && apiREQ.body.sucursal_nombre != null && apiREQ.body.sucursal_nombre != '') ? "'"+apiREQ.body.sucursal_nombre.trim()+"'" : false; 
    let _SUCFICTEL  = (apiREQ.body.sucursal_telefono != undefined && apiREQ.body.sucursal_telefono != null && apiREQ.body.sucursal_telefono != '') ? "'"+apiREQ.body.sucursal_telefono.trim().toLowerCase()+"'" : null;
    let _SUCFICCEL  = (apiREQ.body.sucursal_celular != undefined && apiREQ.body.sucursal_celular != null && apiREQ.body.sucursal_celular != '') ? "'"+apiREQ.body.sucursal_celular.trim().toLowerCase()+"'" : null;
    let _SUCFICCOR  = (apiREQ.body.sucursal_correo != undefined && apiREQ.body.sucursal_correo != null && apiREQ.body.sucursal_correo != '') ? "'"+apiREQ.body.sucursal_correo.trim().toLowerCase()+"'" : null;
    let _SUCFICUBI  = (apiREQ.body.sucursal_ubicacion != undefined && apiREQ.body.sucursal_ubicacion != null && apiREQ.body.sucursal_ubicacion != '') ? "'"+apiREQ.body.sucursal_ubicacion.trim()+"'" : null; 
    let _SUCFICDIR  = (apiREQ.body.sucursal_direccion != undefined && apiREQ.body.sucursal_direccion != null && apiREQ.body.sucursal_direccion != '') ? "'"+apiREQ.body.sucursal_direccion.trim()+"'" : null; 
    let _SUCFICOBS  = (apiREQ.body.sucursal_observacion != undefined && apiREQ.body.sucursal_observacion != null && apiREQ.body.sucursal_observacion != '') ? "'"+apiREQ.body.sucursal_observacion.trim()+"'" : null;

    let _SUCFICCEM  = (apiREQ.body.alta_empresa_codigo != undefined && apiREQ.body.alta_empresa_codigo != null && apiREQ.body.alta_empresa_codigo != '' && apiREQ.body.alta_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.alta_empresa_codigo) : false; 
    let _SUCFICCUS  = (apiREQ.body.alta_usuario != undefined && apiREQ.body.alta_usuario != null && apiREQ.body.alta_usuario != '') ? "'"+apiREQ.body.alta_usuario.trim().toUpperCase()+"'" : false;
    let _SUCFICCIP  = (apiREQ.body.alta_ip != undefined && apiREQ.body.alta_ip != null && apiREQ.body.alta_ip != '') ? "'"+apiREQ.body.alta_ip.trim().toUpperCase()+"'" : false;
    let _SUCFICCPR  = (apiREQ.body.alta_programa != undefined && apiREQ.body.alta_programa != null && apiREQ.body.alta_programa != '') ? "'"+apiREQ.body.alta_programa.trim()+"'" : false; 

    let _SUCFICAEM  = (apiREQ.body.auditoria_empresa_codigo != undefined && apiREQ.body.auditoria_empresa_codigo != null && apiREQ.body.auditoria_empresa_codigo != '' && apiREQ.body.auditoria_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.auditoria_empresa_codigo) : false; 
    let _SUCFICAUS  = (apiREQ.body.auditoria_usuario != undefined && apiREQ.body.auditoria_usuario != null && apiREQ.body.auditoria_usuario != '') ? "'"+apiREQ.body.auditoria_usuario.trim().toUpperCase()+"'" : false; 
    let _SUCFICAIP  = (apiREQ.body.auditoria_ip != undefined && apiREQ.body.auditoria_ip != null && apiREQ.body.auditoria_ip != '') ? "'"+apiREQ.body.auditoria_ip.trim().toUpperCase()+"'" : false; 
    let _SUCFICAPR  = (apiREQ.body.auditoria_programa != undefined && apiREQ.body.auditoria_programa != null && apiREQ.body.auditoria_programa != '') ? "'"+apiREQ.body.auditoria_programa.trim()+"'" : false; 
    let _SUCFICAIN  = (apiREQ.body.auditoria_incidencia != undefined && apiREQ.body.auditoria_incidencia != null && apiREQ.body.auditoria_incidencia != '') ? "'"+apiREQ.body.auditoria_incidencia.trim()+"'" : null;

    

    if (_ACCION && _SUCFICCOD && _SUCFICEST && _SUCFICTSC && _SUCFICEMP && _SUCFICNOM && _SUCFICCOR && _SUCFICAEM && _SUCFICAUS && _SUCFICAIP && _SUCFICAPR) {

        (async () => {
            xDATA = await updateSUCFIC(_ACCION,
                _SUCFICCOD,
                _SUCFICEST,
                _SUCFICTSC,
                _SUCFICEMP,
                _SUCFICORD,
                _SUCFICNOM,
                _SUCFICTEL,
                _SUCFICCEL,
                _SUCFICCOR,
                _SUCFICUBI,
                _SUCFICDIR,
                _SUCFICOBS,
                _SUCFICAEM,
                _SUCFICAUS,
                _SUCFICAIP,
                _SUCFICAPR,
                _SUCFICAIN);

            _code   = xDATA[0];
            xJSON   = xDATA[1];

            if (_code == 200) {
                xJSON = await jsonBody(_code, 'Success', null, null, null, 0, 0, 0, 0, xJSON);

            } else {
                xJSON   = xDATA[1];
                xJSON = await jsonBody(_code, 'Error', null, null, null, 0, 0, 0, 0, xJSON);
            }

            xJSON1 = camelcaseKeys(xJSON, {deep: true});

           return apiRES.status(_code).json(xJSON);

        })();

    }else{
        (async () => {
            _code   = 400;
            xJSON   = await errorBody(_code, 'Verifique, algún campo esta vacio.', true);

            return apiRES.status(_code).json(xJSON);
        })();
    
    }       

}

const deleteSucursal = (apiREQ, apiRES) => {

    let xDATA       = [];
    let _SUCFICCOD  = Number.parseInt(apiREQ.params.codigo); 
    let _SUCFICEST  = (apiREQ.body.tipo_estado_parametro != undefined && apiREQ.body.tipo_estado_parametro != null && apiREQ.body.tipo_estado_parametro != '' && apiREQ.body.tipo_estado_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_estado_parametro) : false; 
    let _SUCFICTSC  = (apiREQ.body.tipo_sucursal_parametro != undefined && apiREQ.body.tipo_sucursal_parametro != null && apiREQ.body.tipo_sucursal_parametro != '' && apiREQ.body.tipo_sucursal_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_sucursal_parametro) : false; 
    let _SUCFICEMP  = (apiREQ.body.empresa_codigo != undefined && apiREQ.body.empresa_codigo != null && apiREQ.body.empresa_codigo != '' && apiREQ.body.empresa_codigo > 0) ? Number.parseInt(apiREQ.body.empresa_codigo) : false;  
    let _SUCFICORD  = (apiREQ.body.sucursal_orden != undefined && apiREQ.body.sucursal_orden != null && apiREQ.body.sucursal_orden != '') ? Number.parseInt(apiREQ.body.sucursal_orden) : 999;
    let _SUCFICNOM  = (apiREQ.body.sucursal_nombre != undefined && apiREQ.body.sucursal_nombre != null && apiREQ.body.sucursal_nombre != '') ? "'"+apiREQ.body.sucursal_nombre.trim()+"'" : false; 
    let _SUCFICTEL  = (apiREQ.body.sucursal_telefono != undefined && apiREQ.body.sucursal_telefono != null && apiREQ.body.sucursal_telefono != '') ? "'"+apiREQ.body.sucursal_telefono.trim().toLowerCase()+"'" : null;
    let _SUCFICCEL  = (apiREQ.body.sucursal_celular != undefined && apiREQ.body.sucursal_celular != null && apiREQ.body.sucursal_celular != '') ? "'"+apiREQ.body.sucursal_celular.trim().toLowerCase()+"'" : null;
    let _SUCFICCOR  = (apiREQ.body.sucursal_correo != undefined && apiREQ.body.sucursal_correo != null && apiREQ.body.sucursal_correo != '') ? "'"+apiREQ.body.sucursal_correo.trim().toLowerCase()+"'" : null;
    let _SUCFICUBI  = (apiREQ.body.sucursal_ubicacion != undefined && apiREQ.body.sucursal_ubicacion != null && apiREQ.body.sucursal_ubicacion != '') ? "'"+apiREQ.body.sucursal_ubicacion.trim()+"'" : null; 
    let _SUCFICDIR  = (apiREQ.body.sucursal_direccion != undefined && apiREQ.body.sucursal_direccion != null && apiREQ.body.sucursal_direccion != '') ? "'"+apiREQ.body.sucursal_direccion.trim()+"'" : null; 
    let _SUCFICOBS  = (apiREQ.body.sucursal_observacion != undefined && apiREQ.body.sucursal_observacion != null && apiREQ.body.sucursal_observacion != '') ? "'"+apiREQ.body.sucursal_observacion.trim()+"'" : null;

    let _SUCFICCEM  = (apiREQ.body.alta_empresa_codigo != undefined && apiREQ.body.alta_empresa_codigo != null && apiREQ.body.alta_empresa_codigo != '' && apiREQ.body.alta_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.alta_empresa_codigo) : false; 
    let _SUCFICCUS  = (apiREQ.body.alta_usuario != undefined && apiREQ.body.alta_usuario != null && apiREQ.body.alta_usuario != '') ? "'"+apiREQ.body.alta_usuario.trim().toUpperCase()+"'" : false;
    let _SUCFICCIP  = (apiREQ.body.alta_ip != undefined && apiREQ.body.alta_ip != null && apiREQ.body.alta_ip != '') ? "'"+apiREQ.body.alta_ip.trim().toUpperCase()+"'" : false;
    let _SUCFICCPR  = (apiREQ.body.alta_programa != undefined && apiREQ.body.alta_programa != null && apiREQ.body.alta_programa != '') ? "'"+apiREQ.body.alta_programa.trim()+"'" : false; 

    let _SUCFICAEM  = (apiREQ.body.auditoria_empresa_codigo != undefined && apiREQ.body.auditoria_empresa_codigo != null && apiREQ.body.auditoria_empresa_codigo != '' && apiREQ.body.auditoria_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.auditoria_empresa_codigo) : false; 
    let _SUCFICAUS  = (apiREQ.body.auditoria_usuario != undefined && apiREQ.body.auditoria_usuario != null && apiREQ.body.auditoria_usuario != '') ? "'"+apiREQ.body.auditoria_usuario.trim().toUpperCase()+"'" : false; 
    let _SUCFICAIP  = (apiREQ.body.auditoria_ip != undefined && apiREQ.body.auditoria_ip != null && apiREQ.body.auditoria_ip != '') ? "'"+apiREQ.body.auditoria_ip.trim().toUpperCase()+"'" : false; 
    let _SUCFICAPR  = (apiREQ.body.auditoria_programa != undefined && apiREQ.body.auditoria_programa != null && apiREQ.body.auditoria_programa != '') ? "'"+apiREQ.body.auditoria_programa.trim()+"'" : false; 
    let _SUCFICAIN  = (apiREQ.body.auditoria_incidencia != undefined && apiREQ.body.auditoria_incidencia != null && apiREQ.body.auditoria_incidencia != '') ? "'"+apiREQ.body.auditoria_incidencia.trim()+"'" : null;

  
    if (_SUCFICCOD && _SUCFICEST && _SUCFICTSC && _SUCFICEMP && _SUCFICNOM && _SUCFICCOR && _SUCFICAEM && _SUCFICAUS && _SUCFICAIP && _SUCFICAPR) {

        (async () => {
            xDATA = await deleteSUCFIC(_EMPFICCOD);

            _code   = xDATA[0];
            xJSON   = xDATA[1];

            if (_code == 200) {
                xJSON = await jsonBody(_code, 'Success', null, null, null, 0, 0, 0, 0, xJSON);

            } else {
                xJSON   = xDATA[1];
                xJSON = await jsonBody(_code, 'Error', null, null, null, 0, 0, 0, 0, xJSON);
            }

            xJSON1 = camelcaseKeys(xJSON, {deep: true});

           return apiRES.status(_code).json(xJSON);

        })();

    }else{
        (async () => {
            _code   = 400;
            xJSON   = await errorBody(_code, 'Verifique, algún campo esta vacio.', true);

            return apiRES.status(_code).json(xJSON);
        })();
    
    }       

}

module.exports  = {
    getSucursal,
    getSucursalId,
    getSucursalEmpresaId,
    getEmpresaTipoSucursal,
    postSucursal,
    putSucursal,
    deleteSucursal
}
