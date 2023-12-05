require('dotenv').config({ path:__dirname+'/./../../.env' });

const camelcaseKeys = require('camelcase-keys');

const {selectCAMPANHA}= require('../helpers/sql_select');
const {insertCAMFIC}= require('../helpers/sql_insert');
const {updateCAMFIC}= require('../helpers/sql_update');
const {deleteCAMFIC}= require('../helpers/sql_delete');
const {jsonBody}    = require('../utils/_json');
const {errorBody}   = require('../utils/_json');

//const affiliateId = process.env.ENV_AFFILIATEID;

const getCampanha   = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];    
    let _codigo     = parseInt(apiREQ.params.empresa);  
    if (_codigo != 'undefined' && _codigo != '' && _codigo != null && _codigo > 0){

        (async () => {
            const xDATA = await selectCAMPANHA(1, _codigo, '');
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

            _dataJSON   = camelcaseKeys(_dataJSON, {deep: true});

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

const getCampanhaId  = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];
    let _codigo     = parseInt(apiREQ.params.codigo);

    if (_codigo != 'undefined' && _codigo != '' && _codigo != null && _codigo > 0){

        (async () => {
            const xDATA = await selectCAMPANHA(2, _codigo, '');
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

const getCampanhaEmpresaId  = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];
    let _codigo     = parseInt(apiREQ.params.empresa);

    if (_codigo != 'undefined' && _codigo != '' && _codigo != null && _codigo > 0){

        (async () => {
            const xDATA = await selectCAMPANHA(3, _codigo, '');
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

const getCampanhaTipoCampanha = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];
    let _codigo     = parseInt(apiREQ.params.tipocampanha);

    if (_codigo != 'undefined' && _codigo != '' && _codigo != null && _codigo > 0){

        (async () => {
            const xDATA = await selectCAMPANHA(4, _codigo, '');
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

const postCampanha  = (apiREQ, apiRES) => {
    let  xDATA      =   []; 
    let _CAMFICEST  = (apiREQ.body.tipo_estado_parametro != undefined && apiREQ.body.tipo_estado_parametro != null && apiREQ.body.tipo_estado_parametro != '' && apiREQ.body.tipo_estado_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_estado_parametro) : false;   																						   
    let _CAMFICTCC  = (apiREQ.body.tipo_campanha_parametro != undefined && apiREQ.body.tipo_campanha_parametro != null && apiREQ.body.tipo_campanha_parametro != '' && apiREQ.body.tipo_campanha_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_campanha_parametro) : false;    	  
    let _CAMFICEMC  = (apiREQ.body.empresa_codigo != undefined && apiREQ.body.empresa_codigo != null && apiREQ.body.empresa_codigo != '' && apiREQ.body.empresa_codigo > 0) ? Number.parseInt(apiREQ.body.empresa_codigo) : false;    	 
    let _CAMFICORD  = (apiREQ.body.campanha_orden != undefined && apiREQ.body.campanha_orden != null && apiREQ.body.campanha_orden != '') ? Number.parseInt(apiREQ.body.campanha_orden) : 999;   	
    let _CAMFICNOM  = (apiREQ.body.campanha_nombre != undefined && apiREQ.body.campanha_nombre != null && apiREQ.body.campanha_nombre != '') ? "'"+apiREQ.body.campanha_nombre.trim()+"'" : false;    	   
    let _CAMFICFDE  = (apiREQ.body.campanha_fecha_desde != '') ? apiREQ.body.campanha_fecha_desde: false;     
    let _CAMFICFHA  = (apiREQ.body.campanha_fecha_hasta != '') ? apiREQ.body.campanha_fecha_hasta: false;       
    let _CAMFICEQU  = (apiREQ.body.campanha_equivalencia != undefined && apiREQ.body.campanha_equivalencia != null && apiREQ.body.campanha_equivalencia != '') ? "'"+apiREQ.body.campanha_equivalencia.trim()+"'" : null;      
    let _CAMFICOBS  = (apiREQ.body.campanha_observacion != undefined && apiREQ.body.campanha_observacion != null && apiREQ.body.campanha_observacion != '') ? "'"+apiREQ.body.campanha_observacion.trim()+"'" : null; 	   
    
    let _CAMFICCEM  = (apiREQ.body.alta_empresa_codigo != undefined && apiREQ.body.alta_empresa_codigo != null && apiREQ.body.alta_empresa_codigo != '' && apiREQ.body.alta_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.alta_empresa_codigo) : false; 
    let _CAMFICCUS  = (apiREQ.body.alta_usuario != undefined && apiREQ.body.alta_usuario != null && apiREQ.body.alta_usuario != '') ? "'"+apiREQ.body.alta_usuario.trim().toUpperCase()+"'" : false;
    let _CAMFICCIP  = (apiREQ.body.alta_ip != undefined && apiREQ.body.alta_ip != null && apiREQ.body.alta_ip != '') ? "'"+apiREQ.body.alta_ip.trim().toUpperCase()+"'" : false;
    let _CAMFICCPR  = (apiREQ.body.alta_programa != undefined && apiREQ.body.alta_programa != null && apiREQ.body.alta_programa != '') ? "'"+apiREQ.body.alta_programa.trim().toUpperCase()+"'" : null;

    let _CAMFICAEM  = (apiREQ.body.auditoria_empresa_codigo != undefined && apiREQ.body.auditoria_empresa_codigo != null && apiREQ.body.auditoria_empresa_codigo != '' && apiREQ.body.auditoria_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.auditoria_empresa_codigo) : false; 
    let _CAMFICAUS  = (apiREQ.body.auditoria_usuario != undefined && apiREQ.body.auditoria_usuario != null && apiREQ.body.auditoria_usuario != '') ? "'"+apiREQ.body.auditoria_usuario.trim().toUpperCase()+"'" : false; 
    let _CAMFICAIP  = (apiREQ.body.auditoria_ip != undefined && apiREQ.body.auditoria_ip != null && apiREQ.body.auditoria_ip != '') ? "'"+apiREQ.body.auditoria_ip.trim().toUpperCase()+"'" : false; 
    let _CAMFICAPR  = (apiREQ.body.auditoria_programa != undefined && apiREQ.body.auditoria_programa != null && apiREQ.body.auditoria_programa != '') ? "'"+apiREQ.body.auditoria_programa.trim()+"'" : false; 
    let _CAMFICAIN  = (apiREQ.body.auditoria_incidencia != undefined && apiREQ.body.auditoria_incidencia != null && apiREQ.body.auditoria_incidencia != '') ? "'"+apiREQ.body.auditoria_incidencia.trim()+"'" : null;

    if (_CAMFICEST && _CAMFICTCC && _CAMFICEMC && _CAMFICNOM && _CAMFICFDE && _CAMFICCEM && _CAMFICCUS && _CAMFICCIP && _CAMFICCPR && _CAMFICAEM && _CAMFICAUS && _CAMFICAIP && _CAMFICAPR){

        (async () => {
            xDATA = await insertCAMFIC(_CAMFICEST,
            _CAMFICTCC,
            _CAMFICEMC,
            _CAMFICORD,
            _CAMFICNOM,
            _CAMFICFDE,
            _CAMFICFHA,
            _CAMFICEQU,
            _CAMFICOBS,
            _CAMFICCEM,
            _CAMFICCUS,
            _CAMFICCIP,
            _CAMFICCPR,
            _CAMFICAEM,
            _CAMFICAUS,
            _CAMFICAIP,
            _CAMFICAPR,
            _CAMFICAIN);

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

const putCampanha    = (apiREQ, apiRES) => {

    let xDATA       =   []; 
    let _CAMFICCOD  = Number.parseInt(apiREQ.params.codigo); 
    let _ACCION     = (apiREQ.body.tipo_accion_codigo != undefined && apiREQ.body.tipo_accion_codigo != null && apiREQ.body.tipo_accion_codigo != '' && apiREQ.body.tipo_accion_codigo > 0) ? Number.parseInt(apiREQ.body.tipo_accion_codigo) : false;
    let _CAMFICEST  = (apiREQ.body.tipo_estado_parametro != undefined && apiREQ.body.tipo_estado_parametro != null && apiREQ.body.tipo_estado_parametro != '' && apiREQ.body.tipo_estado_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_estado_parametro) : false;   																						   
    let _CAMFICTCC  = (apiREQ.body.tipo_campanha_parametro != undefined && apiREQ.body.tipo_campanha_parametro != null && apiREQ.body.tipo_campanha_parametro != '' && apiREQ.body.tipo_campanha_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_campanha_parametro) : false;    	  
    let _CAMFICEMC  = (apiREQ.body.empresa_codigo != undefined && apiREQ.body.empresa_codigo != null && apiREQ.body.empresa_codigo != '' && apiREQ.body.empresa_codigo > 0) ? Number.parseInt(apiREQ.body.empresa_codigo) : false;    	 
    let _CAMFICORD  = (apiREQ.body.campanha_orden != undefined && apiREQ.body.campanha_orden != null && apiREQ.body.campanha_orden != '') ? Number.parseInt(apiREQ.body.campanha_orden) : 999;   	
    let _CAMFICNOM  = (apiREQ.body.campanha_nombre != undefined && apiREQ.body.campanha_nombre != null && apiREQ.body.campanha_nombre != '') ? "'"+apiREQ.body.campanha_nombre.trim()+"'" : false;    	   
    let _CAMFICFDE  = (apiREQ.body.campanha_fecha_desde != '') ? apiREQ.body.campanha_fecha_desde: false;     
    let _CAMFICFHA  = (apiREQ.body.campanha_fecha_hasta != '') ? apiREQ.body.campanha_fecha_hasta: false;       
    let _CAMFICEQU  = (apiREQ.body.campanha_equivalencia != undefined && apiREQ.body.campanha_equivalencia != null && apiREQ.body.campanha_equivalencia != '') ? "'"+apiREQ.body.campanha_equivalencia.trim()+"'" : null;      
    let _CAMFICOBS  = (apiREQ.body.campanha_observacion != undefined && apiREQ.body.campanha_observacion != null && apiREQ.body.campanha_observacion != '') ? "'"+apiREQ.body.campanha_observacion.trim()+"'" : null; 	   
    
    let _CAMFICCEM  = (apiREQ.body.alta_empresa_codigo != undefined && apiREQ.body.alta_empresa_codigo != null && apiREQ.body.alta_empresa_codigo != '' && apiREQ.body.alta_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.alta_empresa_codigo) : false; 
    let _CAMFICCUS  = (apiREQ.body.alta_usuario != undefined && apiREQ.body.alta_usuario != null && apiREQ.body.alta_usuario != '') ? "'"+apiREQ.body.alta_usuario.trim().toUpperCase()+"'" : false;
    let _CAMFICCIP  = (apiREQ.body.alta_ip != undefined && apiREQ.body.alta_ip != null && apiREQ.body.alta_ip != '') ? "'"+apiREQ.body.alta_ip.trim().toUpperCase()+"'" : false;
    let _CAMFICCPR  = (apiREQ.body.alta_programa != undefined && apiREQ.body.alta_programa != null && apiREQ.body.alta_programa != '') ? "'"+apiREQ.body.alta_programa.trim().toUpperCase()+"'" : null;

    let _CAMFICAEM  = (apiREQ.body.auditoria_empresa_codigo != undefined && apiREQ.body.auditoria_empresa_codigo != null && apiREQ.body.auditoria_empresa_codigo != '' && apiREQ.body.auditoria_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.auditoria_empresa_codigo) : false; 
    let _CAMFICAUS  = (apiREQ.body.auditoria_usuario != undefined && apiREQ.body.auditoria_usuario != null && apiREQ.body.auditoria_usuario != '') ? "'"+apiREQ.body.auditoria_usuario.trim().toUpperCase()+"'" : false; 
    let _CAMFICAIP  = (apiREQ.body.auditoria_ip != undefined && apiREQ.body.auditoria_ip != null && apiREQ.body.auditoria_ip != '') ? "'"+apiREQ.body.auditoria_ip.trim().toUpperCase()+"'" : false; 
    let _CAMFICAPR  = (apiREQ.body.auditoria_programa != undefined && apiREQ.body.auditoria_programa != null && apiREQ.body.auditoria_programa != '') ? "'"+apiREQ.body.auditoria_programa.trim()+"'" : false; 
    let _CAMFICAIN  = (apiREQ.body.auditoria_incidencia != undefined && apiREQ.body.auditoria_incidencia != null && apiREQ.body.auditoria_incidencia != '') ? "'"+apiREQ.body.auditoria_incidencia.trim()+"'" : null;

    if (_ACCION && _CAMFICCOD && _CAMFICEST && _CAMFICTCC && _CAMFICEMC && _CAMFICNOM && _CAMFICFDE && _CAMFICAEM && _CAMFICAUS && _CAMFICAIP && _CAMFICAPR){
        (async () => {
            xDATA = await updateCAMFIC(_ACCION,
            _CAMFICCOD,
            _CAMFICEST,
            _CAMFICTCC,
            _CAMFICEMC,
            _CAMFICORD,
            _CAMFICNOM,
            _CAMFICFDE,
            _CAMFICFHA,
            _CAMFICEQU,
            _CAMFICOBS,
            _CAMFICCEM,
            _CAMFICCUS,
            _CAMFICCIP,
            _CAMFICCPR,
            _CAMFICAEM,
            _CAMFICAUS,
            _CAMFICAIP,
            _CAMFICAPR,
            _CAMFICAIN);

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

const deleteCampanha    = (apiREQ, apiRES) => {
    let xDATA       =   []; 
    let _CAMFICCOD  = Number.parseInt(apiREQ.params.codigo); 
    let _CAMFICEST  = (apiREQ.body.tipo_estado_parametro != undefined && apiREQ.body.tipo_estado_parametro != null && apiREQ.body.tipo_estado_parametro != '' && apiREQ.body.tipo_estado_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_estado_parametro) : false;   																						   
    let _CAMFICTCC  = (apiREQ.body.tipo_campanha_parametro != undefined && apiREQ.body.tipo_campanha_parametro != null && apiREQ.body.tipo_campanha_parametro != '' && apiREQ.body.tipo_campanha_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_campanha_parametro) : false;    	  
    let _CAMFICEMC  = (apiREQ.body.empresa_codigo != undefined && apiREQ.body.empresa_codigo != null && apiREQ.body.empresa_codigo != '' && apiREQ.body.empresa_codigo > 0) ? Number.parseInt(apiREQ.body.empresa_codigo) : false;    	 
    let _CAMFICORD  = (apiREQ.body.campanha_orden != undefined && apiREQ.body.campanha_orden != null && apiREQ.body.campanha_orden != '') ? Number.parseInt(apiREQ.body.campanha_orden) : 999;   	
    let _CAMFICNOM  = (apiREQ.body.campanha_nombre != undefined && apiREQ.body.campanha_nombre != null && apiREQ.body.campanha_nombre != '') ? "'"+apiREQ.body.campanha_nombre.trim()+"'" : false;    	   
    let _CAMFICFDE  = (apiREQ.body.campanha_fecha_desde != '') ? apiREQ.body.campanha_fecha_desde: false;     
    let _CAMFICFHA  = (apiREQ.body.campanha_fecha_hasta != '') ? apiREQ.body.campanha_fecha_hasta: false;       
    let _CAMFICEQU  = (apiREQ.body.campanha_equivalencia != undefined && apiREQ.body.campanha_equivalencia != null && apiREQ.body.campanha_equivalencia != '') ? "'"+apiREQ.body.campanha_equivalencia.trim()+"'" : null;      
    let _CAMFICOBS  = (apiREQ.body.campanha_observacion != undefined && apiREQ.body.campanha_observacion != null && apiREQ.body.campanha_observacion != '') ? "'"+apiREQ.body.campanha_observacion.trim()+"'" : null; 	   
    
    let _CAMFICCEM  = (apiREQ.body.alta_empresa_codigo != undefined && apiREQ.body.alta_empresa_codigo != null && apiREQ.body.alta_empresa_codigo != '' && apiREQ.body.alta_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.alta_empresa_codigo) : false; 
    let _CAMFICCUS  = (apiREQ.body.alta_usuario != undefined && apiREQ.body.alta_usuario != null && apiREQ.body.alta_usuario != '') ? "'"+apiREQ.body.alta_usuario.trim().toUpperCase()+"'" : false;
    let _CAMFICCIP  = (apiREQ.body.alta_ip != undefined && apiREQ.body.alta_ip != null && apiREQ.body.alta_ip != '') ? "'"+apiREQ.body.alta_ip.trim().toUpperCase()+"'" : false;
    let _CAMFICCPR  = (apiREQ.body.alta_programa != undefined && apiREQ.body.alta_programa != null && apiREQ.body.alta_programa != '') ? "'"+apiREQ.body.alta_programa.trim().toUpperCase()+"'" : null;

    let _CAMFICAEM  = (apiREQ.body.auditoria_empresa_codigo != undefined && apiREQ.body.auditoria_empresa_codigo != null && apiREQ.body.auditoria_empresa_codigo != '' && apiREQ.body.auditoria_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.auditoria_empresa_codigo) : false; 
    let _CAMFICAUS  = (apiREQ.body.auditoria_usuario != undefined && apiREQ.body.auditoria_usuario != null && apiREQ.body.auditoria_usuario != '') ? "'"+apiREQ.body.auditoria_usuario.trim().toUpperCase()+"'" : false; 
    let _CAMFICAIP  = (apiREQ.body.auditoria_ip != undefined && apiREQ.body.auditoria_ip != null && apiREQ.body.auditoria_ip != '') ? "'"+apiREQ.body.auditoria_ip.trim().toUpperCase()+"'" : false; 
    let _CAMFICAPR  = (apiREQ.body.auditoria_programa != undefined && apiREQ.body.auditoria_programa != null && apiREQ.body.auditoria_programa != '') ? "'"+apiREQ.body.auditoria_programa.trim()+"'" : false; 
    let _CAMFICAIN  = (apiREQ.body.auditoria_incidencia != undefined && apiREQ.body.auditoria_incidencia != null && apiREQ.body.auditoria_incidencia != '') ? "'"+apiREQ.body.auditoria_incidencia.trim()+"'" : null;

    if (_CAMFICCOD && _CAMFICEST && _CAMFICTCC && _CAMFICEMC && _CAMFICNOM && _CAMFICFDE && _CAMFICAEM && _CAMFICAUS && _CAMFICAIP && _CAMFICAPR){

        (async () => {
            xDATA = await deleteCAMFIC(_CAMFICCOD);

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
    getCampanha,
    getCampanhaId,
    getCampanhaTipoCampanha,
    getCampanhaEmpresaId,
    postCampanha,
    putCampanha,
    deleteCampanha
}
