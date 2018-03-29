import mysql from 'mysql';

import Managers from "../../core/managers";
import Property from "../property/property";

import AbstractManager from '../abstract_manager';

import UserDAO from '../../models/user/user_dao';
import OrgDAO from '../../models/org/org_DAO';
import RecordDAO from '../../models/record/record_DAO';
import CertDAO from '../../models/cert/cert_DAO'
import ResumeDAO from '../../models/resume/resume_DAO';
import SharedCertDAO from '../../models/shared_cert/shared_cert_dao';

import Env from '../../core/environment';

/**
 * Database manager. <br />
 * 
 * @since 180228
 */
class DatabaseManager extends AbstractManager {

    /**
     * Default constructor. <br />
     * 
     * @param {*} opt 
     */
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
                connection.release();
            }
        });
    }

    getUserInfo(userid, cb) {
        var userDAO = new UserDAO(this.connectionPool);
        userDAO.get(userid, function (res) {
            cb(res);
        });
    }

    getOrgInfo(orgcodes, cb) {
        var orgDAO1 = new OrgDAO(this.connectionPool);
        orgDAO1.get(orgcodes, function (res) {
            cb(res);
        });
    }

    getOrgAllInfo(cb) {
        var orgDAO1 = new OrgDAO(this.connectionPool);
        orgDAO1.getall(function (res) {
            cb(res);
        });
    }

    getUserDAO() {
        return new UserDAO(this.connectionPool);
    }

<<<<<<< HEAD
=======
    getSharedCertDAO(){
        return new SharedCertDAO(this.connectionPool);
    }

    getOrgDAO() {
        return new OrgDAO(this.connectionPool);
    }

>>>>>>> b1d1b719085e3b12201c7a080fb7ac5f3d8fe9b6
    getCertDAO() {
        return new CertDAO(this.connectionPool);
    }

    getOrgDAO() {
        return new OrgDAO(this.connectionPool);
    }

    /**
     * Obtain ResumeDAO. <br />
     */
    getResumeDAO() {
        return new ResumeDAO(this.connectionPool);
    }

    /**
     * Obtain RecordDAO. <br />
     */
    getRecordDAO() {
        return new RecordDAO(this.connectionPool);
    }


    /**
     * Disconnect all connection and close session. <br />
     * 
     * @since 180328
     * @author TACKSU
     * 
     * @param {*} cb 
     */
    end(cb) {
        this.connectionPool.end(cb);
    }
}

export default DatabaseManager;