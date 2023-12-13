require('dotenv').config({ path:__dirname+'/./../../.env' });

const camelcaseKeys = require('camelcase-keys');
const {selectUSUARIOLOG}= require('../helpers/sql_select');
const {jsonBody}    = require('../utils/_json');
const {formatDateTime}  = require('../utils/_json_date');

const getUsuarioLog   = (apiREQ, apiRES) => {
    let _code       = 200;
    let _dataJSON   = [];    
    let _codigo     = parseInt(apiREQ.params.empresa); 
    let _codigo2    = new Date(apiREQ.params.fecha);
    let _codigo3   = parseInt(apiREQ.params.cantidadregistro);  
    if (_codigo != 'undefined' && _codigo != '' && _codigo != null && _codigo > 0 && _codigo2 != 'undefined' && _codigo2 != '' && _codigo2 != null && _codigo2 > 0 &&
        _codigo3 != 'undefined' && _codigo3 != '' && _codigo3 != null && _codigo3 > 0){

        (async () => {
            _codigo2  = (_codigo2 != null) ? `'${await formatDateTime(1, _codigo2)}'`: null;

            const xDATA = await selectUSUARIOLOG(1, _codigo, _codigo2, _codigo3);
            _code       = xDATA[0];
            _dataJSON   = xDATA[1];

            if (_code == 200) {
                _dataJSON = await jsonBody(_code, 'Success', null, 'Correcto', null, 0, 0, 0, 0, _dataJSON);

            } else if (_code == 404){
                _dataJSON   = xDATA[1];
                _dataJSON   = await jsonBody(_code, 'Success', 'getUsuarioLog', 'No hay registros', null, 0, 0, 0, 0, []);
            }else{
                _dataJSON   = xDATA[1];
                _dataJSON   = await jsonBody(_code, 'Error', _dataJSON.reference, null, _dataJSON.message, 0, 0, 0, 0, []);
            }

            _dataJSON   = camelcaseKeys(_dataJSON, {deep: true});

             return apiRES.status(200).json(_dataJSON);
        })();

    }else{
        (async () => {
            _code       = 400;            
            _dataJSON   = await jsonBody(_code, 'Error', 'getUsuarioLog', 'Error: Verifique algún campo esta vacío', null, 0, 0, 0, 0, []);
            _dataJSON   = camelcaseKeys(_dataJSON, {deep: true});
             return apiRES.status(200).json(_dataJSON);
        })();
    }
}


module.exports  = {
    getUsuarioLog
}