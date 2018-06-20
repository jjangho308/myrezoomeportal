var ErrorCode = require('../core/error/error_code');
var ResponseError = require('../core/error/response_error');

/**
 * Abstraction of DAO. <br />
 * 
 * @since 180313
 * @author TACKSU
 */
class AbstractDAO {
    /**
     * Default constructor. <br />
     * 
     * @since 180313
     * @author TACKSU
     * 
     * @param {MysqlConnectionPool} connectionPool 
     */
    constructor(connectionPool) {
        this.connectionPool = connectionPool;
    }


    /**
     * Query delegator for connection-release pattern. <br />
     * 
     * @since 180330
     * @author TACKSU
     * 
     * @param {string} query Query string.
     * @param {function(object, object)} cb Callback
     */
    query(query, cb) {
        this.connectionPool.getConnection((err, connection) => {
            if (!!err) {
                console.error(err.stack);
                return cb(new ResponseError({
                    code: ErrorCode.INTERNAL_DB,
                    cause: err,
                }));
            } else {
                connection.query(query, (err, result) => {
                    connection.release();
                    if (!!err) {
                        console.error(err.stack);
                        return cb(new ResponseError({
                            code: ErrorCode.INTERNAL_DB,
                            cause: err,
                            info: err.sql,
                        }));
                    }
                    return cb(null, result);
                });
            }
        });
    }
}

module.exports = AbstractDAO;