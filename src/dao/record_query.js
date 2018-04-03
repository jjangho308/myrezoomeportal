/**
 * Query statements for Record. <br />
 * 
 * @since 180403
 * @author JJANGHO
 */

export default {
    isSignUp : "SELECT * FROM rezoome_db.TCDA_BLC_MAP WHERE `UID` = ?",
    //getQueuenameByOrgId: "SELECT AMQ_NM FROM rezoome_db.TCCO_ORG_SUB a, rezoome_db.TCUP_ORG_INFO b WHERE a.ORG_ID=b.ORG_id and a.SUB_ID = ?",
    getQueuenameByOrgId: "SELECT AMQ_NM FROM rezoome_db.TCUP_ORG_INFO WHERE `ORG_ID` = ?",
    getByCodes : "SELECT ORG_QUEUE_NAME FROM TBL_ORG WHERE ORG_CD IN ( %s )",
    findAll : "SELECT ORG_QUEUE_NAME FROM TBL_ORG",
    put : '',
    set : '',
    del : ''
}