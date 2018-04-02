/**
 * Query statements for Org. <br />
 * 
 * @since 180306
 * @author KWANGWOOK
 */
var TABLE_NAME = 'TCUP_ORG';
export default {
    get : "SELECT * FROM " + TABLE_NAME + " WHERE ?",
    getByCodes : "SELECT ORG_QUEUE_NAME FROM TBL_ORG WHERE ORG_CD IN ( %s )",
    findAll : "SELECT ORG_QUEUE_NAME FROM TBL_ORG",
    put : '',
    set : '',
    del : ''
}