function setData(data) {
    var verifyData = JSON.parse(data);

    var passcode = 'asdfasdf';
    var passcodehash = SHA256(passcode);

    if(verifyData.encrypted) {
        var encodedIv = verifyData.iv;
        var encryptedData = verifyData.data;

        var decrypted = CryptoJS.AES.decrypt(encryptedData, CryptoJS.enc.Base64.parse(
            passcodehash), {
            iv: CryptoJS.enc.Base64.parse(encodedIv)
            });
            console.log(decrypted.toString(CryptoJS.enc.Utf8));
    }    
    
}