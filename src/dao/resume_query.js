var TABLE_NAME = 'TCDA_USR_RSM';
var SHARED_TABLE_NAME = 'TCDA_RSM_SHR';
var SHARED_INFO_TABLE_NAME = 'TCDA_RSM_SHR_INFO';

/**
 * Prepared query for ResumeDAO. <br />
 * 
 * @since 180326
 * @author TACKSU
 */
export default {
    put: 'INSERT INTO ' + TABLE_NAME + ' SET ?',
    get: 'SELECT * FROM ' + TABLE_NAME + ' WHERE ?',
    set: 'UPDATE ' + TABLE_NAME + ' SET ? WHERE ?',
    del: "UPDATE " + TABLE_NAME + " SET DEL_YN = 'Y' WHERE ?",
    putShare: 'INSERT INTO ' + SHARED_TABLE_NAME + ' SET ?',
    getShare: 'SELECT * FROM ' + SHARED_TABLE_NAME + ' WHERE ? ',
    setShare: 'UPDATE ' + SHARED_TABLE_NAME + ' SET ? WHERE ?',
    delShare: "UPDATE " + SHARED_TABLE_NAME + " SET DEL_YN = 'Y' WHERE ?",
    putUrl: 'INSERT INTO ' + SHARED_INFO_TABLE_NAME + ' SET ?',
    getUrl: 'SELECT * FROM ' + SHARED_INFO_TABLE_NAME + ' WHERE ?',
    setUrl: 'UPDATE ' + SHARED_INFO_TABLE_NAME + ' SET ? WHERE ?',
    delUrl: 'UPDATE ' + SHARED_INFO_TABLE_NAME + " SET DEL_YN = 'Y' WHERE ?"
}