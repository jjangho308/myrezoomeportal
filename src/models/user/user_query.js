/**
 * Query statements for User. <br />
 * 
 * @since 180302
 * @author TACKSU
 */
export default {
    getById: 'select * from TCUP_USR where UID = ?;',
    count: 'SELECT COUNT(*) TCUP_USR WHERE EMAIL = ?;',
    getByEmail: 'SELECT * FROM TCUP_USR WHERE EMAIL = ?;',
    // put: 'INSERT INTO TCUP_USR (UID, EMAIL, PWD, CI, E_FMLY_NM, E_FRST_NM, E_FULLNM, K_FMLY_NM, K_FRST_NM, K_FULL_NM, BRTH_YMD, GENDER, PHN_NUM, CARRIER_NM, MCC, CNTY_CD, CNTY_CD_AREA) ' +
    //                     'VALUES ?',
    put: 'INSERT INTO TCUP_USR SET ?',
    set: '',
    del: '',
    findAll: 'select * from TBL_USER'
}