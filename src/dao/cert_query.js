/**
 * Prepared query set for CertsDao. <br />
 * 
 * @since 180326
 * @author TACKSU
 */
var CERT_TABLE = 'rezoome_db.TCDA_USR_CERT';
var SHARED_CERT_TABLE = 'rezoome_db.TCDA_CERT_SHR';
var SHARED_URL_TABLE = 'rezoome_db.TCDA_CERT_SHR_INFO';
export default {
    issueCert: 'INSERT INTO ' + CERT_TABLE + ' SET ?',
    getCert: 'SELECT * FROM ' + CERT_TABLE + ' WHERE ?',
    setCert: 'UPDATE ' + CERT_TABLE + ' SET ? WHERE ?',
    detCert: '',
    putShared: 'INSERT INTO ' + SHARED_CERT_TABLE + ' SET ?',
    getShared: 'SELECT * FROM ' + SHARED_CERT_TABLE + ' WHERE ?',
    setShared: 'UPDATE ' + SHARED_CERT_TABLE + ' SET ? WHERE ?',
    delShaed: 'UPDATE ' + SHARED_CERT_TABLE + " SET DEL_YN = 'Y' WHERE ?",

    putUrl: 'INSERT INTO ' + SHARED_URL_TABLE + ' SET ?',
    getUrl: 'SELECT * FROM ' + SHARED_URL_TABLE + ' WHERE ?',
    setUrl: 'UPDATE ' + SHARED_URL_TABLE + ' SET ? WHERE ?',
    delUrl: '',
    getSubName: 'SELECT * FROM rezoome_db.TCCO_SUB'
}