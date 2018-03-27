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
        var params = {
            UID: this.connectionPool.escape(userModel.uid),
            EMAIL: this.connectionPool.escape(userModel.email),
            PWD: this.connectionPool.escape(userModel.pwd),
            CI: this.connectionPool.escape(userModel.ci),
            E_FMLY_NM: this.connectionPool.escape(userModel.familyNameEN),
            E_FRST_NM: this.connectionPool.escape(userModel.firstNameEN),
            E_FULL_NM: this.connectionPool.escape(userModel.fullNameEN),
            K_FMLY_NM: this.connectionPool.escape(userModel.familyNameKR),
            K_FRST_NM: this.connectionPool.escape(userModel.firstNameKR),
            K_FULL_NM: this.connectionPool.escape(userModel.fullNameKR),
            BRTH_YMD: this.connectionPool.escape(userModel.birth),
            GENDER: this.connectionPool.escape(userModel.gender),
            PHN_NUM: this.connectionPool.escape(userModel.phone),
            CARRIER_NM: this.connectionPool.escape(userModel.carrierName),
            MCC: this.connectionPool.escape(userModel.mcc),
            CNTY_CD: this.connectionPool.escape(userModel.country),
            CNTY_CD_AREA: this.connectionPool.escape(userModel.area)
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

        var param = [creteria.uid];

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
                    cb(err);
                } else {
                    var result = [];

                    for (var i in rows) {
                        var entry = new UserModel({
                            suid: rows[i].S_UID,
                            uid: rows[i].UID,
                            email: rows[i].EMAIL,
                            firstNameKR: rows[i].K_FRST_NM,
                            familyNameKR: rows[i].K_FMLY_NM,
                            fullNameKR: rows[i].K_FULL_NM,
                            firstNameEN: rows[i].E_FRST_NM,
                            familyNameEN: rows[i].E_FMLY_NM,
                            fullNameEN: rows[i].E_FULL_NM,
                            birth: rows[i].BRTH_YMD,
                            gender: rows[i].GENDER,
                            country: rows[i].CNTY_CD,
                            area: rows[i].CNTY_CD_AREA,
                            phone: rows[i].PHN_NUM,
                            carrierName: rows[i].CARRIER_NM,
                            mcc: rows[i].MCC,
                            status: rows[i].STS_CD,
                            first: rows[i].FRST_YN,
                            created: rows[i].CRTD_DT,
                            modified: rows[i].MDFID_DT
                        });
                        result.push(entry);
                    }
                    cb(err, result);
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