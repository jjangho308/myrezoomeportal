/**
 * Query statements for Org. <br />
 * 
 * @since 180306
 * @author KWANGWOOK
 */
export default {
    get : "SELECT ORG_QUEUE_NAME FROM TBL_ORG WHERE ORG_CD IN ( %s )",
    put : '',
    set : '',
    del : ''
}