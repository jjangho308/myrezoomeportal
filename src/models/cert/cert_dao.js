import CertsQuery from './certs_query';

/**
 * DAO for certificate entity. <br />
 * 
 * @since 180323
 * @author TACKSU
 */
class CertificateDAO extends AbstractDAO {
    constructor(connectionPool) {
        super(connectionPool);
    }

    put(cert, cb) {

        this.connectionPool.query(CertsQuery.put, (err, result) => {

        })
    }

    get(creteria, cb) {
        var userId = creteria.userid;
        var certId = creteria.certid;

        if (!!userId) {
            this.connectionPool.query(CertsQuery.getByUserID, [userId], (err, result) => {
                if (!!err) {
                    cb(err, null);
                } else {
                    cb(null, result);
                }
            });
        } else if (!!certId) {
            this.connectionPool.query(CertsQuery.getByCertId, [certId], (err, result) => {
                if (!!err) {
                    cb(err, null);
                } else {
                    
                    cb(null, result);
                }
            })
        }
    }

    set(certId, cert, cb) {

    }

    del(certId, cb) {

    }
}