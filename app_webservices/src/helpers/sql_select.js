const {Pool, Client, initPGSQL} = require('../conf/database');
const {clientMSSQL, initMSSQL01} = require('../conf/database');

const {errorBody, jsonBody}   = require('../utils/_json');

/**
    * @param {integer} actionType - Tipo de accion
    * @param {integer} codigo - codigo
    * @param {integer} codigo2 - codigo 2 
    * @param {Strinig} valor- valor
    * @param {Strinig} valor2- valor2
    * @param {Strinig} valor3- valor3
    * @param {Strinig} valor4- valor4
    * @param {Strinig} valor5- valor5
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
    let _empresaCodigo2 = (codigo == 1) ? `empresa_codigo <> 0 ` : `empresa_codigo = ${codigo}`;

    switch (actionType) {
        case 1:
            query00 = `SELECT
                            *
                        FROM
                            adm.SUCURSAL
                        WHERE ${_empresaCodigo2}`;
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
        let _empresaCodigo  = parseInt(valor.trim().substring(1, 4));
        let _empresaCodigo2 = (codigo == 1) ? ` a.empresa_codigo <> 0 ` : ` a.empresa_codigo = ${codigo}`;
        let _empresaCodigo3 = (codigo == 1) ? `empresa_codigo <> 0 ` : ` empresa_codigo = ${codigo}`;

        switch (actionType) {
            case 1:
                query00 = `SELECT
                                *
                            FROM
                                adm.USUARIO
                            WHERE ${_empresaCodigo3}`;
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
                                    adm.USUARIOROL
                                WHERE
                                    usuario_usuario   = ${valor} AND empresa_codigo = ${_empresaCodigo}
                                    AND tipo_estado_usuario_codigo IN (SELECT DOMFICCOD FROM adm.DOMFIC WHERE DOMFICVAL = 'ADMUSUARIOESTADO' AND DOMFICPAR = 1)`;
                               
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

            case 7:
                query00 = `SELECT
                                COUNT (*)           AS  cantidad_usuario,
                                a.tipo_estado_codigo,
                                a.tipo_estado_nombre
                                
                            FROM adm.USUARIO a
                            INNER JOIN adm.EMPRESA b ON a.empresa_codigo    = b.empresa_codigo
                            WHERE ${_empresaCodigo2}
                            
                            GROUP BY a.tipo_estado_codigo, a.tipo_estado_nombre
                            ORDER BY a.tipo_estado_codigo `;
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
    
        if (_data.length == 0) {
            _code = 404;
        }
        return Array(_code, _data);
}
   
const selectUSUARIOEMPRESA = async(actionType, codigo, valor) => {
    let _code   = 200;
    let _data   = [];
    let query00 = '';

    switch (actionType) {
        case 1:
            query00 = `SELECT 
                            TRIM(a.CLUSU)							AS		usuario_usuario,
                            a.CLCON									AS		usuario_password,
                        
                            TRIM(b.FUNOM) +' '+TRIM(b.FNOMB2)		AS		usuario_nombre,
                            TRIM(b.FUAPE) +' '+TRIM(b.APELL2)		AS		usuario_apellido,
                            b.FUMAIL								AS		usuario_mail,
                            TRIM(b.FUCODCEL1) + TRIM(b.FUCEL1)      AS      usuario_celular
                        
                        FROM FSD050 a
                        INNER JOIN FUNCIONARI b ON a.FUCIC  = b.FUCIC

                        WHERE a.CKEMP = ${codigo} AND a.FUCIC = '${valor}'`;
            break;

        default:
            break;
    }

    await clientMSSQL.on('error', err => {
            _code = 401;
            errorBody(_code, 'Erro: '+ err + ', Function: selectUSUARIOEMPRESA', true)
                .then(result => _data = result);
    });

    if(_code == 200){
        await clientMSSQL.connect(initMSSQL01)
            .then(pool => {
                return pool.request().query(query00);
            })
            .then(result => {
                _data = result;
            })
            .catch(err => {
                _code = 401;
                errorBody(_code, 'Code: '+ err.code + ', OriginalError: ' + err.originalError + ', Function: selectUSUARIOEMPRESA', true)
                    .then(result => _data = result);
            })
            .then(() => {
                clientMSSQL.close();
            });
    }

    if (_data['rowsAffected'] == 0) {
        _code   = 204;
        _data   = await jsonBody(_code, 'Warning', 'selectUSUARIOEMPRESA', null, 'El documento ingresado no existe', 0, 0, 0, 0, []);
    }else{
        _data   =  _data['recordset'];
    }
   
    return Array(_code, _data);
}

const selectROL = async(actionType, codigo) => {
    let _code   = 200;
    let _data   = [];
    let query00 = '';
    let _empresaCodigo2 = (codigo == 1) ? `empresa_codigo <> 0 ` : ` empresa_codigo = ${codigo}`;

    switch (actionType) {
        case 1:
            query00 = `SELECT
                            *
                        FROM adm.ROL
                        WHERE ${_empresaCodigo2}`;
            break;

        case 2:
            query00 = `SELECT
                            *
                        FROM
                            adm.ROL
                        WHERE
                            rol_codigo = ${codigo}`;
            break;

        case 3:
            query00 = `SELECT
                            *
                        FROM
                            adm.ROL
                        WHERE
                            empresa_codigo  = ${codigo}`;
            break;

        default:
            break;
    }

    const connPGSQL = new Client(initPGSQL);
    await connPGSQL
        .connect()
        .catch(e => {
            _code = 401;
            errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: selectROL', true)
                .then(result => _data = result);
        }
    );

    await connPGSQL
        .query(query00)
        .then(result => {
            _code = 200;
            _data = result.rows;
        })
        .catch(e => {
            _code = 500;
            errorBody(_code, 'Code: '+ e.code +' '+e.severity+', '+e.hint, 'Function: selectROL')
                .then(result => _data = result);
        })
        .then(() => {
            connPGSQL.end();
        }
    );

    if (_data.length == 0) {
        _code = 404;
    }
    return Array(_code, _data);
}

const selectCAMPANHA = async(actionType, codigo, valor) => {
    let _code   = 200;
    let _data   = [];
    let query00 = '';
    let _empresaCodigo2 = (codigo == 1) ? `empresa_codigo <> 0 ` : ` empresa_codigo = ${codigo}`;

    switch (actionType) {
        case 1:
            query00 = `SELECT
                            *
                        FROM
                            adm.CAMPANHA
                        WHERE ${_empresaCodigo2}`;
            break;

        case 2:
            query00 = `SELECT
                            *
                        FROM
                            adm.CAMPANHA
                        WHERE
                            campanha_codigo = ${codigo}`;
            break;

        case 3:
            query00 = `SELECT
                            *
                        FROM
                            adm.CAMPANHA
                        WHERE
                            empresa_codigo  = ${codigo}`;
            break;

        case 4:
            query00 = `SELECT
                            *
                        FROM
                            adm.CAMPANHA
                        WHERE
                            tipo_campanha_codigo  = (SELECT DOMFICCOD FROM adm.DOMFIC WHERE DOMFICVAL = 'ADMCAMPANHATIPO' AND DOMFICPAR = ${codigo})`;
            break;

        default:
            break;
    }

    const connPGSQL = new Client(initPGSQL);
    await connPGSQL
        .connect()
        .catch(e => {
            _code = 401;
            errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: selectCAMPANHA', true)
                .then(result => _data = result);
        }
    );

    await connPGSQL
        .query(query00)
        .then(result => {
            _code = 200;
            _data = result.rows;
        })
        .catch(e => {
            _code = 500;
            errorBody(_code, 'Code: '+ e.code +' '+e.severity+', '+e.hint, 'Function: selectCAMPANHA')
                .then(result => _data = result);
        })
        .then(() => {
            connPGSQL.end();
        }
    );

    if (_data.length == 0) {
        _code = 404;
    }
    return Array(_code, _data);
}

const selectFORMULARIO = async(actionType, codigo) => {
    let _code   = 200;
    let _data   = [];
    let query00 = '';
    let _empresaCodigo2   = (codigo == 1) ? `empresa_codigo <> 0 ` : `empresa_codigo = ${codigo}`;

    switch (actionType) {
        case 1:
            query00 = `SELECT
                            *
                        FROM
                            adm.FORMULARIO
                        WHERE ${_empresaCodigo2}`;
            break;

        case 2:
            query00 = `SELECT
                            *
                        FROM
                            adm.FORMULARIO
                        WHERE
                            formulario_codigo = ${codigo}`;
            break;

        case 3:
            query00 = `SELECT
                            *
                        FROM
                            adm.FORMULARIO
                        WHERE
                            empresa_codigo  = ${codigo}`;
            break;

        default:
            break;
    }

    const connPGSQL = new Client(initPGSQL);
    await connPGSQL
        .connect()
        .catch(e => {
            _code = 401;
            errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: selectFORMULARIO', true)
                .then(result => _data = result);
        }
    );

    await connPGSQL
        .query(query00)
        .then(result => {
            _code = 200;
            _data = result.rows;
        })
        .catch(e => {
            _code = 500;
            errorBody(_code, 'Code: '+ e.code +' '+e.severity+', '+e.hint, 'Function: selectFORMULARIO')
                .then(result => _data = result);
        })
        .then(() => {
            connPGSQL.end();
        }
    );

    if (_data.length == 0) {
        _code = 404;
    }
    return Array(_code, _data);
}

const selectROLFORMULARIO  = async(actionType, codigo, codigo2) => {
    let _code   = 200;
    let _data   = [];
    let query00 = '';
    let _empresaCodigo2 = (codigo == 1) ? `empresa_codigo <> 0 ` : ` empresa_codigo = ${codigo}`;

    switch (actionType) {
        case 1:
            query00 = `SELECT
                            *
                        FROM
                            adm.ROLFORMULARIO
                        WHERE ${_empresaCodigo2}`;
            break;

        case 2:
            query00 = `SELECT
                            *
                        FROM
                            adm.ROLFORMULARIO
                        WHERE
                            empresa_codigo  = ${codigo}`;
            break;

        case 3:
            query00 = `SELECT
                            *
                        FROM
                            adm.ROLFORMULARIO
                        WHERE 
                            rol_codigo  = ${codigo} AND empresa_codigo  = ${codigo2}`;
            break;

        case 4:
            query00 = `SELECT 
                            * 
                        FROM 
                            adm.ROLFORMULARIO 

                        WHERE 
                            rol_codigo = ${codigo} AND formulario_codigo = ${codigo2}`;
            break;


        default:
            break;
    }

    const connPGSQL = new Client(initPGSQL);
    await connPGSQL
        .connect()
        .catch(e => {
            _code = 401;
            errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: selectROLFORMULARIO', true)
                .then(result => _data = result);
        }
    );

    await connPGSQL
        .query(query00)
        .then(result => {
            _code = 200;
            _data = result.rows;
        })
        .catch(e => {
            _code = 500;
            errorBody(_code, 'Code: '+ e.code +' '+e.severity+', '+e.hint, 'Function: selectROLFORMULARIO')
                .then(result => _data = result);
        })
        .then(() => {
            connPGSQL.end();
        }
    );

    if (_data.length == 0) {
        _code = 404;
    }
    return Array(_code, _data);
}

const selectUSUARIOROL  = async(actionType, codigo, codigo2, codigo3) => {
    let _code   = 200;
    let _data   = [];
    let query00 = '';
    let _empresaCodigo2   = (codigo == 1) ? `empresa_codigo <> 0 ` : `empresa_codigo = ${codigo}`;

    switch (actionType) {
        case 1: 
            query00 = `SELECT
                            *
                        FROM
                            adm.USUARIOROL
                        WHERE ${_empresaCodigo2}`;
            break;

        case 2:
            query00 = `SELECT
                            *
                        FROM
                            adm.USUARIOROL
                        WHERE
                            usuario_codigo = ${codigo} AND rol_codigo = ${codigo2} AND empresa_codigo  = ${codigo3}`;
            break;

        default:
            break;
    }

    const connPGSQL = new Client(initPGSQL);
    await connPGSQL
        .connect()
        .catch(e => {
            _code = 401;
            errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: selectUSUARIOROL', true)
                .then(result => _data = result);
        }
    );

    await connPGSQL
        .query(query00)
        .then(result => {
            _code = 200;
            _data = result.rows;
        })
        .catch(e => {
            _code = 500;
            errorBody(_code, 'Code: '+ e.code +' '+e.severity+', '+e.hint, 'Function: selectUSUARIOROL')
                .then(result => _data = result);
        })
        .then(() => {
            connPGSQL.end();
        }

    );

    if (_data.length == 0) {
        _code = 404;
    }

    return Array(_code, _data);
}

const selectUSUARIOCAMPANHA  = async(actionType, codigo, codigo2, codigo3) => {
    let _code   = 200;
    let _data   = [];
    let query00 = '';

    switch (actionType) {
        case 1:
            query00 = `SELECT
                            *
                        FROM
                            adm.USUARIOCAMPANHA
                        WHERE empresa_codigo  = ${codigo}`;
            break;

        case 2:
            query00 = `SELECT
                            *
                        FROM
                            adm.USUARIOCAMPANHA
                        WHERE
                            usuario_codigo = ${codigo} AND campanha_codigo = ${codigo2} AND empresa_codigo  = ${codigo3}`;
            break;

        default:
            break;
    }

    const connPGSQL = new Client(initPGSQL);
    await connPGSQL
        .connect()
        .catch(e => {
            _code = 401;
            errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: selectUSUARIOCAMPANHA', true)
                .then(result => _data = result);
        }
    );

    await connPGSQL
        .query(query00)
        .then(result => {
            _code = 200;
            _data = result.rows;
        })
        .catch(e => {
            _code = 500;
            errorBody(_code, 'Code: '+ e.code +' '+e.severity+', '+e.hint, 'Function: selectUSUARIOCAMPANHA')
                .then(result => _data = result);
        })
        .then(() => {
            connPGSQL.end();
        }

    );

    if (_data.length == 0) {
        _code = 404;
    }

    return Array(_code, _data);
}

const selectUSUARIOFLUJO  = async(actionType, codigo, codigo2, codigo3, codigo4, codigo5) => {
    let _code   = 200;
    let _data   = [];
    let query00 = '';
    let _empresaCodigo2   = (codigo == 1) ? `empresa_codigo <> 0 ` : `empresa_codigo = ${codigo}`;

    switch (actionType) {
        case 1:
            query00 = `SELECT
                            *
                        FROM
                            adm.USUARIOFLUJO
                        WHERE ${_empresaCodigo2}`;
            break;
        
        case 2:
            query00 = `SELECT
                            *
                        FROM
                            adm.USUARIOFLUJO
                        WHERE usuario_superior_codigo = ${codigo} AND empresa_codigo = ${codigo2}`;
            break;

        case 3:
            query00 = `SELECT
                            *
                        FROM
                            adm.USUARIOFLUJO
                        WHERE usuario_subordinado_codigo = ${codigo}`;

                break;

        case 4:

            query00 = `SELECT
                            *
                        FROM
                            adm.USUARIOFLUJO
                        WHERE rol_superior_codigo = ${codigo}`;
            break;

        case 5:

            query00 = `SELECT
                            *
                        FROM
                            adm.USUARIOFLUJO
                        WHERE rol_subordinado_codigo = ${codigo}`;
            break;

        case 6:

            query00 = `SELECT
                            *
                        FROM
                            adm.USUARIOFLUJO
                        WHERE rol_subordinado_codigo = ${codigo} AND empresa_codigo = ${codigo2}`;
            break;

        case 7:

            query00 = `SELECT
                            *
                        FROM
                            adm.USUARIOFLUJO
                        WHERE rol_superior_codigo = ${codigo} AND empresa_codigo = ${codigo2}`;
            break;

        case 8:

            query00 = `SELECT
                            *
                        FROM
                            adm.USUARIOFLUJO	
                        WHERE usuario_superior_codigo = ${codigo} AND rol_superior_codigo = ${codigo2} AND usuario_subordinado_codigo = ${codigo3} AND rol_subordinado_codigo = ${codigo4} AND empresa_codigo = ${codigo5}`;
            break;

        default:
            break;
    }

    const connPGSQL = new Client(initPGSQL);
    await connPGSQL
        .connect()
        .catch(e => {
            _code = 401;
            errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: selectUSUARIOFLUJO', true)
                .then(result => _data = result);
        }
    );

    await connPGSQL
        .query(query00)
        .then(result => {
            _code = 200;
            _data = result.rows;
        })
        .catch(e => {
            _code = 500;
            errorBody(_code, 'Code: '+ e.code +' '+e.severity+', '+e.hint, 'Function: selectUSUARIOFLUJO')
                .then(result => _data = result);
        })
        .then(() => {
            connPGSQL.end();
        }

    );

    if (_data.length == 0) {
        _code = 404;
    }

    return Array(_code, _data);
}

module.exports  = {
    selectDOMINIOTIPO,
    selectEMPRESA, 
    selectSUCURSAL,
    selectUSUARIO,
    selectUSUARIOEMPRESA,
    selectROL,
    selectCAMPANHA,
    selectFORMULARIO,
    selectROLFORMULARIO,
    selectUSUARIOROL,
    selectUSUARIOCAMPANHA,
    selectUSUARIOFLUJO
};