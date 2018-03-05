import AbstractDAO from 'abstract_dao.js'
import query from 'user_query.js';

/**
 * DAO for user. <br />
 * 
 * @since 180302
 * @author TACKSU
*/
class UserDao extends AbstractDAO{
    constructor(connection){
        this.connection = connection;
    }

    put(user, cb){

    }

    get(opt, cb){

    }

    set(opt, user, cb){
        
    }

    del(opt, cb){

    }

    delall(opt, cb){

    }
}