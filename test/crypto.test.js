import crypto from 'crypto';

import CryptoManager from '../modules/crypto';

describe('CryptoManager test suit', () => {
    var cryptoManager;

    before('CryptoManager module init', () => {
        cryptoManager = new CryptoManager();
        cryptoManager.setDefaultSpec({
            symAlg      : 'aes-128-cbc',
            symLength   : 16,
            encode      : 'base64',
            ivLength    : 16,
            asmLength   : 64
        })
    });

    it('Generate AES key', done => {
        cryptoManager.generateAESKey((err, aes) => {
            if (!err) {
                console.log('AES Key : ' + aes);
                done();
            }
        });
    })

    it('AES short string', done => {
        var plain = "Hello, world!";
        console.log("Original : " + plain);
        cryptoManager.generateAESKey((err, aes) => {
            cryptoManager.encryptAES(plain, aes, (err, iv, encrypted) => {
                console.log("Encrypted : " + encrypted);
                cryptoManager.decryptAES(encrypted, aes, iv, (err, decrypted) => {
                    console.log("Decrypted : " + decrypted);
                    if (plain == decrypted)
                        done();
                })
            })
        });
    })

    it('AES long string', done => {
        var plain = "Hello, world!wal iefljaisdj lfijawlieilf jalisd ilfilase jfliasd";
        cryptoManager.generateAESKey((err, aes) => {
            cryptoManager.encryptAES(plain, aes, (err, iv, encrypted) => {
                cryptoManager.decryptAES(encrypted, aes, iv, (err, decrypted) => {

                    console.log("Original : " + plain);
                    console.log("Decrypted : " + decrypted);
                    if (plain == decrypted)
                        done();
                })
            })
        });
    })

    it.skip('Generate RSA keypair', done => {
        cryptoManager.generateRSAKeyPair((err, keypair) => {
            console.log('PubKey : ' + keypair.pub);
            console.log('PriKey : ' + keypair.pri);
            done();
        });
    })

    it.skip('RSA Encrypt/Decrypt', done => {

    })

    it.skip('RSA Signature', done => {
        var plain = "Hello, world!";
        cryptoManager.generateAESKey((keypair) => {
            cryptoManager.encryptRSA(plain, keypair.pri, (encrypted) => {
                cryptoManager.decryptRSA(encrypted, keypair.pub, (decrypted) => {
                    if (plain == decrypted)
                        done();
                })
            })
        });
    })
})