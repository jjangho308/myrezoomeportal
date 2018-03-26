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
}

export default AbstractDAO;