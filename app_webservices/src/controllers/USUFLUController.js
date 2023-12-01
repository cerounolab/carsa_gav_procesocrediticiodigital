require('dotenv').config({ path:__dirname+'/./../../.env' });

const camelcaseKeys = require('camelcase-keys');

const {selectUSUARIOFLUJO}= require('../helpers/sql_select');
const {insertUSUFLU}= require('../helpers/sql_insert');
const {updateUSUFLU}= require('../helpers/sql_update');
const {deleteUSUFLU}= require('../helpers/sql_delete');
const {jsonBody}    = require('../utils/_json');
const {errorBody}   = require('../utils/_json');

//const affiliateId = process.env.ENV_AFFILIATEID;

const getUsuarioFlujo   = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];     
    let _codigo     = parseInt(apiREQ.params.empresa);

    if (_codigo != 'undefined' && _codigo != '' && _codigo != null && _codigo > 0){
        (async () => {
            const xDATA = await selectUSUARIOFLUJO(1, _codigo, 0, 0, 0);
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

const getUsuarioFlujoUsuarioSup    = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];
    let _codigo     = parseInt(apiREQ.params.usuariosuperior);

    if (_codigo != 'undefined' && _codigo != '' && _codigo != null && _codigo > 0){
        (async () => {
            const xDATA = await selectUSUARIOFLUJO(2, _codigo, 0, 0, 0);
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

const getUsuarioFlujoUsuarioSub    = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];
    let _codigo     = parseInt(apiREQ.params.usuariosubordinado);

    if (_codigo != 'undefined' && _codigo != '' && _codigo != null && _codigo > 0){
        (async () => {
            const xDATA = await selectUSUARIOFLUJO(3, _codigo, 0, 0, 0);
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

const getUsuarioFlujoRolSup    = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];
    let _codigo     = parseInt(apiREQ.params.rolsuperior);

    if (_codigo != 'undefined' && _codigo != '' && _codigo != null && _codigo > 0){
        (async () => {
            const xDATA = await selectUSUARIOFLUJO(4, _codigo, 0, 0, 0);
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

const getUsuarioFlujoRolSub    = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];
    let _codigo     = parseInt(apiREQ.params.rolsubordinado);

    if (_codigo != 'undefined' && _codigo != '' && _codigo != null && _codigo > 0){
        (async () => {
            const xDATA = await selectUSUARIOFLUJO(5, _codigo, 0, 0, 0);
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

const getUsuarioFlujoId   = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];
    let _codigo     = parseInt(apiREQ.params.usuariosuperior);
    let _codigo2    = parseInt(apiREQ.params.rolsuperior);
    let _codigo3    = parseInt(apiREQ.params.usuariosubordinado);
    let _codigo4    = parseInt(apiREQ.params.rolsubordinado);

    if (_codigo > 0 && _codigo != 'undefined' && _codigo != '' && _codigo != null && _codigo > 0 &&
        _codigo2 != 'undefined' && _codigo2 != '' && _codigo2 != null && _codigo2 > 0 &&
        _codigo3 != 'undefined' && _codigo3 != '' && _codigo3 != null && _codigo3 > 0 &&
        _codigo4 != '' && _codigo4 != null && _codigo4 > 0){

        (async () => {
            const xDATA = await selectUSUARIOFLUJO(6, _codigo, _codigo2, _codigo3, _codigo4);
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

const postUsuarioFlujo  = (apiREQ, apiRES) => {
    let  xDATA      = []; 
    let _USUFLUUSC  = (apiREQ.body.usuario_superior_codigo != undefined && apiREQ.body.usuario_superior_codigo != null && apiREQ.body.usuario_superior_codigo != '' && apiREQ.body.usuario_superior_codigo > 0) ? Number.parseInt(apiREQ.body.usuario_superior_codigo) : false;  
    let _USUFLUUS1  = (apiREQ.body.usuario_subordinado_codigo != undefined && apiREQ.body.usuario_subordinado_codigo != null && apiREQ.body.usuario_subordinado_codigo != '' && apiREQ.body.usuario_subordinado_codigo > 0) ? Number.parseInt(apiREQ.body.usuario_subordinado_codigo) : false;   
    let _USUFLUROC  = (apiREQ.body.rol_superior_codigo != undefined && apiREQ.body.rol_superior_codigo != null && apiREQ.body.rol_superior_codigo != '' && apiREQ.body.rol_superior_codigo > 0) ? Number.parseInt(apiREQ.body.rol_superior_codigo) : false; 
    let _USUFLURO1  = (apiREQ.body.rol_subordinado_codigo != undefined && apiREQ.body.rol_subordinado_codigo != null && apiREQ.body.rol_subordinado_codigo != '' && apiREQ.body.rol_subordinado_codigo > 0) ? Number.parseInt(apiREQ.body.rol_subordinado_codigo) : false;   
    let _USUFLUEMC  = (apiREQ.body.empresa_codigo != undefined && apiREQ.body.empresa_codigo != null && apiREQ.body.empresa_codigo != '' && apiREQ.body.empresa_codigo > 0) ? Number.parseInt(apiREQ.body.empresa_codigo) : false;   
    let _USUFLUEST  = (apiREQ.body.tipo_estado_parametro != undefined && apiREQ.body.tipo_estado_parametro != null && apiREQ.body.tipo_estado_parametro != '' && apiREQ.body.tipo_estado_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_estado_parametro) : false; 
    let _USUFLUORD  = (apiREQ.body.usuario_flujo_orden != undefined && apiREQ.body.usuario_flujo_orden != null && apiREQ.body.usuario_flujo_orden != '') ? Number.parseInt(apiREQ.body.usuario_flujo_orden) : 999; 
    let _USUFLUOBS  =  (apiREQ.body.usuario_flujo_observacion != undefined && apiREQ.body.usuario_flujo_observacion != null && apiREQ.body.usuario_flujo_observacion != '') ? "'"+apiREQ.body.usuario_flujo_observacion.trim()+"'" : null;

    let _USUFLUCEM  = (apiREQ.body.alta_empresa_codigo != undefined && apiREQ.body.alta_empresa_codigo != null && apiREQ.body.alta_empresa_codigo != '' && apiREQ.body.alta_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.alta_empresa_codigo) : false; 
    let _USUFLUCUS  = (apiREQ.body.alta_usuario != undefined && apiREQ.body.alta_usuario != null && apiREQ.body.alta_usuario != '') ? "'"+apiREQ.body.alta_usuario.trim().toUpperCase()+"'" : false;
    let _USUFLUCIP  = (apiREQ.body.alta_ip != undefined && apiREQ.body.alta_ip != null && apiREQ.body.alta_ip != '') ? "'"+apiREQ.body.alta_ip.trim().toUpperCase()+"'" : false;
    let _USUFLUCPR  = (apiREQ.body.alta_programa != undefined && apiREQ.body.alta_programa != null && apiREQ.body.alta_programa != '') ? "'"+apiREQ.body.alta_programa.trim().toUpperCase()+"'" : null;
    
    let _USUFLUAEM  = (apiREQ.body.auditoria_empresa_codigo != undefined && apiREQ.body.auditoria_empresa_codigo != null && apiREQ.body.auditoria_empresa_codigo != '' && apiREQ.body.auditoria_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.auditoria_empresa_codigo) : false; 
    let _USUFLUAUS  = (apiREQ.body.auditoria_usuario != undefined && apiREQ.body.auditoria_usuario != null && apiREQ.body.auditoria_usuario != '') ? "'"+apiREQ.body.auditoria_usuario.trim().toUpperCase()+"'" : false; 
    let _USUFLUAIP  = (apiREQ.body.auditoria_ip != undefined && apiREQ.body.auditoria_ip != null && apiREQ.body.auditoria_ip != '') ? "'"+apiREQ.body.auditoria_ip.trim().toUpperCase()+"'" : false; 
    let _USUFLUAPR  = (apiREQ.body.auditoria_programa != undefined && apiREQ.body.auditoria_programa != null && apiREQ.body.auditoria_programa != '') ? "'"+apiREQ.body.auditoria_programa.trim()+"'" : false; 
    let _USUFLUAIN  = (apiREQ.body.auditoria_incidencia != undefined && apiREQ.body.auditoria_incidencia != null && apiREQ.body.auditoria_incidencia != '') ? "'"+apiREQ.body.auditoria_incidencia.trim()+"'" : null;

    if (_USUFLUUSC && _USUFLUUS1 && _USUFLUROC && _USUFLURO1 && _USUFLUEMC && _USUFLUEST &&  _USUFLUCEM && _USUFLUCUS && _USUFLUCIP && _USUFLUCPR && _USUFLUAEM && _USUFLUAUS && _USUFLUAIP && _USUFLUAPR){
            (async () => {
                xDATA = await insertUSUFLU(_USUFLUUSC, 
                _USUFLUROC, 
                _USUFLUEMC, 
                _USUFLURO1, 
                _USUFLUUS1, 
                _USUFLUEST, 
                _USUFLUORD, 
                _USUFLUOBS, 
                _USUFLUCEM, 
                _USUFLUCUS, 
                _USUFLUCIP, 
                _USUFLUCPR, 
                _USUFLUAEM, 
                _USUFLUAUS, 
                _USUFLUAIP, 
                _USUFLUAPR, 
                _USUFLUAIN);

                _code   = xDATA[0];
                xJSON   = xDATA[1];

                if (_code == 200) {
                    xJSON = await jsonBody(_code, 'Success', null, null, null, 0, 0, 0, 0, xJSON);

                } else if (_code == 404){
                    xJSON   = xDATA[1];
                    xJSON   = await jsonBody(_code, 'El registro ya existe', null, null, null, 0, 0, 0, 0, xJSON);
                }else{
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

const putUsuarioFlujo   = (apiREQ, apiRES) => {
    let xDATA       =   []; 
    let _USUFLUUSC  = Number.parseInt(apiREQ.params.usuariosuperior);
    let _USUFLUROC  = Number.parseInt(apiREQ.params.rolsuperior); 
    let _USUFLUUS1  = Number.parseInt(apiREQ.params.usuariosubordinado);
    let _USUFLURO1  = Number.parseInt(apiREQ.params.rolsubordinado);
    let _ACCION     = (apiREQ.body.tipo_accion_codigo != undefined && apiREQ.body.tipo_accion_codigo != null && apiREQ.body.tipo_accion_codigo != '' && apiREQ.body.tipo_accion_codigo > 0) ? Number.parseInt(apiREQ.body.tipo_accion_codigo) : false;
    let _USUFLUEMC  = (apiREQ.body.empresa_codigo != undefined && apiREQ.body.empresa_codigo != null && apiREQ.body.empresa_codigo != '' && apiREQ.body.empresa_codigo > 0) ? Number.parseInt(apiREQ.body.empresa_codigo) : false;   
    let _USUFLUEST  = (apiREQ.body.tipo_estado_parametro != undefined && apiREQ.body.tipo_estado_parametro != null && apiREQ.body.tipo_estado_parametro != '' && apiREQ.body.tipo_estado_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_estado_parametro) : false; 
    let _USUFLUORD  = (apiREQ.body.usuario_flujo_orden != undefined && apiREQ.body.usuario_flujo_orden != null && apiREQ.body.usuario_flujo_orden != '') ? Number.parseInt(apiREQ.body.usuario_flujo_orden) : 999; 
    let _USUFLUOBS  = (apiREQ.body.usuario_flujo_observacion != undefined && apiREQ.body.usuario_flujo_observacion != null && apiREQ.body.usuario_flujo_observacion != '') ? "'"+apiREQ.body.usuario_flujo_observacion.trim()+"'" : null;

    let _USUFLUCEM  = (apiREQ.body.alta_empresa_codigo != undefined && apiREQ.body.alta_empresa_codigo != null && apiREQ.body.alta_empresa_codigo != '' && apiREQ.body.alta_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.alta_empresa_codigo) : false; 
    let _USUFLUCUS  = (apiREQ.body.alta_usuario != undefined && apiREQ.body.alta_usuario != null && apiREQ.body.alta_usuario != '') ? "'"+apiREQ.body.alta_usuario.trim().toUpperCase()+"'" : false;
    let _USUFLUCIP  = (apiREQ.body.alta_ip != undefined && apiREQ.body.alta_ip != null && apiREQ.body.alta_ip != '') ? "'"+apiREQ.body.alta_ip.trim().toUpperCase()+"'" : false;
    let _USUFLUCPR  = (apiREQ.body.alta_programa != undefined && apiREQ.body.alta_programa != null && apiREQ.body.alta_programa != '') ? "'"+apiREQ.body.alta_programa.trim().toUpperCase()+"'" : null;
    
    let _USUFLUAEM  = (apiREQ.body.auditoria_empresa_codigo != undefined && apiREQ.body.auditoria_empresa_codigo != null && apiREQ.body.auditoria_empresa_codigo != '' && apiREQ.body.auditoria_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.auditoria_empresa_codigo) : false; 
    let _USUFLUAUS  = (apiREQ.body.auditoria_usuario != undefined && apiREQ.body.auditoria_usuario != null && apiREQ.body.auditoria_usuario != '') ? "'"+apiREQ.body.auditoria_usuario.trim().toUpperCase()+"'" : false; 
    let _USUFLUAIP  = (apiREQ.body.auditoria_ip != undefined && apiREQ.body.auditoria_ip != null && apiREQ.body.auditoria_ip != '') ? "'"+apiREQ.body.auditoria_ip.trim().toUpperCase()+"'" : false; 
    let _USUFLUAPR  = (apiREQ.body.auditoria_programa != undefined && apiREQ.body.auditoria_programa != null && apiREQ.body.auditoria_programa != '') ? "'"+apiREQ.body.auditoria_programa.trim()+"'" : false; 
    let _USUFLUAIN  = (apiREQ.body.auditoria_incidencia != undefined && apiREQ.body.auditoria_incidencia != null && apiREQ.body.auditoria_incidencia != '') ? "'"+apiREQ.body.auditoria_incidencia.trim()+"'" : null;

    if (_USUFLUUSC && _USUFLUUS1 && _USUFLUROC && _USUFLURO1 && _USUFLUEMC && _USUFLUEST &&  _USUFLUCEM && _USUFLUCUS && _USUFLUCIP && _USUFLUCPR && _USUFLUAEM && _USUFLUAUS && _USUFLUAIP && _USUFLUAPR){
        (async () => {
            xDATA = await updateUSUFLU(_ACCION,
            _USUFLUUSC, 
            _USUFLUROC, 
            _USUFLUEMC, 
            _USUFLURO1, 
            _USUFLUUS1, 
            _USUFLUEST, 
            _USUFLUORD, 
            _USUFLUOBS, 
            _USUFLUCEM, 
            _USUFLUCUS, 
            _USUFLUCIP, 
            _USUFLUCPR, 
            _USUFLUAEM, 
            _USUFLUAUS, 
            _USUFLUAIP, 
            _USUFLUAPR, 
            _USUFLUAIN);

            _code   = xDATA[0];
            xJSON   = xDATA[1];

            if (_code == 200) {
                xJSON   = await jsonBody(_code, 'Success', null, null, null, 0, 0, 0, 0, xJSON);

            } else if (_code == 404){
                xJSON   = xDATA[1];
                xJSON   = await jsonBody(_code, 'El registro ya existe', null, null, null, 0, 0, 0, 0, xJSON);
            }else{
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

const deleteUsuarioFlujo= (apiREQ, apiRES) => {
    let xDATA       =   []; 
    let _USUFLUUSC  = Number.parseInt(apiREQ.params.usuariosuperior);
    let _USUFLUROC  = Number.parseInt(apiREQ.params.rolsuperior); 
    let _USUFLUUS1  = Number.parseInt(apiREQ.params.usuariosubordinado);
    let _USUFLURO1  = Number.parseInt(apiREQ.params.rolsubordinado);
    let _ACCION     = (apiREQ.body.tipo_accion_codigo != undefined && apiREQ.body.tipo_accion_codigo != null && apiREQ.body.tipo_accion_codigo != '' && apiREQ.body.tipo_accion_codigo > 0) ? Number.parseInt(apiREQ.body.tipo_accion_codigo) : false;
    let _USUFLUEMC  = (apiREQ.body.empresa_codigo != undefined && apiREQ.body.empresa_codigo != null && apiREQ.body.empresa_codigo != '' && apiREQ.body.empresa_codigo > 0) ? Number.parseInt(apiREQ.body.empresa_codigo) : false;   
    let _USUFLUEST  = (apiREQ.body.tipo_estado_parametro != undefined && apiREQ.body.tipo_estado_parametro != null && apiREQ.body.tipo_estado_parametro != '' && apiREQ.body.tipo_estado_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_estado_parametro) : false; 
    let _USUFLUORD  = (apiREQ.body.usuario_flujo_orden != undefined && apiREQ.body.usuario_flujo_orden != null && apiREQ.body.usuario_flujo_orden != '') ? Number.parseInt(apiREQ.body.usuario_flujo_orden) : 999; 
    let _USUFLUOBS  =  (apiREQ.body.usuario_flujo_observacion != undefined && apiREQ.body.usuario_flujo_observacion != null && apiREQ.body.usuario_flujo_observacion != '') ? "'"+apiREQ.body.usuario_flujo_observacion.trim()+"'" : null;

    let _USUFLUCEM  = (apiREQ.body.alta_empresa_codigo != undefined && apiREQ.body.alta_empresa_codigo != null && apiREQ.body.alta_empresa_codigo != '' && apiREQ.body.alta_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.alta_empresa_codigo) : false; 
    let _USUFLUCUS  = (apiREQ.body.alta_usuario != undefined && apiREQ.body.alta_usuario != null && apiREQ.body.alta_usuario != '') ? "'"+apiREQ.body.alta_usuario.trim().toUpperCase()+"'" : false;
    let _USUFLUCIP  = (apiREQ.body.alta_ip != undefined && apiREQ.body.alta_ip != null && apiREQ.body.alta_ip != '') ? "'"+apiREQ.body.alta_ip.trim().toUpperCase()+"'" : false;
    let _USUFLUCPR  = (apiREQ.body.alta_programa != undefined && apiREQ.body.alta_programa != null && apiREQ.body.alta_programa != '') ? "'"+apiREQ.body.alta_programa.trim().toUpperCase()+"'" : null;
    
    let _USUFLUAEM  = (apiREQ.body.auditoria_empresa_codigo != undefined && apiREQ.body.auditoria_empresa_codigo != null && apiREQ.body.auditoria_empresa_codigo != '' && apiREQ.body.auditoria_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.auditoria_empresa_codigo) : false; 
    let _USUFLUAUS  = (apiREQ.body.auditoria_usuario != undefined && apiREQ.body.auditoria_usuario != null && apiREQ.body.auditoria_usuario != '') ? "'"+apiREQ.body.auditoria_usuario.trim().toUpperCase()+"'" : false; 
    let _USUFLUAIP  = (apiREQ.body.auditoria_ip != undefined && apiREQ.body.auditoria_ip != null && apiREQ.body.auditoria_ip != '') ? "'"+apiREQ.body.auditoria_ip.trim().toUpperCase()+"'" : false; 
    let _USUFLUAPR  = (apiREQ.body.auditoria_programa != undefined && apiREQ.body.auditoria_programa != null && apiREQ.body.auditoria_programa != '') ? "'"+apiREQ.body.auditoria_programa.trim()+"'" : false; 
    let _USUFLUAIN  = (apiREQ.body.auditoria_incidencia != undefined && apiREQ.body.auditoria_incidencia != null && apiREQ.body.auditoria_incidencia != '') ? "'"+apiREQ.body.auditoria_incidencia.trim()+"'" : null;

    if (_USUFLUUSC && _USUFLUUS1 && _USUFLUROC && _USUFLURO1 && _USUFLUEMC && _USUFLUEST &&  _USUFLUCEM && _USUFLUCUS && _USUFLUCIP && _USUFLUCPR && _USUFLUAEM && _USUFLUAUS && _USUFLUAIP && _USUFLUAPR){
       
        (async () => {
            xDATA = await deleteUSUFLU(_USUFLUUSC, 
            _USUFLUROC,  
            _USUFLURO1, 
            _USUFLUUS1);

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
    getUsuarioFlujo,
    getUsuarioFlujoUsuarioSup,
    getUsuarioFlujoUsuarioSub,
    getUsuarioFlujoRolSup,
    getUsuarioFlujoRolSub,
    getUsuarioFlujoId,
    postUsuarioFlujo,
    putUsuarioFlujo,
    deleteUsuarioFlujo
}
