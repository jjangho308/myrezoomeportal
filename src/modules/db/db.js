import mysql from 'mysql';

import Managers from "../../core/managers";
import Property from "../property/property";

import AbstractManager from '../abstract_manager';

import UserDAO from '../../dao/user_dao';
import OrgDAO from '../../dao/org_dao';
import RecordDAO from '../../dao/record_dao';
import CertDAO from '../../dao/cert_dao'
import ResumeDAO from '../../dao/resume_dao';

// import SharedCertDAO from '../../models/shared_cert/shared_cert_dao';
// import SharedResumeDAO from '../../models/shared_resume/shared_resume_dao';

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
            database: propertyManager.get(Property.MySQL_DATABASE),
            multipleStatements: true,
            connectionLimit: 500,
            waitForConnections: false
        });

        /*
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
                
                //connection.release();
                connection.release();
            }
        });
        */
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

     /**
     * Obtain RecordDAO. <br />
     */
    getRecordDAO() {
        return new RecordDAO(this.connectionPool);
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

    getOrgDAO() {
        return new OrgDAO(this.connectionPool);
    }

    getSharedCertDAO() {
        return new SharedCertDAO(this.connectionPool);
    }
    getSharedResumeDAO() {
        return new SharedResumeDAO(this.connectionPool);
    }



    getCertDAO() {
        return new CertDAO(this.connectionPool);
    }

    /**
     * Obtain ResumeDAO. <br />
     */
    getResumeDAO() {
        return new ResumeDAO(this.connectionPool);
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