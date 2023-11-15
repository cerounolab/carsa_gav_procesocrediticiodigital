

/**
    * @param {integer} errCode - Objeto para armar la estructura
    * @param {String} errMessage - Objeto para armar la estructura
    * @param {boolean} errUse - Objeto para armar la estructura
    * @returns {Array} returns
*/
const jsonBody = async(dCode, dStatus, dMessageRef, dMessageShort, dMessageError, dPageCurrent, dPageRows, dDataRows, dDataLimit, dData) => {
    let xJSON = {
        code : dCode,
        status : dStatus,
        message_ref : dMessageRef,
        message_short : dMessageShort,
        message_error : dMessageError,
        page_current : dPageCurrent,
        page_rows : dPageRows,
        data_rows : dDataRows,
        data_limit : dDataLimit,
        data : dData,
    };

    return xJSON;
}

/**
    * @param {integer} errCode - Objeto para armar la estructura
    * @param {String} errMessage - Mensaje a visualizar
    * @param {String} errRef - Referencia donde ocurre el error
    * @returns {Array} returns
*/
const errorBody = async(errCode, errMessage, errRef) => {
    let xJSON = {
        'code': errCode,
        'message': errMessage,
        'reference': errRef
    };

    return xJSON;
}

module.exports = {
    jsonBody,
    errorBody
};