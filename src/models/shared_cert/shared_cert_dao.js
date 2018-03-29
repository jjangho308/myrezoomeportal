import mysql from 'mysql';
import SharedCertModel from './shared_cert';
import AbstractDAO from '../abstract_dao';
import userQuery from './shared_cert_query';


/**
 * DAO for shared certificate entity. <br />
 * 
 * @since 180329
 * @author JJANGHO
 */
class SharedCertDAO extends AbstractDAO {
    constructor(connectionPool) {
        super(connectionPool);
    }

     /**
     * Put a new SharedCertDAO entity to user table. <br />
     * 
     * @since 180329
     * @author JJANGHO
     * 
     * @param {sharedCert}  sharedCert
     * @param {Function(err,result)} cb 
     */
    put(sharedCert, cb) {
        var params = SharedCertModel.toRow(sharedCert);

        this.connectionPool.query(userQuery.put, params, (err, result)=>{
            if(!!err){
                cb(err);
            }else if(!!result){
                cb(err, result);
            }
        })
    }

     /**
     * Search specific SharedCertModel by given creteria from shared cert info Table. <br />
     * 
     * @since 180329
     * @author JJANGHO
     */
    get(criteria, cb) {
        var where = null;
        var sql = null;
        if (!!criteria.suid){
            where = [criteria.suid];
            sql = userQuery.getById;
        }

        this.connectionPool.query(sql, where, function (err, rows){
            if(!!err){
                cb(err);
            }else{
                var result = [];
                for(var i in rows){
                    var entry = SharedCertModel.fromRow(rows[i]);
                    result.push(entry);
                }
                cb(err, result);
            }
        })
    }


    /**
     * Update specific SharedCertModel entry by given creteria. <br />
     * 
     * @since 180329
     * @author JJANGHO
     * 
     * @param {object} creteria {
     *      suid : primary key of SharedCertModel,
     *      email : Email address of UserModel
     * }
     * @param {sharedCert} SharedCertModel 
     * @param {function(object, number)} cb 
     */
    set(criteria, sharedCert, cb) {
        var where = null;
        var sql = null;
        if(!!criteria.suid){
            sql = userQuery.setById;
            where = [criteria.suid];
        }
        var params = SharedCertModel.toRow(sharedCert);

        this.connectionPool.query(sql, [params, where], (err, result)=>{
            cb(err, result.affectedRows);
        })
    }

    del(criteria, sharedCert, cb) {

    }
}
export default SharedCertDAO;