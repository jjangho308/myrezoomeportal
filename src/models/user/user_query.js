/**
 * Query statements for User. <br />
 * 
 * @since 180302
 * @author TACKSU
 */
export default {
    getById: 'SELECT * FROM TCUP_USR where S_USR_ID = ?',

    getByEmail: 'SELECT * FROM TCUP_USR WHERE EMAIL = ?;',

    count: 'SELECT COUNT(*) TCUP_USR WHERE EMAIL = ?;',

    put: 'INSERT INTO TCUP_USR SET ?',

    setById: 'UPDATE TCUP_USR SET ? where S_USR_ID = ?',

    setByEmail: 'UPDATE TCUP_USR SET ? where EMAIL = ?',
    
    del: ''
}