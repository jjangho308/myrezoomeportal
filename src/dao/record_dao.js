import mysql from 'mysql';
import AbstractDAO from './abstract_dao';
import recordQuery from './record_query';

import BlcMapModel from '../models/record/blc_map';
import Util from '../util/util';

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
                cb(err)
            } else {
                cb(err, result);
            }
        })
    }


    getStoredDataByUserId(uid, orgid, cb) {

        var query = mysql.format(recordQuery.getStoredDataByUserIdAndOrgID, [uid, orgid]);
        this.query(query, (err, result) => {
            if (err) {
                cb(err)
            } else {
                cb(err, result);
            }
        })

    }

    getQueueName(orgid, cb) {
        var query = mysql.format(recordQuery.getQueuenameByOrgId, orgid);
        this.query(query, (err, result) => {
            if (err) {
                cb(err);
            } else {
                cb(err, result);
            }
        })

    }

    putRecord(record, cb) {
        var query = mysql.format(recordQuery.putRecord, record);
        this.query(query, (err, result) => {
            if (err) {
                cb(err);
            } else {
                cb(err, result);
            }
        })
    }

    /**
     * 사용자의 수기 입력 이력을 db에 기록함.
     */
    putPrivateRecord(privateRecordModel, cb) {

    }

    /**
     * 사용자의 수기 입력한 이력을 가져옴
     */
    getPrivateRecord(creteria) {
        var uId = creteria.uId;
        var recordId = creteria.recordId;
    }

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

        if(!!creteria.txid){
            delete condition.BLC_MAP_ID;
            condition.TRX_ID = creteria.txid;
        }
        
        var query = mysql.format(recordQuery.getTxid, condition);
        this.query(query, (err, rows) => {
            if (!!err) {
                cb(err, null);
            } else {
                var blcMapList = [];
                for (var i in rows) {
                    blcMapList.push(BlcMapModel.fromRow(rows[i]));
                }
                cb(err, blcMapList);
            }
        })
    }

    /**
     * 기 입력된 이력을 변경
     */
    set() {

    }

    /**
     * 보류
     */
    del() {

    }
}

export default RecordDAO;