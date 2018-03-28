import mysql from 'mysql';

import Env from '../../core/environment';

import CertQuery from './cert_query';
import Abstractdao from '../abstract_dao';

import CertModel from './cert';
import Util from '../../util/util';

/**
 * dao for certificate entity. <br />
 * 
 * @since 180323
 * @author TACKSU
 */
class CertificateDAO extends Abstractdao {
    /**
     * Default constructor. <br />
     * 
     * @param {MySqlConnectionPool} connectionPool 
     */
    constructor(connectionPool) {
        super(connectionPool);
    }

    /**
     * Insert a new Certificate entity to database. <br />
     * 
     * @since 180326
     * @author TACKSU
     * 
     * @param {CertModel} certModel 
     * @param {function(object, number)} cb 
     */
    put(certModel, cb) {
        var param = certModel.toRow();

        delete param.S_CERT_SHR_ID;
        delete param.CRTD_DT;
        delete param.MDFID_DT;

        // var query = mysql.format(CertQuery.put, param);
        var query = "INSERT INTO TCDA_CERT_SHR (`CERT_ID`, `UID`, `ENC_CERT_DATA`, `DEL_YN`) VALUES ('45748487-6720-4061-9bed-98c9401fc7d3', 30, 'ca75e6a7-9220-4cff-adcd-1e0ef0fbbe62', 'N');"
        this.connectionPool.query(query, (err, result) => {
            if (!!err) {
                cb(err);
            } else if (!!result) {
                cb(err, result.insertId);
            }
        })
    }

    /**
     * Search certificate entry from Table. <br />
     * 
     * @since 180328
     * @author TACKSU
     * 
     * @param {*} creteria 
     * @param {*} cb 
     */
    get(creteria, cb) {
        if (Env.developement()) {
            var current = new Date(Date.now());
            var nextYear = new Date(current.getTime() + (60 * 60 * 24 * 356) * 1000);

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
                this.connectionPool.query(CertQuery.getByUserID, [userId], (err, result) => {
                    if (!!err) {
                        cb(err, null);
                    } else {
                        cb(null, result);
                    }
                });
            } else if (!!certId) {
                this.connectionPool.query(CertQuery.getByCertId, [certId], (err, result) => {
                    if (!!err) {
                        cb(err, null);
                    } else {

                        cb(null, result);
                    }
                })
            }
        }
    }

    set(certId, certModel, cb) {

    }

    del(certId, cb) {

    }
}

export default CertificateDAO;