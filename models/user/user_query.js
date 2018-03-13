/**
 * Query statements for User. <br />
 * 
 * @since 180302
 * @author TACKSU
 */
let TABLE_NAME = 'TBL_USER'
export default {
    get : 'select * from TBL_USER where user_id = ?',
    put : '',
    set : '',
    del : '',
    findAll : 'select * from TBL_USER'
}