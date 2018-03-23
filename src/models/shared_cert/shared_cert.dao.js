/**
 * DAO for shared certificate entity. <br />
 * 
 * @since 180323
 * @author TACKSU
 */
class SharedCertDAO extends AbstractDao {
    constructor(connectionPool) {
        super(connectionPool);
        this.connectionPool = connectionPool;
    }
}