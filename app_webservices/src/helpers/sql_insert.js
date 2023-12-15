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
                errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine, 'Function: insertDOMFIC')
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
                            WHERE NOT EXISTS (SELECT * FROM adm.EMPFIC WHERE EMPFICRUC = ${_EMPFICRUC}) RETURNING EMPFICRUC`;	            

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
                errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine, 'Function: insertEMPFIC')
                    .then(result => _data = result);
            })
            .then(() => {
                connPGSQL.end();
            }
        );
    }

    if (_data == '') {
        _code   = 404;
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
                errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine, 'Function: insertSUCFIC')
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
                        WHERE NOT EXISTS (SELECT * FROM adm.USUFIC WHERE USUFICUSU = ${_USUFICUSU} AND USUFICEMC = ${_USUFICEMC}) RETURNING USUFICUSU, USUFICEMC`;	            

    const connPGSQL = new Client(initPGSQL);

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
                errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine, 'Function: insertUSUFIC')
                    .then(result => _data = result);
            })
            .then(() => {
                connPGSQL.end();
            }
        );
    }

    if (_data == '') {
        _code   = 404;
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
	                    VALUES ((SELECT DOMFICCOD FROM adm.DOMFIC WHERE DOMFICVAL = 'ADMROLESTADO' AND DOMFICPAR = ${_ROLFICEST}), ${_ROLFICEMC}, ${_ROLFICORD}, ${_ROLFICNOM},   ${_ROLFICFDE}, ${_ROLFICFHA}  , ${_ROLFICEQU}, ${_ROLFICOBS}, ${_ROLFICCEM}, ${_ROLFICCUS}, ${_ROLFICCIP}, ${_ROLFICCPR}, ${_ROLFICAEM}, ${_ROLFICAUS}, ${_ROLFICAIP}, ${_ROLFICAPR}, ${_ROLFICAIN})`;	            

                        console.log(query00);
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
                errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine, 'Function: insertROLFIC')
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
	                VALUES ((SELECT DOMFICCOD FROM adm.DOMFIC WHERE DOMFICVAL = 'ADMCAMPANHAESTADO' AND DOMFICPAR = ${_CAMFICEST}), (SELECT DOMFICCOD FROM adm.DOMFIC WHERE DOMFICVAL = 'ADMCAMPANHATIPO' AND DOMFICPAR = ${_CAMFICTCC}), ${_CAMFICEMC}, ${_CAMFICORD}, ${_CAMFICNOM},   ${_CAMFICFDE},   ${_CAMFICFHA}, ${_CAMFICEQU}, ${_CAMFICOBS}, ${_CAMFICCEM}, ${_CAMFICCUS}, ${_CAMFICCIP}, ${_CAMFICCPR}, ${_CAMFICAEM}, ${_CAMFICAUS}, ${_CAMFICAIP}, ${_CAMFICAPR}, ${_CAMFICAIN})`;	            

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
                errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine, 'Function: insertFORFIC')
                    .then(result => _data = result);
            })
            .then(() => {
                connPGSQL.end();
            }
        );
    }
    
    return Array(_code, _data);
}

const insertROLFOR  = async(_ROLFORROC,
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
    _ROLFORAIN) => {

    let _code   = 200;
    let _data   = [];

    let query00 = '';

    query00 = `INSERT INTO adm.ROLFOR (ROLFORROC, 	  ROLFORFOC, 																								   ROLFOREST,     ROLFOREMC, 	ROLFORORD, 		ROLFORACC, 	   ROLFORDSP, 	  ROLFORUPD, 	 ROLFORDLT,     ROLFORINS,     ROLFORXLS,     ROLFORPDF,     ROLFORIMP, 	ROLFOROBS, 	   ROLFORCEM,     ROLFORCUS,    ROLFORCIP,      ROLFORCPR,     ROLFORAEM,     ROLFORAUS,     ROLFORAIP,    ROLFORAPR,    ROLFORAIN)
                            SELECT ${_ROLFORROC}, ${_ROLFORFOC}, (SELECT DOMFICCOD FROM adm.DOMFIC WHERE DOMFICVAL = 'ADMROLFORMULARIOESTADO' AND DOMFICPAR = ${_ROLFOREST}), ${_ROLFOREMC}, ${_ROLFORORD}, ${_ROLFORACC}, ${_ROLFORDSP}, ${_ROLFORUPD}, ${_ROLFORDLT}, ${_ROLFORINS}, ${_ROLFORXLS}, ${_ROLFORPDF}, ${_ROLFORIMP}, ${_ROLFOROBS}, ${_ROLFORCEM}, ${_ROLFORCUS}, ${_ROLFORCIP}, ${_ROLFORCPR}, ${_ROLFORAEM}, ${_ROLFORAUS}, ${_ROLFORAIP}, ${_ROLFORAPR}, ${_ROLFORAIN}
                            WHERE NOT EXISTS (SELECT * FROM adm.ROLFOR WHERE ROLFORROC = ${_ROLFORROC} AND ROLFORFOC = ${_ROLFORFOC}) RETURNING ROLFORROC, ROLFORFOC`;	            

    const connPGSQL = new Client(initPGSQL);

    await connPGSQL
        .connect()
        .catch(e => {
            _code = 401;
            errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: insertROLFOR', true)
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
                errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine, 'Function: insertROLFOR')
                    .then(result => _data = result);
            })
            .then(() => {
                connPGSQL.end();
            }
        );
        
    }
  
    if (_data == '') {
        _code   = 404;
    }
   
    return Array(_code, _data);
}

const insertUSUROL  = async(_USUROLUSC,
    _USUROLROC,
    _USUROLEST,
    _USUROLEMC,
    _USUROLORD,
    _USUROLFDE,
    _USUROLFHA,
    _USUROLOBS,
    _USUROLCEM,
    _USUROLCUS,
    _USUROLCIP,
    _USUROLCPR,
    _USUROLAEM,
    _USUROLAUS,
    _USUROLAIP,
    _USUROLAPR,
    _USUROLAIN) => {

    let _code   = 200;
    let _data   = [];

    let query00 = '';

    query00 = `INSERT INTO adm.USUROL(USUROLUSC,    USUROLROC, 																							       USUROLEST,     USUROLEMC,     USUROLORD,       USUROLFDE,       USUROLFHA,     USUROLOBS,     USUROLCEM,     USUROLCUS,     USUROLCIP,     USUROLCPR,     USUROLAEM,     USUROLAUS,    USUROLAIP,      USUROLAPR,    USUROLAIN)
                           SELECT ${_USUROLUSC}, ${_USUROLROC}, (SELECT DOMFICCOD FROM adm.DOMFIC WHERE DOMFICVAL = 'ADMUSUARIOROLESTADO' AND DOMFICPAR = ${_USUROLEST}), ${_USUROLEMC}, ${_USUROLORD},    ${_USUROLFDE},  ${_USUROLFHA}, ${_USUROLOBS}, ${_USUROLCEM}, ${_USUROLCUS}, ${_USUROLCIP}, ${_USUROLCPR}, ${_USUROLAEM}, ${_USUROLAUS}, ${_USUROLAIP}, ${_USUROLAPR}, ${_USUROLAIN}
                        WHERE NOT EXISTS (SELECT * FROM adm.USUROL WHERE USUROLUSC = ${_USUROLUSC} AND USUROLROC = ${_USUROLROC}) RETURNING USUROLUSC, USUROLROC`;	            

    const connPGSQL = new Client(initPGSQL);

    await connPGSQL
        .connect()
        .catch(e => {
            _code = 401;
            errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: insertUSUARIOROL', true)
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
                errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine, 'Function: insertUSUARIOROL')
                    .then(result => _data = result);
            })
            .then(() => {
                connPGSQL.end();
            }
        );
        
    }
  
    if (_data == '') {
        _code   = 404;
    }
   
    return Array(_code, _data);
}

const insertUSUCAM  = async(_USUCAMUSC,
    _USUCAMCAC,
    _USUCAMEST,
    _USUCAMEMC,
    _USUCAMORD,
    _USUCAMOBS,
    _USUCAMCEM,
    _USUCAMCUS,
    _USUCAMCIP,
    _USUCAMCPR,
    _USUCAMAEM,
    _USUCAMAUS,
    _USUCAMAIP,
    _USUCAMAPR,
    _USUCAMAIN) => {

    let _code   = 200;
    let _data   = [];

    let query00 = '';

    query00 = `INSERT INTO adm.USUCAM (USUCAMUSC, 	  USUCAMCAC,																						             USUCAMEST, 	 USUCAMEMC,    USUCAMORD,     USUCAMOBS,     USUCAMCEM,     USUCAMCUS,     USUCAMCIP,     USUCAMCPR,     USUCAMAEM,     USUCAMAUS,     USUCAMAIP,     USUCAMAPR,    USUCAMAIN)
			                SELECT ${_USUCAMUSC}, ${_USUCAMCAC}, (SELECT DOMFICCOD FROM adm.DOMFIC WHERE DOMFICVAL = 'ADMUSUARIOCAMPANHAESTADO' AND DOMFICPAR = ${_USUCAMEST}), ${_USUCAMEMC}, ${_USUCAMORD}, ${_USUCAMOBS}, ${_USUCAMCEM}, ${_USUCAMCUS}, ${_USUCAMCIP}, ${_USUCAMCPR}, ${_USUCAMAEM}, ${_USUCAMAUS}, ${_USUCAMAIP}, ${_USUCAMAPR}, ${_USUCAMAIN}
			                WHERE NOT EXISTS (SELECT * FROM adm.USUCAM WHERE USUCAMUSC = ${_USUCAMUSC} AND USUCAMCAC = ${_USUCAMCAC}) RETURNING USUCAMUSC, USUCAMCAC`;	            
                            
    const connPGSQL = new Client(initPGSQL);

    await connPGSQL
        .connect()
        .catch(e => {
            _code = 401;
            errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: insertUSUCAM', true)
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
                errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine, 'Function: insertUSUCAM')
                    .then(result => _data = result);
            })
            .then(() => {
                connPGSQL.end();
            }
        );
        
    }
  
    if (_data == '') {
        _code   = 404;
    }
   
    return Array(_code, _data);
}

const insertUSUFLU  = async(_USUFLUUSC, 
    _USUFLUROC, 
    _USUFLUEMC, 
    _USUFLURO1, 
    _USUFLUUS1, 
    _USUFLUEST, 
    _USUFLUORD, 
    _USUFLUOBS, 
    _USUFLUCEM, 
    _USUFLUCUS, 
    _USUFLUCIP, 
    _USUFLUCPR, 
    _USUFLUAEM, 
    _USUFLUAUS, 
    _USUFLUAIP, 
    _USUFLUAPR, 
    _USUFLUAIN) => {

    let _code   = 200;
    let _data   = [];

    let query00 = '';

    query00 = `INSERT INTO adm.USUFLU (USUFLUUSC,     USUFLUROC,     USUFLUEMC,     USUFLURO1,     USUFLUUS1, 																							       USUFLUEST, 	  USUFLUORD,     USUFLUOBS,     USUFLUCEM, 	   USUFLUCUS,     USUFLUCIP,     USUFLUCPR,     USUFLUAEM,     USUFLUAUS,     USUFLUAIP,     USUFLUAPR, USUFLUAIN)
                            SELECT ${_USUFLUUSC}, ${_USUFLUROC}, ${_USUFLUEMC}, ${_USUFLURO1}, ${_USUFLUUS1}, (SELECT DOMFICCOD FROM adm.DOMFIC WHERE DOMFICVAL = 'ADMUSUARIOFLUJOESTADO' AND DOMFICPAR = ${_USUFLUEST}), ${_USUFLUORD}, ${_USUFLUOBS}, ${_USUFLUCEM}, ${_USUFLUCUS}, ${_USUFLUCIP}, ${_USUFLUCPR}, ${_USUFLUAEM}, ${_USUFLUAUS}, ${_USUFLUAIP}, ${_USUFLUAPR}, ${_USUFLUAIN}
                            WHERE NOT EXISTS (SELECT * FROM adm.USUFLU WHERE USUFLUUSC = ${_USUFLUUSC} AND USUFLUROC = ${_USUFLUROC} AND USUFLURO1 = ${_USUFLURO1} AND USUFLUUS1 = ${_USUFLUUS1})
                            RETURNING USUFLUUSC, USUFLUROC, USUFLURO1, USUFLUUS1`;	            
                  
    const connPGSQL = new Client(initPGSQL);

    await connPGSQL
        .connect()
        .catch(e => {
            _code = 401;
            errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: insertUSUFLU', true)
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
                errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', detail: '+e.detail, 'Function: insertUSUFLU')
                    .then(result => _data = result);
            })
            .then(() => {
                connPGSQL.end();
            }
        );
        
    }
  
    if (_data == '') {
        _code   = 404;
    }
   
    return Array(_code, _data);
}

const insertUSULOG  = async(_USULOGEST, 
    _USULOGCOR, 
    _USULOGPAS,
    _USULOGEMC, 
    _USULOGDIP, 
    _USULOGHOS, 
    _USULOGAGE, 
    _USULOGREF, 
    _USULOGAEM, 
    _USULOGAUS,  
    _USULOGAIP, 
    _USULOGAPR) => {

    let _code   = 200;
    let _data   = [];

    let query00 = '';

    query00 = 	`INSERT INTO adm.USULOG( USULOGEST,     USULOGCOR,       USULOGPAS,     USULOGEMC,     USULOGDIP,     USULOGHOS,     USULOGAGE,     USULOGREF,     USULOGAEM,     USULOGAUS,     USULOGAIP, USULOGAPR)
	                       VALUES ('${_USULOGEST}', ${_USULOGCOR}, '${_USULOGPAS}', ${_USULOGEMC}, ${_USULOGDIP}, ${_USULOGHOS}, ${_USULOGAGE}, ${_USULOGREF}, ${_USULOGAEM}, ${_USULOGAUS}, ${_USULOGAIP}, ${_USULOGAPR}) RETURNING USULOGCOD AS usuario_log_codigo`;	            
    const connPGSQL = new Client(initPGSQL);

    await connPGSQL
        .connect()
        .catch(e => {
            _code = 401;
            errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: insertUSULOG', true)
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
                errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: insertUSULOG', true)
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
    insertFORFIC,
    insertROLFOR,
    insertUSUROL,
    insertUSUCAM,
    insertUSUFLU, 
    insertUSULOG

};