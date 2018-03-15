//import AbstractDAO from 'abstract_dao.js'
import userQuery from './user_query.js';
import UserModel from './user';

/**
 * DAO for user. <br />
 * 
 * @since 180302
 * @author TACKSU
 */

class UserDao {

    constructor(connectionPool) {
        this.connectionPool = connectionPool;
    }

    put(user, cb) {

    }

    get(userid, cb) {

        var param = [userid];

        this.connectionPool.getConnection(function (err, connection) {
            if (err) {
                throw err;
            } else {
                connection.query(userQuery.get, param, function (err, rows) {
                    if (err) {
                        throw err;
                    } else {
                        var result = null;
                        
                        for (var i in rows) {
                            result = new UserModel(rows[i]);
                        }
                        connection.release();
                        cb(result);
                    }
                });
            }
        });
    }

    set(opt, user, cb) {

    }

    del(opt, cb) {

    }

    delall(opt, cb) {

    }
}

export default UserDao;