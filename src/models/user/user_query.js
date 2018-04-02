/**
 * Query statements for User. <br />
 * 
 * @since 180302
 * @author TACKSU
 */
var TABLE_NAME = 'TCUP_USR'
export default {
    get: 'SELECT * FROM ' + TABLE_NAME + ' WHERE ?',
    getById: 'SELECT * FROM TCUP_USR where S_USR_ID = ?',
    
    getByUId: 'SELECT * FROM TCUP_USR where UID = ?',

    getByEmail: 'SELECT * FROM TCUP_USR WHERE EMAIL = ?;',

    count: 'SELECT COUNT(*) TCUP_USR WHERE EMAIL = ?;',

    put: 'INSERT INTO TCUP_USR SET ?',
    set: 'UPDATE ' + TABLE_NAME + ' SET ? WHERE ?',

    setById: 'UPDATE TCUP_USR SET ? where S_USR_ID = ?',

    setByEmail: 'UPDATE TCUP_USR SET ? where EMAIL = ?',

    del: ''
}