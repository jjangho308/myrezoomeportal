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
                cb(err);
            } else {
                connection.query(query, (err, result) => {
                    connection.release();

                    //console.log(err);
                    //console.log(result);
                    cb(err, result);
                })
            }
        });
    }
}

export default AbstractDAO;