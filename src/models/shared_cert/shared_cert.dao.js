/**
 * DAO for shared certificate entity. <br />
 * 
 * @since 180323
 * @author TACKSU
 */
class SharedCertDAO extends AbstractDao {
    constructor(connectionPool) {
        super(connectionPool);
    }

    put(sharedCert, cb) {

    }

    get(criteria, cb) {
        var sharedCertId = criteria.sharedCertId;
        var url = criteria.url;
    }

    set(criteria, sharedCert, cb) {

    }

    del(criteria, sharedCert, cb) {

    }
}