'use strict';var _crypto = require('../modules/crypto/crypto');var _crypto2 = _interopRequireDefault(_crypto);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

describe.skip('Crypto test suit', function () {
    var crypto;

    before('Crypto module init', function () {
        crypto = new _crypto2.default();
        crypto.setDefaultSpec({
            symLength: 64,
            asmLength: 64,
            encode: 'base64' });

    });

    it('Generate AES key', function (done) {
        crypto.generateAESKey(null, function (err, aes) {
            console.log('AES Key : ' + aes);
            done();
        });
    });

    it('Generate RSA keypair', function (done) {
        crypto.generateRSAKeyPair(null, function (err, keypair) {
            console.log('PubKey : ' + keypair.pub);
            console.log('PriKey : ' + keypair.pri);
            done();
        });
    });

    it('AES Encrypt/Decrypt', function (done) {
        var plain = "Hello, world!";
        crypto.generateAESKey(function (aes) {
            crypto.encryptAES(plain, aes, function (encrypted) {
                crypto.decryptAES(encrypted, ase, function (decrypted) {
                    if (plain == decrypted)
                    done();
                });
            });
        });
    });

    it('RSA Encrypt/Decrypt', function (done) {
        var plain = "Hello, world!";
        crypto.generateAESKey(function (keypair) {
            crypto.encryptRSA(plain, keypair.pub, function (encrypted) {
                crypto.decryptRSA(encrypted, keypair.pri, function (decrypted) {
                    if (plain == decrypted)
                    done();
                });
            });
        });
    });

    it('RSA Signature', function (done) {
        var plain = "Hello, world!";
        crypto.generateAESKey(function (keypair) {
            crypto.encryptRSA(plain, keypair.pri, function (encrypted) {
                crypto.decryptRSA(encrypted, keypair.pub, function (decrypted) {
                    if (plain == decrypted)
                    done();
                });
            });
        });
    });
});
//# sourceMappingURL=crypto.test.js.map