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
    
    //getCertList와 중복되는 처리 같음..
    getCert: 'SELECT * FROM ' + CERT_TABLE + ' WHERE ?',
    
    setCert: 'UPDATE ' + CERT_TABLE + ' SET ? WHERE ?',
    
    //del_yn 처리 필요 없음 => ui에 del_yn이 Y가 나올리가 없음. 처리 필요 없음.
    delCert: 'UPDATE ' + CERT_TABLE +  " SET DEL_YN = 'Y' WHERE ?",
    
    //del_yn 처리 필요 없음
    putShared: 'INSERT INTO ' + SHARED_CERT_TABLE + ' SET ?',
    
    // del_yn 처리 완료
    getShared: 'SELECT * FROM ' + SHARED_CERT_TABLE + ' WHERE ? and ?',
    
    //del_yn 처리 필요 없는것같음(검토필요)
    setShared: 'UPDATE ' + SHARED_CERT_TABLE + ' SET ? WHERE ?',
    
    //완료 del_yn
    delShared: 'UPDATE ' + SHARED_CERT_TABLE + " SET DEL_YN = 'Y' WHERE ? and ?",

    
    
    putUrl: 'INSERT INTO ' + SHARED_URL_TABLE + ' SET ?',
    
    //완료 del_yn
    getUrl: 'SELECT * FROM ' + SHARED_URL_TABLE + ' WHERE ? and ?',

    //-> 애초에 del_yn가 y인 cert가 set될 수 없다
    setUrl: 'UPDATE ' + SHARED_URL_TABLE + ' SET ? WHERE ?',
    
    //완료 del_yn
    delUrl: 'UPDATE ' + SHARED_URL_TABLE+ " SET DEL_YN = 'Y' WHERE ? and ?",

    getSubName: 'SELECT * FROM rezoome_db.TCCO_SUB',
    
    //완료 del_yn
    getCertList : 'SELECT TCD.CERT_ID, TCD.UID, TCD.SHRD_YN, TBM.BLC_MAP_ID, TBM.TRX_ID, TCD.CRTD_DT, TS.SUB_ID, TS.SUB_CD, TS.SUB_NM FROM rezoome_db.TCDA_CERT_DATA AS TCD INNER JOIN TCDA_BLC_MAP AS TBM ON (TBM.TRX_ID = TCD.TRX_ID) INNER JOIN TCCO_SUB AS TS ON (TBM.SUB_ID = TS.SUB_ID) WHERE '
}