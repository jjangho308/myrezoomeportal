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
        // var params = {
        //     UID: this.connectionPool.escape(userModel.uid),
        //     EMAIL: this.connectionPool.escape(userModel.email),
        //     PWD: this.connectionPool.escape(userModel.pwd),
        //     CI: this.connectionPool.escape(userModel.ci),
        //     E_FMLY_NM: this.connectionPool.escape(userModel.familyNameEN),
        //     E_FRST_NM: this.connectionPool.escape(userModel.firstNameEN),
        //     E_FULL_NM: this.connectionPool.escape(userModel.fullNameEN),
        //     K_FMLY_NM: this.connectionPool.escape(userModel.familyNameKR),
        //     K_FRST_NM: this.connectionPool.escape(userModel.firstNameKR),
        //     K_FULL_NM: this.connectionPool.escape(userModel.fullNameKR),
        //     BRTH_YMD: this.connectionPool.escape(userModel.birth),
        //     GENDER: this.connectionPool.escape(userModel.gender),
        //     PHN_NUM: this.connectionPool.escape(userModel.phone),
        //     CARRIER_NM: this.connectionPool.escape(userModel.carrierName),
        //     MCC: this.connectionPool.escape(userModel.mcc),
        //     CNTY_CD: this.connectionPool.escape(userModel.country),
        //     CNTY_CD_AREA: this.connectionPool.escape(userModel.area)
        // };

        var params = {
            UID: userModel.uid,
            EMAIL: userModel.email,
            PWD: userModel.pwd,
            CI: userModel.ci,
            E_FMLY_NM: userModel.familyNameEN,
            E_FRST_NM: userModel.firstNameEN,
            E_FULL_NM: userModel.fullNameEN,
            K_FMLY_NM: userModel.familyNameKR,
            K_FRST_NM: userModel.firstNameKR,
            K_FULL_NM: userModel.fullNameKR,
            BRTH_YMD: userModel.birth,
            GENDER: userModel.gender,
            PHN_NUM: userModel.phone,
            CARRIER_NM: userModel.carrierName,
            MCC: userModel.mcc,
            CNTY_CD: userModel.country,
            CNTY_CD_AREA: userModel.area
        };

        this.connectionPool.query(userQuery.put, params, (err, result) => {
            if (!!err) {
                cb(err);
            } else if (!!result) {
                cb(err, result.insertId);
            }
        });
    }

    /**
     * Search UserModel from User Table. <br />
     * 
     */
    get(creteria, cb) {
        
        var params = null;
        var sql = null;
        if (!!creteria.suid) {
            params = [creteria.suid];
            sql = userQuery.getById;
        } else if (!!creteria.email) {
            params = [creteria.email];
            sql = userQuery.getByEmail;
        }

        this.connectionPool.query(sql, params, function (err, rows) {
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
        });
    }

    set(opt, user, cb) {

    }

    del(opt, cb) {

    }
}

export default UserDao;