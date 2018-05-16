function test1() {
    var decrypted = CryptoJS.AES.decrypt(omsg.records[i].data, CryptoJS.enc.Base64.parse(
        decryptedKey), {
        iv: CryptoJS.enc.Base64.parse(recv_iv)
        });
        console.log(decrypted.toString(CryptoJS.enc.Utf8));
}