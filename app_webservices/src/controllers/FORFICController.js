require('dotenv').config({ path:__dirname+'/./../../.env' });

const camelcaseKeys = require('camelcase-keys');

const {selectFORMULARIO}= require('../helpers/sql_select');
const {insertFORFIC}= require('../helpers/sql_insert');
const {updateFORFIC}= require('../helpers/sql_update');
const {deleteFORFIC}= require('../helpers/sql_delete');
const {jsonBody}    = require('../utils/_json');
const {errorBody}   = require('../utils/_json');

//const affiliateId = process.env.ENV_AFFILIATEID;

const getFormulario   = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];     
    let _codigo     = parseInt(apiREQ.params.empresa); 

    if (_codigo != 'undefined' && _codigo != '' && _codigo != null && _codigo > 0){
        (async () => {
            const xDATA = await selectFORMULARIO(1, _codigo, '');
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

const getFormularioId  = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];
    let _codigo     = parseInt(apiREQ.params.codigo);

    if (_codigo != 'undefined' && _codigo != '' && _codigo != null && _codigo > 0){

        (async () => {
            const xDATA = await selectFORMULARIO(2, _codigo, '');
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

const getFormularioEmpresaId  = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];
    let _codigo     = parseInt(apiREQ.params.empresa);

    if (_codigo != 'undefined' && _codigo != '' && _codigo != null && _codigo > 0){

        (async () => {
            const xDATA = await selectFORMULARIO(2, _codigo, '');
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

const postFormulario  = (apiREQ, apiRES) => {
    let  xDATA      =   []; 
    let _FORFICEST  = (apiREQ.body.tipo_estado_parametro != undefined && apiREQ.body.tipo_estado_parametro != null && apiREQ.body.tipo_estado_parametro != '' && apiREQ.body.tipo_estado_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_estado_parametro) : false;   																						    	  
    let _FORFICEMC  = (apiREQ.body.empresa_codigo != undefined && apiREQ.body.empresa_codigo != null && apiREQ.body.empresa_codigo != '' && apiREQ.body.empresa_codigo > 0) ? Number.parseInt(apiREQ.body.empresa_codigo) : false;    	 	  
    let _FORFICORD  = (apiREQ.body.formulario_orden != undefined && apiREQ.body.formulario_orden != null && apiREQ.body.formulario_orden != '') ? Number.parseInt(apiREQ.body.formulario_orden) : 999;   	    
    let _FORFICNOM  = (apiREQ.body.formulario_nombre != undefined && apiREQ.body.formulario_nombre != null && apiREQ.body.formulario_nombre != '') ? "'"+apiREQ.body.formulario_nombre.trim()+"'" : false;   	
    let _FORFICURL  = (apiREQ.body.formulario_url != undefined && apiREQ.body.formulario_url != null && apiREQ.body.formulario_url != '') ? "'"+apiREQ.body.formulario_url.trim()+"'" : false;     	   
    let _FORFICOBS  = (apiREQ.body.formulario_observacion != undefined && apiREQ.body.formulario_observacion != null && apiREQ.body.formulario_observacion != '') ? "'"+apiREQ.body.formulario_observacion.trim()+"'" : null;

    let _FORFICCEM  = (apiREQ.body.alta_empresa_codigo != undefined && apiREQ.body.alta_empresa_codigo != null && apiREQ.body.alta_empresa_codigo != '' && apiREQ.body.alta_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.alta_empresa_codigo) : false; 	  
    let _FORFICCUS  = (apiREQ.body.alta_usuario != undefined && apiREQ.body.alta_usuario != null && apiREQ.body.alta_usuario != '') ? "'"+apiREQ.body.alta_usuario.trim().toUpperCase()+"'" : false;    
    let _FORFICCIP  = (apiREQ.body.alta_ip != undefined && apiREQ.body.alta_ip != null && apiREQ.body.alta_ip != '') ? "'"+apiREQ.body.alta_ip.trim().toUpperCase()+"'" : false;   
    let _FORFICCPR  = (apiREQ.body.alta_programa != undefined && apiREQ.body.alta_programa != null && apiREQ.body.alta_programa != '') ? "'"+apiREQ.body.alta_programa.trim().toUpperCase()+"'" : null;	  
    
    let _FORFICAEM  = (apiREQ.body.auditoria_empresa_codigo != undefined && apiREQ.body.auditoria_empresa_codigo != null && apiREQ.body.auditoria_empresa_codigo != '' && apiREQ.body.auditoria_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.auditoria_empresa_codigo) : false;  	  
    let _FORFICAUS  = (apiREQ.body.auditoria_usuario != undefined && apiREQ.body.auditoria_usuario != null && apiREQ.body.auditoria_usuario != '') ? "'"+apiREQ.body.auditoria_usuario.trim().toUpperCase()+"'" : false;     
    let _FORFICAIP  = (apiREQ.body.auditoria_ip != undefined && apiREQ.body.auditoria_ip != null && apiREQ.body.auditoria_ip != '') ? "'"+apiREQ.body.auditoria_ip.trim().toUpperCase()+"'" : false;  	
    let _FORFICAPR  = (apiREQ.body.auditoria_programa != undefined && apiREQ.body.auditoria_programa != null && apiREQ.body.auditoria_programa != '') ? "'"+apiREQ.body.auditoria_programa.trim()+"'" : false;  
    let _FORFICAIN  = (apiREQ.body.auditoria_incidencia != undefined && apiREQ.body.auditoria_incidencia != null && apiREQ.body.auditoria_incidencia != '') ? "'"+apiREQ.body.auditoria_incidencia.trim()+"'" : null;

    if (_FORFICEST && _FORFICEMC && _FORFICNOM && _FORFICURL && _FORFICCEM && _FORFICCUS && _FORFICCIP && _FORFICCPR && _FORFICAEM && _FORFICAUS && _FORFICAIP && _FORFICAPR){

            (async () => {
                    xDATA = await insertFORFIC(_FORFICEST,
                    _FORFICEMC,
                    _FORFICORD,
                    _FORFICNOM,
                    _FORFICURL,
                    _FORFICOBS,
                    _FORFICCEM,
                    _FORFICCUS,
                    _FORFICCIP,
                    _FORFICCPR,
                    _FORFICAEM,
                    _FORFICAUS,
                    _FORFICAIP,
                    _FORFICAPR,
                    _FORFICAIN);

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

const putFormulario    = (apiREQ, apiRES) => {

    let xDATA       =   []; 
    let _FORFICCOD  = Number.parseInt(apiREQ.params.codigo); 
    let _ACCION     = (apiREQ.body.tipo_accion_codigo != undefined && apiREQ.body.tipo_accion_codigo != null && apiREQ.body.tipo_accion_codigo != '' && apiREQ.body.tipo_accion_codigo > 0) ? Number.parseInt(apiREQ.body.tipo_accion_codigo) : false;
    let _FORFICEST  = (apiREQ.body.tipo_estado_parametro != undefined && apiREQ.body.tipo_estado_parametro != null && apiREQ.body.tipo_estado_parametro != '' && apiREQ.body.tipo_estado_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_estado_parametro) : false;   																						    	  
    let _FORFICEMC  = (apiREQ.body.empresa_codigo != undefined && apiREQ.body.empresa_codigo != null && apiREQ.body.empresa_codigo != '' && apiREQ.body.empresa_codigo > 0) ? Number.parseInt(apiREQ.body.empresa_codigo) : false;    	 	  
    let _FORFICORD  = (apiREQ.body.formulario_orden != undefined && apiREQ.body.formulario_orden != null && apiREQ.body.formulario_orden != '') ? Number.parseInt(apiREQ.body.formulario_orden) : 999;   	    
    let _FORFICNOM  = (apiREQ.body.formulario_nombre != undefined && apiREQ.body.formulario_nombre != null && apiREQ.body.formulario_nombre != '') ? "'"+apiREQ.body.formulario_nombre.trim()+"'" : false;   	
    let _FORFICURL  = (apiREQ.body.formulario_url != undefined && apiREQ.body.formulario_url != null && apiREQ.body.formulario_url != '') ? "'"+apiREQ.body.formulario_url.trim()+"'" : false;     	   
    let _FORFICOBS  = (apiREQ.body.formulario_observacion != undefined && apiREQ.body.formulario_observacion != null && apiREQ.body.formulario_observacion != '') ? "'"+apiREQ.body.formulario_observacion.trim()+"'" : null;

    let _FORFICCEM  = (apiREQ.body.alta_empresa_codigo != undefined && apiREQ.body.alta_empresa_codigo != null && apiREQ.body.alta_empresa_codigo != '' && apiREQ.body.alta_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.alta_empresa_codigo) : false; 	  
    let _FORFICCUS  = (apiREQ.body.alta_usuario != undefined && apiREQ.body.alta_usuario != null && apiREQ.body.alta_usuario != '') ? "'"+apiREQ.body.alta_usuario.trim().toUpperCase()+"'" : false;    
    let _FORFICCIP  = (apiREQ.body.alta_ip != undefined && apiREQ.body.alta_ip != null && apiREQ.body.alta_ip != '') ? "'"+apiREQ.body.alta_ip.trim().toUpperCase()+"'" : false;   
    let _FORFICCPR  = (apiREQ.body.alta_programa != undefined && apiREQ.body.alta_programa != null && apiREQ.body.alta_programa != '') ? "'"+apiREQ.body.alta_programa.trim().toUpperCase()+"'" : null;	  
    
    let _FORFICAEM  = (apiREQ.body.auditoria_empresa_codigo != undefined && apiREQ.body.auditoria_empresa_codigo != null && apiREQ.body.auditoria_empresa_codigo != '' && apiREQ.body.auditoria_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.auditoria_empresa_codigo) : false;  	  
    let _FORFICAUS  = (apiREQ.body.auditoria_usuario != undefined && apiREQ.body.auditoria_usuario != null && apiREQ.body.auditoria_usuario != '') ? "'"+apiREQ.body.auditoria_usuario.trim().toUpperCase()+"'" : false;     
    let _FORFICAIP  = (apiREQ.body.auditoria_ip != undefined && apiREQ.body.auditoria_ip != null && apiREQ.body.auditoria_ip != '') ? "'"+apiREQ.body.auditoria_ip.trim().toUpperCase()+"'" : false; 	
    let _FORFICAPR  = (apiREQ.body.auditoria_programa != undefined && apiREQ.body.auditoria_programa != null && apiREQ.body.auditoria_programa != '') ? "'"+apiREQ.body.auditoria_programa.trim()+"'" : false;  
    let _FORFICAIN  = (apiREQ.body.auditoria_incidencia != undefined && apiREQ.body.auditoria_incidencia != null && apiREQ.body.auditoria_incidencia != '') ? "'"+apiREQ.body.auditoria_incidencia.trim()+"'" : null;

    if (_ACCION && _FORFICCOD && _FORFICEST && _FORFICEMC && _FORFICNOM && _FORFICURL && _FORFICCEM && _FORFICCUS && _FORFICCIP && _FORFICCPR && _FORFICAEM && _FORFICAUS && _FORFICAIP && _FORFICAPR){
            (async () => {
                    xDATA = await updateFORFIC(_ACCION,
                        _FORFICCOD,
                        _FORFICEST,
                        _FORFICEMC,
                        _FORFICORD,
                        _FORFICNOM,
                        _FORFICURL,
                        _FORFICOBS,
                        _FORFICCEM,
                        _FORFICCUS,
                        _FORFICCIP,
                        _FORFICCPR,
                        _FORFICAEM,
                        _FORFICAUS,
                        _FORFICAIP,
                        _FORFICAPR,
                        _FORFICAIN);

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

const deleteFormulario    = (apiREQ, apiRES) => {
    let xDATA       =   []; 
    let _FORFICCOD  = Number.parseInt(apiREQ.params.codigo); 
    let _ACCION     = (apiREQ.body.tipo_accion_codigo != undefined && apiREQ.body.tipo_accion_codigo != null && apiREQ.body.tipo_accion_codigo != '' && apiREQ.body.tipo_accion_codigo > 0) ? Number.parseInt(apiREQ.body.tipo_accion_codigo) : false;
    let _FORFICEST  = (apiREQ.body.tipo_estado_parametro != undefined && apiREQ.body.tipo_estado_parametro != null && apiREQ.body.tipo_estado_parametro != '' && apiREQ.body.tipo_estado_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_estado_parametro) : false;   																						    	  
    let _FORFICEMC  = (apiREQ.body.empresa_codigo != undefined && apiREQ.body.empresa_codigo != null && apiREQ.body.empresa_codigo != '' && apiREQ.body.empresa_codigo > 0) ? Number.parseInt(apiREQ.body.empresa_codigo) : false;    	 	  
    let _FORFICORD  = (apiREQ.body.formulario_orden != undefined && apiREQ.body.formulario_orden != null && apiREQ.body.formulario_orden != '') ? Number.parseInt(apiREQ.body.formulario_orden) : 999;   	    
    let _FORFICNOM  = (apiREQ.body.formulario_nombre != undefined && apiREQ.body.formulario_nombre != null && apiREQ.body.formulario_nombre != '') ? "'"+apiREQ.body.formulario_nombre.trim()+"'" : false;   	
    let _FORFICURL  = (apiREQ.body.formulario_url != undefined && apiREQ.body.formulario_url != null && apiREQ.body.formulario_url != '') ? "'"+apiREQ.body.formulario_url.trim()+"'" : false;     	   
    let _FORFICOBS  = (apiREQ.body.formulario_observacion != undefined && apiREQ.body.formulario_observacion != null && apiREQ.body.formulario_observacion != '') ? "'"+apiREQ.body.formulario_observacion.trim()+"'" : null;

    let _FORFICCEM  = (apiREQ.body.alta_empresa_codigo != undefined && apiREQ.body.alta_empresa_codigo != null && apiREQ.body.alta_empresa_codigo != '' && apiREQ.body.alta_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.alta_empresa_codigo) : false; 	  
    let _FORFICCUS  = (apiREQ.body.alta_usuario != undefined && apiREQ.body.alta_usuario != null && apiREQ.body.alta_usuario != '') ? "'"+apiREQ.body.alta_usuario.trim().toUpperCase()+"'" : false;    
    let _FORFICCIP  = (apiREQ.body.alta_ip != undefined && apiREQ.body.alta_ip != null && apiREQ.body.alta_ip != '') ? "'"+apiREQ.body.alta_ip.trim().toUpperCase()+"'" : false;   
    let _FORFICCPR  = (apiREQ.body.alta_programa != undefined && apiREQ.body.alta_programa != null && apiREQ.body.alta_programa != '') ? "'"+apiREQ.body.alta_programa.trim().toUpperCase()+"'" : null;	  
    
    let _FORFICAEM  = (apiREQ.body.auditoria_empresa_codigo != undefined && apiREQ.body.auditoria_empresa_codigo != null && apiREQ.body.auditoria_empresa_codigo != '' && apiREQ.body.auditoria_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.auditoria_empresa_codigo) : false;  	  
    let _FORFICAUS  = (apiREQ.body.auditoria_usuario != undefined && apiREQ.body.auditoria_usuario != null && apiREQ.body.auditoria_usuario != '') ? "'"+apiREQ.body.auditoria_usuario.trim().toUpperCase()+"'" : false;     
    let _FORFICAIP  = (apiREQ.body.auditoria_ip != undefined && apiREQ.body.auditoria_ip != null && apiREQ.body.auditoria_ip != '') ? "'"+apiREQ.body.auditoria_ip.trim().toUpperCase()+"'" : false; 	
    let _FORFICAPR  = (apiREQ.body.auditoria_programa != undefined && apiREQ.body.auditoria_programa != null && apiREQ.body.auditoria_programa != '') ? "'"+apiREQ.body.auditoria_programa.trim()+"'" : false;  
    let _FORFICAIN  = (apiREQ.body.auditoria_incidencia != undefined && apiREQ.body.auditoria_incidencia != null && apiREQ.body.auditoria_incidencia != '') ? "'"+apiREQ.body.auditoria_incidencia.trim()+"'" : null;

    if (_FORFICCOD && _FORFICEST && _FORFICEMC && _FORFICNOM && _FORFICURL && _FORFICCEM && _FORFICCUS && _FORFICCIP && _FORFICCPR && _FORFICAEM && _FORFICAUS && _FORFICAIP && _FORFICAPR){
            (async () => {
                xDATA = await deleteFORFIC(_FORFICCOD);

                _code   = xDATA[0];
                xJSON   = xDATA[1];

                if (_code == 200) {
                    xJSON = await jsonBody(_code, 'Success', null, null, null, 0, 0, 0, 0, xJSON);
    
                } else if (_code == 404){
                    xJSON   = xDATA[1];
                    xJSON   = await jsonBody(_code, 'Error: El codigo de rol pertenece a un conjunto de datos, verifique', null, null, null, 0, 0, 0, 0, []);
                }else{
                    xJSON   = xDATA[1];
                    xJSON   = await jsonBody(_code, 'Error', null, null, null, 0, 0, 0, 0, []);
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
    getFormulario,
    getFormularioId,
    getFormularioEmpresaId,
    postFormulario,
    putFormulario,
    deleteFormulario
}
