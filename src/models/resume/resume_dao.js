import Env from '../../core/environment';

import AbstractDAO from "../abstract_dao";
import Resume from './resume';

import Query from './resume_query';

import Util from '../../util/util';

/**
 * DAO of resume. <br />
 * 
 * @since 180323
 * @author TACKSU
 */
class ResumeDao extends AbstractDAO {

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

    }

    get(creteria, cb) {
        var userId = null;
        var resumeId = null;
        if (Env.developement()) {
            userId = creteria.userId;
            var resumeModels = [new Resume({
                rsmId: Util.uuid(),
                title: '마인 이력서',
                status: 0,
                records: [{
                        txid: Util.uuid()
                    },
                    {
                        txid: Util.uuid()
                    }
                ]
            })];

            cb(null, resumeModels);
        } else if (Env.prouction()) {
            userId = creteria.userId;
            resumeId = creteria.resumeId;

            this.connectionPool.query(Query.get)
        }
    }

    set(resumeid, resume, cb) {

    }

    del(resumeid, cb) {

    }
}

export default ResumeDao;