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
                cb(err);
            } else {
                connection.query(query, (err, result) => {
                    connection.release();
                    if (!!err) {
                        console.error(err.stack);
                    }
                    cb(err, result);
                });
            }
        });
    }
}

export default AbstractDAO;