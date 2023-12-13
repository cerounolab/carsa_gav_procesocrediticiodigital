require('dotenv').config({ path:__dirname+'/./../../.env' });

const camelcaseKeys = require('camelcase-keys');

const {selectUSUARIOCAMPANHA}= require('../helpers/sql_select');
const {insertUSUCAM}= require('../helpers/sql_insert');
const {updateUSUCAM}= require('../helpers/sql_update');
const {deleteUSUCAM}= require('../helpers/sql_delete');
const {jsonBody}    = require('../utils/_json');
const {errorBody}   = require('../utils/_json');

//const affiliateId = process.env.ENV_AFFILIATEID;

const getUsuarioCampanha    = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];     
    let _codigo     = parseInt(apiREQ.params.empresa);

    if (_codigo != 'undefined' && _codigo != '' && _codigo != null && _codigo > 0){
        (async () => {
            const xDATA = await selectUSUARIOCAMPANHA(1, _codigo, '');
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

const getUsuarioCampanhaId  = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];
    let _codigo     = parseInt(apiREQ.params.codigousuario);
    let _codigo2    = parseInt(apiREQ.params.codigocampanha);
    let _codigo3    = parseInt(apiREQ.params.empresa);

    if (_codigo != 'undefined' && _codigo != '' && _codigo != null && _codigo > 0 && 
        _codigo2 != 'undefined' && _codigo2 != '' && _codigo2 != null && _codigo2 > 0 &&
        _codigo3 != 'undefined' && _codigo3 != '' && _codigo3 != null && _codigo3 > 0){

        (async () => {
            const xDATA = await selectUSUARIOCAMPANHA(2, _codigo, _codigo2, _codigo3);
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

const postUsuarioCampanha   = (apiREQ, apiRES) => {
    let  xDATA      =   []; 
    let _USUCAMEST   = (apiREQ.body.tipo_estado_parametro != undefined && apiREQ.body.tipo_estado_parametro != null && apiREQ.body.tipo_estado_parametro != '' && apiREQ.body.tipo_estado_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_estado_parametro) : false;   
    let _USUCAMUSC   = (apiREQ.body.usuario_codigo != undefined && apiREQ.body.usuario_codigo != null && apiREQ.body.usuario_codigo != '' && apiREQ.body.usuario_codigo > 0) ? Number.parseInt(apiREQ.body.usuario_codigo) : false; 
    let _USUCAMCAC   = (apiREQ.body.campanha_codigo != undefined && apiREQ.body.campanha_codigo != null && apiREQ.body.campanha_codigo != '' && apiREQ.body.campanha_codigo > 0) ? Number.parseInt(apiREQ.body.campanha_codigo) : false;   
    let _USUCAMEMC   = (apiREQ.body.empresa_codigo != undefined && apiREQ.body.empresa_codigo != null && apiREQ.body.empresa_codigo != '' && apiREQ.body.empresa_codigo > 0) ? Number.parseInt(apiREQ.body.empresa_codigo) : false;     
    let _USUCAMORD   = (apiREQ.body.usuario_campanha_orden != undefined && apiREQ.body.usuario_campanha_orden != null && apiREQ.body.usuario_campanha_orden != '') ? Number.parseInt(apiREQ.body.usuario_campanha_orden) : 999;   
    let _USUCAMOBS   = (apiREQ.body.usuario_campanha_observacion != undefined && apiREQ.body.usuario_campanha_observacion != null && apiREQ.body.usuario_campanha_observacion != '') ? "'"+apiREQ.body.usuario_campanha_observacion.trim()+"'" : null;

    let _USUCAMCEM   = (apiREQ.body.alta_empresa_codigo != undefined && apiREQ.body.alta_empresa_codigo != null && apiREQ.body.alta_empresa_codigo != '' && apiREQ.body.alta_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.alta_empresa_codigo) : false;   
    let _USUCAMCUS   = (apiREQ.body.alta_usuario != undefined && apiREQ.body.alta_usuario != null && apiREQ.body.alta_usuario != '') ? "'"+apiREQ.body.alta_usuario.trim().toUpperCase()+"'" : false;  
    let _USUCAMCIP   = (apiREQ.body.alta_ip != undefined && apiREQ.body.alta_ip != null && apiREQ.body.alta_ip != '') ? "'"+apiREQ.body.alta_ip.trim().toUpperCase()+"'" : false;  
    let _USUCAMCPR   = (apiREQ.body.alta_programa != undefined && apiREQ.body.alta_programa != null && apiREQ.body.alta_programa != '') ? "'"+apiREQ.body.alta_programa.trim().toUpperCase()+"'" : null; 

    let _USUCAMAEM   = (apiREQ.body.auditoria_empresa_codigo != undefined && apiREQ.body.auditoria_empresa_codigo != null && apiREQ.body.auditoria_empresa_codigo != '' && apiREQ.body.auditoria_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.auditoria_empresa_codigo) : false;   
    let _USUCAMAUS   = (apiREQ.body.auditoria_usuario != undefined && apiREQ.body.auditoria_usuario != null && apiREQ.body.auditoria_usuario != '') ? "'"+apiREQ.body.auditoria_usuario.trim().toUpperCase()+"'" : false;   
    let _USUCAMAIP   = (apiREQ.body.auditoria_ip != undefined && apiREQ.body.auditoria_ip != null && apiREQ.body.auditoria_ip != '') ? "'"+apiREQ.body.auditoria_ip.trim().toUpperCase()+"'" : false;   
    let _USUCAMAPR   = (apiREQ.body.auditoria_programa != undefined && apiREQ.body.auditoria_programa != null && apiREQ.body.auditoria_programa != '') ? "'"+apiREQ.body.auditoria_programa.trim()+"'" : false;   
    let _USUCAMAIN   = (apiREQ.body.auditoria_incidencia != undefined && apiREQ.body.auditoria_incidencia != null && apiREQ.body.auditoria_incidencia != '') ? "'"+apiREQ.body.auditoria_incidencia.trim()+"'" : null; 

    if (_USUCAMUSC && _USUCAMCAC && _USUCAMEST && _USUCAMEMC && _USUCAMCEM && _USUCAMCUS && _USUCAMCIP && _USUCAMCPR && _USUCAMAEM && _USUCAMAUS && _USUCAMAIP && _USUCAMAPR){
            (async () => {
                xDATA = await insertUSUCAM(_USUCAMUSC,
                _USUCAMCAC,
                _USUCAMEST,
                _USUCAMEMC,
                _USUCAMORD,
                _USUCAMOBS,
                _USUCAMCEM,
                _USUCAMCUS,
                _USUCAMCIP,
                _USUCAMCPR,
                _USUCAMAEM,
                _USUCAMAUS,
                _USUCAMAIP,
                _USUCAMAPR,
                _USUCAMAIN);

                _code   = xDATA[0];
                xJSON   = xDATA[1];

                if (_code == 200) {
                    xJSON = await jsonBody(_code, 'Success', null, 'Correcto', null, 0, 0, 0, 0, xJSON);

                } else if (_code == 404){
                    xJSON   = xDATA[1];
                    xJSON   = await jsonBody(_code, 'Error', 'postUsuarioCampanha', 'El registro ya existe', null, 0, 0, 0, 0, xJSON);
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
            xJSON   = await jsonBody(_code, 'Error', 'postUsuarioCampanha', 'Error: Verifique algún campo esta vacío', null, 0, 0, 0, 0, []);
            xJSON   = camelcaseKeys(xJSON, {deep: true});
            return apiRES.status(200).json(xJSON);
        })();
    
    }       

}

const putUsuarioCampanha    = (apiREQ, apiRES) => {
    let xDATA       =   []; 
    let _USUCAMUSC  = Number.parseInt(apiREQ.params.codigousuario);
    let _USUCAMCAC  = Number.parseInt(apiREQ.params.codigocampanha); 
    let _ACCION     = (apiREQ.body.tipo_accion_codigo != undefined && apiREQ.body.tipo_accion_codigo != null && apiREQ.body.tipo_accion_codigo != '' && apiREQ.body.tipo_accion_codigo > 0) ? Number.parseInt(apiREQ.body.tipo_accion_codigo) : false;
    let _USUCAMEST  = (apiREQ.body.tipo_estado_parametro != undefined && apiREQ.body.tipo_estado_parametro != null && apiREQ.body.tipo_estado_parametro != '' && apiREQ.body.tipo_estado_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_estado_parametro) : false;   
    let _USUCAMEMC  = (apiREQ.body.empresa_codigo != undefined && apiREQ.body.empresa_codigo != null && apiREQ.body.empresa_codigo != '' && apiREQ.body.empresa_codigo > 0) ? Number.parseInt(apiREQ.body.empresa_codigo) : false;     
    let _USUCAMORD  = (apiREQ.body.usuario_campanha_orden != undefined && apiREQ.body.usuario_campanha_orden != null && apiREQ.body.usuario_campanha_orden != '') ? Number.parseInt(apiREQ.body.usuario_campanha_orden) : 999;   
    let _USUCAMOBS  = (apiREQ.body.usuario_campanha_observacion != undefined && apiREQ.body.usuario_campanha_observacion != null && apiREQ.body.usuario_campanha_observacion != '') ? "'"+apiREQ.body.usuario_campanha_observacion.trim()+"'" : null;

    let _USUCAMCEM  = (apiREQ.body.alta_empresa_codigo != undefined && apiREQ.body.alta_empresa_codigo != null && apiREQ.body.alta_empresa_codigo != '' && apiREQ.body.alta_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.alta_empresa_codigo) : false;   
    let _USUCAMCUS  = (apiREQ.body.alta_usuario != undefined && apiREQ.body.alta_usuario != null && apiREQ.body.alta_usuario != '') ? "'"+apiREQ.body.alta_usuario.trim().toUpperCase()+"'" : false;  
    let _USUCAMCIP  = (apiREQ.body.alta_ip != undefined && apiREQ.body.alta_ip != null && apiREQ.body.alta_ip != '') ? "'"+apiREQ.body.alta_ip.trim().toUpperCase()+"'" : false;  
    let _USUCAMCPR  = (apiREQ.body.alta_programa != undefined && apiREQ.body.alta_programa != null && apiREQ.body.alta_programa != '') ? "'"+apiREQ.body.alta_programa.trim().toUpperCase()+"'" : null; 

    let _USUCAMAEM  = (apiREQ.body.auditoria_empresa_codigo != undefined && apiREQ.body.auditoria_empresa_codigo != null && apiREQ.body.auditoria_empresa_codigo != '' && apiREQ.body.auditoria_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.auditoria_empresa_codigo) : false;   
    let _USUCAMAUS  = (apiREQ.body.auditoria_usuario != undefined && apiREQ.body.auditoria_usuario != null && apiREQ.body.auditoria_usuario != '') ? "'"+apiREQ.body.auditoria_usuario.trim().toUpperCase()+"'" : false;   
    let _USUCAMAIP  = (apiREQ.body.auditoria_ip != undefined && apiREQ.body.auditoria_ip != null && apiREQ.body.auditoria_ip != '') ? "'"+apiREQ.body.auditoria_ip.trim().toUpperCase()+"'" : false;   
    let _USUCAMAPR  = (apiREQ.body.auditoria_programa != undefined && apiREQ.body.auditoria_programa != null && apiREQ.body.auditoria_programa != '') ? "'"+apiREQ.body.auditoria_programa.trim()+"'" : false;   
    let _USUCAMAIN  = (apiREQ.body.auditoria_incidencia != undefined && apiREQ.body.auditoria_incidencia != null && apiREQ.body.auditoria_incidencia != '') ? "'"+apiREQ.body.auditoria_incidencia.trim()+"'" : null; 

    if (_ACCION && _USUCAMUSC && _USUCAMCAC && _USUCAMEST && _USUCAMEMC && _USUCAMCEM && _USUCAMCUS && _USUCAMCIP && _USUCAMCPR && _USUCAMAEM && _USUCAMAUS && _USUCAMAIP && _USUCAMAPR){
        (async () => {
            xDATA = await updateUSUCAM(_ACCION,
            _USUCAMUSC,
            _USUCAMCAC,
            _USUCAMEST,
            _USUCAMEMC,
            _USUCAMORD,
            _USUCAMOBS,
            _USUCAMCEM,
            _USUCAMCUS,
            _USUCAMCIP,
            _USUCAMCPR,
            _USUCAMAEM,
            _USUCAMAUS,
            _USUCAMAIP,
            _USUCAMAPR,
            _USUCAMAIN);

            _code   = xDATA[0];
            xJSON   = xDATA[1];

            if (_code == 200) {
                xJSON = await jsonBody(_code, 'Success', null, 'Correcto', null, 0, 0, 0, 0, xJSON);

            } else if (_code == 404){
                xJSON   = xDATA[1];
                xJSON   = await jsonBody(_code, 'Error', 'putUsuarioCampanha', 'El registro ya existe', null, 0, 0, 0, 0, xJSON);
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
            xJSON   = await jsonBody(_code, 'Error', 'putUsuarioCampanha', 'Error: Verifique algún campo esta vacío', null, 0, 0, 0, 0, []);
            xJSON   = camelcaseKeys(xJSON, {deep: true});
            return apiRES.status(200).json(xJSON);
        })();

    }       

}

const deleteUsuarioCampanha = (apiREQ, apiRES) => {

    let xDATA       =   []; 
    let _USUCAMUSC  = Number.parseInt(apiREQ.params.codigousuario);
    let _USUCAMCAC  = Number.parseInt(apiREQ.params.codigocampanha); 
    let _ACCION     = (apiREQ.body.tipo_accion_codigo != undefined && apiREQ.body.tipo_accion_codigo != null && apiREQ.body.tipo_accion_codigo != '' && apiREQ.body.tipo_accion_codigo > 0) ? Number.parseInt(apiREQ.body.tipo_accion_codigo) : false;
    let _USUCAMEST  = (apiREQ.body.tipo_estado_parametro != undefined && apiREQ.body.tipo_estado_parametro != null && apiREQ.body.tipo_estado_parametro != '' && apiREQ.body.tipo_estado_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_estado_parametro) : false;   
    let _USUCAMEMC  = (apiREQ.body.empresa_codigo != undefined && apiREQ.body.empresa_codigo != null && apiREQ.body.empresa_codigo != '' && apiREQ.body.empresa_codigo > 0) ? Number.parseInt(apiREQ.body.empresa_codigo) : false;     
    let _USUCAMORD  = (apiREQ.body.usuario_rol_orden != undefined && apiREQ.body.usuario_rol_orden != null && apiREQ.body.usuario_rol_orden != '') ? Number.parseInt(apiREQ.body.usuario_rol_orden) : 999;   
    let _USUCAMOBS  = (apiREQ.body.usuario_rol_observacion != undefined && apiREQ.body.usuario_rol_observacion != null && apiREQ.body.usuario_rol_observacion != '') ? "'"+apiREQ.body.usuario_rol_observacion.trim()+"'" : null;

    let _USUCAMCEM  = (apiREQ.body.alta_empresa_codigo != undefined && apiREQ.body.alta_empresa_codigo != null && apiREQ.body.alta_empresa_codigo != '' && apiREQ.body.alta_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.alta_empresa_codigo) : false;   
    let _USUCAMCUS  = (apiREQ.body.alta_usuario != undefined && apiREQ.body.alta_usuario != null && apiREQ.body.alta_usuario != '') ? "'"+apiREQ.body.alta_usuario.trim().toUpperCase()+"'" : false;  
    let _USUCAMCIP  = (apiREQ.body.alta_ip != undefined && apiREQ.body.alta_ip != null && apiREQ.body.alta_ip != '') ? "'"+apiREQ.body.alta_ip.trim().toUpperCase()+"'" : false;  
    let _USUCAMCPR  = (apiREQ.body.alta_programa != undefined && apiREQ.body.alta_programa != null && apiREQ.body.alta_programa != '') ? "'"+apiREQ.body.alta_programa.trim().toUpperCase()+"'" : null; 

    let _USUCAMAEM  = (apiREQ.body.auditoria_empresa_codigo != undefined && apiREQ.body.auditoria_empresa_codigo != null && apiREQ.body.auditoria_empresa_codigo != '' && apiREQ.body.auditoria_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.auditoria_empresa_codigo) : false;   
    let _USUCAMAUS  = (apiREQ.body.auditoria_usuario != undefined && apiREQ.body.auditoria_usuario != null && apiREQ.body.auditoria_usuario != '') ? "'"+apiREQ.body.auditoria_usuario.trim().toUpperCase()+"'" : false;   
    let _USUCAMAIP  = (apiREQ.body.auditoria_ip != undefined && apiREQ.body.auditoria_ip != null && apiREQ.body.auditoria_ip != '') ? "'"+apiREQ.body.auditoria_ip.trim().toUpperCase()+"'" : false;   
    let _USUCAMAPR  = (apiREQ.body.auditoria_programa != undefined && apiREQ.body.auditoria_programa != null && apiREQ.body.auditoria_programa != '') ? "'"+apiREQ.body.auditoria_programa.trim()+"'" : false;   
    let _USUCAMAIN  = (apiREQ.body.auditoria_incidencia != undefined && apiREQ.body.auditoria_incidencia != null && apiREQ.body.auditoria_incidencia != '') ? "'"+apiREQ.body.auditoria_incidencia.trim()+"'" : null; 

    if (_ACCION && _USUCAMUSC && _USUCAMCAC && _USUCAMEST && _USUCAMEMC && _USUCAMCEM && _USUCAMCUS && _USUCAMCIP && _USUCAMCPR && _USUCAMAEM && _USUCAMAUS && _USUCAMAIP && _USUCAMAPR){

        (async () => {
            xDATA = await deleteUSUCAM(_USUCAMUSC, _USUCAMCAC);

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
            xJSON   = await jsonBody(_code, 'Error', 'deleteUsuarioCampanha', 'Error: Verifique algún campo esta vacío', null, 0, 0, 0, 0, []);
            xJSON   = camelcaseKeys(xJSON, {deep: true});
            return apiRES.status(200).json(xJSON);
        })();
    
    }       

}

module.exports  = {
    getUsuarioCampanha,
    getUsuarioCampanhaId,
    postUsuarioCampanha,
    putUsuarioCampanha,
    deleteUsuarioCampanha
}
