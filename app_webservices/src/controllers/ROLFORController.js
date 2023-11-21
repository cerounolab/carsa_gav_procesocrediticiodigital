require('dotenv').config({ path:__dirname+'/./../../.env' });

const camelcaseKeys = require('camelcase-keys');

const {selectROLFORMULARIO}= require('../helpers/sql_select');
const {insertROLFOR}= require('../helpers/sql_insert');
const {updateROLFOR}= require('../helpers/sql_update');
const {deleteROLFOR}= require('../helpers/sql_delete');
const {jsonBody}    = require('../utils/_json');
const {errorBody}   = require('../utils/_json');

//const affiliateId = process.env.ENV_AFFILIATEID;

const getRolFormulario    = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];     

    (async () => {
        const xDATA = await selectROLFORMULARIO(1, 0, '');
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

const getRolFormularioId  = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];
    let _codigorol          = parseInt(apiREQ.params.codigorol);
    let _codigoformulario   = parseInt(apiREQ.params.codigoformulario);

    if (_codigorol != 'undefined' && _codigorol != '' && _codigorol != null && _codigorol > 0 && _codigoformulario != 'undefined' && _codigoformulario != '' && _codigoformulario != null && _codigoformulario > 0){

        (async () => {
            const xDATA = await selectROLFORMULARIO(2, _codigorol, _codigoformulario);
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

const getRolFormularioEmpresaId = (apiREQ, apiRES) => {
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

const postRolFormulario   = (apiREQ, apiRES) => {
    let  xDATA      = []; 
    let _ROLFORROC  = (apiREQ.body.rol_codigo != undefined && apiREQ.body.rol_codigo != null && apiREQ.body.rol_codigo != '' && apiREQ.body.rol_codigo > 0) ? Number.parseInt(apiREQ.body.rol_codigo) : false; (apiREQ.body.rol_codigo != undefined && apiREQ.body.rol_codigo != null && apiREQ.body.rol_codigo != '' && apiREQ.body.rol_codigo > 0) ? Number.parseInt(apiREQ.body.rol_codigo) : false;   
    let _ROLFORFOC  = (apiREQ.body.formulario_codigo != undefined && apiREQ.body.formulario_codigo != null && apiREQ.body.formulario_codigo != '' && apiREQ.body.formulario_codigo > 0) ? Number.parseInt(apiREQ.body.formulario_codigo) : false; (apiREQ.body.formulario_codigo != undefined && apiREQ.body.formulario_codigo != null && apiREQ.body.formulario_codigo != '' && apiREQ.body.formulario_codigo > 0) ? Number.parseInt(apiREQ.body.formulario_codigo) : false;  
    let _ROLFOREST  = (apiREQ.body.tipo_estado_parametro != undefined && apiREQ.body.tipo_estado_parametro != null && apiREQ.body.tipo_estado_parametro != '' && apiREQ.body.tipo_estado_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_estado_parametro) : false;   
    let _ROLFOREMC  = (apiREQ.body.empresa_codigo != undefined && apiREQ.body.empresa_codigo != null && apiREQ.body.empresa_codigo != '' && apiREQ.body.empresa_codigo > 0) ? Number.parseInt(apiREQ.body.empresa_codigo) : false;  
    let _ROLFORORD  = (apiREQ.body.rol_formulario_orden != undefined && apiREQ.body.rol_formulario_orden != null && apiREQ.body.rol_formulario_orden != '') ? Number.parseInt(apiREQ.body.rol_formulario_orden) : 999;  
    let _ROLFORACC  = (apiREQ.body.rol_formulario_acceso != undefined && apiREQ.body.rol_formulario_acceso != null && apiREQ.body.rol_formulario_acceso != '') ? "'"+apiREQ.body.rol_formulario_acceso.trim().toUpperCase()+"'" : false;   
    let _ROLFORDSP  = (apiREQ.body.rol_formulario_acceso_dsp != undefined && apiREQ.body.rol_formulario_acceso_dsp != null && apiREQ.body.rol_formulario_acceso_dsp != '') ? "'"+apiREQ.body.rol_formulario_acceso_dsp.trim().toUpperCase()+"'" : false;   
    let _ROLFORUPD  = (apiREQ.body.rol_formulario_acceso_upd != undefined && apiREQ.body.rol_formulario_acceso_upd != null && apiREQ.body.rol_formulario_acceso_upd != '') ? "'"+apiREQ.body.rol_formulario_acceso_upd.trim().toUpperCase()+"'" : false;  
    let _ROLFORDLT  = (apiREQ.body.rol_formulario_acceso_dlt != undefined && apiREQ.body.rol_formulario_acceso_dlt != null && apiREQ.body.rol_formulario_acceso_dlt != '') ? "'"+apiREQ.body.rol_formulario_acceso_dlt.trim().toUpperCase()+"'" : false;    
    let _ROLFORINS  = (apiREQ.body.rol_formulario_acceso_ins != undefined && apiREQ.body.rol_formulario_acceso_ins != null && apiREQ.body.rol_formulario_acceso_ins != '') ? "'"+apiREQ.body.rol_formulario_acceso_ins.trim().toUpperCase()+"'" : false;      
    let _ROLFORXLS  = (apiREQ.body.rol_formulario_acceso_xls != undefined && apiREQ.body.rol_formulario_acceso_xls != null && apiREQ.body.rol_formulario_acceso_xls != '') ? "'"+apiREQ.body.rol_formulario_acceso_xls.trim().toUpperCase()+"'" : false;  
    let _ROLFORPDF  = (apiREQ.body.rol_formulario_acceso_pdf != undefined && apiREQ.body.rol_formulario_acceso_pdf != null && apiREQ.body.rol_formulario_acceso_pdf != '') ? "'"+apiREQ.body.rol_formulario_acceso_pdf.trim().toUpperCase()+"'" : false;    
    let _ROLFORIMP  = (apiREQ.body.rol_formulario_aceso_impresion != undefined && apiREQ.body.rol_formulario_aceso_impresion != null && apiREQ.body.rol_formulario_aceso_impresion != '') ? "'"+apiREQ.body.rol_formulario_aceso_impresion.trim().toUpperCase()+"'" : false;   
    let _ROLFOROBS  = (apiREQ.body.rol_formulario_observacion != undefined && apiREQ.body.rol_formulario_observacion != null && apiREQ.body.rol_formulario_observacion != '') ? "'"+apiREQ.body.rol_formulario_observacion.trim()+"'" : null; 

    let _ROLFORCEM  = (apiREQ.body.alta_empresa_codigo != undefined && apiREQ.body.alta_empresa_codigo != null && apiREQ.body.alta_empresa_codigo != '' && apiREQ.body.alta_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.alta_empresa_codigo) : false;   
    let _ROLFORCUS  = (apiREQ.body.alta_usuario != undefined && apiREQ.body.alta_usuario != null && apiREQ.body.alta_usuario != '') ? "'"+apiREQ.body.alta_usuario.trim().toUpperCase()+"'" : false;  
    let _ROLFORCIP  = (apiREQ.body.alta_ip != undefined && apiREQ.body.alta_ip != null && apiREQ.body.alta_ip != '') ? "'"+apiREQ.body.alta_ip.trim().toUpperCase()+"'" : false;  
    let _ROLFORCPR  = (apiREQ.body.alta_programa != undefined && apiREQ.body.alta_programa != null && apiREQ.body.alta_programa != '') ? "'"+apiREQ.body.alta_programa.trim().toUpperCase()+"'" : null;  
    
    let _ROLFORAEM  = (apiREQ.body.auditoria_empresa_codigo != undefined && apiREQ.body.auditoria_empresa_codigo != null && apiREQ.body.auditoria_empresa_codigo != '' && apiREQ.body.auditoria_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.auditoria_empresa_codigo) : false;   
    let _ROLFORAUS  = (apiREQ.body.auditoria_usuario != undefined && apiREQ.body.auditoria_usuario != null && apiREQ.body.auditoria_usuario != '') ? "'"+apiREQ.body.auditoria_usuario.trim().toUpperCase()+"'" : false;   
    let _ROLFORAIP  = (apiREQ.body.auditoria_ip != undefined && apiREQ.body.auditoria_ip != null && apiREQ.body.auditoria_ip != '') ? "'"+apiREQ.body.auditoria_ip.trim().toUpperCase()+"'" : false;   
    let _ROLFORAPR  = (apiREQ.body.auditoria_programa != undefined && apiREQ.body.auditoria_programa != null && apiREQ.body.auditoria_programa != '') ? "'"+apiREQ.body.auditoria_programa.trim()+"'" : false; 
    let _ROLFORAIN  = (apiREQ.body.auditoria_incidencia != undefined && apiREQ.body.auditoria_incidencia != null && apiREQ.body.auditoria_incidencia != '') ? "'"+apiREQ.body.auditoria_incidencia.trim()+"'" : null;  

    if (_ROLFORROC && _ROLFORFOC && _ROLFOREST && _ROLFOREMC && _ROLFORACC && _ROLFORDSP && _ROLFORUPD && _ROLFORDLT && _ROLFORINS && _ROLFORXLS && _ROLFORPDF && _ROLFORIMP && _ROLFORCEM && _ROLFORCUS && 
        _ROLFORCIP && _ROLFORCPR && _ROLFORAEM && _ROLFORAUS && _ROLFORAIP && _ROLFORAPR){
            
        (async () => {
            xDATA = await insertROLFOR(_ROLFORROC,
            _ROLFORFOC,
            _ROLFOREST,
            _ROLFOREMC,
            _ROLFORORD,
            _ROLFORACC,
            _ROLFORDSP,
            _ROLFORUPD,
            _ROLFORDLT,
            _ROLFORINS,
            _ROLFORXLS,
            _ROLFORPDF,
            _ROLFORIMP,
            _ROLFOROBS,
            _ROLFORCEM,
            _ROLFORCUS,
            _ROLFORCIP,
            _ROLFORCPR,
            _ROLFORAEM,
            _ROLFORAUS,
            _ROLFORAIP,
            _ROLFORAPR,
            _ROLFORAIN);

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

const putRolFormulario    = (apiREQ, apiRES) => {

    let xDATA       =   []; 
    let _ROLFORROC  = Number.parseInt(apiREQ.params.codigorol); 
    let _ROLFORFOC  = Number.parseInt(apiREQ.params.codigoformulario);  
    let _ACCION     = (apiREQ.body.tipo_accion_codigo != undefined && apiREQ.body.tipo_accion_codigo != null && apiREQ.body.tipo_accion_codigo != '' && apiREQ.body.tipo_accion_codigo > 0) ? Number.parseInt(apiREQ.body.tipo_accion_codigo) : false;
    let _ROLFOREST  = (apiREQ.body.tipo_estado_parametro != undefined && apiREQ.body.tipo_estado_parametro != null && apiREQ.body.tipo_estado_parametro != '' && apiREQ.body.tipo_estado_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_estado_parametro) : false;   
    let _ROLFOREMC  = (apiREQ.body.empresa_codigo != undefined && apiREQ.body.empresa_codigo != null && apiREQ.body.empresa_codigo != '' && apiREQ.body.empresa_codigo > 0) ? Number.parseInt(apiREQ.body.empresa_codigo) : false;  
    let _ROLFORORD  = (apiREQ.body.rol_formulario_orden != undefined && apiREQ.body.rol_formulario_orden != null && apiREQ.body.rol_formulario_orden != '') ? Number.parseInt(apiREQ.body.rol_formulario_orden) : 999;  
    let _ROLFORACC  = (apiREQ.body.rol_formulario_acceso != undefined && apiREQ.body.rol_formulario_acceso != null && apiREQ.body.rol_formulario_acceso != '') ? "'"+apiREQ.body.rol_formulario_acceso.trim().toUpperCase()+"'" : false;   
    let _ROLFORDSP  = (apiREQ.body.rol_formulario_acceso_dsp != undefined && apiREQ.body.rol_formulario_acceso_dsp != null && apiREQ.body.rol_formulario_acceso_dsp != '') ? "'"+apiREQ.body.rol_formulario_acceso_dsp.trim().toUpperCase()+"'" : false;   
    let _ROLFORUPD  = (apiREQ.body.rol_formulario_acceso_upd != undefined && apiREQ.body.rol_formulario_acceso_upd != null && apiREQ.body.rol_formulario_acceso_upd != '') ? "'"+apiREQ.body.rol_formulario_acceso_upd.trim().toUpperCase()+"'" : false;  
    let _ROLFORDLT  = (apiREQ.body.rol_formulario_acceso_dlt != undefined && apiREQ.body.rol_formulario_acceso_dlt != null && apiREQ.body.rol_formulario_acceso_dlt != '') ? "'"+apiREQ.body.rol_formulario_acceso_dlt.trim().toUpperCase()+"'" : false;    
    let _ROLFORINS  = (apiREQ.body.rol_formulario_acceso_ins != undefined && apiREQ.body.rol_formulario_acceso_ins != null && apiREQ.body.rol_formulario_acceso_ins != '') ? "'"+apiREQ.body.rol_formulario_acceso_ins.trim().toUpperCase()+"'" : false;      
    let _ROLFORXLS  = (apiREQ.body.rol_formulario_acceso_xls != undefined && apiREQ.body.rol_formulario_acceso_xls != null && apiREQ.body.rol_formulario_acceso_xls != '') ? "'"+apiREQ.body.rol_formulario_acceso_xls.trim().toUpperCase()+"'" : false;  
    let _ROLFORPDF  = (apiREQ.body.rol_formulario_acceso_pdf != undefined && apiREQ.body.rol_formulario_acceso_pdf != null && apiREQ.body.rol_formulario_acceso_pdf != '') ? "'"+apiREQ.body.rol_formulario_acceso_pdf.trim().toUpperCase()+"'" : false;    
    let _ROLFORIMP  = (apiREQ.body.rol_formulario_aceso_impresion != undefined && apiREQ.body.rol_formulario_aceso_impresion != null && apiREQ.body.rol_formulario_aceso_impresion != '') ? "'"+apiREQ.body.rol_formulario_aceso_impresion.trim().toUpperCase()+"'" : false;   
    let _ROLFOROBS  = (apiREQ.body.rol_formulario_observacion != undefined && apiREQ.body.rol_formulario_observacion != null && apiREQ.body.rol_formulario_observacion != '') ? "'"+apiREQ.body.rol_formulario_observacion.trim()+"'" : null; 

    let _ROLFORCEM  = (apiREQ.body.alta_empresa_codigo != undefined && apiREQ.body.alta_empresa_codigo != null && apiREQ.body.alta_empresa_codigo != '' && apiREQ.body.alta_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.alta_empresa_codigo) : false;   
    let _ROLFORCUS  = (apiREQ.body.alta_usuario != undefined && apiREQ.body.alta_usuario != null && apiREQ.body.alta_usuario != '') ? "'"+apiREQ.body.alta_usuario.trim().toUpperCase()+"'" : false;  
    let _ROLFORCIP  = (apiREQ.body.alta_ip != undefined && apiREQ.body.alta_ip != null && apiREQ.body.alta_ip != '') ? "'"+apiREQ.body.alta_ip.trim().toUpperCase()+"'" : false;  
    let _ROLFORCPR  = (apiREQ.body.alta_programa != undefined && apiREQ.body.alta_programa != null && apiREQ.body.alta_programa != '') ? "'"+apiREQ.body.alta_programa.trim().toUpperCase()+"'" : null;  
    
    let _ROLFORAEM  = (apiREQ.body.auditoria_empresa_codigo != undefined && apiREQ.body.auditoria_empresa_codigo != null && apiREQ.body.auditoria_empresa_codigo != '' && apiREQ.body.auditoria_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.auditoria_empresa_codigo) : false;   
    let _ROLFORAUS  = (apiREQ.body.auditoria_usuario != undefined && apiREQ.body.auditoria_usuario != null && apiREQ.body.auditoria_usuario != '') ? "'"+apiREQ.body.auditoria_usuario.trim().toUpperCase()+"'" : false;   
    let _ROLFORAIP  = (apiREQ.body.auditoria_ip != undefined && apiREQ.body.auditoria_ip != null && apiREQ.body.auditoria_ip != '') ? "'"+apiREQ.body.auditoria_ip.trim().toUpperCase()+"'" : false;   
    let _ROLFORAPR  = (apiREQ.body.auditoria_programa != undefined && apiREQ.body.auditoria_programa != null && apiREQ.body.auditoria_programa != '') ? "'"+apiREQ.body.auditoria_programa.trim()+"'" : false; 
    let _ROLFORAIN  = (apiREQ.body.auditoria_incidencia != undefined && apiREQ.body.auditoria_incidencia != null && apiREQ.body.auditoria_incidencia != '') ? "'"+apiREQ.body.auditoria_incidencia.trim()+"'" : null;  

    if (_ACCION && _ROLFORROC && _ROLFORFOC && _ROLFOREST && _ROLFOREMC && _ROLFORACC && _ROLFORDSP && _ROLFORUPD && _ROLFORDLT && _ROLFORINS && _ROLFORXLS && _ROLFORPDF && _ROLFORIMP && _ROLFORCEM && _ROLFORCUS && 
        _ROLFORCIP && _ROLFORCPR && _ROLFORAEM && _ROLFORAUS && _ROLFORAIP && _ROLFORAPR){
            
            (async () => {
                xDATA = await updateROLFOR(_ACCION,
                _ROLFORROC,
                _ROLFORFOC,
                _ROLFOREST,
                _ROLFOREMC,
                _ROLFORORD,
                _ROLFORACC,
                _ROLFORDSP,
                _ROLFORUPD,
                _ROLFORDLT,
                _ROLFORINS,
                _ROLFORXLS,
                _ROLFORPDF,
                _ROLFORIMP,
                _ROLFOROBS,
                _ROLFORCEM,
                _ROLFORCUS,
                _ROLFORCIP,
                _ROLFORCPR,
                _ROLFORAEM,
                _ROLFORAUS,
                _ROLFORAIP,
                _ROLFORAPR,
                _ROLFORAIN);

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

const deleteRolFormulario    = (apiREQ, apiRES) => {
    let xDATA       =   []; 
    let _ROLFORROC  = Number.parseInt(apiREQ.params.codigorol); 
    let _ROLFORFOC  = Number.parseInt(apiREQ.params.codigoformulario);  
    let _ACCION     = (apiREQ.body.tipo_accion_codigo != undefined && apiREQ.body.tipo_accion_codigo != null && apiREQ.body.tipo_accion_codigo != '' && apiREQ.body.tipo_accion_codigo > 0) ? Number.parseInt(apiREQ.body.tipo_accion_codigo) : false;
    let _ROLFOREST  = (apiREQ.body.tipo_estado_parametro != undefined && apiREQ.body.tipo_estado_parametro != null && apiREQ.body.tipo_estado_parametro != '' && apiREQ.body.tipo_estado_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_estado_parametro) : false;   
    let _ROLFOREMC  = (apiREQ.body.empresa_codigo != undefined && apiREQ.body.empresa_codigo != null && apiREQ.body.empresa_codigo != '' && apiREQ.body.empresa_codigo > 0) ? Number.parseInt(apiREQ.body.empresa_codigo) : false;  
    let _ROLFORORD  = (apiREQ.body.rol_formulario_orden != undefined && apiREQ.body.rol_formulario_orden != null && apiREQ.body.rol_formulario_orden != '') ? Number.parseInt(apiREQ.body.rol_formulario_orden) : 999;  
    let _ROLFORACC  = (apiREQ.body.rol_formulario_acceso != undefined && apiREQ.body.rol_formulario_acceso != null && apiREQ.body.rol_formulario_acceso != '') ? "'"+apiREQ.body.rol_formulario_acceso.trim().toUpperCase()+"'" : false;   
    let _ROLFORDSP  = (apiREQ.body.rol_formulario_acceso_dsp != undefined && apiREQ.body.rol_formulario_acceso_dsp != null && apiREQ.body.rol_formulario_acceso_dsp != '') ? "'"+apiREQ.body.rol_formulario_acceso_dsp.trim().toUpperCase()+"'" : false;   
    let _ROLFORUPD  = (apiREQ.body.rol_formulario_acceso_upd != undefined && apiREQ.body.rol_formulario_acceso_upd != null && apiREQ.body.rol_formulario_acceso_upd != '') ? "'"+apiREQ.body.rol_formulario_acceso_upd.trim().toUpperCase()+"'" : false;  
    let _ROLFORDLT  = (apiREQ.body.rol_formulario_acceso_dlt != undefined && apiREQ.body.rol_formulario_acceso_dlt != null && apiREQ.body.rol_formulario_acceso_dlt != '') ? "'"+apiREQ.body.rol_formulario_acceso_dlt.trim().toUpperCase()+"'" : false;    
    let _ROLFORINS  = (apiREQ.body.rol_formulario_acceso_ins != undefined && apiREQ.body.rol_formulario_acceso_ins != null && apiREQ.body.rol_formulario_acceso_ins != '') ? "'"+apiREQ.body.rol_formulario_acceso_ins.trim().toUpperCase()+"'" : false;      
    let _ROLFORXLS  = (apiREQ.body.rol_formulario_acceso_xls != undefined && apiREQ.body.rol_formulario_acceso_xls != null && apiREQ.body.rol_formulario_acceso_xls != '') ? "'"+apiREQ.body.rol_formulario_acceso_xls.trim().toUpperCase()+"'" : false;  
    let _ROLFORPDF  = (apiREQ.body.rol_formulario_acceso_pdf != undefined && apiREQ.body.rol_formulario_acceso_pdf != null && apiREQ.body.rol_formulario_acceso_pdf != '') ? "'"+apiREQ.body.rol_formulario_acceso_pdf.trim().toUpperCase()+"'" : false;    
    let _ROLFORIMP  = (apiREQ.body.rol_formulario_aceso_impresion != undefined && apiREQ.body.rol_formulario_aceso_impresion != null && apiREQ.body.rol_formulario_aceso_impresion != '') ? "'"+apiREQ.body.rol_formulario_aceso_impresion.trim().toUpperCase()+"'" : false;   
    let _ROLFOROBS  = (apiREQ.body.rol_formulario_observacion != undefined && apiREQ.body.rol_formulario_observacion != null && apiREQ.body.rol_formulario_observacion != '') ? "'"+apiREQ.body.rol_formulario_observacion.trim()+"'" : null; 

    let _ROLFORCEM  = (apiREQ.body.alta_empresa_codigo != undefined && apiREQ.body.alta_empresa_codigo != null && apiREQ.body.alta_empresa_codigo != '' && apiREQ.body.alta_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.alta_empresa_codigo) : false;   
    let _ROLFORCUS  = (apiREQ.body.alta_usuario != undefined && apiREQ.body.alta_usuario != null && apiREQ.body.alta_usuario != '') ? "'"+apiREQ.body.alta_usuario.trim().toUpperCase()+"'" : false;  
    let _ROLFORCIP  = (apiREQ.body.alta_ip != undefined && apiREQ.body.alta_ip != null && apiREQ.body.alta_ip != '') ? "'"+apiREQ.body.alta_ip.trim().toUpperCase()+"'" : false;  
    let _ROLFORCPR  = (apiREQ.body.alta_programa != undefined && apiREQ.body.alta_programa != null && apiREQ.body.alta_programa != '') ? "'"+apiREQ.body.alta_programa.trim().toUpperCase()+"'" : null;  
    
    let _ROLFORAEM  = (apiREQ.body.auditoria_empresa_codigo != undefined && apiREQ.body.auditoria_empresa_codigo != null && apiREQ.body.auditoria_empresa_codigo != '' && apiREQ.body.auditoria_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.auditoria_empresa_codigo) : false;   
    let _ROLFORAUS  = (apiREQ.body.auditoria_usuario != undefined && apiREQ.body.auditoria_usuario != null && apiREQ.body.auditoria_usuario != '') ? "'"+apiREQ.body.auditoria_usuario.trim().toUpperCase()+"'" : false;   
    let _ROLFORAIP  = (apiREQ.body.auditoria_ip != undefined && apiREQ.body.auditoria_ip != null && apiREQ.body.auditoria_ip != '') ? "'"+apiREQ.body.auditoria_ip.trim().toUpperCase()+"'" : false;   
    let _ROLFORAPR  = (apiREQ.body.auditoria_programa != undefined && apiREQ.body.auditoria_programa != null && apiREQ.body.auditoria_programa != '') ? "'"+apiREQ.body.auditoria_programa.trim()+"'" : false; 
    let _ROLFORAIN  = (apiREQ.body.auditoria_incidencia != undefined && apiREQ.body.auditoria_incidencia != null && apiREQ.body.auditoria_incidencia != '') ? "'"+apiREQ.body.auditoria_incidencia.trim()+"'" : null;  

    if (_ACCION && _ROLFORROC && _ROLFORFOC && _ROLFOREST && _ROLFOREMC && _ROLFORACC && _ROLFORDSP && _ROLFORUPD && _ROLFORDLT && _ROLFORINS && _ROLFORXLS && _ROLFORPDF && _ROLFORIMP && _ROLFORCEM && _ROLFORCUS && 
        _ROLFORCIP && _ROLFORCPR && _ROLFORAEM && _ROLFORAUS && _ROLFORAIP && _ROLFORAPR){

        (async () => {
            xDATA = await deleteROLFOR(_ROLFORROC, _ROLFORFOC);

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
    getRolFormulario,
    getRolFormularioId,
    getRolFormularioEmpresaId,
    postRolFormulario,
    putRolFormulario,
    deleteRolFormulario
}
