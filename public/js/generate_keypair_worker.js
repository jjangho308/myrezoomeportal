/**
 * Generate RSA Key pair on worker thread. <br />
 * 
 * @since 180619
 * @author TACKSU
 */

window = {};

onmessage = function generateRSAKeyPair(args) {
    importScripts('/js/jsrsasign/jsrsasign-all-min.js');
    console.log('Generate RSA Key pair start');
    try {
        rsaKeypair = KEYUTIL.generateKeypair("RSA", 2048);
        postMessage(JSON.stringify({
            rsakey_pub : KEYUTIL.getJWKFromKey(rsaKeypair.pubKeyObj),
            rsakey_prv : KEYUTIL.getJWKFromKey(rsaKeypair.prvKeyObj),
        }));
    } catch (e) {
        postMessage(e);
    }
}