var crypto = require('crypto');
var NodeRSA = require('node-rsa');

var AbstractManager = require('../abstract_manager');

var ErrorCode = require('../../core/error/error_code');
var ResponseError = require('../../core/error/response_error');

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
        });

        this.defaultKey = this.getSystemSymmetricKey();
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
     * Retrieve system default symmetric key from system keystore. <br />
     * 
     * 
     * @since 180404
     * @author TACKU
     * 
     * @return 32bytes Base64 encoded string.
     */
    getSystemSymmetricKey() {

        // TODO 제대로 된 로직으로 수정 필요함.
        if (!!this.defaultKey) {
            return this.defaultKey;
        } else {
            this.defaultKey = crypto.createHash('sha256').update('rezoomedefaultsecret').digest('base64');
            return this.defaultKey;
        }
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
            if (!!err) {
                console.error(err.stack);
                return cb(err);
                return;
            }
            return cb(null, key.toString(this.spec.encode));
        }).bind(this));
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
                if (!!err) {
                    console.error(err.stack);
                    return cb(err);
                    return;
                }
                try {
                    var cipher = crypto.createCipheriv(this.spec.symAlg, Buffer.from(key, this.spec.encode), iv);
                    cipher.setAutoPadding(true);
                    var encrypted = cipher.update(plain, 'utf8', this.spec.encode);
                    encrypted += cipher.final(this.spec.encode);
                    return cb(null, iv.toString(this.spec.encode), encrypted);
                } catch (err) {
                    if (!!err) {
                        console.error(err.stack);
                        return cb(new ResponseError({
                            code: ErrorCode.INTERNAL_CRYPTO,
                            cause: err,
                            info: `PlainMessage : ${plain}`,
                        }));
                        return;
                    }
                }
            }).bind(this));
        });
    }

    /**
     * Encrypt data in AES256ECB mode. <br />
     * 
     * @since 180516
     * @author TACKSU
     * 
     * @param {String} plain UTf-8 encoded plain text
     * @param {String} key Base64 encoded AES256 Key.
     * @param {function(object, String)} cb Callback function.
     */
    encryptAESECB(plain, key, cb) {
        process.nextTick((() => {
            try {
                var cipher = crypto.createCipher(this.spec.symAlg, Buffer.from(key, this.spec.encode));
                cipher.setAutoPadding(true);
                var encrypted = cipher.update(plain, 'utf8', this.spec.encode);
                encrypted += cipher.final(this.spec.encode);
                return cb(null, encrypted);
            } catch (err) {
                if (!!err) {
                    console.error(err.stack);
                    return cb(new ResponseError({
                        type: 'AESECB',
                        code: ErrorCode.INTERNAL_CRYPTO,
                        cause: err,
                        info: `PlainMessage : ${plain}`,
                    }));
                }
            }
        }).bind(this));
    }

    /**
     * Decrypt data in AES256ECB mode. <br />
     * 
     * @since 180516
     * @author TACKSU
     * 
     * @param {String} encrypted Base64 encoded encrypted string.
     * @param {String} key Base64 encoded AES Key.
     * @param {function(object, String)} cb Callback function.
     */
    decryptAESECB(encrypted, key, cb) {
        process.nextTick((() => {
            try {
                var decipher = crypto.createDecipher(this.spec.symAlg, Buffer.from(key, this.spec.encode));
                var decrypted = decipher.update(encrypted, this.spec.encode, 'utf8');
                decrypted += decipher.final('utf8');
                return cb(null, decrypted);
            } catch (err) {
                if (!!err) {
                    console.error(err.stack);
                    return cb(new ResponseError({
                        code: ErrorCode.INTERNAL_CRYPTO,
                        cause: err,
                        info: {
                            type: 'AESECB',
                            encrypted: encrypted,
                            key: key,
                        },
                    }));
                }
            }
        }).bind(this));
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
                return cb(null, decrypted);
            } catch (err) {
                if (!!err) {
                    console.error(err.stack);
                    return cb(new ResponseError({
                        code: ErrorCode.INTERNAL_CRYPTO,
                        cause: err,
                        info: {
                            type: 'AESCBC',
                            encrypted: encrypted,
                            key: key,
                            iv: iv,
                        },
                    }));
                }
            }
        });
    }

    /**
     * Generate RSA Key pair. <br />
     * 
     * @since 180313
     * @author TACKSU
     * 
     * @param {*} cb 
     */
    generateRSAKeyPair(cb) {
        process.nextTick(() => {
            try {
                var rsa = new NodeRSA({
                    // TODO Change to property.
                    b: 2048
                });

                return cb(null, {
                    public: rsa.exportKey('pkcs8-public-der'),
                    private: rsa.exportKey('pkcs8-private-der')
                });
            } catch (err) {
                if (!!err) {
                    console.error(err.stack);
                    return cb(err);
                }
            }
        });
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
                publicKey = '-----BEGIN PUBLIC KEY-----\n' + publicKey + '\n-----END PUBLIC KEY-----';
                var rsa = new NodeRSA(publicKey, 'pkcs8-public-pem', {
                    encryptionScheme: 'pkcs1'
                });
                var encrypted = rsa.encrypt(dataBuffer);
                return cb(null, encrypted);
            } catch (err) {
                if (!!err) {
                    console.error(err.stack);
                    return cb(new ResponseError({
                        code: ErrorCode.INTERNAL_CRYPTO,
                        cause: err,
                        info: {
                            type: 'RSA',
                            plain: dataBuffer.toString('utf-8'),
                            key: key.toString('utf8'),
                        },
                    }));
                }
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
                privateKey = '-----BEGIN PRIVATE KEY-----\n' + privateKey + '\n-----END PRIVATE KEY-----';
                var rsa = new NodeRSA(privateKey, 'pkcs8-private-pem', {
                    encryptionScheme: 'pkcs1'
                });
                var decrypted = rsa.decrypt(encryptedBuffer);
                return cb(null, decrypted);
            } catch (err) {
                if (!!err) {
                    console.error(err.stack);
                    return cb(new ResponseError({
                        code: ErrorCode.INTERNAL_CRYPTO,
                        cause: err,
                        info: {
                            type: 'RSA',
                            encrypted: encryptedBuffer.toString('utf-8'),
                            key: privateKey.toString('utf8'),
                        },
                    }));
                }
            }
        });
    }
}

module.exports = CryptoManager;