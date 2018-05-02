import crypto from 'crypto';
import NodeRSA from 'node-rsa';

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
            ivLength: 16,
            symLength: 32,
            asmLength: 32,
            encode: 'base64',
            symAlg: 'aes256'
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
        crypto.randomBytes(!!length ? length : this.spec.ivLength, cb);
    }

    /**
     * Generate initialization vector. <br />
     * 
     * @since 180430
     * @author TACKSU
     * 
     * @param {*} cb
     */
    generateIV(cb) {
        crypto.randomBytes(this.spec.ivLength, cb);
    }

    /**
     * Generate Symmetric key by cryptographic specification. <br />
     * 
     * @since 180305
     * @author TACKSU
     * 
     * @param {function(object, string)} cb Callback function Base64 encoded AES Key data.
     */
    generateAESKey(cb) {
        crypto.randomBytes(this.spec.symLength, ((err, key) => {
            if (err) {
                cb(err);
            }
            cb(null, key.toString(this.spec.encode));
        }).bind(this));
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
        process.nextTick(() => {
            this.generatePRN(this.spec.ivLength, ((err, iv) => {
                try {
                    var cipher = crypto.createCipheriv(this.spec.symAlg, Buffer.from(key, this.spec.encode), iv);
                    cipher.setAutoPadding(true);
                    var encrypted = cipher.update(plain, 'utf8', this.spec.encode);
                    encrypted += cipher.final(this.spec.encode);
                    cb(null, iv.toString(this.spec.encode), encrypted);
                } catch (e) {
                    console.log(e);
                }
            }).bind(this));
        });
    }

    /**
     * Decrypt string with symmetric key and iv.
     * 
     * @param {string} encrypted Encoded encrypted string.
     * @param {string} key Encoded AES key string.
     * @param {string} iv Encoded IV buffer.
     * @param {function(object, string)} cb 
     */
    decryptAES(encrypted, key, iv, cb) {
        process.nextTick(() => {
            try {
                var decipher = crypto.createDecipheriv(this.spec.symAlg, Buffer.from(key, this.spec.encode), Buffer.from(iv, this.spec.encode));
                var decrypted = decipher.update(encrypted, this.spec.encode, 'utf8');
                decrypted += decipher.final('utf8');
                cb(null, decrypted);
            } catch (e) {
                cb(e, null);
            }
        })
    }

    /**
     * Encrypt data with RSA Key. <br />
     * 
     * @since 180502
     * @author TACKSU
     * 
     * @param {Buffer} dataBuffer Plain text data to encrypt.
     * @param {Buffer} publicKey Buffer of public or private key. <br />
     * @param {function(err, buffer)} cb Callback
     * 
     * @returns Base64 encoded encrypted data string.
     */
    encryptRSAPublic(dataBuffer, publicKey, cb) {
        process.nextTick(() => {
            try {
                var rsa = new NodeRSA();
                publicKey = '-----BEGIN PUBLIC KEY-----\n' + publicKey + '\n-----END PUBLIC KEY-----';
                rsa.importKey(publicKey, 'pkcs8-public-pem');
                var encrypted = rsa.encrypt(dataBuffer);
                cb(null, encrypted);
            } catch (e) {
                cb(er);
            }
        });
    }

    /**
     * Decrypt data with RSA Private Key. <br />
     * 
     * @since 180502
     * @author TACKSU
     * 
     * @param {*} encryptedBuffer Base64 encoded encrypted string to decrypt.
     * @param {*} privateKey Base64 encoded raw RSA private key string.
     */
    decryptRSAPrivate(encryptedBuffer, privateKey, cb) {
        process.nextTick(() => {
            try {
                var rsa = new NodeRSA();
                privateKey = '-----BEGIN PRIVATE KEY-----\n' + privateKey + '\n-----END PRIVATE KEY-----';
                rsa.importKey(privateKey, 'pkcs8-private-pem');
                var decrypted = rsa.decrypt(encryptedBuffer);
                cb(null, decrypted);
            } catch (e) {
                cb(er);
            }
        });
    }
}

export default CryptoManager;