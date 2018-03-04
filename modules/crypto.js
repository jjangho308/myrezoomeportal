import crypto from 'crypto';

import AbstractManager from "./abstract";

/**
 * CryptoManager. <br />
*/
class CryptoManager extends AbstractManager{
    
    constructor(opt){
        super(opt);
    }

    init(){

    }

    /**
     * 
     * @param {object} spec {
     *      symAlg      : Algorithm of symetric crypto.
     *      symLength   : Length of AES Key,
     *      asmAlg      : ALgorithm of assymetric crypto.
     *      asmLength   : Length of RSA Key pair.
     *      encode      : Encoding scheme.
     * }
     */
    setDefaultSpec(spec){
        this.spec = spec;
    }

    generateAESKey(spec, cb){
        crypto.randomBytes(this.spec.symLength, (err, key)=>{
            if(err){
                cb(err);
            }
            cb(null, key.toString(this.spec.encode));
        });
    }

    generateRSAKeyPair(spec, cb){
        var dh = crypto.createDiffieHellman(this.spec.asmLength);
        dh.generateKeys(this.spec.encode);
        cb(null, {
            pub : dh.getPublicKey(this.spec.encode),
            pri : dh.getPrivateKey(this.spec.encode)
        })
    }

    encryptAES(plain, key, cb){
        var cipher = crypto.createCipher(this.spec.symAlg);
        cipher.update(plain, key);

        // Force assync
        process.nextTick(()=>{
            var encrypted = cipher.final();
            cb(null, encrypted);
        })
    }

    decryptAES(encrypted, key, cb){

    }

    encryptRSA(plain, key, cb){

    }

    decryptRSA(encrypted, key, cb){

    }
}

export default CryptoManager;