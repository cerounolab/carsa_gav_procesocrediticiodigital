const {Pool, Client, initPGSQL} = require('../conf/database');
const {errorBody}   = require('../utils/_json');

/**
    * @param {integer} codigo - codigo
    * @returns {Array} returns
*/

    const updateDOMFIC  = async(_ACCION,
        codigo,
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
        _DOMFICAPR) => {

        let _code   = 200;
        let _data   = [];
    
        let query00 = '';

        switch (_ACCION) {
            case 1:
                query00 = `UPDATE adm.DOMFIC a SET  
                                DOMFICEST   = (SELECT DOMFICCOD FROM adm.DOMFIC WHERE DOMFICVAL = 'ADMDOMINIOESTADO' AND DOMFICPAR = ${_DOMFICEST}), 
                                DOMFICORD   = ${_DOMFICORD}, 
                                DOMFICPAR   = ${_DOMFICPAR},     
                                DOMFICNOM   = '${_DOMFICNOM}',      
                                DOMFICCSS   = ${_DOMFICCSS},     
                                DOMFICICO   = ${_DOMFICICO},    
                                DOMFICPAT   = ${_DOMFICPAT},     
                                DOMFICEQU   = ${_DOMFICEQU},     
                                DOMFICVAL   = ${_DOMFICVAL},    
                                DOMFICCEM   = ${_DOMFICCEM},   
                                DOMFICCUS   = ${_DOMFICCUS},    
                                DOMFICCIP   = ${_DOMFICCIP},     
                                DOMFICCPR   = ${_DOMFICCPR},     
                                DOMFICAEM   = ${_DOMFICAEM},     
                                DOMFICAUS   = ${_DOMFICAUS},     
                                DOMFICAIP   = ${_DOMFICAIP},     
                                DOMFICAPR   = ${_DOMFICAPR} 

                            FROM adm.DOMFIC a

                            WHERE a.DOMFICCOD = ${codigo} AND
                            NOT EXISTS (SELECT * FROM adm.DOMFIC c WHERE c.DOMFICVAL = ${_DOMFICVAL} AND b.DOMFICPAR <> c.DOMFICPAR AND c.DOMFICCOD = ${codigo})`;	

            break;

            case 2:
                query00 = `UPDATE adm.DOMFIC SET  
                                DOMFICEST   = (SELECT DOMFICCOD FROM adm.DOMFIC WHERE DOMFICVAL = 'ADMDOMINIOESTADO' AND DOMFICPAR = ${_DOMFICEST}), 
                                DOMFICAEM   = ${_DOMFICAEM},     
                                DOMFICAUS   = ${_DOMFICAUS},     
                                DOMFICAIP   = ${_DOMFICAIP},     
                                DOMFICAPR   = ${_DOMFICAPR} 

                            WHERE DOMFICCOD   = ${codigo}`;
            break;	
        }

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
                    console.log(e);
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

    const updateEMPFIC  = async(_ACCION,
            codigo,
            _EMPFICEST,
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
            _EMPFICAEM,
            _EMPFICAUS,
            _EMPFICAIP,
            _EMPFICAPR,
            _EMPFICAIN) => {

        let _code   = 200;
        let _data   = [];
        let query00 = '';

        switch (_ACCION) {
            case 1:
                query00 = `UPDATE adm.EMPFIC a SET 
                                EMPFICEST	= (SELECT DOMFICCOD FROM adm.DOMFIC WHERE DOMFICVAL = 'ADMEMPRESAESTADO' AND DOMFICPAR  = ${_EMPFICEST}),
                                EMPFICTRC	= (SELECT DOMFICCOD FROM adm.DOMFIC WHERE DOMFICVAL = 'ADMEMPRESARUBRO' AND DOMFICPAR   = ${_EMPFICTRC}),
                                EMPFICTAC	= (SELECT DOMFICCOD FROM adm.DOMFIC WHERE DOMFICVAL = 'ADMEMPRESAACCESO' AND DOMFICPAR  = ${_EMPFICTAC}),
                                EMPFICORD	= ${_EMPFICORD}, 	 
                                EMPFICNOM	= ${_EMPFICNOM}, 
                                EMPFICRUC   = ${_EMPFICRUC},		   
                                EMPFICTEL	= ${_EMPFICTEL},     
                                EMPFICCEL	= ${_EMPFICCEL}, 	 
                                EMPFICWEB	= ${_EMPFICWEB}, 	
                                EMPFICCOR	= ${_EMPFICCOR}, 	   
                                EMPFICUBI	= ${_EMPFICUBI}, 	  
                                EMPFICDIR	= ${_EMPFICDIR}, 	 
                                EMPFICLOG	= ${_EMPFICLOG}, 	    
                                EMPFICOBS	= ${_EMPFICOBS}, 	     
                                EMPFICAEM	= ${_EMPFICAEM},     
                                EMPFICAUS	= ${_EMPFICAUS},     
                                EMPFICAIP	= ${_EMPFICAIP},     
                                EMPFICAPR	= ${_EMPFICAPR},     
                                EMPFICAIN	= ${_EMPFICAIN}
                                
                            FROM adm.EMPFIC b
                            WHERE a.EMPFICCOD   = ${codigo} AND
                            NOT EXISTS (SELECT * FROM adm.EMPFIC c WHERE c.EMPFICRUC = ${_EMPFICRUC} AND c.EMPFICCOD <> b.EMPFICCOD)`;	

            break;

            case 2:
                query00 = `UPDATE adm.EMPFIC SET 
                                EMPFICEST	= (SELECT DOMFICCOD FROM adm.DOMFIC WHERE DOMFICVAL = 'ADMEMPRESAESTADO' AND DOMFICPAR  = ${_EMPFICEST}), 
                                EMPFICAEM	= ${_EMPFICAEM},     
                                EMPFICAUS	= ${_EMPFICAUS},     
                                EMPFICAIP	= ${_EMPFICAIP},     
                                EMPFICAPR	= ${_EMPFICAPR} 

                            WHERE EMPFICCOD =  ${codigo}`;
            break;	
        }

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

    const updateSUCFIC  = async(_ACCION,
        codigo,
        _SUCFICEST,
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

    switch (_ACCION) {
        case 1:
            query00 = `UPDATE adm.SUCFIC SET																					 
                            SUCFICEST	= (SELECT DOMFICCOD FROM adm.DOMFIC WHERE DOMFICVAL = 'ADMSUCURSALESTADO' AND DOMFICPAR = ${_SUCFICEST}), 																						   
                            SUCFICTSC	= (SELECT DOMFICCOD FROM adm.DOMFIC WHERE DOMFICVAL = 'ADMSUCURSALTIPO' AND DOMFICPAR = ${_SUCFICTSC}), 	  
                            SUCFICEMP	= ${_SUCFICEMP}, 	 
                            SUCFICORD	= ${_SUCFICORD}, 	
                            SUCFICNOM	= ${_SUCFICNOM}, 	   
                            SUCFICTEL	= ${_SUCFICTEL},     
                            SUCFICCEL	= ${_SUCFICCEL}, 	 
                            SUCFICCOR	= ${_SUCFICCOR}, 	
                            SUCFICUBI	= ${_SUCFICUBI}, 	   
                            SUCFICDIR	= ${_SUCFICDIR}, 	  
                            SUCFICOBS	= ${_SUCFICOBS},     
                            SUCFICCEM	= ${_SUCFICCEM},          
                            SUCFICAEM	= ${_SUCFICAEM},     
                            SUCFICAUS	= ${_SUCFICAUS},     
                            SUCFICAIP	= ${_SUCFICAIP},     
                            SUCFICAPR	= ${_SUCFICAPR}, 
                            SUCFICAIN	= ${_SUCFICAIN}
        
                        WHERE SUCFICCOD = ${codigo}`;	

        break;

        case 2:
            query00 = `UPDATE adm.SUCFIC SET																					 
                            SUCFICEST	= (SELECT DOMFICCOD FROM adm.DOMFIC WHERE DOMFICVAL = 'ADMSUCURSALESTADO' AND DOMFICPAR = ${_SUCFICEST}), 
                            SUCFICAEM	= ${_SUCFICAEM},     
                            SUCFICAUS	= ${_SUCFICAUS},     
                            SUCFICAIP	= ${_SUCFICAIP},     
                            SUCFICAPR	= ${_SUCFICAPR}, 
                            SUCFICAIN	= ${_SUCFICAIN}

                        WHERE SUCFICCOD =  ${codigo}`;
        break;	
    }

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

    const updateUSUFIC  = async(_ACCION,
        codigo,
        _SUCFICEST,
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

        switch (_ACCION) {
            case 1:
                query00 = `UPDATE adm.SUCFIC SET																					 
                                SUCFICEST	= (SELECT DOMFICCOD FROM adm.DOMFIC WHERE DOMFICVAL = 'ADMSUCURSALESTADO' AND DOMFICPAR = ${_SUCFICEST}), 																						   
                                SUCFICTSC	= (SELECT DOMFICCOD FROM adm.DOMFIC WHERE DOMFICVAL = 'ADMSUCURSALTIPO' AND DOMFICPAR = ${_SUCFICTSC}), 	  
                                SUCFICEMP	= ${_SUCFICEMP}, 	 
                                SUCFICORD	= ${_SUCFICORD}, 	
                                SUCFICNOM	= ${_SUCFICNOM}, 	   
                                SUCFICTEL	= ${_SUCFICTEL},     
                                SUCFICCEL	= ${_SUCFICCEL}, 	 
                                SUCFICCOR	= ${_SUCFICCOR}, 	
                                SUCFICUBI	= ${_SUCFICUBI}, 	   
                                SUCFICDIR	= ${_SUCFICDIR}, 	  
                                SUCFICOBS	= ${_SUCFICOBS},     
                                SUCFICCEM	= ${_SUCFICCEM},          
                                SUCFICAEM	= ${_SUCFICAEM},     
                                SUCFICAUS	= ${_SUCFICAUS},     
                                SUCFICAIP	= ${_SUCFICAIP},     
                                SUCFICAPR	= ${_SUCFICAPR}, 
                                SUCFICAIN	= ${_SUCFICAIN}
            
                            WHERE SUCFICCOD = ${codigo}`;	

            break;

            case 2:
                query00 = `UPDATE adm.SUCFIC SET																					 
                                SUCFICEST	= (SELECT DOMFICCOD FROM adm.DOMFIC WHERE DOMFICVAL = 'ADMSUCURSALESTADO' AND DOMFICPAR = ${_SUCFICEST}), 
                                SUCFICAEM	= ${_SUCFICAEM},     
                                SUCFICAUS	= ${_SUCFICAUS},     
                                SUCFICAIP	= ${_SUCFICAIP},     
                                SUCFICAPR	= ${_SUCFICAPR}, 
                                SUCFICAIN	= ${_SUCFICAIN}

                            WHERE SUCFICCOD =  ${codigo}`;
            break;	
        }

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


module.exports = {
    updateDOMFIC,
    updateEMPFIC,
    updateSUCFIC,
    updateUSUFIC
};