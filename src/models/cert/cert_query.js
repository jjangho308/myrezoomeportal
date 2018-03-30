/**
 * Prepared query set for CertsDao. <br />
 * 
 * @since 180326
 * @author TACKSU
 */
var TABLE_NAME = 'TCDA_CERT_SHR';
export default {
    put: 'INSERT INTO ' + TABLE_NAME + ' SET ?',
    get: 'SELECT * FROM ' + TABLE_NAME + ' WHERE ?',
    set: 'UPDATE ' + TABLE_NAME + ' SET ? WHERE ?',
    del: 'UPDATE ' + TABLE_NAME + 'SET DELETE_YN = \'Y\' WHERE ?'
}