//import AbstractDAO from 'abstract_dao.js';
import orgQuery from './org_query.js';
import util from 'util';

/**
 * DAO for org. <br />
 * 
 * @since 180306
 * @author KWANGWOOK
*/
class OrgDao {
    constructor(connection){
        this.connection = connection;
    }

    put(user, cb){

    }

    get(orgcodes, cb){

        var makequery = util.format(orgQuery.get, orgcodes);

        this.connection.query(makequery, function(err, rows){
            if(err) {
                throw err;
            } else {              
                var response = {};
                response.code = '200';
                response.err = '';
                //res.send(response);
                cb(rows);
            }
        });
    }

    getall(cb){

        var makequery = util.format(orgQuery.getall);

        this.connection.query(makequery, function(err, rows){
            if(err) {
                throw err;
            } else {              
                var response = {};
                response.code = '200';
                response.err = '';
                //res.send(response);
                cb(rows);
            }
        });
    }

    set(opt, user, cb){
        
    }

    del(opt, cb){

    }

    delall(opt, cb){

    }
}

export default OrgDao;