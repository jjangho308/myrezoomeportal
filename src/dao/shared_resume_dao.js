var mysql = require('mysql');
var SharedResumeModel = require('./shared_resume');
var AbstractDAO = require('../abstract_dao');
var sharedQuery = require('./shared_resume_query');

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
        var query = mysql.format(sharedQuery.put, params);
        this.query(query, (err, result) => {
            if (!!err) {
                cb(err);
            } else if (!!result) {
                cb(err, result);

            }
        })
    }

    /**
     * Select shared resume entity from datbase. <br />
     * 
     * @param {*} sharedResume 
     * @param {*} cb 
     */
    get(sharedResume, cb) {
        var where = null;
        var sql = null;
        if (!!sharedResume.suid) {
            where = [sharedResume.suid];
            sql = sharedQuery.getById;
        }

        var query = mysql.format(sql, where);
        this.query(query, function (err, rows) {
            if (!!err) {
                cb(err);
            } else {
                var result = [];

                for (var i in rows) {
                    var entry = SharedResumeModel.fromRow(rows[i]);
                    console.log(entry);
                    result.push(entry);
                }

                cb(err, result);
            }
        })

    }

    /**
     * Update specific shared resume model by given creteria. <br />
     * 
     * @param {*} criteria 
     * @param {*} sharedResume 
     * @param {*} cb 
     */
    set(criteria, sharedResume, cb) {
        var where = null;
        var sql = null;
        if (!!criteria.suid) {
            sql = sharedQuery.setById;
            where = [criteria.suid];
        }
        var params = SharedResumeModel.toRow(sharedResume);

        var query = mysql.format(sql, [params, where]);
        this.query(query, (err, result) => {
            cb(err, result.affectedRows);
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

module.exports = SharedResumeDAO;