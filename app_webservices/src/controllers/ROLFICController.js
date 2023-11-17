require('dotenv').config({ path:__dirname+'/./../../.env' });

const camelcaseKeys = require('camelcase-keys');

const {selectROL}= require('../helpers/sql_select');
const {insertROLFIC}= require('../helpers/sql_insert');
const {updateROLFIC}= require('../helpers/sql_update');
const {deleteROLFIC}= require('../helpers/sql_delete');
const {jsonBody}    = require('../utils/_json');
const {errorBody}   = require('../utils/_json');

//const affiliateId = process.env.ENV_AFFILIATEID;

const getRol    = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];     

    (async () => {
        const xDATA = await selectROL(1, 0, '');
        _code       = xDATA[0];
        _dataJSON   = xDATA[1];

        if (_code == 200) {
            _dataJSON = await jsonBody(_code, 'Success', null, null, null, 0, 0, 0, 0, _dataJSON);

        } else {
            _dataJSON   = xDATA[1];
        }

        _dataJSON = camelcaseKeys(_dataJSON, {deep: true});

        return apiRES.status(_code).json(_dataJSON);
    })();
}

const getRolId  = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];
    let _codigo     = parseInt(apiREQ.params.codigo);

    if (_codigo != 'undefined' && _codigo != '' && _codigo != null && _codigo > 0){

        (async () => {
            const xDATA = await selectROL(2, _codigo, '');
            _code       = xDATA[0];
            _dataJSON   = xDATA[1];
                
            if (_code == 200) {
                
                _dataJSON = await jsonBody(_code, 'Success', null, null, null, 0, 0, 0, 0, _dataJSON);
    
            } else {
                _dataJSON   = xDATA[1];
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

const getRolEmpresaId = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];
    let _codigo     = parseInt(apiREQ.params.empresa);

    if (_valor != 'undefined' && _valor != ''){

        (async () => {
            const xDATA = await selectROL(3, _codigo, '');
            _code       = xDATA[0];
            _dataJSON   = xDATA[1];
    
            if (_code == 200) {
                _dataJSON = await jsonBody(_code, 'Success', null, null, null, 0, 0, 0, 0, _dataJSON);
    
            } else {
                _dataJSON   = xDATA[1];
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

const postRol   = (apiREQ, apiRES) => {
    let  xDATA      =   []; 
    let _ROLFICEST  = (apiREQ.body.tipo_estado_parametro != undefined && apiREQ.body.tipo_estado_parametro != null && apiREQ.body.tipo_estado_parametro != '' && apiREQ.body.tipo_estado_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_estado_parametro) : false; 
    let _ROLFICEMC  = (apiREQ.body.empresa_codigo != undefined && apiREQ.body.empresa_codigo != null && apiREQ.body.empresa_codigo != '' && apiREQ.body.empresa_codigo > 0) ? Number.parseInt(apiREQ.body.empresa_codigo) : false;  
    let _ROLFICORD  = (apiREQ.body.rol_orden != undefined && apiREQ.body.rol_orden != null && apiREQ.body.rol_orden != '') ? Number.parseInt(apiREQ.body.rol_orden) : 999;
    let _ROLFICNOM  = (apiREQ.body.rol_nombre != undefined && apiREQ.body.rol_nombre != null && apiREQ.body.rol_nombre != '') ? "'"+apiREQ.body.rol_nombre.trim()+"'" : false; 
    let _ROLFICFDE  = (apiREQ.body.rol_fecha_desde != '') ? apiREQ.body.rol_fecha_desde: false; 
    let _ROLFICFHA  = (apiREQ.body.rol_fecha_hasta != '') ? apiREQ.body.rol_fecha_hasta: null;
    let _ROLFICEQU  = (apiREQ.body.rol_equivalencia != undefined && apiREQ.body.rol_equivalencia != null && apiREQ.body.rol_equivalencia != '') ? "'"+apiREQ.body.rol_equivalencia.trim()+"'" : null;
    let _ROLFICOBS  = (apiREQ.body.rol_observacion != undefined && apiREQ.body.rol_observacion != null && apiREQ.body.rol_observacion != '') ? "'"+apiREQ.body.rol_observacion.trim()+"'" : null;

    let _ROLFICCEM  = (apiREQ.body.alta_empresa_codigo != undefined && apiREQ.body.alta_empresa_codigo != null && apiREQ.body.alta_empresa_codigo != '' && apiREQ.body.alta_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.alta_empresa_codigo) : false; 
    let _ROLFICCUS  = (apiREQ.body.alta_usuario != undefined && apiREQ.body.alta_usuario != null && apiREQ.body.alta_usuario != '') ? "'"+apiREQ.body.alta_usuario.trim().toUpperCase()+"'" : false;
    let _ROLFICCIP  = (apiREQ.body.alta_ip != undefined && apiREQ.body.alta_ip != null && apiREQ.body.alta_ip != '') ? "'"+apiREQ.body.alta_ip.trim().toUpperCase()+"'" : false;
    let _ROLFICCPR  = (apiREQ.body.alta_programa != undefined && apiREQ.body.alta_programa != null && apiREQ.body.alta_programa != '') ? "'"+apiREQ.body.alta_programa.trim().toUpperCase()+"'" : null;

    let _ROLFICAEM  = (apiREQ.body.auditoria_empresa_codigo != undefined && apiREQ.body.auditoria_empresa_codigo != null && apiREQ.body.auditoria_empresa_codigo != '' && apiREQ.body.auditoria_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.auditoria_empresa_codigo) : false; 
    let _ROLFICAUS  = (apiREQ.body.auditoria_usuario != undefined && apiREQ.body.auditoria_usuario != null && apiREQ.body.auditoria_usuario != '') ? "'"+apiREQ.body.auditoria_usuario.trim().toUpperCase()+"'" : false; 
    let _ROLFICAIP  = (apiREQ.body.auditoria_ip != undefined && apiREQ.body.auditoria_ip != null && apiREQ.body.auditoria_ip != '') ? "'"+apiREQ.body.auditoria_ip.trim().toUpperCase()+"'" : false; 
    let _ROLFICAPR  = (apiREQ.body.auditoria_programa != undefined && apiREQ.body.auditoria_programa != null && apiREQ.body.auditoria_programa != '') ? "'"+apiREQ.body.auditoria_programa.trim()+"'" : false; 
    let _ROLFICAIN  = (apiREQ.body.auditoria_incidencia != undefined && apiREQ.body.auditoria_incidencia != null && apiREQ.body.auditoria_incidencia != '') ? "'"+apiREQ.body.auditoria_incidencia.trim()+"'" : null;

    if (_ROLFICEST && _ROLFICEMC && _ROLFICNOM && _ROLFICCEM && _ROLFICCUS && _ROLFICCIP && _ROLFICCPR && _ROLFICAEM && _ROLFICAUS && _ROLFICAIP && _ROLFICAPR){
            
            (async () => {
                    xDATA = await insertROLFIC(_ROLFICEST,
                    _ROLFICEMC,
                    _ROLFICORD,
                    _ROLFICNOM,
                    _ROLFICFDE,
                    _ROLFICFHA,
                    _ROLFICEQU,
                    _ROLFICOBS,
                    _ROLFICCEM,
                    _ROLFICCUS,
                    _ROLFICCIP,
                    _ROLFICCPR,
                    _ROLFICAEM,
                    _ROLFICAUS,
                    _ROLFICAIP,
                    _ROLFICAPR,
                    _ROLFICAIN);

                    _code   = xDATA[0];
                    xJSON   = xDATA[1];

                    if (_code == 200) {
                        xJSON = await jsonBody(_code, 'Success', null, null, null, 0, 0, 0, 0, xJSON);

                    } else {
                        xJSON   = xDATA[1];
                        xJSON   = await jsonBody(_code, 'Error', null, null, null, 0, 0, 0, 0, xJSON);
                    }

                    xJSON = camelcaseKeys(xJSON, {deep: true});

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

const putRol    = (apiREQ, apiRES) => {

    let xDATA       =   []; 
    let _ROLFICCOD  = Number.parseInt(apiREQ.params.codigo); 
    let _ACCION     = (apiREQ.body.tipo_accion_codigo != undefined && apiREQ.body.tipo_accion_codigo != null && apiREQ.body.tipo_accion_codigo != '' && apiREQ.body.tipo_accion_codigo > 0) ? Number.parseInt(apiREQ.body.tipo_accion_codigo) : false;
    let _ROLFICEST  = (apiREQ.body.tipo_estado_parametro != undefined && apiREQ.body.tipo_estado_parametro != null && apiREQ.body.tipo_estado_parametro != '' && apiREQ.body.tipo_estado_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_estado_parametro) : false; 
    let _ROLFICEMC  = (apiREQ.body.empresa_codigo != undefined && apiREQ.body.empresa_codigo != null && apiREQ.body.empresa_codigo != '' && apiREQ.body.empresa_codigo > 0) ? Number.parseInt(apiREQ.body.empresa_codigo) : false;  
    let _ROLFICORD  = (apiREQ.body.rol_orden != undefined && apiREQ.body.rol_orden != null && apiREQ.body.rol_orden != '') ? Number.parseInt(apiREQ.body.rol_orden) : 999;
    let _ROLFICNOM  = (apiREQ.body.rol_nombre != undefined && apiREQ.body.rol_nombre != null && apiREQ.body.rol_nombre != '') ? "'"+apiREQ.body.rol_nombre.trim()+"'" : false; 
    let _ROLFICFDE  = (apiREQ.body.rol_fecha_desde != '') ? apiREQ.body.rol_fecha_desde: null; 
    let _ROLFICFHA  = (apiREQ.body.rol_fecha_hasta != '') ? apiREQ.body.rol_fecha_hasta: null;
    let _ROLFICEQU  = (apiREQ.body.rol_equivalencia != undefined && apiREQ.body.rol_equivalencia != null && apiREQ.body.rol_equivalencia != '') ? "'"+apiREQ.body.rol_equivalencia.trim()+"'" : null;
    let _ROLFICOBS  = (apiREQ.body.rol_observacion != undefined && apiREQ.body.rol_observacion != null && apiREQ.body.rol_observacion != '') ? "'"+apiREQ.body.rol_observacion.trim()+"'" : null;

    let _ROLFICCEM  = (apiREQ.body.alta_empresa_codigo != undefined && apiREQ.body.alta_empresa_codigo != null && apiREQ.body.alta_empresa_codigo != '' && apiREQ.body.alta_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.alta_empresa_codigo) : false; 
    let _ROLFICCUS  = (apiREQ.body.alta_usuario != undefined && apiREQ.body.alta_usuario != null && apiREQ.body.alta_usuario != '') ? "'"+apiREQ.body.alta_usuario.trim().toUpperCase()+"'" : false;
    let _ROLFICCIP  = (apiREQ.body.alta_ip != undefined && apiREQ.body.alta_ip != null && apiREQ.body.alta_ip != '') ? "'"+apiREQ.body.alta_ip.trim().toUpperCase()+"'" : false;
    let _ROLFICCPR  = (apiREQ.body.alta_programa != undefined && apiREQ.body.alta_programa != null && apiREQ.body.alta_programa != '') ? "'"+apiREQ.body.alta_programa.trim().toUpperCase()+"'" : null;

    let _ROLFICAEM  = (apiREQ.body.auditoria_empresa_codigo != undefined && apiREQ.body.auditoria_empresa_codigo != null && apiREQ.body.auditoria_empresa_codigo != '' && apiREQ.body.auditoria_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.auditoria_empresa_codigo) : false; 
    let _ROLFICAUS  = (apiREQ.body.auditoria_usuario != undefined && apiREQ.body.auditoria_usuario != null && apiREQ.body.auditoria_usuario != '') ? "'"+apiREQ.body.auditoria_usuario.trim().toUpperCase()+"'" : false; 
    let _ROLFICAIP  = (apiREQ.body.auditoria_ip != undefined && apiREQ.body.auditoria_ip != null && apiREQ.body.auditoria_ip != '') ? "'"+apiREQ.body.auditoria_ip.trim().toUpperCase()+"'" : false; 
    let _ROLFICAPR  = (apiREQ.body.auditoria_programa != undefined && apiREQ.body.auditoria_programa != null && apiREQ.body.auditoria_programa != '') ? "'"+apiREQ.body.auditoria_programa.trim()+"'" : false; 
    let _ROLFICAIN  = (apiREQ.body.auditoria_incidencia != undefined && apiREQ.body.auditoria_incidencia != null && apiREQ.body.auditoria_incidencia != '') ? "'"+apiREQ.body.auditoria_incidencia.trim()+"'" : null;

    if (_ACCION && _ROLFICEST && _ROLFICEMC && _ROLFICNOM && _ROLFICFDE && _ROLFICCEM && _ROLFICCUS && _ROLFICCIP && _ROLFICCPR && _ROLFICAEM && _ROLFICAUS && _ROLFICAIP && _ROLFICAPR){

        (async () => {
                xDATA = await updateROLFIC(_ACCION,
                    _ROLFICCOD,
                    _ROLFICEST,
                    _ROLFICEMC,
                    _ROLFICORD,
                    _ROLFICNOM,
                    _ROLFICFDE,
                    _ROLFICFHA,
                    _ROLFICEQU,
                    _ROLFICOBS,
                    _ROLFICAEM,
                    _ROLFICAUS,
                    _ROLFICAIP,
                    _ROLFICAPR,
                    _ROLFICAIN);

                _code   = xDATA[0];
                xJSON   = xDATA[1];

                if (_code == 200) {
                    xJSON = await jsonBody(_code, 'Success', null, null, null, 0, 0, 0, 0, xJSON);

                } else {
                    xJSON   = xDATA[1];
                    xJSON   = await jsonBody(_code, 'Error', null, null, null, 0, 0, 0, 0, xJSON);
                }

                xJSON = camelcaseKeys(xJSON, {deep: true});

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

const deleteRol = (apiREQ, apiRES) => {

    let xDATA       =   []; 
    let _ROLFICCOD  = Number.parseInt(apiREQ.params.codigo); 
    let _ROLFICEST  = (apiREQ.body.tipo_estado_parametro != undefined && apiREQ.body.tipo_estado_parametro != null && apiREQ.body.tipo_estado_parametro != '' && apiREQ.body.tipo_estado_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_estado_parametro) : false; 
    let _ROLFICEMC  = (apiREQ.body.empresa_codigo != undefined && apiREQ.body.empresa_codigo != null && apiREQ.body.empresa_codigo != '' && apiREQ.body.empresa_codigo > 0) ? Number.parseInt(apiREQ.body.empresa_codigo) : false;  
    let _ROLFICORD  = (apiREQ.body.rol_orden != undefined && apiREQ.body.rol_orden != null && apiREQ.body.rol_orden != '') ? Number.parseInt(apiREQ.body.rol_orden) : 999;
    let _ROLFICNOM  = (apiREQ.body.rol_nombre != undefined && apiREQ.body.rol_nombre != null && apiREQ.body.rol_nombre != '') ? "'"+apiREQ.body.rol_nombre.trim()+"'" : false; 
    let _ROLFICFDE  = (apiREQ.body.rol_fecha_desde != '') ? apiREQ.body.rol_fecha_desde: null; 
    let _ROLFICFHA  = (apiREQ.body.rol_fecha_hasta != '') ? apiREQ.body.rol_fecha_hasta: null;
    let _ROLFICEQU  = (apiREQ.body.rol_equivalencia != undefined && apiREQ.body.rol_equivalencia != null && apiREQ.body.rol_equivalencia != '') ? "'"+apiREQ.body.rol_equivalencia.trim()+"'" : null;
    let _ROLFICOBS  = (apiREQ.body.rol_observacion != undefined && apiREQ.body.rol_observacion != null && apiREQ.body.rol_observacion != '') ? "'"+apiREQ.body.rol_observacion.trim()+"'" : null;

    let _ROLFICCEM  = (apiREQ.body.alta_empresa_codigo != undefined && apiREQ.body.alta_empresa_codigo != null && apiREQ.body.alta_empresa_codigo != '' && apiREQ.body.alta_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.alta_empresa_codigo) : false; 
    let _ROLFICCUS  = (apiREQ.body.alta_usuario != undefined && apiREQ.body.alta_usuario != null && apiREQ.body.alta_usuario != '') ? "'"+apiREQ.body.alta_usuario.trim().toUpperCase()+"'" : false;
    let _ROLFICCIP  = (apiREQ.body.alta_ip != undefined && apiREQ.body.alta_ip != null && apiREQ.body.alta_ip != '') ? "'"+apiREQ.body.alta_ip.trim().toUpperCase()+"'" : false;
    let _ROLFICCPR  = (apiREQ.body.alta_programa != undefined && apiREQ.body.alta_programa != null && apiREQ.body.alta_programa != '') ? "'"+apiREQ.body.alta_programa.trim().toUpperCase()+"'" : null;

    let _ROLFICAEM  = (apiREQ.body.auditoria_empresa_codigo != undefined && apiREQ.body.auditoria_empresa_codigo != null && apiREQ.body.auditoria_empresa_codigo != '' && apiREQ.body.auditoria_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.auditoria_empresa_codigo) : false; 
    let _ROLFICAUS  = (apiREQ.body.auditoria_usuario != undefined && apiREQ.body.auditoria_usuario != null && apiREQ.body.auditoria_usuario != '') ? "'"+apiREQ.body.auditoria_usuario.trim().toUpperCase()+"'" : false; 
    let _ROLFICAIP  = (apiREQ.body.auditoria_ip != undefined && apiREQ.body.auditoria_ip != null && apiREQ.body.auditoria_ip != '') ? "'"+apiREQ.body.auditoria_ip.trim().toUpperCase()+"'" : false; 
    let _ROLFICAPR  = (apiREQ.body.auditoria_programa != undefined && apiREQ.body.auditoria_programa != null && apiREQ.body.auditoria_programa != '') ? "'"+apiREQ.body.auditoria_programa.trim()+"'" : false; 
    let _ROLFICAIN  = (apiREQ.body.auditoria_incidencia != undefined && apiREQ.body.auditoria_incidencia != null && apiREQ.body.auditoria_incidencia != '') ? "'"+apiREQ.body.auditoria_incidencia.trim()+"'" : null;

    if (_ROLFICEST && _ROLFICEMC && _ROLFICNOM && _ROLFICFDE && _ROLFICCEM && _ROLFICCUS && _ROLFICCIP && _ROLFICCPR && _ROLFICAEM && _ROLFICAUS && _ROLFICAIP && _ROLFICAPR){

        (async () => {
            xDATA = await deleteROLFIC(_ROLFICCOD);

            _code   = xDATA[0];
            xJSON   = xDATA[1];

            if (_code == 200) {
                xJSON = await jsonBody(_code, 'Success', null, null, null, 0, 0, 0, 0, xJSON);

            } else {
                xJSON   = xDATA[1];
                xJSON = await jsonBody(_code, 'Error', null, null, null, 0, 0, 0, 0, xJSON);
            }

            xJSON = camelcaseKeys(xJSON, {deep: true});

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
    getRol,
    getRolId,
    getRolEmpresaId,
    postRol,
    putRol,
    deleteRol
}
