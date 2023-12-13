
/**
    * @param {integer} actionType - Tipo de accion (1:Formato YYYY-MM-DD, 2:Formato DD/MM/YYYY)
    * @param {Date} dateCurrent - Fecha & Hora a formatear
    * @returns {Array} returns
*/

const formatDateTime = async(actionType, dateCurrent) => {
    let xJSON       = '';
    let xLength     = dateCurrent.toString().length;
    let currentYear = dateCurrent.toString().substring(0, 4);
    let currentMonth= (xLength > 4) ? dateCurrent.toString().substring(4, 6) : '01';

    switch (actionType) {
        case 1:
            xJSON = dateCurrent.toISOString().replace(/T/, ' ').replace(/\..+/, '').substring(0, 10);
            
            break;

        case 2:
            xJSON = new Date(currentYear, (currentMonth-1), 1);
            xJSON = xJSON.toISOString().replace(/T/, ' ').replace(/\..+/, '').substring(0, 10);
            break;

        case 3:
            xJSON = new Date(currentYear, (currentMonth-1) + 1, 0);
            xJSON = xJSON.toISOString().replace(/T/, ' ').replace(/\..+/, '').substring(0, 10);
            break;
    
        default:
            break;
    }

    return xJSON;
}

module.exports = {
    formatDateTime
};