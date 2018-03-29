/**
 * Query statements for User. <br />
 * 
 * @since 180328
 * @author JJANGHO
 */
export default {
    getById: 'SELECT * FROM TCDA_CERT_SHR_INFO where S_CERT_SHR_INFO_ID = ?',

    count: 'SELECT COUNT(*) TCUP_USR WHERE EMAIL = ?;',

    put: 'INSERT INTO TCDA_CERT_SHR_INFO SET ?',

    setById: 'UPDATE TCDA_CERT_SHR_INFO SET ? where S_CERT_SHR_INFO_ID = ?',

    
    del: ''
}