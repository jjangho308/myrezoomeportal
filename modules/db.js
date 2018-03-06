import mysql from 'mysql';
import userDao from '../models/user/user_dao';
import orgDao from '../models/org/org_dao';


/**
 * Data accessor. <br />
 * 
 * @since 180228
*/
class DataManager{
    constructor(dbConfig){
        //super(opt)
        this.init(dbConfig);
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
    init(dbConfig){
        this.pool = mysql.createPool(dbConfig);
        this.pool.getConnection(function(err, connection){
            if(err) {
                throw err;
            } 
            else {
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

    getUserInfo(userid,cb){
        this.pool.getConnection(function(err, connection){
            if(err) {
                throw err;
            } 
            else {
                var userDao1 = new userDao(connection);
                userDao1.get(userid,function(res) {
                    cb(res);                    
                });                
            }
        });  

    }

    getOrgInfo(orgcodes,cb) {
        this.pool.getConnection(function(err, connection){
            if(err) {
                throw err;
            } 
            else {
                var orgDao1 = new orgDao(connection);
                orgDao1.get(orgcodes,function(res) {
                    cb(res);                    
                });                
            }
        });  
    }
}

export default DataManager;