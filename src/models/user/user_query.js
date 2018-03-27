/**
 * Query statements for User. <br />
 * 
 * @since 180302
 * @author TACKSU
 */
export default {
    getById: 'SELECT * FROM TCUP_USR where S_USR_ID = ?',
    count: 'SELECT COUNT(*) TCUP_USR WHERE EMAIL = ?;',
    getByEmail: 'SELECT * FROM TCUP_USR WHERE EMAIL = ?;',
    put: 'INSERT INTO TCUP_USR SET ?',
    set: '',
    del: '',
    findAll: 'select * from TBL_USER'
}