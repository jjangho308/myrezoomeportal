import mysql from 'mysql';

import Env from '../../core/environment';

import CertQuery from './cert_query';
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

        // var query = "INSERT INTO TCDA_CERT_SHR (`CERT_ID`, `UID`, `ENC_CERT_DATA`, `DEL_YN`) VALUES ('45748487-6720-4061-9bed-98c9401fc7d3', 30, 'ca75e6a7-9220-4cff-adcd-1e0ef0fbbe62', 'N');"
        // var query = mysql.format(CertQuery.put, param);
        this.connectionPool.query(CertQuery.put, param, (err, result) => {
            if (!!err) {
                cb(err);
            } else if (!!result) {
                cb(err, result.insertId);
            }
        });
    }

    /**
     * Search certificate entry from Table. <br />
     * 
     * @since 180328
     * @author TACKSU
     * 
     * @param {*} creteria {
     *      uid : User ID,
     *      certId : Certificate ID
     * }
     * @param {*} cb 
     */
    get(creteria, cb) {
        var condition = {};
        if (!!creteria.uId) {
            condition.UID = creteria.uId;
        }

        if (!!creteria.certId) {
            delete condition.UID;
            condition.CERT_ID = creteria.certId;
        }

        if (!!creteria.sId) {
            condition.S_CERT_SHR_ID = creteria.sId;
        }

        var query = mysql.format(CertQuery.get, condition);
        this.connectionPool.query(CertQuery.get, condition, (err, rows) => {
            if (!!err) {
                cb(err);
            } else {
                var certList = [];
                for (var i in rows) {
                    certList.push(CertModel.fromRow(rows[i]));
                }
                cb(err, certList);
            }
        });
    }

    /**
     * Update certificate. <br />
     * 
     * @since 180329
     * @author TACKSU
     * 
     * @param {*} creteria 
     * @param {*} certModel 
     * @param {*} cb 
     */
    set(creteria, certModel, cb) {
        var condition = {};
        if (!!creteria.sId) {
            condition.S_CERT_SHR_ID = creteria.sId;
        }

        if (!!creteria.certId) {
            condition.CERT_ID = creteria.certId;
        }

        var query = mysql.format(CertQuery.set, [certModel.toRow(), condition])
        this.connectionPool.query(query, (err, result) => {
            if (!!err) {
                cb(err);
            } else {
                cb(err, result.affectedRows);
            }
        })
    }

    del(certId, cb) {

    }
}

export default CertificateDAO;