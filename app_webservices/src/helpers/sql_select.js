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
    let _empresaCodigo2 = (codigo == 1) ? `empresa_codigo <> 0 ` : `empresa_codigo = ${codigo}`;


    switch (actionType) {
        case 1:
            query00 = `SELECT
                            *
                        FROM
                            adm.EMPRESA
                        WHERE ${_empresaCodigo2}`;
;
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

    if (_data.length == 0) {
        _code = 404;
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

    if (_data.length == 0) {
        _code = 404;
    }
    return Array(_code, _data);
}

const selectUSUARIO = async(actionType, codigo, valor, codigo2) => {
        let _code   = 200;
        let _data   = [];
        let query00 = '';
        let _empresaCodigo  = parseInt(valor.trim().substring(1, 4));
        let _empresaCodigo2 = (codigo == 1) ? ` c.EMPFICCOD <> 0 ` : ` c.EMPFICCOD = ${codigo}`;
        let _empresaCodigo3 = (codigo == 1) ? `empresa_codigo <> 0 ` : `empresa_codigo = ${codigo}`;

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
                                    usuario_usuario = ${valor} AND empresa_codigo = ${_empresaCodigo}
                                    AND tipo_estado_usuario_codigo IN (SELECT DOMFICCOD FROM adm.DOMFIC WHERE DOMFICVAL = 'ADMUSUARIOESTADO' AND DOMFICPAR = 1) AND 
                                    tipo_plataforma_codigo IN (SELECT DOMFICCOD FROM adm.DOMFIC WHERE DOMFICVAL = 'ADMROLPLATAFORMATIPO' AND DOMFICPAR = ${codigo2})`       
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
                                b.DOMFICCOD			AS	tipo_estado_codigo,
                                b.DOMFICNOM			AS	tipo_estado_nombre,
                            
                                c.EMPFICCOD			AS	empresa_codigo,
                                c.EMPFICNOM			AS	empresa_nombre
                            
                            FROM adm.USUFIC a
                            INNER JOIN adm.DOMFIC b ON a.USUFICEST	= b.DOMFICCOD
                            INNER JOIN adm.EMPFIC c ON a.USUFICEMC	= c.EMPFICCOD

                            WHERE ${_empresaCodigo2}
                            
                            GROUP BY c.EMPFICCOD, c.EMPFICNOM, b.DOMFICCOD, b.DOMFICNOM
                            ORDER BY c.EMPFICORD DESC`;
                break;

            case 8:
                query00 = `SELECT
                                *
                            FROM
                                adm.USUARIO
                            WHERE
                                usuario_usuario   = ${valor} AND empresa_codigo = ${_empresaCodigo}`;
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
    let _empresaCodigo3 = (codigo == 1) ? `a.ROLFICEMC <> 0 ` : `a.ROLFICEMC = ${codigo}`;

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
            
        case 4:
            query00 = `SELECT 
                            COUNT (*)		AS	rol_cantidad,
                            a.ROLFICNOM		AS	rol_nombre,
                            a.ROLFICCOD		AS	rol_codigo,
                            a.ROLFICNOM		AS	rol_nombre,
							b.EMPFICCOD		AS	empresa_codigo,
							b.EMPFICNOM		AS	empresa_nombre
                            
                            
                        FROM adm.ROLFIC a
                        INNER JOIN adm.EMPFIC b ON a.ROLFICEMC = b.EMPFICCOD

                        WHERE ${_empresaCodigo3}

                        GROUP BY b.EMPFICCOD, b.EMPFICNOM, a.ROLFICCOD, a.ROLFICNOM
						ORDER BY b.EMPFICORD DESC`;
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

        case 5:
            query00 = `SELECT 
                            COUNT(*)	AS      cantidad_campanha,
                            tipo_campanha_nombre
                        
                        FROM adm.CAMPANHA
                        WHERE ${_empresaCodigo2}
                    
                        GROUP BY tipo_campanha_nombre`;
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
                            rol_codigo = ${codigo} AND tipo_formulario_codigo = (SELECT DOMFICCOD FROM adm.DOMFIC WHERE DOMFICVAL = 'ADMFORMULARIOTIPO' AND DOMFICPAR = ${codigo2})`;
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

        case 3:
            query00 = `SELECT
                            *
                        FROM
                            adm.USUARIOROL
                        WHERE
                            rol_codigo = ${codigo} AND empresa_codigo  = ${codigo2}`;
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
    let _empresaCodigo2   = (codigo == 1) ? `empresa_codigo <> 0 ` : `empresa_codigo = ${codigo}`;

    switch (actionType) {
        case 1:
            query00 = `SELECT
                            *
                        FROM
                            adm.USUARIOCAMPANHA
                        WHERE ${_empresaCodigo2}`;
            break;

        case 2:
            query00 = `SELECT
                            *
                        FROM
                            adm.USUARIOCAMPANHA
                        WHERE
                            usuario_codigo = ${codigo} AND campanha_codigo = ${codigo2} AND empresa_codigo  = ${codigo3}`;
            break;

        case 3:
            query00 = `SELECT 
                            COUNT(*)	AS  cantidad_campanha,
                            tipo_campanha_nombre
            
                        FROM adm.CAMPANHA
                            WHERE ${_empresaCodigo2}
        
                        GROUP BY tipo_campanha_nombre`
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

const selectUSUARIOLOG  = async(actionType, codigo, codigo2, codigo3) => {
    let _code   = 200;
    let _data   = [];
    let query00 = '';
    let _empresaCodigo2   = (codigo == 1) ? `b.EMPFICCOD <> 0 ` : `b.EMPFICCOD = ${codigo}`;

    switch (actionType) {
        case 1:
            query00 = `SELECT 
                            CASE 
                                WHEN a.USULOGEST = 'ERROR_USER' THEN 'ERROR_USUARIO'
                                WHEN a.USULOGEST = 'ERROR_PAS' THEN 'ERROR_PASSWORD'
                                WHEN a.USULOGEST = 'USER_LOKED' THEN 'USUARIO BLOQUEADO'
                                ELSE 'CORRECTO'
                            END                                             AS	usuario_log_estado,

                            TO_CHAR(a.USULOGFEC, 'YYYY-MM-DD')	            AS	usuario_log_fecha_1,
                            TO_CHAR(a.USULOGFEC, 'DD/MM/YYYY')	            AS	usuario_log_fecha_2,
                            UPPER(a.USULOGCOR)					            AS	usuario_log_usuario,	
                            a.USULOGDIP							            AS	usuario_log_ip,
                            a.USULOGHOS                                     AS  usuario_log_host,
                            a.USULOGAGE                                     AS  usuario_log_age,
                            a.USULOGREF                                     AS  usuario_log_referencia,
                            
                            a.USULOGAUS							            AS	auditoria_usuario,
                            TO_CHAR(a.USULOGAFH, 'YYYY-MM-DD HH24:MI:SS')   AS	auditoria_fecha_hora,
                            a.USULOGAIP							            AS	auditoria_ip,

                            c.EMPFICCOD							            AS	empresa_codigo,
                            c.EMPFICNOM 						            AS 	empresa_nombre

                        FROM adm.USULOG a
                        INNER JOIN adm.EMPFIC b ON a.USULOGAEM	= b.EMPFICCOD
                        INNER JOIN adm.EMPFIC c ON a.USULOGEMC	= c.EMPFICCOD

                        WHERE ${_empresaCodigo2} AND a.USULOGFEC <= ${codigo2} AND a.USULOGEST <> 'CORRECTO'  
                    
                        ORDER BY a.USULOGCOD DESC
                        LIMIT ${codigo3}`;
            break;

        default:
            break;
    }

    const connPGSQL = new Client(initPGSQL);
    await connPGSQL
        .connect()
        .catch(e => {
            _code = 401;
            errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: selectUSUARIOLOG', true)
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
            errorBody(_code, 'Code: '+ e.code +' '+e.severity+', '+e.hint, 'Function: selectUSUARIOLOG')
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

const selectPERSONA = async(actionType, valor) => {
    let _code   = 200;
    let _data   = [];
    let query00 = '';

    switch (actionType) {
        case 1:
            query00 = `SELECT
                            t1.AACUEN       AS  cliente_equivalente,
                            t1.AASEXO       AS  tipo_sexo_equivalente,
                            t1.AAESTCIV     AS  tipo_estadocivil_equivalente,
                            TRIM(t1.AANOM1) AS  persona_nombre_primero,
                            TRIM(t1.AANOM2) AS  persona_nombre_segundo,
                            TRIM(t1.AAAPE1) AS  apellido_paterno,
                            TRIM(t1.AAAPE2) AS  apellido_materno,
                            TRIM(t1.AAAPE3) AS  apellido_casada,
                            TRIM(t1.AADOCU) AS  persona_documento_numero,
                            CONVERT(VARCHAR, t1.AAFECH, 23)
                                            AS  persona_fechanacimiento,
                            CONVERT(VARCHAR, t1.AAFECH, 23)
                                            AS  persona_ingreso,
                            AHPAIS			AS	nacionalidad_codigo_equivalente	

                        FROM
                            [dbo].[FSD0011] t1
                        WHERE
                            t1.AADOCU =  ${valor}`;
            break;
        
        case 2:

            break;

        default:
            break;
    }

    await clientMSSQL.on('error', err => {
            _code = 401;
            errorBody(_code, 'Error: '+ err + ', Function: selectPERSONA', true)
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
                console.log(e);
                errorBody(_code, 'Code: '+ err.code + ', OriginalError: ' + err.originalError + ', Function: selectPERSONA', true)
                    .then(result => _data = result);
            })
            .then(() => {
                clientMSSQL.close();
            });
    }

    if (_data['rowsAffected'] == 0) {
        _code   = 204;
        _data   = await jsonBody(_code, 'Warning', 'selectPERSONA', null, 'El documento ingresado no existe', 0, 0, 0, 0, []);

    }else{
        _data   =  _data['recordset'];
    }

    return Array(_code, _data);
}

const selectFGPARAM = async(actionType, codigo) => {
    let _code   = 200;
    let _data   = [];
    let query00 = '';

    switch (actionType) {
        case 1:
            query00 = `SELECT 
                            a.FGPARAMNUM								AS	parametro_codigo,
                            TRIM(a.FGPARAMDES)							AS	parametro_nombre,
                            TRIM(a.FGPARAMVC)							AS	parametro_char,
                            a.FGPARAMVV									AS	parametro_varchar,
                            a.FGPARAMVE									AS	parametro_entero_chico,
                            a.FGPARAMVEG								AS	parametro_entero_grande,
                            a.FGPARAMVN									AS	parametro_decimal1,
                            a.FGPARAMVN2								AS	parametro_decimal2,
                            a.FGPARAMVN3								AS	parametro_decimal3,
                            a.FGPARAMVN4								AS	parametro_decimal4,
                            a.FGPARAMVP									AS	parametro_porcentaje,

                            CONVERT(VARCHAR, a.FGPARAMVF, 23)			AS	parametro_fecha1_1,
                            CONVERT(VARCHAR, a.FGPARAMVF, 103)			AS	parametro_fecha1_2,

                            CONVERT(VARCHAR, a.FGPARAMVF2, 23)			AS	parametro_fecha2_1,
                            CONVERT(VARCHAR, a.FGPARAMVF2, 103)			AS	parametro_fecha2_2,

                            CONVERT(VARCHAR, a.FGPARAMVF3, 23)			AS	parametro_fecha3_1,
                            CONVERT(VARCHAR, a.FGPARAMVF3, 103)			AS	parametro_fecha3_2,

                            CONVERT(VARCHAR, a.FGPARAMVF4, 23)			AS	parametro_fecha4_1,
                            CONVERT(VARCHAR, a.FGPARAMVF4, 103)			AS	parametro_fecha4_2,

                            CONVERT(VARCHAR, a.FGPARAMVFH, 120)			AS	parametro_fechahora1_1,
                            FORMAT(a.FGPARAMVFH,'dd/MM/yyyy hh:mm:ss')	AS	parametro_fechahora1_2
                            
                        FROM [dbo].[FGPARAM] a

                        WHERE FGPARAMNUM = ${codigo}`;
            break;

        default:
            break;
    }

    await clientMSSQL.on('error', err => {
            _code = 401;
            errorBody(_code, 'Erro: '+ err + ', Function: selectFGPARAM', true)
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
                errorBody(_code, 'Code: '+ err.code + ', OriginalError: ' + err.originalError + ', Function: selectFGPARAM', true)
                    .then(result => _data = result);
            })
            .then(() => {
                clientMSSQL.close();
            });
    }

    if (_data['rowsAffected'] == 0) {
        _code   = 204;
        _data   = await jsonBody(_code, 'Warning', 'selectFGPARAM', null, 'No hay registros', 0, 0, 0, 0, []);
    }else{
        _data   =  _data['recordset'];
    }
   
    return Array(_code, _data);
}

const selectPERFIC = async(actionType, codigo, valor) => {
    let _code   = 200;
    let _data   = [];
    let query00 = '';

    switch (actionType) {
        case 1:
            query00 = `SELECT
                            a.AACUEN                            AS  persona_cuenta,
                            TRIM(a.AADOCU)                      AS  persona_documento_numero,

                            CONVERT(VARCHAR, a.AAFCHEXPED, 23)  AS  persona_documento_fechaemision_1,
                            CONVERT(VARCHAR, a.AAFCHEXPED, 103) AS  persona_documento_fechaemision_2, 
                            TRIM(a.AANOM)                       AS  persona_nombre_completo,
                            TRIM(a.AAAPE1)                      AS  persona_apellido_paterno,
                            TRIM(a.AAAPE2)                      AS  persona_apellido_materno,
                            TRIM(a.AAAPE3)                      AS  persona_apellido_casada,
                            TRIM(a.AANOM1)                      AS  persona_nombre_primer,
                            TRIM(a.AANOM2)                      AS  persona_nombre_segundo,
                            CONVERT(VARCHAR, a.AAFECH, 23)      AS	persona_fecha_nacimiento_1,
                            CONVERT(VARCHAR, a.AAFECH, 103)     AS	persona_fecha_nacimiento_2,
                            (
                                SELECT
                                    TOP 1 TRIM(a11.AWEMAI)
                                FROM [dbo].[FSD022] a11
                                WHERE a11.AACUEN = a.AACUEN AND a11.AWEMAI <> ''
                                ORDER BY a11.AWCORR DESC
                            )                                  AS          persona_email,
                            CASE
                                WHEN 
                                    EXISTS (
                                        SELECT
                                            *
                                        FROM [dbo].[FSD0122] a11
                                        WHERE a11.AACUEN = a.AACUEN AND
                                            a11.BFESTA IN (7, 10) AND
                                            (
                                                a11.BFAGEN = 21 OR
                                                a11.BFAGEN = 22 OR
                                                (a11.BFAGEN >= 200 AND a11.BFAGEN <= 1000)
                                            )
                                    ) THEN 'RECURRENTE' ELSE 'NUEVO'
                            END                                 AS          persona_cliente,
                            CASE
                                WHEN 
                                    EXISTS (
                                        SELECT
                                            *
                                        FROM [dbo].[SOCRED] a11
                                        WHERE a11.SCAAcuen = a.AACUEN AND
                                            a11.SCEstado IN ('PV')
                                    ) THEN 'SI' ELSE 'NO'
                            END                                 AS          persona_solicitud,
                            CASE
                                WHEN 
                                    EXISTS (
                                        SELECT
                                            *
                                        FROM [dbo].[FSD0122] a11
                                        WHERE a11.AACUEN = a.AACUEN AND
                                            a11.BFESTA IN (3, 4, 5, 6, 28, 29, 30, 31)
                                    ) THEN 'SI' ELSE 'NO'
                            END                                 AS          persona_operacion,
                            CASE
                                WHEN
                                    EXISTS (SELECT * FROM [dbo].[BTLK003] a11 WHERE a11.PTKCUEN = a.AACUEN AND a11.PTKMEDIO IN (334) AND a11.PTKCODE IN (100, 101, 200, 201))
                                THEN 'S'
                                ELSE 'N'
                            END                                 AS          persona_campanha,

                            TRIM(a.AAUSUAL)                     AS          alta_usuario,
                            a.AAFCHAL                           AS          alta_fecha,
                            TRIM(a.AAHRAAL)                     AS          alta_hora,

                            TRIM(a.AAUSUMD)                     AS          auditoria_usuario,
                            a.AAFCHMD                           AS          auditoria_fecha,
                            TRIM(a.AAHRAMD)                     AS          auditoria_hora,

                            b.DOMFICCOD                         AS          tipo_persona_codigo,
                            b.DOMFICTGC                         AS          tipo_persona_grupo_codigo,
                            b.DOMFICORD                         AS          tipo_persona_orden,
                            b.DOMFICPAR                         AS          tipo_persona_parametro,
                            TRIM(b.DOMFICNOM)                   AS          tipo_persona_nombre,
                            b.DOMFICCSS                         AS          tipo_persona_css,
                            b.DOMFICICO                         AS          tipo_persona_icono,
                            b.DOMFICPAT                         AS          tipo_persona_path,
                            b.DOMFICEQU                         AS          tipo_persona_equivalencia,
                            TRIM(b.DOMFICVAL)                   AS          tipo_persona_dominio,
                            TRIM(b.DOMFICOBS)                   AS          tipo_persona_observacion,

                            c.DOMFICCOD                         AS          tipo_sexo_codigo,
                            c.DOMFICTGC                         AS          tipo_sexo_grupo_codigo,
                            c.DOMFICORD                         AS          tipo_sexo_orden,
                            c.DOMFICPAR                         AS          tipo_sexo_parametro,
                            TRIM(c.DOMFICNOM)                   AS          tipo_sexo_nombre,
                            c.DOMFICCSS                         AS          tipo_sexo_css,
                            c.DOMFICICO                         AS          tipo_sexo_icono,
                            c.DOMFICPAT                         AS          tipo_sexo_path,
                            c.DOMFICEQU                         AS          tipo_sexo_equivalencia,
                            TRIM(c.DOMFICVAL)                   AS          tipo_sexo_dominio,
                            TRIM(c.DOMFICOBS)                   AS          tipo_sexo_observacion,

                            d.DOMFICCOD                         AS          tipo_estadocivil_codigo,
                            d.DOMFICTGC                         AS          tipo_estadocivil_grupo_codigo,
                            d.DOMFICORD                         AS          tipo_estadocivil_orden,
                            d.DOMFICPAR                         AS          tipo_estadocivil_parametro,
                            TRIM(d.DOMFICNOM)                   AS          tipo_estadocivil_nombre,
                            d.DOMFICCSS                         AS          tipo_estadocivil_css,
                            d.DOMFICICO                         AS          tipo_estadocivil_icono,
                            d.DOMFICPAT                         AS          tipo_estadocivil_path,
                            d.DOMFICEQU                         AS          tipo_estadocivil_equivalencia,
                            TRIM(d.DOMFICVAL)                   AS          tipo_estadocivil_dominio,
                            TRIM(d.DOMFICOBS)                   AS          tipo_estadocivil_observacion,

                            e.AHPAIS                            AS          localidad_pais_codigo,
                            TRIM(e.AHNOMB)                      AS          localidad_pais_nombre,
                            TRIM(e.AHGENT)                      AS          localidad_pais_gentilicio

                        FROM [dbo].[FSD0011] a
                            LEFT OUTER JOIN [CUSYS].[DOMFIC] b ON a.AGDOCU = b.DOMFICEQU AND b.DOMFICVAL = 'WSCHEDUOPERSONATIPO'
                            LEFT OUTER JOIN [CUSYS].[DOMFIC] c ON a.AASEXO = c.DOMFICEQU AND c.DOMFICVAL = 'WSCHEDUOPERSONASEXO'
                            LEFT OUTER JOIN [CUSYS].[DOMFIC] d ON a.AAESTCIV = d.DOMFICEQU AND d.DOMFICVAL = 'WSCHEDUOPERSONAESTADOCIVIL'
                            LEFT OUTER JOIN [dbo].[FST002] e ON a.AHPAIS = e.AHPAIS

                        WHERE a.AACUEN  = ${codigo}`;
            break;

        case 2:
            query00 = `SELECT TOP 1 
                            a.AWCORR			AS			persona_datoparticular_codigo,
                            TRIM(a.AWCALLE) 	AS			persona_datoparticular_principal,
                            a.AWNUME			AS			persona_datoparticular_casanumero,			
                            TRIM(a.AWESQ)       AS			persona_datoparticular_esquina,
                            
                            a.AWESTTEL1			AS			persona_datoparticular_telefono1_estado,
                            TRIM(a.AWPRETEL1)   AS			persona_datoparticular_telefono1_prefijo,
                            TRIM(a.AWTEL1)      AS			persona_datoparticular_telefono1_numero,
                            
                            a.AWESTTEL2			AS			persona_datoparticular_telefono2_estado,
                            TRIM(a.AWPRETEL2)   AS			persona_datoparticular_telefono2_prefijo,
                            TRIM(a.AWTEL2)      AS			persona_datoparticular_telefono2_numero,
                            
                            a.AWESTTFLIA		AS			persona_datoparticular_telefonofamiliar_estado,			
                            TRIM(a.AWPRETELF)   AS			persona_datoparticular_telefonofamiliar_prefijo,
                            TRIM(a.AWTELFLIAR)  AS			persona_datoparticular_telefonofamiliar_numero,
                            
                            a.AWESTCEL1			AS			persona_datoparticular_celular1_estado,
                            TRIM(a.AWBIPP)      AS			persona_datoparticular_celular1_prefijo,
                            TRIM(a.AWCELU)      AS			persona_datoparticular_celular1_numero,
                            
                            a.AWESTCEL2			AS			persona_datoparticular_celular2_estado,
                            TRIM(a.AWBIPP1)     AS			persona_datoparticular_celular2_prefijo,
                            TRIM(a.AWCELU1)     AS			persona_datoparticular_celular2_numero,
                            
                            a.AWESTCEL3			AS			persona_datoparticular_celular3_estado,
                            TRIM(a.AWBIPP2)     AS			persona_datoparticular_celular3_prefijo,
                            TRIM(a.AWCELU1)     AS			persona_datoparticular_celular3_numero,
                            
                            TRIM(a.AWEMAI)  	AS			persona_datoparticular_email,

                            TRIM(a.AWUSUA)      AS          alta_usuario,            
                            a.AWFCHA            AS          alta_fecha,
                            TRIM(a.AWHRAA)      AS          alta_hora,

                            TRIM(a.AWUSUM)      AS          auditoria_usuario,
                            a.AWFCHM            AS          auditoria_fecha,  
                            a.AWHRAM            AS          auditoria_hora,
                            
                            b.AACUEN			AS			persona_cuenta,
                            
                            c.DOMFICCOD         AS          tipo_vivienda_codigo,
                            c.DOMFICTGC         AS          tipo_vivienda_grupo_codigo,
                            c.DOMFICORD         AS          tipo_vivienda_orden,
                            c.DOMFICPAR         AS          tipo_vivienda_parametro,
                            TRIM(c.DOMFICNOM)   AS          tipo_vivienda_nombre,
                            c.DOMFICCSS         AS          tipo_vivienda_css,
                            c.DOMFICICO         AS          tipo_vivienda_icono,
                            c.DOMFICPAT         AS          tipo_vivienda_path,
                            c.DOMFICEQU         AS          tipo_vivienda_equivalencia,
                            TRIM(c.DOMFICVAL)   AS          tipo_vivienda_dominio,
                            TRIM(c.DOMFICOBS)   AS          tipo_vivienda_observacion,
                            
                            d.AJBARR			AS			localidad_barrio_codigo,
                            TRIM(d.AJNOMB)		AS			localidad_barrio_nombre,
                            
                            e.APCIUD			AS			localidad_ciudad_codigo,
                            TRIM(e.APNOMB)		AS			localidad_ciudad_nombre,
                            
                            f.AIDEPT			AS			localidad_departamento_codigo,
                            TRIM(f.AINOMB)		AS			localidad_departamento_nombre
                            
                        FROM [dbo].[FSD022] a
                            LEFT OUTER JOIN [dbo].[FSD0011] b ON a.AACUEN	= b.AACUEN 
                            LEFT OUTER JOIN [CUSYS].[DOMFIC] c ON a.AWPROP	= c.DOMFICEQU AND c.DOMFICVAL = 'WSCHEDUOPERSONAVIVIENDA'
                            LEFT OUTER JOIN [dbo].[FST0051] d ON a.AJBARR	= d.AJBARR
                            LEFT OUTER JOIN [dbo].[FST003] e ON a.APCIUD	= e.APCIUD AND a.AiDept = e.AiDept
                            LEFT OUTER JOIN [dbo].[FST004] f ON e.AIDEPT	= f.AIDEPT
                            
                        WHERE a.AACUEN = ${codigo}
                        ORDER BY a.AWCORR DESC`
            break;    
        
        case 3:
            query00 = `SELECT TOP 1
                            a.BACORR                        AS  persona_datolaboral_codigo,
                            TRIM(a.BACALLE)                 AS  persona_datolaboral_principal,
                            a.AAEMPR                        AS  persona_datolaboral_empresa,
                            CONVERT(VARCHAR, a.AAIFEC, 23)  AS  persona_datolaboral_fechaingreso_1,
                            CONVERT(VARCHAR, a.AAIFEC, 103) AS  persona_datolaboral_fechaingreso_2, 
                            a.BASALA                        AS  persona_datolaboral_salario,
                            TRIM(a.BAEMAI)                  AS  persona_datolaboral_email,
                            TRIM(a.BAESQ)                   AS  persona_datolaboral_esquina,
                            a.BANUME                        AS  persona_datolaboral_casanumero,
                            a.BAHORD                        AS  persona_datolaboral_hora_desde,
                            a.BAHORA                        AS  persona_datolaboral_hora_hasta,
                            a.BAFCHCOB                      AS  persona_datolaboral_diacobro,
                            a.BALUN                         AS  persona_datolaboral_dialunes,
                            a.BAMAR                         AS  persona_datolaboral_diamartes,
                            a.BAMIE                         AS  persona_datolaboral_diamiercoles,
                            a.BAJUE                         AS  persona_datolaboral_diajueves,
                            a.BAVIE                         AS  persona_datolaboral_diaviernes,
                            a.BASAB                         AS  persona_datolaboral_diasabado,
                            a.BADOM                         AS  persona_datolaboral_diadomingo,
                            a.BAINT                         AS  persona_datolaboral_interno,

                            a.BAESTTEL1                     AS  persona_datolaboral_telefono1_estado,
                            a.BAPRETEL1                     AS  persona_datolaboral_telefono1_prefijo,
                            a.BATEL1                        AS  persona_datolaboral_telefono1_numero,

                            a.BAESTTEL2                     AS  persona_datolaboral_telefono2_estado,
                            a.BAPRETEL2                     AS  persona_datolaboral_telefono2_prefijo,
                            a.BATEL2                        AS  persona_datolaboral_telefono2_numero,

                            a.BAESTTEL3                     AS  persona_datolaboral_telefono3_estado,
                            a.BAPRETEL3                     AS  persona_datolaboral_telefono3_prefijo,
                            a.BATEL3                        AS  persona_datolaboral_telefono3_numero,

                            a.BAUSUALT                      AS  alta_usuario,
                            a.BAHRAALT                      AS  alta_fecha,
                            a.BAFCHALT                      AS  alta_hora,

                            a.BAUSUM                        AS  auditoria_usuario,
                            a.BAHRAM                        AS  auditoria_fecha,
                            a.BAFCHM                        AS  auditoria_hora,

                            b.AACUEN                        AS  persona_cuenta,

                            c.AJBARR		                AS  localidad_barrio_codigo,
                            c.AJNOMB		                AS  localidad_barrio_nombre,

                            d.APCIUD		                AS  localidad_ciudad_codigo,
                            d.APNOMB		                AS  localidad_ciudad_nombre,

                            e.AIDEPT		                AS  localidad_departamento_codigo,
                            e.AINOMB		                AS  localidad_departamento_nombre,

                            f.BDEMPCO                       AS  empresa_codigo,
                            f.BDEMPCO		                AS  empresa_codigo,	
                            f.BDNOMBE		                AS  empresa_nombre,	
                            f.CSVAL23		                AS  empresa_valor,
                            f.BDRUC			                AS  empresa_ruc, 

                            g.AMCARG                        AS  cargo_codigo,
                            g.AMANTCOD		                AS  cargo_codigo_anterior,
                            g.AMNOMB		                AS  cargo_nombre,
                            g.CSVAL4		                AS  cargo_valor,

                            h.CLIAREACOD                    AS  actividad_codigo,
                            h.CLIAREADES	                AS  actividad_nombre,	
                            h.CLIAREAOBS	                AS  actividad_observacion,

                            i.PROFCOD                       AS  profesion_codigo,
                            i.PROFDES		                AS  profesion_nombre,

                            j.ARCOD                         AS  area_codigo,
                            j.ARDESC		                AS  area_nombre,
                            j.AROBS			                AS  area_observacion,

                            k.F24CODFOR                     AS  forma_pago_codigo,
                            k.F24DESCRIP	                AS  forma_pago_nombre,

                            l.ARENTE                        AS  banco_codigo,
                            l.ARNOMB		                AS  banco_nombre,
                            l.ARREDU		                AS  banco_abreviatura,
                            l.ARFRCMON		                AS  banco_debitoautomatico_monto,
                            l.ARREGCONT		                AS  banco_debitoautomatico_contador_registro,
                            l.ARMARENTTH	                AS  banco_marca_pago_salario

                        FROM [dbo].[FSD023] a
                            LEFT OUTER JOIN [dbo].[FSD0011] b ON a.AACUEN	= b.AACUEN
                            LEFT OUTER JOIN [dbo].[FST0051] c ON a.AJBARR	= c.AJBARR
                            LEFT OUTER JOIN [dbo].[FST003] d ON a.APCIUD	= d.APCIUD AND a.AiDept = d.AiDept
                            LEFT OUTER JOIN [dbo].[FST004] e ON d.AIDEPT	= e.AIDEPT
                            LEFT OUTER JOIN [dbo].[FST067] f ON a.BDEMPCO	= f.BDEMPCO
                            LEFT OUTER JOIN [dbo].[FST008] g ON a.AMCARG	= g.AMCARG
                            LEFT OUTER JOIN [dbo].[CLIAREALAB] h ON a.CLIAREACOD	= a.CLIAREACOD
                            LEFT OUTER JOIN [dbo].[FST073] i ON a.PROFCOD	= i.PROFCOD 
                            LEFT OUTER JOIN [dbo].[FSD070] j ON a.ARCOD		= j.ARCOD
                            LEFT OUTER JOIN [dbo].[FSD024] k ON a.F24CODFOR = k.F24CODFOR
                            LEFT OUTER JOIN [dbo].[FST014] l ON a.ARENTE	= l.ARENTE

                        WHERE a.AACUEN = ${codigo}

                        ORDER BY a.BACORR DESC`;
            break;

        default:
            break;
    }

    await clientMSSQL.on('error', err => {
            _code = 401;
            errorBody(_code, 'Erro: '+ err + ', Function: selectPERFIC', true)
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
                console.log(err);
                errorBody(_code, 'Code: '+ err.code + ', OriginalError: ' + err.originalError + ', Function: selectPERFIC', true)
                    .then(result => _data = result);
            })
            .then(() => {
                clientMSSQL.close();
            });
    }

    if (_data['rowsAffected'] == 0) {
        _code   = 204;
        _data   = await jsonBody(_code, 'Warning', 'selectPERFIC', null, 'No hay registros', 0, 0, 0, 0, []);
    }else{
        _data   =  _data['recordset'];
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
    selectUSUARIOFLUJO,
    selectUSUARIOLOG,
    selectPERSONA,
    selectFGPARAM,
    selectPERFIC
};