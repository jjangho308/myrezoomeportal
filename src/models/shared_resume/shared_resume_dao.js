import mysql from 'mysql';
import SharedResumeModel from './shared_resume';
import AbstractDAO from '../abstract_dao';
import userQuery from './shared_resume_query';

/**
 * DAO for shared resume entity. <br />
 * 
 * @since 180329
 * @author JJANGHO
 */
class SharedResumeDAO extends AbstractDAO {
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
    put(sharedResume, cb) {
        var params = SharedResumeModel.toRow(sharedResume);
        this.connectionPool.query(userQuery.put, params, (err, result)=>{
            if(!!err){
                cb(err);
            }else if(!!result){
                cb(err, result);
            }
        })
    }

    get(sharedResume, cb) {
        var where = null;
        var sql = null;
        if(!!sharedResume.suid){
            where = [sharedResume.suid];
            sql = userQuery.getById;
        }

        this.connectionPool.query(sql, where, function(err,rows){
            if(!!err){
                cb(err);
            }else{
                var result = [];
                
                for(var i in rows){
                    var entry = SharedResumeModel.fromRow(rows[i]);
                    console.log(entry);
                    result.push(entry);
                }
                
                cb(err, result);
            }
        })

    }

    del(sharedResumeId, cb) {

    }

    search(opt, cb) {
        var resumeId = opt.resumeId;
        var url = opt.url;

        // ResumeID나 URL 둘 중 하나로 검색해서 callback;
    }
}

export default SharedResumeDAO;