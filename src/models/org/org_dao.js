//import AbstractDAO from 'abstract_dao.js';
import orgQuery from './org_query.js';
import util from 'util';
import OrgModel from './org';

/**
 * DAO for org. <br />
 * 
 * @since 180306
 * @author KWANGWOOK
 */
class OrgDao {
    constructor(connectionPool) {
        this.connectionPool = connectionPool;
    }

    put(org, cb) {

    }

    /**
     * Get multiple OrgModel by orgcodes. <br />
     * 
     * @since 180313
     * 
     * @param {string} orgcode Specific orgcode.
     * @param {function(err:Error, result:OrgModel[])} cb Callback.
     */
    getByCodes(orgcodes, cb) {

        var makequery = util.format(orgQuery.getByCodes, orgcodes);

        this.connectionPool.query(makequery, function (err, rows) {
            if (err) {
                cb(err, null);
            } else {
                var result = [];
                for (var i in rows) {
                    result.push(new OrgModel(rows[i]));
                }
                cb(null, result);
            }
        });
    }

    findAll(cb) {

        var makequery = util.format(orgQuery.findAll);

        this.connectionPool.query(makequery, function (err, rows) {
            if (err) {
                cb(err);
            } else {
                var result = [];
                console.log(rows);
                for (var i in rows) {
                    result.push(new OrgModel(rows[i]));
                }
                cb(result);
            }
        });
    }

    set(opt, user, cb) {

    }

    del(opt, cb) {

    }

    delall(opt, cb) {

    }
}

export default OrgDao;