/**
 * Prepared query set for CertsDao. <br />
 * 
 * @since 180326
 * @author TACKSU
 */
var TABLE_NAME = 'TCDA_CERT_SHR';
export default {
    put: 'INSERT INTO ' + TABLE_NAME + ' SET ?',
    getById: 'SELECT * FROM ' + TABLE_NAME + ' WHERE S_CERT_SHR_ID = ?',
    setById: 'UPDATE ' + TABLE_NAME + ' SET ? WHERE S_CERT_SHR_ID = ?',
    del: 'UPDATE ' + TABLE_NAME + 'SET DELETE_YN = \'Y\' WHERE S_CERT_SHR_ID = ?'
}