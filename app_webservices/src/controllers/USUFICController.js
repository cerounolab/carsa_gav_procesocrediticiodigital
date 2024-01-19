require('dotenv').config({ path:__dirname+'/./../../.env' });

const camelcaseKeys = require('camelcase-keys');

const {selectUSUARIO}= require('../helpers/sql_select');
const {selectUSUARIOEMPRESA}= require('../helpers/sql_select');
const {insertUSUFIC, insertUSULOG}= require('../helpers/sql_insert');
const {updateUSUFIC, updateintentoUSUFIC}= require('../helpers/sql_update');
const {deleteUSUFIC}= require('../helpers/sql_delete');
const {jsonBody}    = require('../utils/_json');
const {errorBody}   = require('../utils/_json');
const bcrypt        = require('bcryptjs');

//const affiliateId = process.env.ENV_AFFILIATEID;

const getUsuario    = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];     
    let _codigo     = parseInt(apiREQ.params.empresa); 

    if (_codigo != 'undefined' && _codigo != '' && _codigo != null && _codigo > 0){
        (async () => {
            const xDATA = await selectUSUARIO(1, _codigo, '', 0);
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

const getUsuarioId  = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];
    let _codigo     = parseInt(apiREQ.params.codigo);

    if (_codigo != 'undefined' && _codigo != '' && _codigo != null && _codigo > 0){

        (async () => {
            const xDATA = await selectUSUARIO(2, _codigo, '', 0);
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

const getUsuarioDocumento   = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];
    let _valor     = String(apiREQ.params.documento).trim().toUpperCase();

    if (_valor != 'undefined' && _valor != ''){

        (async () => {
            const xDATA = await selectUSUARIO(3, 0, _valor, 0);
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

const getUsuarioUsu = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];
    let _valor     = String(apiREQ.params.usuario).trim().toUpperCase();

    if (_valor != 'undefined' && _valor != ''){

        (async () => {
            const xDATA = await selectUSUARIO(4, 0, _valor, 0);
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

const getUsuarioEmpresaId = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];
    let _codigo     = parseInt(apiREQ.params.empresa);

    if (_codigo != 'undefined' && _codigo != ''){

        (async () => {
            const xDATA = await selectUSUARIO(5, _codigo, '', 0);
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

const getUsuarioSucursalId = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];
    let _codigo     = parseInt(apiREQ.params.sucursal);

    if (_codigo != 'undefined' && _codigo != '' && _codigo != null && _codigo > 0){
        (async () => {
            const xDATA = await selectUSUARIO(6, _codigo, '', 0);
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

const getUsuarioDashboardEmpresa  = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];
    let _codigo     = parseInt(apiREQ.params.empresa);

    if (_codigo != 'undefined' && _codigo != '' && _codigo != null && _codigo > 0){

        (async () => {
            const xDATA = await selectUSUARIO(7, _codigo, '', 0);
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

const getUsuarioDocumentoEmpresa = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];
    let _codigo     = parseInt(apiREQ.params.empresa);
    let _valor      = String(apiREQ.params.documento).trim().toUpperCase();

    if (_codigo != 'undefined' && _codigo > 0 && _valor != 'undefined' && _valor != ''){

        (async () => {
            const xDATA = await selectUSUARIOEMPRESA(1, _codigo, _valor, 0);
            _code       = xDATA[0];
            _dataJSON   = xDATA[1];
    
            if (_code == 200) {
                _dataJSON   = await jsonBody(_code, 'Success', null, null, null, 0, 0, 0, 0, _dataJSON);
                 return apiRES.status(200).json(_dataJSON);
    
            } else {                
                _dataJSON   = await jsonBody(_code, 'Error', null, null, 'El documento ingresado no existe', 0, 0, 0, 0, []);
                return apiRES.status(200).json(_dataJSON);
            }
        })();

    }else{
        (async () => {
            _code       = 400;
            _dataJSON   = await jsonBody(_code, 'Verifique, algún campo esta vacio.', true);

             return apiRES.status(200).json(_dataJSON);
        })();
        
    }
}

const postUsuario   = (apiREQ, apiRES) => {

    let  xDATA      =   []; 
    let _USUFICEST  = (apiREQ.body.tipo_estado_parametro != undefined && apiREQ.body.tipo_estado_parametro != null && apiREQ.body.tipo_estado_parametro != '' && apiREQ.body.tipo_estado_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_estado_parametro) : false; 
    let _USUFICEMC  = (apiREQ.body.empresa_codigo != undefined && apiREQ.body.empresa_codigo != null && apiREQ.body.empresa_codigo != '' && apiREQ.body.empresa_codigo > 0) ? Number.parseInt(apiREQ.body.empresa_codigo) : false;  
    let _USUFICSUC  = (apiREQ.body.sucursal_codigo != undefined && apiREQ.body.sucursal_codigo != null && apiREQ.body.sucursal_codigo != '' && apiREQ.body.sucursal_codigo > 0) ? Number.parseInt(apiREQ.body.sucursal_codigo) : false;  
    let _USUFICORD  = (apiREQ.body.usuario_orden != undefined && apiREQ.body.usuario_orden != null && apiREQ.body.usuario_orden != '') ? Number.parseInt(apiREQ.body.usuario_orden) : 999;
    let _USUFICDOC  = (apiREQ.body.usuario_documento != undefined && apiREQ.body.usuario_documento != null && apiREQ.body.usuario_documento != '') ? "'"+apiREQ.body.usuario_documento.trim().toUpperCase()+"'" : false; 
    let _USUFICNOM  = (apiREQ.body.usuario_nombre != undefined && apiREQ.body.usuario_nombre != null && apiREQ.body.usuario_nombre != '') ? "'"+apiREQ.body.usuario_nombre.trim()+"'" : false; 
    let _USUFICAPE  = (apiREQ.body.usuario_apellido != undefined && apiREQ.body.usuario_apellido != null && apiREQ.body.usuario_apellido != '') ? "'"+apiREQ.body.usuario_apellido.trim()+"'" : false;
    let _USUFICUSU  = (apiREQ.body.usuario_usuario != undefined && apiREQ.body.usuario_usuario != null && apiREQ.body.usuario_usuario != '') ? "'"+apiREQ.body.usuario_usuario.trim().toUpperCase()+"'" : false;
    let _USUFICPAS  = (apiREQ.body.usuario_password != undefined && apiREQ.body.usuario_password != null && apiREQ.body.usuario_password != '') ? "'"+apiREQ.body.usuario_password.trim()+"'" : false;
    let _USUFICEMA  = (apiREQ.body.usuario_correo != undefined && apiREQ.body.usuario_correo != null && apiREQ.body.usuario_correo != '') ? "'"+apiREQ.body.usuario_correo.trim().toLowerCase()+"'" : false;
    let _USUFICCEL  = (apiREQ.body.usuario_celular != undefined && apiREQ.body.usuario_celular != null && apiREQ.body.usuario_celular != '') ? "'"+apiREQ.body.usuario_celular.trim().toLowerCase()+"'" : null;
    let _USUFICEJC  = (apiREQ.body.usuario_ejecutivo_venta_codigo != undefined && apiREQ.body.usuario_ejecutivo_venta_codigo != null && apiREQ.body.usuario_ejecutivo_venta_codigo != '' && apiREQ.body.usuario_ejecutivo_venta_codigo > 0) ? Number.parseInt(apiREQ.body.usuario_ejecutivo_venta_codigo) : false;
    let _USUFICTCN  = (apiREQ.body.usuario_cliente_nuevo != undefined && apiREQ.body.usuario_cliente_nuevo != null && apiREQ.body.usuario_cliente_nuevo != '') ? "'"+apiREQ.body.usuario_cliente_nuevo.trim().toUpperCase()+"'" : false; 
    let _USUFICTCR  = (apiREQ.body.usuario_cliente_recurrente != undefined && apiREQ.body.usuario_cliente_recurrente != null && apiREQ.body.usuario_cliente_recurrente != '') ? "'"+apiREQ.body.usuario_cliente_recurrente.trim().toUpperCase()+"'" : false; 
    let _USUFICOBS  = (apiREQ.body.usuario_observacion != undefined && apiREQ.body.usuario_observacion != null && apiREQ.body.usuario_observacion != '') ? "'"+apiREQ.body.usuario_observacion.trim()+"'" : null;

    let _USUFICCEM  = (apiREQ.body.alta_empresa_codigo != undefined && apiREQ.body.alta_empresa_codigo != null && apiREQ.body.alta_empresa_codigo != '' && apiREQ.body.alta_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.alta_empresa_codigo) : false; 
    let _USUFICCUS  = (apiREQ.body.alta_usuario != undefined && apiREQ.body.alta_usuario != null && apiREQ.body.alta_usuario != '') ? "'"+apiREQ.body.alta_usuario.trim().toUpperCase()+"'" : false;
    let _USUFICCIP  = (apiREQ.body.alta_ip != undefined && apiREQ.body.alta_ip != null && apiREQ.body.alta_ip != '') ? "'"+apiREQ.body.alta_ip.trim().toUpperCase()+"'" : false;
    let _USUFICCPR  = (apiREQ.body.alta_programa != undefined && apiREQ.body.alta_programa != null && apiREQ.body.alta_programa != '') ? "'"+apiREQ.body.alta_programa.trim().toUpperCase()+"'" : null;

    let _USUFICAEM  = (apiREQ.body.auditoria_empresa_codigo != undefined && apiREQ.body.auditoria_empresa_codigo != null && apiREQ.body.auditoria_empresa_codigo != '' && apiREQ.body.auditoria_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.auditoria_empresa_codigo) : false; 
    let _USUFICAUS  = (apiREQ.body.auditoria_usuario != undefined && apiREQ.body.auditoria_usuario != null && apiREQ.body.auditoria_usuario != '') ? "'"+apiREQ.body.auditoria_usuario.trim().toUpperCase()+"'" : false; 
    let _USUFICAIP  = (apiREQ.body.auditoria_ip != undefined && apiREQ.body.auditoria_ip != null && apiREQ.body.auditoria_ip != '') ? "'"+apiREQ.body.auditoria_ip.trim().toUpperCase()+"'" : false; 
    let _USUFICAPR  = (apiREQ.body.auditoria_programa != undefined && apiREQ.body.auditoria_programa != null && apiREQ.body.auditoria_programa != '') ? "'"+apiREQ.body.auditoria_programa.trim()+"'" : false; 
    let _USUFICAIN  = (apiREQ.body.auditoria_incidencia != undefined && apiREQ.body.auditoria_incidencia != null && apiREQ.body.auditoria_incidencia != '') ? "'"+apiREQ.body.auditoria_incidencia.trim()+"'" : null;
    
    const rondasDeSal   =   12;

    if (_USUFICEST && _USUFICEMC && _USUFICSUC && _USUFICDOC && _USUFICNOM && _USUFICAPE && _USUFICUSU && _USUFICPAS && _USUFICEMA /*&& _USUFICEJC && _USUFICTCN && _USUFICTCR*/ && _USUFICCEM && _USUFICCUS && _USUFICCIP && _USUFICCPR && _USUFICAEM && _USUFICAUS && _USUFICAIP && _USUFICAPR){
            (async () => {
                bcrypt.hash(_USUFICPAS, rondasDeSal, async (err, _USUFICPAS2) => {
                    xDATA = await insertUSUFIC(_USUFICEST,
                    _USUFICEMC,
                    _USUFICSUC,
                    _USUFICORD,
                    _USUFICDOC,
                    _USUFICNOM,
                    _USUFICAPE,
                    _USUFICUSU,
                    _USUFICPAS2,
                    _USUFICEMA,
                    _USUFICCEL,
                    _USUFICEJC,
                    _USUFICTCN,
                    _USUFICTCR,
                    _USUFICOBS,
                    _USUFICCEM,
                    _USUFICCUS,
                    _USUFICCIP,
                    _USUFICCPR,
                    _USUFICAEM,
                    _USUFICAUS,
                    _USUFICAIP,
                    _USUFICAPR,
                    _USUFICAIN);

                    _code   = xDATA[0];
                    xJSON   = xDATA[1];

                    if (_code == 200) {
                        xJSON = await jsonBody(_code, 'Success', null, 'Correcto ', null, 0, 0, 0, 0, xJSON);

                    } else if (_code == 404){
                        xJSON   = xDATA[1];
                        xJSON   = await jsonBody(_code, 'Error', 'postUsuario', 'Error: el usuario ya existe', null, 0, 0, 0, 0, xJSON);
                    }else{
                        xJSON   = xDATA[1];
                        xJSON   = await jsonBody(_code, 'Error', xJSON.reference, null, xJSON.message, 0, 0, 0, 0, []);
                    }

                    xJSON = camelcaseKeys(xJSON, {deep: true});

                    return apiRES.status(_code).json(xJSON);
                });   
            })();     
    }else{
        (async () => {
            _code   = 400;
            xJSON   = await jsonBody(_code, 'Error', 'postUsuario', 'Error: Verifique algún campo esta vacío', null, 0, 0, 0, 0, []);
            xJSON   = camelcaseKeys(xJSON, {deep: true});
            return apiRES.status(200).json(xJSON);
        })();
    
    }       

}

const postUsuarioLogin   = (apiREQ, apiRES) => {

    let _USUFICUSU  = (apiREQ.body.usuario_usuario != undefined && apiREQ.body.usuario_usuario != null && apiREQ.body.usuario_usuario != '') ? "'"+apiREQ.body.usuario_usuario.trim().toUpperCase()+"'" : false;
    let _USUFICPAS  = (apiREQ.body.usuario_password != undefined && apiREQ.body.usuario_password != null && apiREQ.body.usuario_password != '') ? "'"+apiREQ.body.usuario_password.trim()+"'" : false;
    let _ROLFICTPC  = (apiREQ.body.tipo_plataforma_parametro != undefined && apiREQ.body.tipo_plataforma_parametro != null && apiREQ.body.tipo_plataforma_parametro != '' && apiREQ.body.tipo_plataforma_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_plataforma_parametro) : false; 
    let _USUFICAEM  = (apiREQ.body.auditoria_empresa_codigo != undefined && apiREQ.body.auditoria_empresa_codigo != null && apiREQ.body.auditoria_empresa_codigo != '' && apiREQ.body.auditoria_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.auditoria_empresa_codigo) : false; 
    let _USUFICAUS  = (apiREQ.body.auditoria_usuario != undefined && apiREQ.body.auditoria_usuario != null && apiREQ.body.auditoria_usuario != '') ? "'"+apiREQ.body.auditoria_usuario.trim().toUpperCase()+"'" : false; 
    let _USUFICAIP  = (apiREQ.body.auditoria_ip != undefined && apiREQ.body.auditoria_ip != null && apiREQ.body.auditoria_ip != '') ? "'"+apiREQ.body.auditoria_ip.trim().toUpperCase()+"'" : false; 
    let _USUFICAPR  = (apiREQ.body.auditoria_programa != undefined && apiREQ.body.auditoria_programa != null && apiREQ.body.auditoria_programa != '') ? "'"+apiREQ.body.auditoria_programa.trim()+"'" : false; 
    let _USUFICAIN  = (apiREQ.body.auditoria_incidencia != undefined && apiREQ.body.auditoria_incidencia != null && apiREQ.body.auditoria_incidencia != '') ? "'"+apiREQ.body.auditoria_incidencia.trim()+"'" : null;
   
    let _USULOGHOS  = (apiREQ.body.usuario_log_host != undefined && apiREQ.body.usuario_log_host != null && apiREQ.body.usuario_log_host != '') ? "'"+apiREQ.body.usuario_log_host.trim()+"'" : null;   
    let _USULOGAGE  = (apiREQ.body.usuario_log_age != undefined && apiREQ.body.usuario_log_age != null && apiREQ.body.usuario_log_age != '') ? "'"+apiREQ.body.usuario_log_age.trim()+"'" : null;     
    let _USULOGREF  = (apiREQ.body.usuario_log_referencia != undefined && apiREQ.body.usuario_log_referencia != null && apiREQ.body.usuario_log_referencia != '') ? "'"+apiREQ.body.usuario_log_referencia.trim()+"'" : null;     
    let _password   = '';
    let _USULOGEST  = '';  
    let _USUFICIPAS = 0;
    let _empresacodigo   = 0;
    
    if (_USUFICUSU && _USUFICPAS && _ROLFICTPC && _USUFICAEM && _USUFICAUS && _USUFICAIP && _USUFICAPR){
            (async () => {
                const xDATA = await selectUSUARIO(8, 0, _USUFICUSU, 0);
                _code       = xDATA[0];
                _dataJSON   = xDATA[1];
                if (_code == 200) {
                    _USUFICIPAS     =  _dataJSON[0].usuario_intento_password;
                    _empresacodigo  = _dataJSON[0].empresa_codigo;

                    if (_USUFICIPAS < 3){
                        const xDATA = await selectUSUARIO(4, 0, _USUFICUSU, _ROLFICTPC);
                        _code       = xDATA[0];
                        _dataJSON   = xDATA[1];

                        if (_code == 200) {
                            _password       = _dataJSON[0].usuario_password;

                            bcrypt.compare(_USUFICPAS, _password, async (err, coinciden) => {
                                
                                if (coinciden){
                                    _USULOGEST  = 'CORRECTO';
                                    _dataJSON[0].usuario_password = '';
                                    _dataJSON   = await jsonBody(_code, 'Success', null, 'Correcto', null, 0, 0, 0, 0, _dataJSON);

                                    updateintentoUSUFIC(1, _USUFICUSU, 0, _USUFICAEM, _USUFICAUS, _USUFICAIP, _USUFICAPR, _USUFICAIN);
                
                                } else {
                                    _code       = 201;
                                    _USULOGEST  = 'ERROR_PAS';
                                    _dataJSON   = await jsonBody(_code, 'Error', 'postUsuarioLogin', 'Error: La contraseña no coincide, verifique', null, 0, 0, 0, 0, []);
                                    updateintentoUSUFIC(1, _USUFICUSU, 1, _USUFICAEM, _USUFICAUS, _USUFICAIP, _USUFICAPR, _USUFICAIN);
                                    
                                }

                                insertUSULOG(_USULOGEST, _USUFICUSU, _password, _empresacodigo, _USUFICAIP, _USULOGHOS, _USULOGAGE, _USULOGREF, _USUFICAEM, _USUFICAUS, _USUFICAIP, _USUFICAPR);
                                _dataJSON = camelcaseKeys(_dataJSON, {deep: true});

                                return apiRES.status(200).json(_dataJSON);
                                        
                            });
                        } else {
                            _code       = 201;
                            _USULOGEST  = 'ERROR_USER';
                            insertUSULOG(_USULOGEST, _USUFICUSU, _password, _empresacodigo, _USUFICAIP, _USULOGHOS, _USULOGAGE, _USULOGREF, _USUFICAEM, _USUFICAUS, _USUFICAIP, _USUFICAPR);
                            _dataJSON   = await jsonBody(_code, 'Error', 'postUsuarioLogin','El usuario no existe o se encuentra inactivo, verifique', null, 0, 0, 0, 0, []);

                            _dataJSON   = camelcaseKeys(_dataJSON, {deep: true});
                
                            return apiRES.status(200).json(_dataJSON);
                        }
                    } else {
                        _code       = 201;
                        _USULOGEST  = 'USER_LOCKED';
                        updateintentoUSUFIC(2, _USUFICUSU, 0, _USUFICAEM, _USUFICAUS, _USUFICAIP, _USUFICAPR, _USUFICAIN);
                                    
                        insertUSULOG(_USULOGEST, _USUFICUSU, _password, _empresacodigo, _USUFICAIP, _USULOGHOS, _USULOGAGE, _USULOGREF, _USUFICAEM, _USUFICAUS, _USUFICAIP, _USUFICAPR);
                        _dataJSON   = await jsonBody(_code, 'Error', 'postUsuarioLogin', 'El usuario se encuentra bloqueado, verifique', null, 0, 0, 0, 0, []);

                        _dataJSON   = camelcaseKeys(_dataJSON, {deep: true});
            
                        return apiRES.status(200).json(_dataJSON);
                    } 

                }   
            })();  
            
    }else{
        (async () => {
            _code   = 400;
            xJSON   = await jsonBody(_code, 'Error', 'postUsuarioLogin', 'Error: Verifique algún campo esta vacío', null, 0, 0, 0, 0, []);
            xJSON   = camelcaseKeys(xJSON, {deep: true});
            return apiRES.status(200).json(xJSON);
        })();
    
    }       

}

const putUsuario    = (apiREQ, apiRES) => {

    let xDATA       =   []; 
    let _USUFICCOD  = Number.parseInt(apiREQ.params.codigo); 
    let _ACCION     = (apiREQ.body.tipo_accion_codigo != undefined && apiREQ.body.tipo_accion_codigo != null && apiREQ.body.tipo_accion_codigo != '' && apiREQ.body.tipo_accion_codigo > 0) ? Number.parseInt(apiREQ.body.tipo_accion_codigo) : false;
    let _USUFICEST  = (apiREQ.body.tipo_estado_parametro != undefined && apiREQ.body.tipo_estado_parametro != null && apiREQ.body.tipo_estado_parametro != '' && apiREQ.body.tipo_estado_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_estado_parametro) : false; 
    let _USUFICEMC  = (apiREQ.body.empresa_codigo != undefined && apiREQ.body.empresa_codigo != null && apiREQ.body.empresa_codigo != '' && apiREQ.body.empresa_codigo > 0) ? Number.parseInt(apiREQ.body.empresa_codigo) : false;  
    let _USUFICSUC  = (apiREQ.body.sucursal_codigo != undefined && apiREQ.body.sucursal_codigo != null && apiREQ.body.sucursal_codigo != '' && apiREQ.body.sucursal_codigo > 0) ? Number.parseInt(apiREQ.body.sucursal_codigo) : false;  
    let _USUFICORD  = (apiREQ.body.usuario_orden != undefined && apiREQ.body.usuario_orden != null && apiREQ.body.usuario_orden != '') ? Number.parseInt(apiREQ.body.usuario_orden) : 999;
    let _USUFICDOC  = (apiREQ.body.usuario_documento != undefined && apiREQ.body.usuario_documento != null && apiREQ.body.usuario_documento != '') ? "'"+apiREQ.body.usuario_documento.trim().toUpperCase()+"'" : false; 
    let _USUFICNOM  = (apiREQ.body.usuario_nombre != undefined && apiREQ.body.usuario_nombre != null && apiREQ.body.usuario_nombre != '') ? "'"+apiREQ.body.usuario_nombre.trim()+"'" : false; 
    let _USUFICAPE  = (apiREQ.body.usuario_apellido != undefined && apiREQ.body.usuario_apellido != null && apiREQ.body.usuario_apellido != '') ? "'"+apiREQ.body.usuario_apellido.trim()+"'" : false;
    let _USUFICUSU  = (apiREQ.body.usuario_usuario != undefined && apiREQ.body.usuario_usuario != null && apiREQ.body.usuario_usuario != '') ? "'"+apiREQ.body.usuario_usuario.trim().toUpperCase()+"'" : false;
    let _USUFICPAS  = (apiREQ.body.usuario_password != undefined && apiREQ.body.usuario_password != null && apiREQ.body.usuario_password != '') ? "'"+apiREQ.body.usuario_password.trim()+"'" : false;
    let _USUFICEMA  = (apiREQ.body.usuario_correo != undefined && apiREQ.body.usuario_correo != null && apiREQ.body.usuario_correo != '') ? "'"+apiREQ.body.usuario_correo.trim().toLowerCase()+"'" : false;
    let _USUFICCEL  = (apiREQ.body.usuario_celular != undefined && apiREQ.body.usuario_celular != null && apiREQ.body.usuario_celular != '') ? "'"+apiREQ.body.usuario_celular.trim().toLowerCase()+"'" : null;
    let _USUFICEJC  = (apiREQ.body.usuario_ejecutivo_venta_codigo != undefined && apiREQ.body.usuario_ejecutivo_venta_codigo != null && apiREQ.body.usuario_ejecutivo_venta_codigo != '' && apiREQ.body.usuario_ejecutivo_venta_codigo > 0) ? Number.parseInt(apiREQ.body.usuario_ejecutivo_venta_codigo) : false;
    let _USUFICTCN  = (apiREQ.body.usuario_cliente_nuevo != undefined && apiREQ.body.usuario_cliente_nuevo != null && apiREQ.body.usuario_cliente_nuevo != '') ? "'"+apiREQ.body.usuario_cliente_nuevo.trim().toUpperCase()+"'" : false; 
    let _USUFICTCR  = (apiREQ.body.usuario_cliente_recurrente != undefined && apiREQ.body.usuario_cliente_recurrente != null && apiREQ.body.usuario_cliente_recurrente != '') ? "'"+apiREQ.body.usuario_cliente_recurrente.trim().toUpperCase()+"'" : false; 
    let _USUFICOBS  = (apiREQ.body.usuario_observacion != undefined && apiREQ.body.usuario_observacion != null && apiREQ.body.usuario_observacion != '') ? "'"+apiREQ.body.usuario_observacion.trim()+"'" : null;

    let _USUFICCEM  = (apiREQ.body.alta_empresa_codigo != undefined && apiREQ.body.alta_empresa_codigo != null && apiREQ.body.alta_empresa_codigo != '' && apiREQ.body.alta_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.alta_empresa_codigo) : false; 
    let _USUFICCUS  = (apiREQ.body.alta_usuario != undefined && apiREQ.body.alta_usuario != null && apiREQ.body.alta_usuario != '') ? "'"+apiREQ.body.alta_usuario.trim().toUpperCase()+"'" : false;
    let _USUFICCIP  = (apiREQ.body.alta_ip != undefined && apiREQ.body.alta_ip != null && apiREQ.body.alta_ip != '') ? "'"+apiREQ.body.alta_ip.trim().toUpperCase()+"'" : false;
    let _USUFICCPR  = (apiREQ.body.alta_programa != undefined && apiREQ.body.alta_programa != null && apiREQ.body.alta_programa != '') ? "'"+apiREQ.body.alta_programa.trim()+"'" : false; 

    let _USUFICAEM  = (apiREQ.body.auditoria_empresa_codigo != undefined && apiREQ.body.auditoria_empresa_codigo != null && apiREQ.body.auditoria_empresa_codigo != '' && apiREQ.body.auditoria_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.auditoria_empresa_codigo) : false; 
    let _USUFICAUS  = (apiREQ.body.auditoria_usuario != undefined && apiREQ.body.auditoria_usuario != null && apiREQ.body.auditoria_usuario != '') ? "'"+apiREQ.body.auditoria_usuario.trim().toUpperCase()+"'" : false; 
    let _USUFICAIP  = (apiREQ.body.auditoria_ip != undefined && apiREQ.body.auditoria_ip != null && apiREQ.body.auditoria_ip != '') ? "'"+apiREQ.body.auditoria_ip.trim().toUpperCase()+"'" : false; 
    let _USUFICAPR  = (apiREQ.body.auditoria_programa != undefined && apiREQ.body.auditoria_programa != null && apiREQ.body.auditoria_programa != '') ? "'"+apiREQ.body.auditoria_programa.trim()+"'" : false; 
    let _USUFICAIN  = (apiREQ.body.auditoria_incidencia != undefined && apiREQ.body.auditoria_incidencia != null && apiREQ.body.auditoria_incidencia != '') ? "'"+apiREQ.body.auditoria_incidencia.trim()+"'" : null;
    let _USUFICIPA  = 0;

    let rondasDeSal = 12;
 
    if (_ACCION && _USUFICEST && _USUFICEMC && _USUFICSUC && _USUFICDOC && _USUFICNOM && _USUFICAPE && _USUFICUSU && _USUFICPAS && _USUFICEMA && _USUFICEJC && _USUFICTCN && _USUFICTCR && _USUFICAEM && _USUFICAUS && _USUFICAIP && _USUFICAPR) {

        (async () => {
            bcrypt.hash(_USUFICPAS, rondasDeSal, async (err, _USUFICPAS2) => {
                xDATA = await updateUSUFIC(_ACCION,
                _USUFICCOD,
                _USUFICEST,
                _USUFICEMC,
                _USUFICSUC,
                _USUFICORD,
                _USUFICDOC,
                _USUFICNOM,
                _USUFICAPE,
                _USUFICUSU,
                _USUFICPAS2,
                _USUFICEMA,
                _USUFICCEL,
                _USUFICIPA,
                _USUFICEJC,
                _USUFICTCN,
                _USUFICTCR,
                _USUFICOBS,
                _USUFICAEM,
                _USUFICAUS,
                _USUFICAIP,
                _USUFICAPR,
                _USUFICAIN);

                _code   = xDATA[0];
                xJSON   = xDATA[1];

                if (_code == 200) {
                    xJSON = await jsonBody(_code, 'Success', null, 'Correcto', null, 0, 0, 0, 0, xJSON);
    
                } else if (_code == 404){
                    xJSON   = xDATA[1];
                    xJSON   = await jsonBody(_code, 'Error', 'putUsuario', 'Error: El registro ya existe', null, 0, 0, 0, 0, xJSON);
                }else{
                    xJSON   = xDATA[1];
                    xJSON   = await jsonBody(_code, 'Error', xJSON.reference, null, xJSON.message, 0, 0, 0, 0, []);
                }

                xJSON = camelcaseKeys(xJSON, {deep: true});

                return apiRES.status(_code).json(xJSON);
            });   
        })();

    }else{
        (async () => {
            _code   = 400;
            xJSON   = await jsonBody(_code, 'Error', 'putUsuario', 'Error: Verifique algún campo esta vacío', null, 0, 0, 0, 0, []);
            xJSON   = camelcaseKeys(xJSON, {deep: true});
            return apiRES.status(200).json(xJSON);
        })();

}       

}

const deleteUsuario = (apiREQ, apiRES) => {

    let xDATA       =   []; 
    let _USUFICCOD  = Number.parseInt(apiREQ.params.codigo); 
    let _USUFICEST  = (apiREQ.body.tipo_estado_parametro != undefined && apiREQ.body.tipo_estado_parametro != null && apiREQ.body.tipo_estado_parametro != '' && apiREQ.body.tipo_estado_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_estado_parametro) : false; 
    let _USUFICEMC  = (apiREQ.body.empresa_codigo != undefined && apiREQ.body.empresa_codigo != null && apiREQ.body.empresa_codigo != '' && apiREQ.body.empresa_codigo > 0) ? Number.parseInt(apiREQ.body.empresa_codigo) : false;  
    let _USUFICSUC  = (apiREQ.body.sucursal_codigo != undefined && apiREQ.body.sucursal_codigo != null && apiREQ.body.sucursal_codigo != '' && apiREQ.body.sucursal_codigo > 0) ? Number.parseInt(apiREQ.body.sucursal_codigo) : false;  
    let _USUFICORD  = (apiREQ.body.usuario_orden != undefined && apiREQ.body.usuario_orden != null && apiREQ.body.usuario_orden != '') ? Number.parseInt(apiREQ.body.usuario_orden) : 999;
    let _USUFICDOC  = (apiREQ.body.usuario_documento != undefined && apiREQ.body.usuario_documento != null && apiREQ.body.usuario_documento != '') ? "'"+apiREQ.body.usuario_documento.trim().toUpperCase()+"'" : false; 
    let _USUFICNOM  = (apiREQ.body.usuario_nombre != undefined && apiREQ.body.usuario_nombre != null && apiREQ.body.usuario_nombre != '') ? "'"+apiREQ.body.usuario_nombre.trim()+"'" : false; 
    let _USUFICAPE  = (apiREQ.body.usuario_apellido != undefined && apiREQ.body.usuario_apellido != null && apiREQ.body.usuario_apellido != '') ? "'"+apiREQ.body.usuario_apellido.trim()+"'" : false;
    let _USUFICUSU  = (apiREQ.body.usuario_usuario != undefined && apiREQ.body.usuario_usuario != null && apiREQ.body.usuario_usuario != '') ? "'"+apiREQ.body.usuario_usuario.trim().toUpperCase()+"'" : false;
    let _USUFICPAS  = (apiREQ.body.usuario_password != undefined && apiREQ.body.usuario_password != null && apiREQ.body.usuario_password != '') ? "'"+apiREQ.body.usuario_password.trim()+"'" : false;
    let _USUFICEMA  = (apiREQ.body.usuario_correo != undefined && apiREQ.body.usuario_correo != null && apiREQ.body.usuario_correo != '') ? "'"+apiREQ.body.usuario_correo.trim().toLowerCase()+"'" : false;
    let _USUFICCEL  = (apiREQ.body.usuario_celular != undefined && apiREQ.body.usuario_celular != null && apiREQ.body.usuario_celular != '') ? "'"+apiREQ.body.usuario_celular.trim().toLowerCase()+"'" : null;
    let _USUFICEJC  = (apiREQ.body.usuario_ejecutivo_venta_codigo != undefined && apiREQ.body.usuario_ejecutivo_venta_codigo != null && apiREQ.body.usuario_ejecutivo_venta_codigo != '' && apiREQ.body.usuario_ejecutivo_venta_codigo > 0) ? Number.parseInt(apiREQ.body.usuario_ejecutivo_venta_codigo) : false;
    let _USUFICTCN  = (apiREQ.body.usuario_cliente_nuevo != undefined && apiREQ.body.usuario_cliente_nuevo != null && apiREQ.body.usuario_cliente_nuevo != '') ? "'"+apiREQ.body.usuario_cliente_nuevo.trim().toUpperCase()+"'" : false; 
    let _USUFICTCR  = (apiREQ.body.usuario_cliente_recurrente != undefined && apiREQ.body.usuario_cliente_recurrente != null && apiREQ.body.usuario_cliente_recurrente != '') ? "'"+apiREQ.body.usuario_cliente_recurrente.trim().toUpperCase()+"'" : false; 
    let _USUFICOBS  = (apiREQ.body.usuario_observacion != undefined && apiREQ.body.usuario_observacion != null && apiREQ.body.usuario_observacion != '') ? "'"+apiREQ.body.usuario_observacion.trim()+"'" : null;

    let _USUFICCEM  = (apiREQ.body.alta_empresa_codigo != undefined && apiREQ.body.alta_empresa_codigo != null && apiREQ.body.alta_empresa_codigo != '' && apiREQ.body.alta_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.alta_empresa_codigo) : false; 
    let _USUFICCUS  = (apiREQ.body.alta_usuario != undefined && apiREQ.body.alta_usuario != null && apiREQ.body.alta_usuario != '') ? "'"+apiREQ.body.alta_usuario.trim().toUpperCase()+"'" : false;
    let _USUFICCIP  = (apiREQ.body.alta_ip != undefined && apiREQ.body.alta_ip != null && apiREQ.body.alta_ip != '') ? "'"+apiREQ.body.alta_ip.trim().toUpperCase()+"'" : false;
    let _USUFICCPR  = (apiREQ.body.alta_programa != undefined && apiREQ.body.alta_programa != null && apiREQ.body.alta_programa != '') ? "'"+apiREQ.body.alta_programa.trim()+"'" : false; 

    let _USUFICAEM  = (apiREQ.body.auditoria_empresa_codigo != undefined && apiREQ.body.auditoria_empresa_codigo != null && apiREQ.body.auditoria_empresa_codigo != '' && apiREQ.body.auditoria_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.auditoria_empresa_codigo) : false; 
    let _USUFICAUS  = (apiREQ.body.auditoria_usuario != undefined && apiREQ.body.auditoria_usuario != null && apiREQ.body.auditoria_usuario != '') ? "'"+apiREQ.body.auditoria_usuario.trim().toUpperCase()+"'" : false; 
    let _USUFICAIP  = (apiREQ.body.auditoria_ip != undefined && apiREQ.body.auditoria_ip != null && apiREQ.body.auditoria_ip != '') ? "'"+apiREQ.body.auditoria_ip.trim().toUpperCase()+"'" : false; 
    let _USUFICAPR  = (apiREQ.body.auditoria_programa != undefined && apiREQ.body.auditoria_programa != null && apiREQ.body.auditoria_programa != '') ? "'"+apiREQ.body.auditoria_programa.trim()+"'" : false; 
    let _USUFICAIN  = (apiREQ.body.auditoria_incidencia != undefined && apiREQ.body.auditoria_incidencia != null && apiREQ.body.auditoria_incidencia != '') ? "'"+apiREQ.body.auditoria_incidencia.trim()+"'" : null;

    if (_USUFICEST && _USUFICEMC && _USUFICSUC && _USUFICDOC && _USUFICNOM && _USUFICAPE && _USUFICUSU && _USUFICPAS && _USUFICEMA && _USUFICAEM && _USUFICAUS && _USUFICAIP && _USUFICAPR) {

        (async () => {
            xDATA = await deleteUSUFIC(_USUFICCOD);

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
            xJSON   = await jsonBody(_code, 'Error', 'deleteUsuario', 'Error: Verifique algún campo esta vacío', null, 0, 0, 0, 0, []);
            xJSON   = camelcaseKeys(xJSON, {deep: true});
            return apiRES.status(200).json(xJSON);
        })();
    
    }       

}

module.exports  = {
    getUsuario,
    getUsuarioId,
    getUsuarioDocumento,
    getUsuarioUsu,
    getUsuarioEmpresaId,
    getUsuarioSucursalId,
    getUsuarioDocumentoEmpresa,
    getUsuarioDashboardEmpresa,
    postUsuario,
    postUsuarioLogin,
    putUsuario,
    deleteUsuario
}
