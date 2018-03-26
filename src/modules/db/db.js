import mysql from 'mysql';

import Managers from "../../core/managers";
import Property from "../property/property";

import AbstractManager from '../abstract_manager';

import UserDao from '../../models/user/user_dao';
import OrgDao from '../../models/org/org_dao';
import CertDao from '../../models/cert/cert_dao'
import ResumeDao from '../../models/resume/resume_dao';

/**
 * Data accessor. <br />
 * 
 * @since 180228
 */
class DataManager extends AbstractManager {

    constructor(opt) {
        super(opt);
    }

    /*
    example
    var dbConfig = {
        host :db_config.host,
        port : db_config.port,
        user : db_config.user,
        password : db_config.password,
        database:db_config.database
    }
    */
    init() {
        var propertyManager = Managers.property();

        this.connectionPool = mysql.createPool({
            host: propertyManager.get(Property.MySQL_HOST),
            port: propertyManager.get(Property.MySQL_PORT),
            user: propertyManager.get(Property.MySQL_ID),
            password: propertyManager.get(Property.MySQL_PW),
            database: propertyManager.get(Property.MySQL_DATABASE)
        });

        this.connectionPool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
                throw err;
            } else {
                /*
                connection.query("select * from TBL_USER", function(err, rows){
                if(err) {
                    throw err;
                } else {              
                    var response = {};
                    response.code = '200';
                    response.err = '';
                    res.send(response);
                }
                });
                */
                //connection.release();
            }
        });
    }

    getUserInfo(userid, cb) {
        var userDao = new UserDao(this.connectionPool);
        userDao.get(userid, function (res) {
            cb(res);
        });
    }

    getOrgInfo(orgcodes, cb) {
        var orgDao1 = new OrgDao(this.connectionPool);
        orgDao1.get(orgcodes, function (res) {
            cb(res);
        });
    }

    getOrgAllInfo(cb) {

        var orgDao1 = new OrgDao(this.connectionPool);
        orgDao1.getall(function (res) {
            cb(res);
        });
    }

    getUserDao() {
        return new UserDao(this.connectionPool);
    }

    getOrgDao() {
        return new OrgDao(this.connectionPool);
    }

    getCertDao() {
        return new CertDao(this.connectionPool);
    }

    getResumeDao() {
        return new ResumesDao(this.connectionPool);
    }

    getRecordDao() {
        return new RecordDao(this.connectionPool);
    }
}

export default DataManager;