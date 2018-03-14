export default {
    "put"      : "INSERT INTO RZM_ANCHOR.RZM_HASH_DATA_META (usr_id, trx_id, del_fg, form_id, org_cd, sub_cd) VALUES (?, ?, ?, ?, ?, ?)",
    "getbyuseridformid" : "select * from RZM_ANCHOR.RZM_HASH_DATA_META WHERE usr_id = ? AND form_id = ?",
    "getByTxid"            : "select * from RZM_ANCHOR.RZM_HASH_DATA_META WHERE trx_id = ?"
}