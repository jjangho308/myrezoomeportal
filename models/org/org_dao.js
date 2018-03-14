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
    get(orgcodes, cb) {

        var makequery = util.format(orgQuery.getByCodes, orgcodes);

        this.connectionPool.getConnection((err, connection) => {
            if (err) {
                cb(err);
            } else {
                connection.query(makequery, function (err, rows) {
                    if (err) {
                        cb(err);
                    } else {
                        var result = [];
                        for (var i in rows) {
                            result.push(new OrgModel(rows[i]));
                        }
                        connection.release();
                        cb(null, rows);
                    }
                });
            }
        });
    }

    findAll(query, cb) {

        var makequery = util.format(orgQuery.findAll);

        this.connection.query(makequery, function (err, rows) {
            if (err) {
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

    set(opt, user, cb) {

    }

    del(opt, cb) {

    }

    delall(opt, cb) {

    }
}

export default OrgDao;