//import AbstractDAO from 'abstract_dao.js'
import userQuery from './user_query.js';

/**
 * DAO for user. <br />
 * 
 * @since 180302
 * @author TACKSU
*/

class UserDao {
  
    constructor(connection){
        this.connection = connection;
    }

    put(user, cb){

    }

    get(userid, cb){

        var param = [userid];

        this.connection.query(userQuery.get, param,function(err, rows){
            if(err) {
                throw err;
            } else {              
                var response = {};
                response.code = '200';
                response.err = '';
                //res.send(response);
                cb(rows);
            }
        });
    }

    set(opt, user, cb){
        
    }

    del(opt, cb){

    }

    delall(opt, cb){

    }
}

export default UserDao;