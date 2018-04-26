/**
 * Query statements for Record. <br />
 * 
 * @since 180403
 * @author JJANGHO
 */
var BLC_MAP_TABLE = 'TCDA_BLC_MAP';
export default {
    getStoredDataByUserIdAndOrgID : "SELECT * FROM rezoome_db.TCDA_BLC_MAP WHERE `UID` = ? and `ORG_ID` = ? ",
    getStoredDataByUserId : "SELECT * FROM rezoome_db.TCDA_BLC_MAP WHERE `UID` = ? ",
    getStoredOrgByUserId : "SELECT DISTINCT ORG_ID FROM rezoome_db.TCDA_BLC_MAP WHERE TCDA_BLC_MAP.UID = ?",
    //getQueuenameByOrgId: "SELECT AMQ_NM FROM rezoome_db.TCCO_ORG_SUB a, rezoome_db.TCUP_ORG_INFO b WHERE a.ORG_ID=b.ORG_id and a.SUB_ID = ?",
    getQueuenameByOrgId: "SELECT AMQ_NM FROM rezoome_db.TCUP_ORG_INFO WHERE `ORG_ID` = ?",
    getByCodes : "SELECT ORG_QUEUE_NAME FROM TBL_ORG WHERE ORG_CD IN ( %s )",
    findAll : "SELECT ORG_QUEUE_NAME FROM TBL_ORG",
    putRecord : "INSERT INTO `rezoome_db`.`TCDA_BLC_MAP` (`BLC_MAP_ID`,`UID`, `TRX_ID`,`ORG_ID`, `SUB_ID`) VALUES ( ?, ? , ? , ?, ?)",
    set : '',
    del : '',
    getTxid : 'SELECT * FROM ' + BLC_MAP_TABLE + ' WHERE ?',
    getDefaultYn : "SELECT DFT_YN FROM " + BLC_MAP_TABLE + " WHERE `UID` = ? AND `TRX_ID` = ?",
    setDefaultYnInit : "UPDATE " + BLC_MAP_TABLE + " SET `DFT_YN` = 'N' WHERE `SUB_ID` = ?",
    setDefaultYn : "UPDATE " + BLC_MAP_TABLE + " SET `DFT_YN` = 'Y' WHERE `UID` = ? AND `TRX_ID` = ?"
}