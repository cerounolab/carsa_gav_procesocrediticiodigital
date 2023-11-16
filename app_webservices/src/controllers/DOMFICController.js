require('dotenv').config({ path:__dirname+'/./../../.env' });

const camelcaseKeys = require('camelcase-keys');

const {selectDOMINIOTIPO} = require('../helpers/sql_select');
const {insertDOMFIC}= require('../helpers/sql_insert');
const {updateDOMFIC}= require('../helpers/sql_update');
const {deleteDOMFIC}= require('../helpers/sql_delete');
const {jsonBody}    = require('../utils/_json');
const {errorBody}   = require('../utils/_json');

//const affiliateId = process.env.ENV_AFFILIATEID;

const getDominio    = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];    

    (async () => {
        const xDATA = await selectDOMINIOTIPO(1, 0, '');
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

const getDominioId  = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];
    let _codigo     = parseInt(apiREQ.params.codigo);

    if (_codigo != 'undefined' && _codigo != '' && _codigo != null && _codigo > 0){

        (async () => {
            const xDATA = await selectDOMINIOTIPO(2, _codigo, '');
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

const getDominioValor   = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];
    let _valor      = String(apiREQ.params.valor).toUpperCase().trim();

    if (_valor != 'undefined' && _valor != ''){

        (async () => {
            const xDATA = await selectDOMINIOTIPO(3, 0, _valor);
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

const postDominio   = (apiREQ, apiRES) => {

    let xDATA       =   [];
    let _DOMFICEST  =   (apiREQ.body.tipo_estado_parametro != undefined && apiREQ.body.tipo_estado_parametro != null && apiREQ.body.tipo_estado_parametro != '' && apiREQ.body.tipo_estado_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_estado_parametro) : false;
    let _DOMFICNOM  =   (apiREQ.body.tipo_nombre != undefined && apiREQ.body.tipo_nombre != null && apiREQ.body.tipo_nombre != '') ? apiREQ.body.tipo_nombre.trim().toUpperCase() : false; 
    let _DOMFICORD  =   (apiREQ.body.tipo_orden != undefined && apiREQ.body.tipo_orden != null && apiREQ.body.tipo_orden != '') ? Number.parseInt(apiREQ.body.tipo_orden) : 999;
    let _DOMFICPAR  =   (apiREQ.body.tipo_parametro != undefined && apiREQ.body.tipo_parametro != null && apiREQ.body.tipo_parametro != '' && apiREQ.body.tipo_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_parametro) : false;
    let _DOMFICCSS  =   (apiREQ.body.tipo_css != undefined && apiREQ.body.tipo_css != null && apiREQ.body.tipo_css != '') ? "'"+apiREQ.body.tipo_css.trim().toUpperCase()+"'": null;
    let _DOMFICICO  =   (apiREQ.body.tipo_icono != undefined && apiREQ.body.tipo_icono != null && apiREQ.body.tipo_icono != '') ? "'"+apiREQ.body.tipo_icono.trim().toUpperCase()+"'" : null;   
    let _DOMFICPAT  =   (apiREQ.body.tipo_path != undefined && apiREQ.body.tipo_path != null && apiREQ.body.tipo_path != '') ? "'"+apiREQ.body.tipo_path.trim().toLowerCase()+"'" : null;
    let _DOMFICEQU  =   (apiREQ.body.tipo_equivalencia != undefined && apiREQ.body.tipo_equivalencia != null && apiREQ.body.tipo_equivalencia != '') ? "'"+apiREQ.body.tipo_equivalencia.trim().toUpperCase()+"'" : null;  
    let _DOMFICVAL  =   (apiREQ.body.tipo_valor != undefined && apiREQ.body.tipo_valor != null && apiREQ.body.tipo_valor != '') ? "'"+apiREQ.body.tipo_valor.trim().toUpperCase()+"'" : null;  
    let _DOMFICOBS  =   (apiREQ.body.tipo_observacion != undefined && apiREQ.body.tipo_observacion != null && apiREQ.body.tipo_observacion != '') ? "'"+apiREQ.body.tipo_observacion.trim().toUpperCase()+"'" : null;  

    let _DOMFICCEM  =   (apiREQ.body.alta_empresa_codigo != undefined && apiREQ.body.alta_empresa_codigo != null && apiREQ.body.alta_empresa_codigo != '' && apiREQ.body.alta_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.alta_empresa_codigo) : false;
    let _DOMFICCUS  =   (apiREQ.body.alta_usuario != undefined && apiREQ.body.alta_usuario != null && apiREQ.body.alta_usuario != '') ? "'"+apiREQ.body.alta_usuario.trim().toUpperCase()+"'" : false;
    let _DOMFICCIP  =   (apiREQ.body.alta_ip != undefined && apiREQ.body.alta_ip != null && apiREQ.body.alta_ip != '') ? "'"+apiREQ.body.alta_ip.trim().toUpperCase()+"'" : false;
    let _DOMFICCPR  =   (apiREQ.body.alta_programa != undefined && apiREQ.body.alta_programa != null && apiREQ.body.alta_programa != '') ? "'"+apiREQ.body.alta_programa.trim().toUpperCase()+"'" : false;

    let _DOMFICAEM  =   (apiREQ.body.auditoria_empresa_codigo != undefined && apiREQ.body.auditoria_empresa_codigo != null && apiREQ.body.auditoria_empresa_codigo != '' && apiREQ.body.auditoria_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.auditoria_empresa_codigo) : false; 
    let _DOMFICAUS  =   (apiREQ.body.auditoria_usuario != undefined && apiREQ.body.auditoria_usuario != null && apiREQ.body.auditoria_usuario != '') ? "'"+apiREQ.body.auditoria_usuario.trim().toUpperCase()+"'" : false;
    let _DOMFICAIP  =   (apiREQ.body.auditoria_ip != undefined && apiREQ.body.auditoria_ip != null && apiREQ.body.auditoria_ip != '') ? "'"+apiREQ.body.auditoria_ip.trim().toUpperCase()+"'" : false;
    let _DOMFICAPR  =   (apiREQ.body.auditoria_programa != undefined && apiREQ.body.auditoria_programa != null && apiREQ.body.auditoria_programa != '') ? "'"+apiREQ.body.auditoria_programa.trim().toUpperCase()+"'" : false;
  
    if (_DOMFICEST && _DOMFICNOM && _DOMFICPAR && _DOMFICVAL && _DOMFICCEM && _DOMFICCUS && _DOMFICCIP && _DOMFICCPR && _DOMFICAEM && _DOMFICAUS && _DOMFICAIP && _DOMFICAPR) {

        (async () => {
            xDATA = await insertDOMFIC(_DOMFICEST,
                                    _DOMFICORD,
                                    _DOMFICPAR,
                                    _DOMFICNOM,
                                    _DOMFICCSS,
                                    _DOMFICICO,
                                    _DOMFICPAT,
                                    _DOMFICEQU,
                                    _DOMFICVAL,
                                    _DOMFICOBS,
                                    _DOMFICCEM,
                                    _DOMFICCUS,
                                    _DOMFICCIP,
                                    _DOMFICCPR,
                                    _DOMFICAEM,
                                    _DOMFICAUS,
                                    _DOMFICAIP,
                                    _DOMFICAPR);

            _code   = xDATA[0];
            xJSON  = xDATA[1];

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

const putDominio    = (apiREQ, apiRES) => {

    let xDATA       =   [];
    let _DOMFICCOD  =   Number.parseInt(apiREQ.params.codigo); 
    let _ACCION     =   (apiREQ.body.tipo_accion_codigo != undefined && apiREQ.body.tipo_accion_codigo != null && apiREQ.body.tipo_accion_codigo != '' && apiREQ.body.tipo_accion_codigo > 0) ? Number.parseInt(apiREQ.body.tipo_accion_codigo) : false;
    let _DOMFICEST  =   (apiREQ.body.tipo_estado_parametro != undefined && apiREQ.body.tipo_estado_parametro != null && apiREQ.body.tipo_estado_parametro != '' && apiREQ.body.tipo_estado_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_estado_parametro) : false;
    let _DOMFICNOM  =   (apiREQ.body.tipo_nombre != undefined && apiREQ.body.tipo_nombre != null && apiREQ.body.tipo_nombre != '') ? apiREQ.body.tipo_nombre.trim().toUpperCase() : false; 
    let _DOMFICORD  =   (apiREQ.body.tipo_orden != undefined && apiREQ.body.tipo_orden != null && apiREQ.body.tipo_orden != '') ? Number.parseInt(apiREQ.body.tipo_orden) : 999;
    let _DOMFICPAR  =   (apiREQ.body.tipo_parametro != undefined && apiREQ.body.tipo_parametro != null && apiREQ.body.tipo_parametro != '' && apiREQ.body.tipo_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_parametro) : false;
    let _DOMFICCSS  =   (apiREQ.body.tipo_css != undefined && apiREQ.body.tipo_css != null && apiREQ.body.tipo_css != '') ? "'"+apiREQ.body.tipo_css.trim().toUpperCase()+"'" : null;
    let _DOMFICICO  =   (apiREQ.body.tipo_icono != undefined && apiREQ.body.tipo_icono != null && apiREQ.body.tipo_icono != '') ? "'"+apiREQ.body.tipo_icono.trim().toUpperCase()+"'" : null;   
    let _DOMFICPAT  =   (apiREQ.body.tipo_path != undefined && apiREQ.body.tipo_path != null && apiREQ.body.tipo_path != '') ? "'"+apiREQ.body.tipo_path.trim().toLowerCase()+"'" : null;
    let _DOMFICEQU  =   (apiREQ.body.tipo_equivalencia != undefined && apiREQ.body.tipo_equivalencia != null && apiREQ.body.tipo_equivalencia != '') ? "'"+apiREQ.body.tipo_equivalencia.trim().toUpperCase()+"'" : null;  
    let _DOMFICVAL  =   (apiREQ.body.tipo_valor != undefined && apiREQ.body.tipo_valor != null && apiREQ.body.tipo_valor != '') ? "'"+apiREQ.body.tipo_valor.trim().toUpperCase()+"'" : null;  
    let _DOMFICOBS  =   (apiREQ.body.tipo_observacion != undefined && apiREQ.body.tipo_observacion != null && apiREQ.body.tipo_observacion != '') ? "'"+apiREQ.body.tipo_observacion.trim().toUpperCase()+"'" : null;  

    let _DOMFICCEM  =   (apiREQ.body.alta_empresa_codigo != undefined && apiREQ.body.alta_empresa_codigo != null && apiREQ.body.alta_empresa_codigo != '' && apiREQ.body.alta_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.alta_empresa_codigo) : false;
    let _DOMFICCUS  =   (apiREQ.body.alta_usuario != undefined && apiREQ.body.alta_usuario != null && apiREQ.body.alta_usuario != '') ? "'"+apiREQ.body.alta_usuario.trim().toUpperCase()+"'" : false;
    let _DOMFICCIP  =   (apiREQ.body.alta_ip != undefined && apiREQ.body.alta_ip != null && apiREQ.body.alta_ip != '') ? "'"+apiREQ.body.alta_ip.trim().toUpperCase()+"'" : false;
    let _DOMFICCPR  =   (apiREQ.body.alta_programa != undefined && apiREQ.body.alta_programa != null && apiREQ.body.alta_programa != '') ? "'"+apiREQ.body.alta_programa.trim().toUpperCase()+"'" : false;

    let _DOMFICAEM  =   (apiREQ.body.auditoria_empresa_codigo != undefined && apiREQ.body.auditoria_empresa_codigo != null && apiREQ.body.auditoria_empresa_codigo != '' && apiREQ.body.auditoria_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.auditoria_empresa_codigo) : false; 
    let _DOMFICAUS  =   (apiREQ.body.auditoria_usuario != undefined && apiREQ.body.auditoria_usuario != null && apiREQ.body.auditoria_usuario != '') ? "'"+apiREQ.body.auditoria_usuario.trim().toUpperCase()+"'" : false;
    let _DOMFICAIP  =   (apiREQ.body.auditoria_ip != undefined && apiREQ.body.auditoria_ip != null && apiREQ.body.auditoria_ip != '') ? "'"+apiREQ.body.auditoria_ip.trim().toUpperCase()+"'" : false;
    let _DOMFICAPR  =   (apiREQ.body.auditoria_programa != undefined && apiREQ.body.auditoria_programa != null && apiREQ.body.auditoria_programa != '') ? "'"+apiREQ.body.auditoria_programa.trim().toUpperCase()+"'" : false;
  
    if (_ACCION && _DOMFICCOD && _DOMFICEST && _DOMFICPAR && _DOMFICNOM && _DOMFICVAL && _DOMFICAEM && _DOMFICAUS && _DOMFICAIP && _DOMFICAPR) {

        (async () => {
            xDATA = await updateDOMFIC(_ACCION,
                                    _DOMFICCOD,
                                    _DOMFICEST,
                                    _DOMFICORD,
                                    _DOMFICPAR,
                                    _DOMFICNOM,
                                    _DOMFICCSS,
                                    _DOMFICICO,
                                    _DOMFICPAT,
                                    _DOMFICEQU,
                                    _DOMFICVAL,
                                    _DOMFICOBS,
                                    _DOMFICCEM,
                                    _DOMFICCUS,
                                    _DOMFICCIP,
                                    _DOMFICCPR,
                                    _DOMFICAEM,
                                    _DOMFICAUS,
                                    _DOMFICAIP,
                                    _DOMFICAPR);

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

const deleteDominio = (apiREQ, apiRES) => {

    let xDATA       =   [];
    let _DOMFICCOD  =   Number.parseInt(apiREQ.params.codigo); 
    let _ACCION     =   (apiREQ.body.tipo_accion_codigo != undefined && apiREQ.body.tipo_accion_codigo != null && apiREQ.body.tipo_accion_codigo != '' && apiREQ.body.tipo_accion_codigo > 0) ? Number.parseInt(apiREQ.body.tipo_accion_codigo) : false;
    let _DOMFICEST  =   (apiREQ.body.tipo_estado_parametro != undefined && apiREQ.body.tipo_estado_parametro != null && apiREQ.body.tipo_estado_parametro != '' && apiREQ.body.tipo_estado_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_estado_parametro) : false;
    let _DOMFICNOM  =   (apiREQ.body.tipo_nombre != undefined && apiREQ.body.tipo_nombre != null && apiREQ.body.tipo_nombre != '') ? apiREQ.body.tipo_nombre.trim().toUpperCase() : false; 
    let _DOMFICORD  =   (apiREQ.body.tipo_orden != undefined && apiREQ.body.tipo_orden != null && apiREQ.body.tipo_orden != '') ? Number.parseInt(apiREQ.body.tipo_orden) : 999;
    let _DOMFICPAR  =   (apiREQ.body.tipo_parametro != undefined && apiREQ.body.tipo_parametro != null && apiREQ.body.tipo_parametro != '' && apiREQ.body.tipo_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_parametro) : false;
    let _DOMFICCSS  =   (apiREQ.body.tipo_css != undefined && apiREQ.body.tipo_css != null && apiREQ.body.tipo_css != '') ? "'"+apiREQ.body.tipo_css.trim().toUpperCase()+"'" : null;
    let _DOMFICICO  =   (apiREQ.body.tipo_icono != undefined && apiREQ.body.tipo_icono != null && apiREQ.body.tipo_icono != '') ? "'"+apiREQ.body.tipo_icono.trim().toUpperCase()+"'" : null;   
    let _DOMFICPAT  =   (apiREQ.body.tipo_path != undefined && apiREQ.body.tipo_path != null && apiREQ.body.tipo_path != '') ? "'"+apiREQ.body.tipo_path.trim().toLowerCase()+"'" : null;
    let _DOMFICEQU  =   (apiREQ.body.tipo_equivalencia != undefined && apiREQ.body.tipo_equivalencia != null && apiREQ.body.tipo_equivalencia != '') ? "'"+apiREQ.body.tipo_equivalencia.trim().toUpperCase()+"'" : null;  
    let _DOMFICVAL  =   (apiREQ.body.tipo_valor != undefined && apiREQ.body.tipo_valor != null && apiREQ.body.tipo_valor != '') ? "'"+apiREQ.body.tipo_valor.trim().toUpperCase()+"'" : null;  
    let _DOMFICOBS  =   (apiREQ.body.tipo_observacion != undefined && apiREQ.body.tipo_observacion != null && apiREQ.body.tipo_observacion != '') ? "'"+apiREQ.body.tipo_observacion.trim().toUpperCase()+"'" : null;  

    let _DOMFICCEM  =   (apiREQ.body.alta_empresa_codigo != undefined && apiREQ.body.alta_empresa_codigo != null && apiREQ.body.alta_empresa_codigo != '' && apiREQ.body.alta_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.alta_empresa_codigo) : false;
    let _DOMFICCUS  =   (apiREQ.body.alta_usuario != undefined && apiREQ.body.alta_usuario != null && apiREQ.body.alta_usuario != '') ? "'"+apiREQ.body.alta_usuario.trim().toUpperCase()+"'" : false;
    let _DOMFICCIP  =   (apiREQ.body.alta_ip != undefined && apiREQ.body.alta_ip != null && apiREQ.body.alta_ip != '') ? "'"+apiREQ.body.alta_ip.trim().toUpperCase()+"'" : false;
    let _DOMFICCPR  =   (apiREQ.body.alta_programa != undefined && apiREQ.body.alta_programa != null && apiREQ.body.alta_programa != '') ? "'"+apiREQ.body.alta_programa.trim().toUpperCase()+"'" : false;

    let _DOMFICAEM  =   (apiREQ.body.auditoria_empresa_codigo != undefined && apiREQ.body.auditoria_empresa_codigo != null && apiREQ.body.auditoria_empresa_codigo != '' && apiREQ.body.auditoria_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.auditoria_empresa_codigo) : false; 
    let _DOMFICAUS  =   (apiREQ.body.auditoria_usuario != undefined && apiREQ.body.auditoria_usuario != null && apiREQ.body.auditoria_usuario != '') ? "'"+apiREQ.body.auditoria_usuario.trim().toUpperCase()+"'" : false;
    let _DOMFICAIP  =   (apiREQ.body.auditoria_ip != undefined && apiREQ.body.auditoria_ip != null && apiREQ.body.auditoria_ip != '') ? "'"+apiREQ.body.auditoria_ip.trim().toUpperCase()+"'" : false;
    let _DOMFICAPR  =   (apiREQ.body.auditoria_programa != undefined && apiREQ.body.auditoria_programa != null && apiREQ.body.auditoria_programa != '') ? "'"+apiREQ.body.auditoria_programa.trim().toUpperCase()+"'" : false;
  
    if (_DOMFICCOD && _DOMFICEST && _DOMFICNOM && _DOMFICPAR && _DOMFICNOM && _DOMFICVAL && _DOMFICAEM && _DOMFICAUS && _DOMFICAIP && _DOMFICAPR) {

        (async () => {
            xDATA = await deleteDOMFIC(_DOMFICCOD);

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
    getDominio,
    getDominioId,
    getDominioValor,
    postDominio,
    putDominio,
    deleteDominio
}
