import crypto from 'crypto';

import AbstractManager from '../abstract_manager';

/**
 * CryptoManager. <br />
 * 
 * @since 180313
 * @author TACKSU
 */
class CryptoManager extends AbstractManager {

    /**
     * Default constructor. <br />
     * 
     * @since 180313
     * @author TACKSU
     * 
     * @param {*} opt 
     */
    constructor(opt) {
        super(opt);
    }


    /**
     * Initializer. <br />
     * 
     * @since 180403
     * @author TACKSU
     * 
     * @param {InitializedFrom} from 
     */
    init(from) {
        this.setDefaultSpec({
            symLength: 64,
            asmLength: 64,
            encode: 'base64'
        })
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
     * Obtain system default symmetric key from system keystore. <br />
     * 
     * @since 180404
     * @author TACKU
     */
    getSystemSymmetricKey() {
        // TODO Implements here
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

    /**
     * Generate Symmetric key by cryptographic specification. <br />
     * 
     * @since 180305
     * @author TACKSU
     * 
     * @param {function(object, string)} cb 
     */
    generateAESKey(cb) {
        crypto.randomBytes(this.spec.symLength, (err, key) => {
            if (err) {
                cb(err);
            }
            cb(null, key.toString(this.spec.encode));
        });
    }

    /**
     * Generate Asymmetric key pair. <br />
     * 
     * @since 180313
     * @author TACKSU
     * 
     * @param {*} cb 
     */
    generateRSAKeyPair(cb) {
        var dh = crypto.createDiffieHellman(this.spec.asmLength);
        dh.generateKeys(this.spec.encode);
        return {
            public: dh.getPublicKey(this.spec.encode),
            private: dh.getPrivateKey(this.spec.encode)
        };
    }

    /**
     * Encrypt data with symmetric key and iv. <br />
     * 
     * @param {string} plain Plain text.
     * @param {string} key Symmetric key.
     * @param {function(err, iv, encrypted)} cb Callback function
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
        return decrypted;
    }

    encryptRSA(plain, key, cb) {

    }

    decryptRSA(encrypted, key, cb) {

    }
}

export default CryptoManager;