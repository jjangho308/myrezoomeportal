function setData(record) {
    // dcript data 
    sessionStorage.setItem(record.txid, record);
}

function getData(record_txid) {
    return sessionStorage.getItem(record_txid);
}