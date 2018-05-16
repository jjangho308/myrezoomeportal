function setData(data) {
    var verifyData = JSON.parse(data);
    if(verifyData.encrypted) {
        var encodedIv = verifyData.iv;
        var encryptedData = verifyData.data;

        // decrypted gogo
    }    
}