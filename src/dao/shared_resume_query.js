/**
 * Query statements for resume. <br />
 * 
 * @since 180329
 * @author JJANGHO
 */
export default {
    getById: 'SELECT * FROM TCDA_RSM_SHR_INFO where S_RSM_SHR_INFO_ID = ?',

    count: 'SELECT COUNT(*) TCDA_RSM_SHR_INFO WHERE EMAIL = ?;',

    put: 'INSERT INTO TCDA_RSM_SHR_INFO SET ?',

    setById: 'UPDATE TCDA_RSM_SHR_INFO SET ? where S_RSM_SHR_INFO_ID = ?',

    del: ''
}