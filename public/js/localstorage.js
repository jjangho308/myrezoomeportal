function setData(record) {
    // dcript data 

    localStorage.setItem('rezoome_record_' + record.hash, record);

}

function getData(record_hash) {
    return localStorage.getItem('rezoome_record_'+record_hash);
}