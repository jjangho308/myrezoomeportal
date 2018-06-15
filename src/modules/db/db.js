var mysql = require('mysql');

var Managers = require('../../core/managers');
var Property = require('../property/property');

var AbstractManager = require('../abstract_manager');

var UserDAO = require('../../dao/user_dao');
var OrgDAO = require('../../dao/org_dao');
var RecordDAO = require('../../dao/record_dao');
var CertDAO = require('../../dao/cert_dao');
var ResumeDAO = require('../../dao/resume_dao');

var Env = require('../../core/environment');

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
            connectionLimit: propertyManager.get(Property.MySQL_TIMEOUT),
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
        var orgDAO = new OrgDAO(this.connectionPool);
        orgDAO.get(orgcodes, function (res) {
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

module.exports = DatabaseManager;