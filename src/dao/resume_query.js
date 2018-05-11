var TABLE_NAME = 'TCDA_USR_RSM';
var RESUME_DATA_TABLE_NAME = 'TCDA_RSM_DATA';
var SHARED_INFO_TABLE_NAME = 'TCDA_RSM_SHR_INFO';

/**
 * Prepared query for ResumeDAO. <br />
 * 
 * @since 180326
 * @author TACKSU
 */
export default {
    put: 'INSERT INTO ' + TABLE_NAME + ' SET ?',
    get: 'SELECT * FROM ' + TABLE_NAME + ' WHERE ',
    set: 'UPDATE ' + TABLE_NAME + ' SET ? WHERE ?',
    delResume: "UPDATE " + TABLE_NAME + " SET DEL_YN = 'Y' WHERE ?",
    putResumeRecords: 'INSERT INTO ' + RESUME_DATA_TABLE_NAME + ' SET ?',
    getResumeRecords: 'SELECT * FROM ' + RESUME_DATA_TABLE_NAME + ' WHERE ? ',
    setResumeRecords: 'UPDATE ' + RESUME_DATA_TABLE_NAME + ' SET ? WHERE ?',
    delResumeRecords: "UPDATE " + RESUME_DATA_TABLE_NAME + " SET DEL_YN = 'Y' WHERE ? and ?",
    putUrl: 'INSERT INTO ' + SHARED_INFO_TABLE_NAME + ' SET ?',
    getUrl: 'SELECT * FROM ' + SHARED_INFO_TABLE_NAME + ' WHERE ? and ?',
    setUrl: 'UPDATE ' + SHARED_INFO_TABLE_NAME + ' SET ? WHERE ?',
    delUrl: 'UPDATE ' + SHARED_INFO_TABLE_NAME + " SET DEL_YN = 'Y' WHERE ? and ?"
}