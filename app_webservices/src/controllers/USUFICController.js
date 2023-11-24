require('dotenv').config({ path:__dirname+'/./../../.env' });

const camelcaseKeys = require('camelcase-keys');

const {selectUSUARIO}= require('../helpers/sql_select');
const {selectUSUARIOEMPRESA}= require('../helpers/sql_select');
const {insertUSUFIC}= require('../helpers/sql_insert');
const {updateUSUFIC}= require('../helpers/sql_update');
const {deleteUSUFIC}= require('../helpers/sql_delete');
const {jsonBody}    = require('../utils/_json');
const {errorBody}   = require('../utils/_json');
const bcrypt        = require('bcryptjs');

//const affiliateId = process.env.ENV_AFFILIATEID;

const getUsuario    = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];     

    (async () => {
        const xDATA = await selectUSUARIO(1, 0, '');
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

const getUsuarioId  = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];
    let _codigo     = parseInt(apiREQ.params.codigo);

    if (_codigo != 'undefined' && _codigo != '' && _codigo != null && _codigo > 0){

        (async () => {
            const xDATA = await selectUSUARIO(2, _codigo, '');
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

const getUsuarioDocumento   = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];
    let _valor     = String(apiREQ.params.documento).trim().toUpperCase();

    if (_valor != 'undefined' && _valor != ''){

        (async () => {
            const xDATA = await selectUSUARIO(3, 0, _valor);
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

const getUsuarioUsu = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];
    let _valor     = String(apiREQ.params.usuario).trim().toUpperCase();

    if (_valor != 'undefined' && _valor != ''){

        (async () => {
            const xDATA = await selectUSUARIO(4, 0, _valor);
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

const getUsuarioEmpresaId = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];
    let _codigo     = parseInt(apiREQ.params.empresa);

    if (_valor != 'undefined' && _valor != ''){

        (async () => {
            const xDATA = await selectUSUARIO(5, _codigo, '');
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

const getUsuarioSucursalId = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];
    let _codigo     = parseInt(apiREQ.params.sucursal);

    if (_codigo != 'undefined' && _codigo != '' && _codigo != null && _codigo > 0){
        (async () => {
            const xDATA = await selectUSUARIO(6, _codigo, '');
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

const getUsuarioDashboardEmpresa  = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];
    let _codigo     = parseInt(apiREQ.params.empresa);

    if (_codigo != 'undefined' && _codigo != '' && _codigo != null && _codigo > 0){

        (async () => {
            const xDATA = await selectUSUARIO(7, _codigo, '');
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

const getUsuarioDocumentoEmpresa = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];
    let _codigo     = parseInt(apiREQ.params.empresa);
    let _valor      = String(apiREQ.params.documento).trim().toUpperCase();

    if (_codigo != 'undefined' && _codigo > 0 && _valor != 'undefined' && _valor != ''){

        (async () => {
            const xDATA = await selectUSUARIOEMPRESA(1, _codigo, _valor);
            _code       = xDATA[0];
            _dataJSON   = xDATA[1];
    
            if (_code == 200) {
                _dataJSON   = await jsonBody(_code, 'Success', null, null, null, 0, 0, 0, 0, _dataJSON);
                return apiRES.status(_code).json(_dataJSON);
    
            } else {                
                _dataJSON   = await jsonBody(_code, 'Error', null, null, 'El documento ingresado no existe', 0, 0, 0, 0, []);
                return apiRES.status(200).json(_dataJSON);
            }
        })();

    }else{
        (async () => {
            _code       = 400;
            _dataJSON   = await jsonBody(_code, 'Verifique, algún campo esta vacio.', true);

            return apiRES.status(_code).json(_dataJSON);
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

    if (_USUFICEST && _USUFICEMC && _USUFICSUC && _USUFICDOC && _USUFICNOM && _USUFICAPE && _USUFICUSU && _USUFICPAS && _USUFICEMA && _USUFICCEM && _USUFICCUS && _USUFICCIP && _USUFICCPR && _USUFICAEM && _USUFICAUS && _USUFICAIP && _USUFICAPR){
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
                        xJSON = await jsonBody(_code, 'Success', null, null, null, 0, 0, 0, 0, xJSON);

                    } else if (_code == 404){
                        xJSON   = xDATA[1];
                        xJSON   = await jsonBody(_code, 'El usuario ya existe', null, null, null, 0, 0, 0, 0, xJSON);
                    }else{
                        xJSON   = xDATA[1];
                        xJSON   = await jsonBody(_code, 'Error', null, null, null, 0, 0, 0, 0, xJSON);
                    }

                    xJSON = camelcaseKeys(xJSON, {deep: true});

                    return apiRES.status(_code).json(xJSON);
                });   
            })();     
    }else{
        (async () => {
            _code   = 400;
            xJSON   = await errorBody(_code, 'Verifique, algún campo esta vacio.', true); 

            return apiRES.status(_code).json(xJSON);
        })();
    
    }       

}

const postUsuarioLogin   = (apiREQ, apiRES) => {

    let  xDATA      =   []; 
    let _USUFICUSU  = (apiREQ.body.usuario_usuario != undefined && apiREQ.body.usuario_usuario != null && apiREQ.body.usuario_usuario != '') ? "'"+apiREQ.body.usuario_usuario.trim().toUpperCase()+"'" : false;
    let _USUFICPAS  = (apiREQ.body.usuario_password != undefined && apiREQ.body.usuario_password != null && apiREQ.body.usuario_password != '') ? "'"+apiREQ.body.usuario_password.trim()+"'" : false;

    let _USUFICAEM  = (apiREQ.body.auditoria_empresa_codigo != undefined && apiREQ.body.auditoria_empresa_codigo != null && apiREQ.body.auditoria_empresa_codigo != '' && apiREQ.body.auditoria_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.auditoria_empresa_codigo) : false; 
    let _USUFICAUS  = (apiREQ.body.auditoria_usuario != undefined && apiREQ.body.auditoria_usuario != null && apiREQ.body.auditoria_usuario != '') ? "'"+apiREQ.body.auditoria_usuario.trim().toUpperCase()+"'" : false; 
    let _USUFICAIP  = (apiREQ.body.auditoria_ip != undefined && apiREQ.body.auditoria_ip != null && apiREQ.body.auditoria_ip != '') ? "'"+apiREQ.body.auditoria_ip.trim().toUpperCase()+"'" : false; 
    let _USUFICAPR  = (apiREQ.body.auditoria_programa != undefined && apiREQ.body.auditoria_programa != null && apiREQ.body.auditoria_programa != '') ? "'"+apiREQ.body.auditoria_programa.trim()+"'" : false; 
    let _USUFICAIN  = (apiREQ.body.auditoria_incidencia != undefined && apiREQ.body.auditoria_incidencia != null && apiREQ.body.auditoria_incidencia != '') ? "'"+apiREQ.body.auditoria_incidencia.trim()+"'" : null;
    let _password   = '';  

    if (_USUFICUSU && _USUFICPAS && _USUFICAEM && _USUFICAUS && _USUFICAIP && _USUFICAPR){
            (async () => {

                const xDATA = await selectUSUARIO(4, 0, _USUFICUSU);
                _code       = xDATA[0];
                _dataJSON   = xDATA[1];

                if (_code == 200) {
                    _password   =  _dataJSON[0].usuario_password;
                    
                    bcrypt.compare(_USUFICPAS, _password, async (err, coinciden) => {
                        
                        if (coinciden){
                            _dataJSON[0].usuario_password = '';
                            _dataJSON   = await jsonBody(_code, 'Success', null, null, null, 0, 0, 0, 0, _dataJSON);
        
                        } else {
                            _dataJSON   = await jsonBody(_code, 'Error', null, null, 'La contraseña no coincide, verifique', 0, 0, 0, 0, []);
                        }

                        _dataJSON = camelcaseKeys(_dataJSON, {deep: true});

                        return apiRES.status(_code).json(_dataJSON);
                                
                    });
                } else {
                    _dataJSON   = await jsonBody(_code, 'Error', null, null, 'El usuario no existe, verifique', 0, 0, 0, 0, []);

                    _dataJSON   = camelcaseKeys(_dataJSON, {deep: true});
        
                    return apiRES.status(_code).json(_dataJSON);
                }
            })();    
    }else{
        (async () => {
            _code   = 400;
            xJSON   = await errorBody(_code, 'Verifique, algún campo esta vacio.', true); 

            return apiRES.status(_code).json(xJSON);
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

    let rondasDeSal = 12;
 
    if (_ACCION && _USUFICEST && _USUFICEMC && _USUFICSUC && _USUFICDOC && _USUFICNOM && _USUFICAPE && _USUFICUSU && _USUFICPAS && _USUFICEMA && _USUFICAEM && _USUFICAUS && _USUFICAIP && _USUFICAPR) {

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
            });   
        })();

    }else{
        (async () => {
            _code   = 400;
            xJSON   = await errorBody(_code, 'Verifique, algún campo esta vacio.', true); 

            return apiRES.status(_code).json(xJSON);
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

    if (_ACCION && _USUFICEST && _USUFICEMC && _USUFICSUC && _USUFICDOC && _USUFICNOM && _USUFICAPE && _USUFICUSU && _USUFICPAS && _USUFICEMA && _USUFICAEM && _USUFICAUS && _USUFICAIP && _USUFICAPR) {

        (async () => {
            xDATA = await deleteUSUFIC(_USUFICCOD);

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
