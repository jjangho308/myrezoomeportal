import Env from '../../core/environment';

import AbstractDAO from "../abstract_dao";
import ResumeModel from './resume';

import Query from './resume_query';

import Util from '../../util/util';

/**
 * DAO of resume. <br />
 * 
 * @since 180323
 * @author TACKSU
 */
class ResumeDao extends AbstractDAO {

    /**
     * Default constructor. <br />
     * 
     * @since 180330
     * @author TACKSU
     * 
     * @param {MySqlConnectionPool} connectionPool 
     */
    constructor(connectionPool) {
        super(connectionPool);
    }

    /**
     * Create new Resume entity. <br />
     * 
     * @since 180323
     * @author TACKSU
     * 
     * @param {*} resume Resume entity
     * @param {function(err, result)} cb Callback
     */
    put(resume, cb) {
        var resumeRow = resume.toRow();

        this.connectionPool.query(Query.put, resumeRow, (err, result) => {
            if (!!err) {
                cb(err);
            } else {
                cb(err, result.insertId);
            }
        })
    }

    get(creteria, cb) {
        var userId = null;
        var resumeId = null;
        userId = creteria.userId;
        resumeId = creteria.resumeId;

        this.connectionPool.query(Query.get)
    }

    set(resumeid, resume, cb) {

    }

    del(resumeid, cb) {

    }
}

export default ResumeDao;