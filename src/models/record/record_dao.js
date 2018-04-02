import AbstractDAO from '../abstract_dao'

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

    getBlockChainTxid()

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