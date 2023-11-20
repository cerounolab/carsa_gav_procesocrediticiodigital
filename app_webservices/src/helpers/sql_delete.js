const {Pool, Client, initPGSQL} = require('../conf/database');
const {errorBody}   = require('../utils/_json');

/**
    * @param {integer} codigo - codigo
    * @returns {Array} returns
*/

const deleteDOMFIC  = async(codigo) => {

    let _code   = 200;
    let _data   = [];
   
    let query00 = '';

    query00 = `DELETE FROM adm.DOMFIC WHERE DOMFICCOD =  ${codigo}`;	

    const connPGSQL = new Client(initPGSQL);
    
    await connPGSQL
        .connect()
        .catch(e => {
            _code = 401;
            errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: deleteDOMFIC', true)
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
                errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: deleteDOMFIC', true)
                    .then(result => _data = result);
            })
            .then(() => {
                connPGSQL.end();
            }
        );
    }
    
    return Array(_code, _data);
}

const deleteEMPFIC  = async(codigo) => {

    let _code   = 200;
    let _data   = [];
   
    let query00 = '';

    query00 = `DELETE FROM adm.EMPFIC WHERE EMPFICCOD =  ${codigo}`;	

    const connPGSQL = new Client(initPGSQL);
    
    await connPGSQL
        .connect()
        .catch(e => {
            _code = 401;
            errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: deleteEMPFIC', true)
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
                errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: deleteEMPFIC', true)
                    .then(result => _data = result);
            })
            .then(() => {
                connPGSQL.end();
            }
        );
    }
    
    return Array(_code, _data);
}

const deleteSUCFIC  = async(codigo) => {

    let _code   = 200;
    let _data   = [];
   
    let query00 = '';

    query00 = `DELETE FROM adm.SUCFIC WHERE SUCFICCOD =  ${codigo}`;	

    const connPGSQL = new Client(initPGSQL);
    
    await connPGSQL
        .connect()
        .catch(e => {
            _code = 401;
            errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: deleteSUCFIC', true)
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
                errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: deleteSUCFIC', true)
                    .then(result => _data = result);
            })
            .then(() => {
                connPGSQL.end();
            }
        );
    }
    
    return Array(_code, _data);
}

const deleteUSUFIC  = async(codigo) => {

    let _code   = 200;
    let _data   = [];
   
    let query00 = '';

    query00 = `DELETE FROM adm.USUFIC WHERE USUFICCOD =  ${codigo}`;	

    const connPGSQL = new Client(initPGSQL);
    
    await connPGSQL
        .connect()
        .catch(e => {
            _code = 401;
            errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: deleteUSUFIC', true)
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
                errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: deleteUSUFIC', true)
                    .then(result => _data = result);
            })
            .then(() => {
                connPGSQL.end();
            }
        );
    }
    
    return Array(_code, _data);
}

const deleteROLFIC  = async(codigo) => {

    let _code   = 200;
    let _data   = [];
   
    let query00 = '';

    query00 = `DELETE FROM adm.ROLFIC WHERE ROLFICCOD =  ${codigo}`;	

    const connPGSQL = new Client(initPGSQL);
    
    await connPGSQL
        .connect()
        .catch(e => {
            _code = 401;
            errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: deleteROLFIC', true)
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
                errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: deleteROLFIC', true)
                    .then(result => _data = result);
            })
            .then(() => {
                connPGSQL.end();
            }
        );
    }
    
    return Array(_code, _data);
}

const deleteCAMFIC  = async(codigo) => {

    let _code   = 200;
    let _data   = [];
   
    let query00 = '';

    query00 = `DELETE FROM adm.CAMFIC WHERE CAMFICCOD =  ${codigo}`;	

    const connPGSQL = new Client(initPGSQL);
    
    await connPGSQL
        .connect()
        .catch(e => {
            _code = 401;
            errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: deleteCAMFIC', true)
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
                errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: deleteCAMFIC', true)
                    .then(result => _data = result);
            })
            .then(() => {
                connPGSQL.end();
            }
        );
    }
    
    return Array(_code, _data);
}

const deleteFORFIC  = async(codigo) => {

    let _code   = 200;
    let _data   = [];
   
    let query00 = '';

    query00 = `DELETE FROM adm.FORFIC WHERE FORFICCOD =  ${codigo}`;	

    const connPGSQL = new Client(initPGSQL);
    
    await connPGSQL
        .connect()
        .catch(e => {
            _code = 401;
            errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: deleteFORFIC', true)
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
                errorBody(_code, 'Code: '+ e.code + ', Routine: ' + e.routine + ', Function: deleteFORFIC', true)
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
    deleteDOMFIC,
    deleteEMPFIC,
    deleteSUCFIC,
    deleteUSUFIC,
    deleteROLFIC,
    deleteCAMFIC,
    deleteFORFIC
};