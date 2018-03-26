//import AbstractDAO from 'abstract_dao.js'
import userQuery from './user_query.js';
import UserModel from './user';

import Env from '../../core/environment';

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

    get(creteria, cb) {

        var param = [creteria.userid];

        if (Env.developement()) {
            var userSuji = new UserModel({
                userid: 12345,
                birth: new Date('1993-10-19'),
                firstName: '수지',
                lastName: '이',
                gender: 1,
                phone: '010-0000-2222',
                email: 'asdfasdf@asdf.com',
                imgsrc: 'kjk.com/rse'
            })
            cb(null, userSuji);
        } else if (Env.prouction()) {
            this.connectionPool.query(userQuery.get, param, function (err, rows) {
                if (err) {
                    cb(err, null);
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
    }

    set(opt, user, cb) {

    }

    del(opt, cb) {

    }
}

export default UserDao;