import CryptoManager from '../modules/crypto/crypto';
import initialize from '../core/initializer';

describe.skip('Crypto test suit', () => {
    var crypto;

    before('Crypto module init', () => {
        Initializer();
        crypto = new CryptoManager();
        crypto.setDefaultSpec({
            symLength : 64,
            asmLength : 64,
            encode : 'base64'
        })
    });

    it('Generate AES key', done => {
        crypto.generateAESKey(null, (err, aes) => {
            console.log('AES Key : ' + aes);
            done();
        });
    })

    it('Generate RSA keypair', done => {
        crypto.generateRSAKeyPair(null, (err, keypair) => {
            console.log('PubKey : ' + keypair.pub);
            console.log('PriKey : ' + keypair.pri);
            done();
        });
    })

    it('AES Encrypt/Decrypt', done => {
        var plain = "Hello, world!";
        crypto.generateAESKey((aes) => {
            crypto.encryptAES(plain, aes, (encrypted) => {
                crypto.decryptAES(encrypted, ase, (decrypted) => {
                    if (plain == decrypted)
                        done();
                })
            })
        });
    })

    it('RSA Encrypt/Decrypt', done => {
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

    it('RSA Signature', done => {
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