var mysql = require('mysql');

var Env = require('../core/environment');

var CertQuery = require('./cert_query');
var AbstractDAO = require('./abstract_dao');

var CertModel = require('../models/cert/cert');
var SharedCertModel = require('../models/cert/shared_cert');
var SharedUrlModel = require('../models/cert/shared_cert_url');
var Util = require('../util/util');

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
     * Search certificate. <br />
     * 
     * @since 180409
     * @author TACKSU
     * 
     * @param {*} creteria 
     * @param {*} cb 
     */
    getCert(creteria, cb) {

        var condition = {}

        if (!!creteria.sId) {
            condition.S_CERT_DATA_ID = creteria.sId;
        }

        if (!!creteria.certId) {
            condition.CERT_ID = creteria.certId;
        }

        if (!!creteria.uId) {
            delete condition.CERT_ID;
            condition.UID = creteria.uId;
        }

        console.log(condition);

        var query = mysql.format(CertQuery.getCert, condition);
        this.query(query, (err, rows) => {
            if (!!err) {
                cb(err);
            } else if (rows.length > 0) {
                var result = [];
                for (var i in rows) {
                    result.push(CertModel.fromRow(rows[i]));
                }
                cb(err, result);
            }
        })
    }

    /**
     * Get certificate. <br />
     * 
     * @since 180420
     * @author TACKSU
     * 
     * @param {*} creteria 
     * @param {*} cb 
     */
    getCertList(creteria, cb) {

        var condition = null;
        if (!!creteria.uId) {
            condition = "TCD.UID = '" + creteria.uId + "'";
        }

        if (!!creteria.certId) {

            condition = condition ? condition + ' AND ' : condition;
            condition += "TCD.CERT_ID = '" + creteria.certId + "'";
        }

        condition = condition + " AND TCD.DEL_YN = 'N'";


        //console.log(condition);

        var query = CertQuery.getCertList + condition;

        //console.log(query);

        //SELECT TUC.CERT_ID, TUC.UID, TUC.BLC_MAP_ID, TBM.TRX_ID, TUC.SHRD_YN, TUC.CRTD_DT, TS.SUB_ID, TS.SUB_CD, TS.SUB_NM FROM rezoome_db.TCDA_USR_CERT AS TUC
        //INNER JOIN TCDA_BLC_MAP AS TBM ON (TBM.BLC_MAP_ID = TUC.BLC_MAP_ID) INNER JOIN TCCO_SUB AS TS ON (TBM.SUB_ID = TS.SUB_ID) WHERE TUC.UID = 'UID2'


        this.query(query, (err, rows) => {
            if (!!err) {
                cb(err, null);
            } else {

                var certList = [];
                for (var i in rows) {
                    certList.push({
                        certId: rows[i].CERT_ID,
                        uId: rows[i].UID,
                        blcMapId: rows[i].BLC_MAP_ID,
                        txid: rows[i].TRX_ID,
                        shared: Util.flagToBool(rows[i].SHRD_YN),
                        subId: rows[i].SUB_ID,
                        subCode: rows[i].SUB_CD,
                        title: rows[i].SUB_NM,
                        date: rows[i].CRTD_DT
                    });
                }
                cb(err, certList);
            }
        })
    }

    /**
     * Insert new certificate entity to database. <br />
     * 
     * @since 180406
     * @author TACKSU
     * 
     * @param {*} certModel 
     * @param {*} cb 
     */
    putCert(certModel, cb) {
        var param = certModel.toRow();
        var query = mysql.format(CertQuery.issueCert, param);

        this.query(query, (err, result) => {
            if (!!err) {
                cb(err);
            } else {
                //console.log(result);
                cb(err, result.insertId);
            }
        })
    }

    putCertByGuest(certModel, cb) {
        var param = certModel.toRow();
        var query = mysql.format(CertQuery.issueCertByGuest, param);

        this.query(query, (err, result) => {
            if (!!err) {
                cb(err);
            } else {
                //console.log(result);
                cb(err, result.insertId);
            }
        })
    }

    /**
     * Update certificate database. <br />
     * 
     * @since 180409
     * @author TACKSU
     * 
     * @param {*} creteria 
     * @param {*} certModel 
     * @param {*} cb 
     */
    setCert(creteria, certModel, cb) {
        var param = certModel.toRow();
        var condition = {
            CERT_ID: creteria.certId
        }

        var query = mysql.format(CertQuery.setCert, [param, condition]);
        this.query(query, (err, result) => {
            if (!!err) {
                cb(err);
            } else {
                cb(err, result.affectedRows);
            }
        })
    }

    delCert(creteria, cb) {
        var certId = creteria.certId;

        this.connectionPool.getConnection((err, connection) => {
            if (!!err) {
                return cb(err);
            } else {
                connection.beginTransaction((txErr) => {
                    if (txErr) {
                        return cb(txErr);
                    } else {
                        var condition = {};
                        //make query
                        //var certId=creteria.certId;
                        condition.CERT_ID = creteria.certId;

                        //console.log(certId);

                        var usrCertDelQuery = mysql.format(CertQuery.delCert, condition);

                        connection.query(usrCertDelQuery, (err, result) => {
                            if (!!err) {
                                console.error(JSON.stringify(err));
                                connection.rollback(() => {
                                    return cb(err);
                                });
                            } else if (result.affectedRows > 0) {

                                var selectShareCertQuery = mysql.format(CertQuery.getShared, condition);

                                connection.query(selectShareCertQuery, (err, result) => {
                                    if (!!err) {

                                        console.error(JSON.stringify(err));
                                        connection.rollback(() => {
                                            return cb(err);
                                        })
                                    } else {
                                        console.log(result);
                                        if (result.length > 0) {
                                            var usrCertSharedDelQuery = mysql.format(CertQuery.delShared, [condition, {
                                                DEL_YN: 'N'
                                            }]);

                                            connection.query(usrCertSharedDelQuery, (err, result) => {
                                                if (!!err) {
                                                    connection.rollback(function () {
                                                        console.error("rollback error");
                                                        cb(err);
                                                    })
                                                } else if (result.affectedRows > 0) {
                                                    connection.commit((err) => {
                                                        if (!!err) {
                                                            console.log(JSON.stringify(err));
                                                            connection.rollback(function () {
                                                                return cb(err);
                                                            })
                                                        }
                                                        //정상처리
                                                        console.log("tranaction sucess")
                                                        connection.release();
                                                        cb(null, result.affectedRows);
                                                    })
                                                }
                                            })
                                        } else {
                                            connection.commit(function (err) {
                                                if (!!err) {
                                                    console.log(JSON.stringify(err));
                                                    connection.rollback(function () {
                                                        return cb(err);
                                                    })
                                                }
                                                //정상처리
                                                console.log("tranaction sucess")
                                                connection.release();
                                                cb(null, result.affectedRows);
                                            })
                                        }
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }

    /**
     * Insert a new Certificate entity to database. <br />
     * 
     * @since 180326
     * @author TACKSU
     * 
     * @param {SharedCertModel} sharedCert 
     * @param {function(object, number)} cb 
     */
    putShared(sharedCert, cb) {
        var param = sharedCert.toRow();

        delete param.S_CERT_SHR_ID;
        delete param.CRTD_DT;
        delete param.MDFID_DT;

        // var query = "INSERT INTO TCDA_CERT_SHR (`CERT_ID`, `UID`, `ENC_CERT_DATA`, `DEL_YN`) VALUES ('45748487-6720-4061-9bed-98c9401fc7d3', 30, 'ca75e6a7-9220-4cff-adcd-1e0ef0fbbe62', 'N');"
        var query = mysql.format(CertQuery.putShared, param);
        this.query(query, (err, result) => {
            if (!!err) {
                cb(err);
            } else {
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
    getShared(creteria, cb) {

        var condition = {};

        if (!!creteria.certId) {
            delete condition.URL;
            condition.CERT_ID = creteria.certId;
        }

        if (!!creteria.url) {
            delete condition.CERT_ID;
            condition.URL = creteria.url
        }

        var query = mysql.format(CertQuery.getShared, condition);
        this.query(query, (err, rows) => {
            if (!!err) {
                cb(err);
            } else {
                cb(err, SharedCertModel.fromRow(rows));
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
    setShared(creteria, sharedCertModel, cb) {
        var condition = {};
        if (!!creteria.sId) {
            condition.S_CERT_SHR_ID = creteria.sId;
        }

        if (!!creteria.certId) {
            condition.CERT_ID = creteria.certId;
        }

        var query = mysql.format(CertQuery.setShared, [sharedCertModel.toRow(), condition])
        this.query(query, (err, result) => {
            if (!!err) {
                cb(err);
            } else {
                cb(err, result.affectedRows);
            }
        });
    }

    /**
     * Delete shared entity. <br />
     * 
     * @since 180409
     * @author TACKSU
     * 
     * @param {*} creteria 
     * @param {*} cb 
     */
    delShared(creteria, cb) {

    }

    /**
     * Insert new shared info. <br />
     * 
     * @since 180409
     * @author TACKSU
     * 
     * @param {*} urlModel 
     * @param {*} cb 
     */
    putSharedUrl(urlModel, cb) {
        var param = urlModel.toRow();

        var query = mysql.format(CertQuery.putUrl, param);
        this.query(query, (err, result) => {
            if (!!err) {
                cb(err);
            } else {
                cb(err, result.insertId);
            }
        })
    }

    /**
     * Update shared info. <br />
     * @param {*} creteria 
     * @param {*} urlModel 
     * @param {*} cb 
     */
    setSharedUrl(creteria, urlModel, cb) {
        var param = urlModel.toRow();
        var condition = {
            S_CERT_SHR_INFO_ID: creteria.sId
        };

        var query = mysql.format(CertQuery.setUrl, [param, condition]);
        this.query(query, (err, result) => {
            if (!!err) {
                cb(err);
            } else {
                cb(err, result.affectedRows);
            }
        })
    }

    /**
     * Select shared information. <br />
     * 
     * @since 180409
     * @author TACKSU
     * 
     * @param {*} creteria 
     * @param {*} cb 
     */
    getSharedUrl(creteria, cb) {
        var condition = {
            URL: creteria.url
        }

        var query = mysql.format(CertQuery.getSharedUrl, condition);
        this.query(query, (err, rows) => {
            if (!!err) {
                cb(err);
            } else {
                if (rows != null || rows != undefined) {
                    cb(err, {
                        txId: rows[0].TRX_ID,
                        passcode: rows[0].PASSCODE,
                        certId: rows[0].CERT_ID,
                        url: rows[0].URL,
                        sharedYn: rows[0].SHRD_YN,
                        pubYn: rows[0].PUB_YN,
                        expired: rows[0].EXPIRED_DT,
                        created: rows[0].CRTD_DT,
                        encData: rows[0].ENC_CERT_DATA
                    });
                } else {
                    cb(err);
                }
            }
        })
    }

    /**
     * Delete shared url. <br />
     * 
     * @since 180409
     * @author TACKSU
     * 
     * @param {*} creteria 
     * @param {*} cb 
     */
    delSharedUrl(creteria, cb) {
        var condition = {
            S_CERT_SHR_INFO_ID: creteria.sId
        }
    }

    getSubName(cb) {
        var query = mysql.format(CertQuery.getSubName);
        this.query(query, (err, rows) => {
            if (!!err) {
                cb(err);
            } else {
                cb(null, rows);
            }
        })
    }

    /**
     * Get certificate original data. <br/ >
     * 
     * @since 180613
     * @author TACKSU
     * 
     * @param {*} creteria 
     * @param {*} cb 
     */
    getCertData(creteria, cb) {
        var creteria = {
            CERT_ID: creteria.certId,
        };

        var query = mysql.format(CertQuery.getCertData, creteria);
        this.query(query, (err, cursor) => {
            if (!!err) {
                cb(err, null);
            } else {
                cb(null, cursor.length > 0 ? cursor[0] : {});
            }
        });
    }
}

module.exports = CertificateDAO;