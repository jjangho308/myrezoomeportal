var mysql = require('mysql');
var AbstractDAO = require('./abstract_dao');
var recordQuery = require('./record_query');

var BlcMapModel = require('../models/record/blc_map');
var PrivateRecord = require('../models/record/private_record');
var Util = require('../util/util');

/**
 * DAO for record. <br />
 * 
 * @since 180326
 * @author TACKSU
 */
class RecordDAO extends AbstractDAO {
    constructor(connectionPool) {
        super(connectionPool);
    }

    getStoredOrgByUserId(uid, cb) {
        var query = mysql.format(recordQuery.getStoredOrgByUserId, uid);
        this.query(query, (err, result) => {
            if (err) {
                return cb(err)
            } else {
                return cb(err, result);
            }
        })
    }


    /**
     * 
     * @param {*} uid 
     * @param {*} orgid 
     * @param {*} cb 
     */
    getStoredDataByUserId(uid, orgid, cb) {
        var query = mysql.format(recordQuery.getStoredDataByUserIdAndOrgID, [uid, orgid]);
        this.query(query, (err, result) => {
            if (err) {
                return cb(err)
            } else {
                return cb(err, result);
            }
        })

    }

    getQueueName(orgid, cb) {
        var query = mysql.format(recordQuery.getQueuenameByOrgId, orgid);
        this.query(query, (err, result) => {
            if (err) {
                return cb(err);
            } else {
                return cb(err, result);
            }
        })

    }

    putRecord(record, cb) {
        var query = mysql.format(recordQuery.putRecord, record);
        this.query(query, (err, result) => {
            if (err) {
                return cb(err);
            } else {
                return cb(err, result);
            }
        })
    }

    putRecordByGuest(record, cb) {
        var query = mysql.format(recordQuery.putRecordByGuest, record);
        this.query(query, (err, result) => {
            if (err) {
                return cb(err);
            } else {
                return cb(err, result);
            }
        })
    }

    /**
     * 사용자의 수기 입력 이력을 db에 기록함.
     */
    putPrivateRecord(privateRecordModel, cb) {

    }

    // /**
    //  * 사용자의 수기 입력한 이력을 가져옴
    //  */
    // getPrivateRecord(creteria) {
    //     var uId = creteria.uId;
    //     var recordId = creteria.recordId;

    //     var query = mysql.format(recordQuery.getPrivateRecordId, {
    //         CERT_PRVT_ID: recordId,
    //     });
    //     this.query(query, (err, cursor) => {
    //         if (!!err) {
    //             console.error(err);
    //         } else {
    //             var returnValue = [];
    //             for (var row in cursor) {
    //                 returnValue.push(PrivateRecord.fromRow(row));
    //             }
    //             cb(null, returnValue);
    //         }
    //     });
    // }

    /**
     * Select transaction id from blockchain map table. <br />s
     * 
     * @since 180419
     * @author TACKSU
     */
    getBlockChainMap(creteria, cb) {
        var condition = {};
        if (!!creteria.blcMapId) {
            condition.BLC_MAP_ID = creteria.blcMapId;
        }

        if (!!creteria.txid) {
            delete condition.BLC_MAP_ID;
            condition.TRX_ID = creteria.txid;
        }

        var query = mysql.format(recordQuery.getTxid, condition);
        this.query(query, (err, rows) => {
            if (!!err) {
                return cb(err, null);
            } else {
                var blcMapList = [];
                for (var i in rows) {
                    blcMapList.push(BlcMapModel.fromRow(rows[i]));
                }
                return cb(err, blcMapList);
            }
        })
    }

    getDefaultYn(creteria, cb) {
        var query = mysql.format(recordQuery.getDefaultYn, [creteria.uid, creteria.txid]);
        this.query(query, (err, rows) => {
            if (!!err) {
                return cb(err);
            } else {
                return cb(rows[0]);
            }
        });
    }

    setDefaultYn(creteria, cb) {
        var query = mysql.format(recordQuery.setDefaultYnInit, [creteria.subid]);
        this.query(query, (err, rows) => {
            if (!!err) {
                return cb(err);
            } else {
                query = mysql.format(recordQuery.setDefaultYn, [creteria.uid, creteria.txid]);
                this.query(query, (err, rows) => {
                    if (!!err) {
                        return cb(err);
                    } else {
                        return cb(null, rows);
                    }
                });
            }
        });
    }

    issuePrivateRecord(privateRecord, cb) {
        var param = privateRecord.toRow();
        var query = mysql.format(recordQuery.issuePrivateRecord, param);
        this.query(query, (err, result) => {
            if (!!err) {
                return cb(err, null);
            } else {
                return cb(err, result);
            }
        });
    }

    getPrivateRecord(creteria, cb) {
        var condition = !!creteria.uId ? 'AND `UID` = ' + mysql.escape(creteria.uId) : '';
        condition += !!creteria.recordId ? 'AND `CERT_PRVT_ID` = ' + mysql.escape(creteria.recordId) : '';

        var query = recordQuery.getPrivateRecord + condition;
        this.query(query, (err, rows) => {
            if (!!err) {
                return cb(err, null);
            } else {
                var recordList = [];
                for (var i in rows) {
                    recordList.push(PrivateRecord.fromRow(rows[i]));
                }
                return cb(err, recordList);
            }
        });
    }

    deletePrivateRecord(creteria, cb) {
        var query = mysql.format(recordQuery.delPrivateRecord, [creteria.uId, creteria.recordId]);
        this.query(query, (err, affectedRows) => {
            if (!!err) {
                console.error(err);
                return cb(err, null);
            } else {
                return cb(null, affectedRows);
            }
        });
    }
}

module.exports = RecordDAO;