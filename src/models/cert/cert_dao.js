import Env from '../../core/environment';

import CertsQuery from './certs_query';
import AbstractDAO from '../abstract_dao';

import CertModel from './cert';
import Util from '../../util/util';

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
        if (Env.developement()) {
            var current = new Date(Date.now());
            var nextYear = new Date(current.getTime() + (60 * 60 * 24 * 356)*1000);

            var certModels = [
                new CertModel({
                    certId: Util.uuid(),
                    date: current,
                    exp: nextYear,
                    txid: Util.uuid(),
                    issued: Util.uuid()
                }),
                new CertModel({
                    certId: Util.uuid(),
                    date: current,
                    exp: nextYear,
                    txid: Util.uuid(),
                    issued: Util.uuid()
                })
            ];
            cb(null, certModels)
        } else if (Env.prouction()) {
            var userId = creteria.userId;
            var certId = creteria.certId;

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
    }

    set(certId, cert, cb) {

    }

    del(certId, cb) {

    }
}

export default CertificateDAO;