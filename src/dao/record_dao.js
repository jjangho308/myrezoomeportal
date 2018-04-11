import mysql from 'mysql';
import AbstractDAO from './abstract_dao';
import recordQuery from './record_query';

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

    getStoredDataByUserId(uid, orgid, cb){
        var query = mysql.format(recordQuery.getStoredDataByUserId, [uid, orgid]);
        this.query(query, (err, result) => {
            if(err){
                cb(err)
            }else{
                cb(err, result);
            }
        })
    }

    getQueueName(orgid, cb){
        var query = mysql.format(recordQuery.getQueuenameByOrgId, orgid);
        this.query(query, (err,result) => {
            if(err){
                cb(err);
            }else{
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

    getBlockChainTxid() {

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