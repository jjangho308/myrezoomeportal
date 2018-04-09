/**
 * Prepared query set for CertsDao. <br />
 * 
 * @since 180326
 * @author TACKSU
 */
var CERT_TABLE = 'rezoome_db.TCDA_USR_CERT';
var SHARED_CERT_TABLE = 'rezoome_db.TCDA_CERT_SHR';
export default {
    issueCert: 'INSERT INTO ' + CERT_TABLE + ' SET ?',
    getCert : 'SELECT * FROM ' + CERT_TABLE + ' WHERE ?',
    setCert : 'UPDATE ' + CERT_TABLE + ' SET ? WHERE ?',
    put: 'INSERT INTO ' + SHARED_CERT_TABLE + ' SET ?',
    get: 'SELECT * FROM ' + SHARED_CERT_TABLE + ' WHERE ?',
    set: 'UPDATE ' + SHARED_CERT_TABLE + ' SET ? WHERE ?',
    del: 'UPDATE ' + SHARED_CERT_TABLE + " SET DEL_YN = 'Y' WHERE ?"
}