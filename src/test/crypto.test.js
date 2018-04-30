import Managers from '../core/managers';

import CryptoManager from '../modules/crypto/crypto';
import Initializer from '../core/initializer';

import JRSA from 'jsrsasign';

import Buffer from 'buffer';

/**
 * CryptoManagers test suite. <br />
 * 
 * @since 180304
 * @author TACKSU
 */
describe('Crypto test suit', () => {
    var crypto;

    before('Crypto module init', () => {
        Initializer();
        crypto = Managers.crypto();
    });

    /**
     * 
     */
    it.skip('RSA Key generate test case', () => {
        var keyPair = JRSA.KEYUTIL.generateKeypair("RSA", 2048);
        console.log(keyPair.pubKeyObj.n.toString());
        var jwkey = JRSA.KEYUTIL.getJWKFromKey(keyPair.pubKeyObj);
        console.log("");
        console.log(jwkey.n);
        console.log("");
        assert(true);
    });

    it.skip('AES Key generate test case', () => {
        var aesKey = JRSA.KEYUTIL.generateAESKey();
        assert(aesKey);
    });

    it.skip('Generate AES key', done => {
        crypto.generateAESKey((err, aes) => {
            console.log('AES Key : ' + aes);
            done();
        });
    })

    it('Generate RSA keypair', () => {
        var keyPair = crypto.generateRSAKeyPair();
        console.log(keyPair.public);
        console.log(keyPair.private);
    })

    /**
     * AES Encrypt decrypt with given key test case.
     */
    it('AES Encrypt decrypt with given key', done => {
        var plainText = 'Hello, World!';
        var base64Key = 'uPrDoR0R8B8TwBxw_K9Yrhei17gtUQfC0n6cydAioys=';
        crypto.encryptAES(plainText, base64Key, (err, iv, encrypted) => {
            crypto.decryptAES(encrypted, base64Key, iv, (err, decrypted) => {
                if (plain == decrypted)
                    done();
            });
        })
    });

    it.skip('AES Encrypt/Decrypt', done => {
        var plain = "Hello, world!";
        crypto.generateAESKey((aes) => {
            crypto.encryptAES(plain, aes, (encrypted) => {
                crypto.decryptAES(encrypted, aes, (decrypted) => {
                    if (plain == decrypted)
                        done();
                });
            })
        });
    })

    it.skip('RSA Encrypt/Decrypt', done => {
        var plain = "Hello, world!";
        crypto.generateAESKey((keypair) => {
            crypto.encryptRSA(plain, keypair.pub, (encrypted) => {
                crypto.decryptRSA(encrypted, keypair.pri, (decrypted) => {
                    if (plain == decrypted)
                        done();
                })
            })
        });
    })

    it.skip('RSA Signature', done => {
        var plain = "Hello, world!";
        crypto.generateAESKey((keypair) => {
            crypto.encryptRSA(plain, keypair.pri, (encrypted) => {
                crypto.decryptRSA(encrypted, keypair.pub, (decrypted) => {
                    if (plain == decrypted)
                        done();
                })
            })
        });
    })
})