import mysql from 'mysql';

import userQuery from './user_query.js';
import UserModel from '../models/user/user';
import AbstractDAO from './abstract_dao.js';

/**
 * DAO for UserModel. <br />
 * 
 * @since 180302
 * @author TACKSU
 */
class UserDao extends AbstractDAO {

    /**
     * Default constructor. <br />
     * 
     * @since 180327
     * @param {MysqlConnectionPool} connectionPool 
     */
    constructor(connectionPool) {
        super(connectionPool);
    }

    /**
     * Put a new UserModel entity to user table. <br />
     * 
     * @since 180322
     * @author TACKSU
     * 
     * @param {UserModel} userModel 
     * @param {Function(err,result)} cb 
     */
    put(userModel, cb) {

        var params = userModel.toRow();

        var query = mysql.format(userQuery.put, params);
        this.query(query, (err, result) => {
            if (!!err) {
                cb(err);
            } else if (!!result) {
                cb(err, result.insertId);
            }
        })
    }

    /**
     * Search specific UserModel by given creteria from User Table. <br />
     * 
     * @since 180327
     * @author TACKSU
     */
    get(creteria, cb) {
        var condition = null;
        var sql = null;

        condition = (new UserModel(creteria)).toRow();

        var query = mysql.format(userQuery.get, condition);
        this.query(query, (err, rows) => {
            if (!!err) {
                cb(err);
            } else {
                var result = [];

                for (var i in rows) {
                    var entry = UserModel.fromRow(rows[i]);
                    result.push(entry);
                }
                cb(err, result);
            }
        })
    }

    /**
     * Update specific UserModel entry by given creteria. <br />
     * 
     * @since 180327
     * @author TACKSU
     * 
     * @param {object} creteria {
     *      suid : primary key number of UserModel,
     *      email : Email address of UserModel
     * }
     * @param {UserModel} userModel 
     * @param {function(object, number)} cb 
     */
    set(creteria, userModel, cb) {
        var condition = new UserModel(creteria).toRow();

        var params = userModel.toRow();

        var query = mysql.format(userQuery.set, [params, condition]);
        this.query(query, (err, result) => {
            if (!!err) {
                cb(err);
            } else {
                cb(err, result.affectedRows);
            }
        })
    }

    setFristYN(userid, cb) {

        var query = mysql.format(userQuery.setFristYN, ["N", userid]);
        this.query(query, (err, result) => {
            if (!!err) {
                cb(err);
            } else {
                cb(err, result.affectedRows);
            }
        })

    }

    /**
     * Delete specific UserModel entry from User Table by given creteria. <br />
     * 
     * @since 180327
     * @author TACKSU
     * 
     * @param {} creteria 
     * @param {function(object, number)} cb 
     */
    del(creteria, cb) {

    }
}

export default UserDao;