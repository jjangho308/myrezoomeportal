import crypto from 'crypto';

import AbstractManager from '../abstract_manager';

/**
 * CryptoManager. <br />
 * 
 * @since 183013
 * @author TACKSU
 */
class CryptoManager extends AbstractManager {

    constructor(opt) {
        super(opt);
    }

    init() {

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
    setDefaultSpec(spec) {
        this.spec = spec;
    }

    /**
     * Generate random number with given length. <br />
     * 
     * @since 180305
     * @author TACKSU
     * 
     * @param {number} length Length of data to be generated..
     * @param {function} cb Callback.
     */
    generatePRN(length, cb) {
        crypto.randomBytes(length, cb);
    }

    generateAESKey(cb) {
        crypto.randomBytes(this.spec.symLength, (err, key) => {
            if (err) {
                cb(err);
            }
            cb(null, key.toString(this.spec.encode));
        });
    }

    generateRSAKeyPair(cb) {
        var dh = crypto.createDiffieHellman(this.spec.asmLength);
        dh.generateKeys(this.spec.encode);
        cb(null, {
            pub: dh.getPublicKey(this.spec.encode),
            pri: dh.getPrivateKey(this.spec.encode)
        })
    }

    /**
     * Encrypt data with symmetric key and iv. <br />
     * 
     * @param {string} plain Plain text.
     * @param {string} key Symmetric key.
     * @param {function} cb Callback function
     */
    encryptAES(plain, key, cb) {
        this.generatePRN(this.spec.ivLength, ((err, iv) => {
            var cipher = crypto.createCipheriv(this.spec.symAlg, Buffer.from(key, this.spec.encode), iv);
            cipher.setAutoPadding(true);
            var encrypted = cipher.update(plain, 'utf8', this.spec.encode);
            encrypted += cipher.final(this.spec.encode);
            cb(null, iv.toString(this.spec.encode), encrypted);
        }).bind(this));
    }

    /**
     * Decrypt string with symmetric key and iv.
     * 
     * @param {*} encrypted 
     * @param {*} key 
     * @param {*} iv 
     * @param {*} cb 
     */
    decryptAES(encrypted, key, iv, cb) {
        var decipher = crypto.createDecipheriv(this.spec.symAlg, Buffer.from(key, this.spec.encode), Buffer.from(iv, this.spec.encode));
        var decrypted = decipher.update(encrypted, this.spec.encode, 'utf8');
        decrypted += decipher.final('utf8');
        cb(null, decrypted);
    }

    encryptRSA(plain, key, cb) {

    }

    decryptRSA(encrypted, key, cb) {

    }
}

export default CryptoManager;