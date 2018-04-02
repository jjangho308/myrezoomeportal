/**
 * Prepared query for ResumeDAO. <br />
 * 
 * @since 180326
 * @author TACKSU
 */
var TABLE_NAME = 'TCDA_USR_RSM';
export default {
    put: 'INSERT INTO ' + TABLE_NAME + ' SET ?',
    get: 'SELECT * FROM ' + TABLE_NAME + ' WHERE ?',
    set: 'UPDATE ' + TABLE_NAME + ' SET ? WHERE ?',
    del: "UPDATE " + TABLE_NAME + " SET DEL_YN = 'Y' WHERE ?"
}