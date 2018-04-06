/**
 * Query statements for Org. <br />
 * 
 * @since 180306
 * @author KWANGWOOK
 */
var TABLE_NAME = 'TCUP_ORG';
export default {
    get : "SELECT * FROM " + TABLE_NAME + " WHERE ?",
    getSubIdsByOrgId : "SELECT * FROM rezoome_db.TCCO_ORG_SUB WHERE ORG_ID = ?",
    
    
    getByCodes : "SELECT ORG_QUEUE_NAME FROM TBL_ORG WHERE ORG_CD IN ( %s )",
    //findAll : "SELECT a.ORG_ID, b.SUB_ID from rezoome_db.TCUP_ORG a, rezoome_db.TCCO_ORG_SUB b where a.ORG_ID=b.ORG_ID",
    findAll : "SELECT ORG_ID from rezoome_db.TCUP_ORG",
    put : '',
    set : '',
    del : ''
}