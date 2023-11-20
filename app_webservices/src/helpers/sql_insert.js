const {Pool, Client, initPGSQL} = require('../conf/database');
const {errorBody}   = require('../utils/_json');

/**
    * @param {Object} dataJSON  - Objeto con los valores para insertar
    * @returns {Array} returns
*/

const insertDOMFIC  = async(_DOMFICEST,
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
    _DOMFICAPR) => {

    let _code   = 200;
    let _data   = [];
   
    let query00 = '';

    query00 = `INSERT INTO adm.DOMFIC (                                                                                DOMFICEST,     DOMFICORD,                                                                                            DOMFICPAR,      DOMFICNOM,      DOMFICCSS,     DOMFICICO,     DOMFICPAT,     DOMFICEQU,     DOMFICVAL,     DOMFICCEM,     DOMFICCUS,     DOMFICCIP,         DOMFICOBS,     DOMFICCPR,     DOMFICAEM,     DOMFICAUS,     DOMFICAIP,     DOMFICAPR)
                    SELECT (SELECT DOMFICCOD FROM adm.DOMFIC WHERE DOMFICVAL = 'ADMDOMINIOESTADO' AND DOMFICPAR = ${_DOMFICEST}), ${_DOMFICORD}, (
                                                                                                                                                    CASE
                                                                                                                                                        WHEN (SELECT MAX(DOMFICPAR) FROM adm.DOMFIC WHERE DOMFICVAL = ${_DOMFICVAL} AND DOMFICPAR <> 999) IS NULL THEN 1
                                                                                                                                                        WHEN (SELECT MAX(DOMFICPAR) FROM adm.DOMFIC WHERE DOMFICVAL = ${_DOMFICVAL} AND DOMFICPAR <> 999) IS NOT NULL THEN 
                                                                                                                                                        (SELECT MAX(DOMFICPAR) + 1 FROM adm.DOMFIC WHERE DOMFICVAL = ${_DOMFICVAL} AND DOMFICPAR <> 999)
                                                                                                                                                    END
                                                                                                                                                 ),                                                                                                       '${_DOMFICNOM}', ${_DOMFICCSS}, ${_DOMFICICO}, ${_DOMFICPAT}, ${_DOMFICEQU}, ${_DOMFICVAL}, ${_DOMFICCEM}, ${_DOMFICCUS}, ${_DOMFICCIP}, ${_DOMFICOBS},  ${_DOMFICCPR}, ${_DOMFICAEM}, ${_DOMFICAUS}, ${_DOMFICAIP}, ${_DOMFICAPR} 
                    WHERE NOT EXISTS (SELECT * FROM adm.DOMFIC WHERE DOMFICVAL = ${_DOMFICVAL}  AND DOMFICPAR = (SELECT MAX(DOMFICPAR) + 1 FROM adm.DOMFIC WHERE DOMFICVAL = ${_DOMFICVAL}))`;				                

    const connPGSQL = new Client(initPGSQL);
    
    await connPGSQL
        .connect()
        .catch(e => {
            _code = 401;
            errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: insertDOMFIC', true)
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
                errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: insertDOMFIC', true)
                    .then(result => _data = result);
            })
            .then(() => {
                connPGSQL.end();
            }
        );
    }
    
    return Array(_code, _data);
}

const insertEMPFIC  = async(_EMPFICEST,
                        _EMPFICTRC,
                        _EMPFICTAC,
                        _EMPFICORD,
                        _EMPFICNOM,
                        _EMPFICRUC,
                        _EMPFICTEL,
                        _EMPFICCEL,
                        _EMPFICWEB,
                        _EMPFICCOR,
                        _EMPFICUBI,
                        _EMPFICDIR,
                        _EMPFICLOG,
                        _EMPFICOBS,
                        _EMPFICCEM,
                        _EMPFICCUS,
                        _EMPFICCIP,
                        _EMPFICCPR,
                        _EMPFICAEM,
                        _EMPFICAUS,
                        _EMPFICAIP,
                        _EMPFICAPR,
                        _EMPFICAIN) => {

    let _code   = 200;
    let _data   = [];
   
    let query00 = '';

    query00 = `INSERT INTO adm.EMPFIC (																						   EMPFICEST, 																						  	 EMPFICTRC, 																						   EMPFICTAC, 	  EMPFICORD, 	 EMPFICNOM, 	EMPFICRUC, 	   EMPFICTEL,     EMPFICCEL, 	 EMPFICWEB, 	EMPFICCOR, 	   EMPFICUBI, 	  EMPFICDIR, 	 EMPFICLOG,     EMPFICOBS, 	   EMPFICCEM,	  EMPFICCUS, 	 EMPFICCIP, 	EMPFICCPR,     EMPFICAEM,     EMPFICAUS,     EMPFICAIP,     EMPFICAPR)
                            SELECT (SELECT DOMFICCOD FROM adm.DOMFIC WHERE DOMFICVAL = 'ADMEMPRESAESTADO' AND DOMFICPAR = ${_EMPFICEST}), (SELECT DOMFICCOD FROM adm.DOMFIC WHERE DOMFICVAL = 'ADMEMPRESARUBRO' AND DOMFICPAR = ${_EMPFICTRC}), (SELECT DOMFICCOD FROM adm.DOMFIC WHERE DOMFICVAL = 'ADMEMPRESARUBRO' AND DOMFICPAR = ${_EMPFICTAC}), ${_EMPFICORD}, ${_EMPFICNOM}, ${_EMPFICRUC}, ${_EMPFICTEL}, ${_EMPFICCEL}, ${_EMPFICWEB}, ${_EMPFICCOR}, ${_EMPFICUBI}, ${_EMPFICDIR}, ${_EMPFICLOG}, ${_EMPFICOBS}, ${_EMPFICCEM}, ${_EMPFICCUS}, ${_EMPFICCIP}, ${_EMPFICCPR}, ${_EMPFICAEM}, ${_EMPFICAUS}, ${_EMPFICAIP}, ${_EMPFICAPR}
                            WHERE NOT EXISTS (SELECT * FROM adm.EMPFIC WHERE EMPFICRUC = ${_EMPFICRUC})`;	            

    const connPGSQL = new Client(initPGSQL);
    
    await connPGSQL
        .connect()
        .catch(e => {
            _code = 401;
            errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: insertEMPFIC', true)
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
                errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: insertEMPFIC', true)
                    .then(result => _data = result);
            })
            .then(() => {
                connPGSQL.end();
            }
        );
    }
    
    return Array(_code, _data);
}

const insertSUCFIC  = async(_SUCFICEST,
        _SUCFICTSC,
        _SUCFICEMP,
        _SUCFICORD,
        _SUCFICNOM,
        _SUCFICTEL,
        _SUCFICCEL,
        _SUCFICCOR,
        _SUCFICUBI,
        _SUCFICDIR,
        _SUCFICOBS,
        _SUCFICCEM,
        _SUCFICCUS,
        _SUCFICCIP,
        _SUCFICCPR,
        _SUCFICAEM,
        _SUCFICAUS,
        _SUCFICAIP,
        _SUCFICAPR,
        _SUCFICAIN) => {

    let _code   = 200;
    let _data   = [];

    let query00 = '';

    query00 = `INSERT INTO adm.SUCFIC(																				SUCFICEST, 																						   SUCFICTSC, 	  SUCFICEMP, 	 SUCFICORD, 	SUCFICNOM, 	   SUCFICTEL,     SUCFICCEL, 	 SUCFICCOR, 	SUCFICUBI, 	   SUCFICDIR, 	  SUCFICOBS,     SUCFICCEM,    SUCFICCUS,     SUCFICCIP,    SUCFICCPR,      SUCFICAEM,     SUCFICAUS,     SUCFICAIP,     SUCFICAPR,     SUCFICAIN)
                VALUES ((SELECT DOMFICCOD FROM adm.DOMFIC WHERE DOMFICVAL = 'ADMSUCURSALESTADO' AND DOMFICPAR = ${_SUCFICEST}), (SELECT DOMFICCOD FROM adm.DOMFIC WHERE DOMFICVAL = 'ADMSUCURSALTIPO' AND DOMFICPAR = ${_SUCFICTSC}), ${_SUCFICEMP}, ${_SUCFICORD}, ${_SUCFICNOM}, ${_SUCFICTEL}, ${_SUCFICCEL}, ${_SUCFICCOR}, ${_SUCFICUBI}, ${_SUCFICDIR}, ${_SUCFICOBS}, ${_SUCFICCEM}, ${_SUCFICCUS}, ${_SUCFICCIP}, ${_SUCFICCPR}, ${_SUCFICAEM}, ${_SUCFICAUS}, ${_SUCFICAIP}, ${_SUCFICAPR}, ${_SUCFICAIN})`;	            

    const connPGSQL = new Client(initPGSQL);

    await connPGSQL
        .connect()
        .catch(e => {
            _code = 401;
            errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: insertSUCFIC', true)
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
                errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: insertSUCFIC', true)
                    .then(result => _data = result);
            })
            .then(() => {
                connPGSQL.end();
            }
        );
    }
    
    return Array(_code, _data);
}

const insertUSUFIC  = async(_USUFICEST,
    _USUFICEMC,
    _USUFICSUC,
    _USUFICORD,
    _USUFICDOC,
    _USUFICNOM,
    _USUFICAPE,
    _USUFICUSU,
    _USUFICPAS,
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
    _USUFICAIN) => {

    let _code   = 200;
    let _data   = [];

    let query00 = '';

    query00 = `INSERT INTO adm.USUFIC(																					   USUFICEST, 	  USUFICEMC, 	 USUFICSUC,     USUFICORD, 	   USUFICDOC, 	  USUFICNOM, 	 USUFICAPE, 	USUFICUSU, 	  USUFICPAS, 	 USUFICEMA, 	 USUFICCEL, 	USUFICOBS, 	  USUFICCEM, 	  USUFICCUS, 	 USUFICCIP, 	USUFICCPR,     USUFICAEM,     USUFICAUS,     USUFICAIP, 	   USUFICAPR, USUFICAIN)
                        SELECT (SELECT DOMFICCOD FROM adm.DOMFIC WHERE DOMFICVAL = 'ADMUSUARIOESTADO' AND DOMFICPAR = ${_USUFICEST}), ${_USUFICEMC}, ${_USUFICSUC}, ${_USUFICORD}, ${_USUFICDOC}, ${_USUFICNOM}, ${_USUFICAPE}, ${_USUFICUSU}, '${_USUFICPAS}', ${_USUFICEMA}, ${_USUFICCEL}, ${_USUFICOBS}, ${_USUFICCEM}, ${_USUFICCUS}, ${_USUFICCIP}, ${_USUFICCPR}, ${_USUFICAEM}, ${_USUFICAUS}, ${_USUFICAIP}, ${_USUFICAPR}, ${_USUFICAIN}
                        WHERE NOT EXISTS (SELECT * FROM adm.USUFIC WHERE USUFICUSU = ${_USUFICUSU})`;	            

    const connPGSQL = new Client(initPGSQL);
//funcion FSD050
    await connPGSQL
        .connect()
        .catch(e => {
            _code = 401;
            errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: insertUSUFIC', true)
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
                errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: insertUSUFIC', true)
                    .then(result => _data = result);
            })
            .then(() => {
                connPGSQL.end();
            }
        );
    }
    
    return Array(_code, _data);
}

const insertROLFIC  = async(_ROLFICEST,
    _ROLFICEMC,
    _ROLFICORD,
    _ROLFICNOM,
    _ROLFICFDE,
    _ROLFICFHA,
    _ROLFICEQU,
    _ROLFICOBS,
    _ROLFICCEM,
    _ROLFICCUS,
    _ROLFICCIP,
    _ROLFICCPR,
    _ROLFICAEM,
    _ROLFICAUS,
    _ROLFICAIP,
    _ROLFICAPR,
    _ROLFICAIN) => {

    let _code   = 200;
    let _data   = [];

    let query00 = '';

    query00 = ` INSERT INTO adm.ROLFIC(																				    ROLFICEST, 	  ROLFICEMC, 	  ROLFICORD, 	 ROLFICNOM, 	  ROLFICFDE, 	   ROLFICFHA,     ROLFICEQU,     ROLFICOBS,    ROLFICCEM,      ROLFICCUS,     ROLFICCIP,     ROLFICCPR,     ROLFICAEM,     ROLFICAUS,     ROLFICAIP,     ROLFICAPR, ROLFICAIN)
	                    VALUES ((SELECT DOMFICCOD FROM adm.DOMFIC WHERE DOMFICVAL = 'ADMROLESTADO' AND DOMFICPAR = ${_ROLFICEST}), ${_ROLFICEMC}, ${_ROLFICORD}, ${_ROLFICNOM},   '${_ROLFICFDE}', '${_ROLFICFHA}'  , ${_ROLFICEQU}, ${_ROLFICOBS}, ${_ROLFICCEM}, ${_ROLFICCUS}, ${_ROLFICCIP}, ${_ROLFICCPR}, ${_ROLFICAEM}, ${_ROLFICAUS}, ${_ROLFICAIP}, ${_ROLFICAPR}, ${_ROLFICAIN})`;	            

    const connPGSQL = new Client(initPGSQL);

    await connPGSQL
        .connect()
        .catch(e => {
            _code = 401;
            errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: insertROLFIC', true)
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
                errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: insertROLFIC', true)
                    .then(result => _data = result);
            })
            .then(() => {
                connPGSQL.end();
            }
        );
    }
    
    return Array(_code, _data);
}

const insertCAMFIC  = async(_CAMFICEST,
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
    _CAMFICAIN) => {

    let _code   = 200;
    let _data   = [];

    let query00 = '';

    query00 = `INSERT INTO adm.CAMFIC(																					 CAMFICEST, 																						   CAMFICTCC, 	  CAMFICEMC, 	 CAMFICORD, 	CAMFICNOM, 	     CAMFICFDE,       CAMFICFHA,     CAMFICEQU,     CAMFICOBS, 	   CAMFICCEM, 	  CAMFICCUS, 	 CAMFICCIP, 	CAMFICCPR,     CAMFICAEM, 	  CAMFICAUS, 	 CAMFICAIP, 	CAMFICAPR,    CAMFICAIN)
	                VALUES ((SELECT DOMFICCOD FROM adm.DOMFIC WHERE DOMFICVAL = 'ADMCAMPANHAESTADO' AND DOMFICPAR = ${_CAMFICEST}), (SELECT DOMFICCOD FROM adm.DOMFIC WHERE DOMFICVAL = 'ADMCAMPANHATIPO' AND DOMFICPAR = ${_CAMFICTCC}), ${_CAMFICEMC}, ${_CAMFICORD}, ${_CAMFICNOM}, '${_CAMFICFDE}', '${_CAMFICFHA}', ${_CAMFICEQU}, ${_CAMFICOBS}, ${_CAMFICCEM}, ${_CAMFICCUS}, ${_CAMFICCIP}, ${_CAMFICCPR}, ${_CAMFICAEM}, ${_CAMFICAUS}, ${_CAMFICAIP}, ${_CAMFICAPR}, ${_CAMFICAIN})`;	            

    const connPGSQL = new Client(initPGSQL);

    await connPGSQL
        .connect()
        .catch(e => {
            _code = 401;
            errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: insertCAMFIC', true)
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
                _code   = 500;
                errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: insertCAMFIC', true)
                    .then(result => _data = result);
            })
            .then(() => {
                connPGSQL.end();
            }
        );
    }
    
    return Array(_code, _data);
}

const insertFORFIC  = async(_FORFICEST,
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
    _FORFICAIN) => {

    let _code   = 200;
    let _data   = [];

    let query00 = '';

    query00 = `INSERT INTO adm.FORFIC (																				   FORFICEST, 	  FORFICEMC, 	 FORFICORD,     FORFICNOM, 	   FORFICURL, 	  FORFICCEM, 	 FORFICCUS,     FORFICCIP,     FORFICCPR, 	  FORFICAEM, 	 FORFICAUS,     FORFICAIP, 	   FORFICAPR, FORFICAIN)
	            VALUES ((SELECT DOMFICCOD FROM adm.DOMFIC WHERE DOMFICVAL = 'ADMFORMULARIOESTADO' AND DOMFICPAR = ${_FORFICEST}), ${_FORFICEMC}, ${_FORFICORD}, ${_FORFICNOM}, ${_FORFICURL}, ${_FORFICCEM}, ${_FORFICCUS}, ${_FORFICCIP}, ${_FORFICCPR}, ${_FORFICAEM}, ${_FORFICAUS}, ${_FORFICAIP}, ${_FORFICAPR}, ${_FORFICAIN})`;	            

    const connPGSQL = new Client(initPGSQL);

    await connPGSQL
        .connect()
        .catch(e => {
            _code = 401;
            errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: insertFORFIC', true)
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
                _code   = 500;
                errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: insertFORFIC', true)
                    .then(result => _data = result);
            })
            .then(() => {
                connPGSQL.end();
            }
        );
    }
    
    return Array(_code, _data);
}

module.exports = {
    insertDOMFIC,
    insertEMPFIC,
    insertSUCFIC,
    insertUSUFIC,
    insertROLFIC,
    insertCAMFIC,
    insertFORFIC
};