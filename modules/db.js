import mysql from 'mysql';
import UserDao from '../models/user/user_dao';
import orgDao from '../models/org/org_dao';
import Managers from "../core/managers";
import Property from "./property";


/**
 * Data accessor. <br />
 * 
 * @since 180228
 */
class DataManager {

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
                connection.release();
            }
        });
    }

    getUserInfo(userid, cb) {
        this.connectionPool.getConnection(function (err, connection) {
            if (err) {
                throw err;
            } else {
                var userDao = new UserDao(connection);
                userDao.get(userid, function (res) {
                    cb(res);
                });
            }
            connection.release();
        });

    }

    getOrgInfo(orgcodes, cb) {
        this.connectionPool.getConnection(function (err, connection) {
            if (err) {
                throw err;
            } else {
                var orgDao1 = new orgDao(connection);
                orgDao1.get(orgcodes, function (res) {
                    cb(res);
                });
            }
            connection.release();
        });
    }

    getOrgAllInfo(cb) {
        this.connectionPool.getConnection(function (err, connection) {
            if (err) {
                throw err;
            } else {
                var orgDao1 = new orgDao(connection);
                orgDao1.getall(function (res) {
                    cb(res);
                });
            }
            connection.release();
        });
    }

    getUserDao(){
        return new UserDao(this.connectionPool);
    }

    getOrgDao(){
        return new OrgDao(this.connectionPool);
    }
}

export default DataManager;