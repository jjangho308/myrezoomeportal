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
        this.connectionPool.query(userQuery.put, param, (err, rows) => {

            var userId = null;
            for (var i in rows) {
                userId = rows[i].userid;
            }

            cb(err, userId);
        })
    }

    get(userid, cb) {

        var param = [userid];

        this.connectionPool.query(userQuery.get, param, function (err, rows) {
            if (err) {
                throw err;
            } else {
                var result = null;


                for (var i in rows) {
                    var row = {
                        username: rows[i].LASTNAME + rows[i].FIRSTNAME,
                        birth: rows[i].BIRTH,
                        gender: rows[i].GENDER,
                        phone: rows[i].PHONE,
                        ci: rows[i].CI,
                        email: rows[i].EMAIL
                    }
                    result = new UserModel(row);
                }
                cb(result);
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