import AbstractDAO from "../abstract_dao";

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

    get(resumeid, cb) {

    }

    set(resumeid, resume, cb) {

    }

    del(resumeid, cb) {

    }
}

export default ResumeDao;