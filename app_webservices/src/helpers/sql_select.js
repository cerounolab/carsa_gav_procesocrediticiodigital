const {Pool, Client, initPGSQL} = require('../conf/database');
const {errorBody}   = require('../utils/_json');


/**
    * @param {integer} actionType - Tipo de accion
    * @param {integer} codigo - codigo
    * @param {Strinig} valor- valor
    * @returns {Array} returns
*/
const selectDOMINIOTIPO = async(actionType, codigo, valor) => {
    let _code   = 200;
    let _data   = [];
    let query00 = '';

    switch (actionType) {
        case 1:
            query00 = `SELECT
                            *
                        FROM
                            adm.DOMINIOTIPO`;
            break;

        case 2:
            query00 = `SELECT
                            *
                        FROM
                            adm.DOMINIOTIPO
                        WHERE
                            tipo_codigo = ${codigo}`;
            break;

        case 3:
            query00 = `SELECT
                            *
                        FROM
                            adm.DOMINIOTIPO
                        where
                            tipo_valor = '${valor}'`;
            break;

        default:
            break;
    }

    const connPGSQL = new Client(initPGSQL);
    await connPGSQL
        .connect()
        .catch(e => {
            _code = 401;
            errorBody(_code, 'Code: '+ e.code +' '+e.severity+', '+e.hint, 'Function: selectDOMINIOTIPO')
                .then(result => _data = result);
        }
    );

    if (_code == 200) {
        await connPGSQL
            .query(query00)
            .then(result => {
                _code = 200;
                _data = result.rows;
            })
            .catch(e => {
                _code = 500;
                console.log(e);
                errorBody(_code, 'Code: '+ e.code +' '+e.severity+', '+e.hint, 'Function: selectDOMINIOTIPO')
                    .then(result => _data = result);
            })
            .then(() => {
                connPGSQL.end();
            }
        );
    }

    return Array(_code, _data);
}

const selectEMPRESA = async(actionType, codigo, valor) => {
    let _code   = 200;
    let _data   = [];
    let query00 = '';

    switch (actionType) {
        case 1:
            query00 = `SELECT
                            *
                        FROM
                            adm.EMPRESA`;
            break;

        case 2:
            query00 = `SELECT
                            *
                        FROM
                            adm.EMPRESA
                        WHERE
                            empresa_codigo = ${codigo}`;
            break;

        case 3:
            query00 = `SELECT
                            *
                        FROM
                            adm.EMPRESA
                        where
                            empresa_ruc = '${valor}'`;
            break;

        case 4:
            query00 = `SELECT
                            *
                        FROM
                            adm.EMPRESA
                        WHERE
                            tipo_rubro_codigo = (SELECT DOMFICCOD FROM adm.DOMFIC WHERE DOMFICVAL = 'ADMEMPRESARUBRO' AND DOMFICPAR = ${codigo})`;
            break;

        default:
            break;
    }

    const connPGSQL = new Client(initPGSQL);
    await connPGSQL
        .connect()
        .catch(e => {
            _code = 401;
            errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: selectEMPRESA', true)
                .then(result => _data = result);
        }
    );

    if (_code == 200) {
        await connPGSQL
            .query(query00)
            .then(result => {
                _code = 200;
                _data = result.rows;
            })
            .catch(e => {
                _code = 500;
                errorBody(_code, 'Code: '+ e.code +' '+e.severity+', '+e.hint, 'Function: selectEMPRESA')
                    .then(result => _data = result);
            })
            .then(() => {
                connPGSQL.end();
            }
        );
    }

    return Array(_code, _data);
}

const selectSUCURSAL    = async(actionType, codigo, valor) => {
    let _code   = 200;
    let _data   = [];
    let query00 = '';

    switch (actionType) {
        case 1:
            query00 = `SELECT
                            *
                        FROM
                            adm.SUCURSAL`;
            break;

        case 2:
            query00 = `SELECT
                            *
                        FROM
                            adm.SUCURSAL
                        WHERE
                            sucursal_codigo = ${codigo}`;
            break;

        case 3:
            query00 = `SELECT
                            *
                        FROM
                            adm.SUCURSAL
                        where
                            empresa_codigo = ${codigo}`;
            break;

        case 4:
            query00 = `SELECT
                            *
                        FROM
                            adm.SUCURSAL
                        WHERE
                            tipo_sucursal_codigo = (SELECT DOMFICCOD FROM adm.DOMFIC WHERE DOMFICVAL = 'ADMSUCURSALTIPO' AND DOMFICPAR  = ${codigo})`;
            break;

        default:
            break;
    }

    const connPGSQL = new Client(initPGSQL);
    await connPGSQL
        .connect()
        .catch(e => {
            _code = 401;
            errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: selectSUCURSAL', true)
                .then(result => _data = result);
        }
    );

    if (_code == 200) {
        await connPGSQL
            .query(query00)
            .then(result => {
                _code = 200;
                _data = result.rows;
            })
            .catch(e => {
                _code = 500;
                errorBody(_code, 'Code: '+ e.code +' '+e.severity+', '+e.hint, 'Function: selectSUCURSAL')
                    .then(result => _data = result);
            })
            .then(() => {
                connPGSQL.end();
            }
        );
    }

    return Array(_code, _data);
}

const selectUSUARIO = async(actionType, codigo, valor) => {
    let _code   = 200;
    let _data   = [];
    let query00 = '';
    let _empresaCodigo = parseInt(valor.trim().substring(1, 4));

    switch (actionType) {
        case 1:
            query00 = `SELECT
                            *
                        FROM
                            adm.USUARIO`;
            break;

        case 2:
            query00 = `SELECT
                            *
                        FROM
                            adm.USUARIO
                        WHERE
                            usuario_codigo = ${codigo}`;
            break;

        case 3:
            query00 = `SELECT
                            *
                        FROM
                            adm.USUARIO
                        WHERE
                            usuario_documento  = ${valor}`;
                            
            break;

        case 4:
                query00 = `SELECT
                                *
                            FROM
                                adm.USUARIO
                            WHERE
                                usuario_usuario   = ${valor} AND empresa_codigo = ${_empresaCodigo}`;
                                
                break;

        case 5:
            query00 = `SELECT
                            *
                        FROM
                            adm.USUARIO
                        WHERE
                            empresa_codigo = ${codigo}`;
            break;
        
        case 6:
            query00 = `SELECT
                            *
                        FROM
                            adm.USUARIO
                        WHERE
                            sucursal_codigo  = ${codigo}`;
            break;

        default:
            break;
    }

    const connPGSQL = new Client(initPGSQL);
    await connPGSQL
        .connect()
        .catch(e => {
            _code = 401;
            errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: selectUSUARIO', true)
                .then(result => _data = result);
        }
    );

    if (_code == 200) {
        await connPGSQL
            .query(query00)
            .then(result => {
                _code = 200;
                _data = result.rows;
            })
            .catch(e => {
                _code = 500;
                errorBody(_code, 'Code: '+ e.code +' '+e.severity+', '+e.hint, 'Function: selectUSUARIO')
                    .then(result => _data = result);
            })
            .then(() => {
                connPGSQL.end();
            }
        );
    }else{
        _code = 404;
        errorBody(_code, 'Code: '+ e.code +' '+e.severity+', '+e.hint, 'Function: selectUSUARIO')
            .then(result => _data = result);
    }

    return Array(_code, _data);
}

module.exports = {
    selectDOMINIOTIPO,
    selectEMPRESA, 
    selectSUCURSAL,
    selectUSUARIO
};