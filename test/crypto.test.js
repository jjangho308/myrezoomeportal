import CryptoManager from '../modules/crypto';

describe('Crypto test suit', () => {
    var crypto;

    before('Crypto module init', () => {
        crypto = new CryptoManager();
        crypto.setDefaultSpec({
            symAlg      : 'aes128',
            symLength   : 16,
            encode      : 'base64',
            ivLength    : 16,
            asmLength   : 64
        })
    });

    it('Generate AES key', done => {
        crypto.generateAESKey((err, aes) => {
            if (!err) {
                console.log('AES Key : ' + aes);
                done();
            }
        });
    })

    it('AES Encrypt/Decrypt', done => {
        
        var plain = "Hello, world!";

        crypto.generateAESKey((err, aes) => {

            crypto.encryptAES(plain, aes, (err, iv, encrypted) => {
                crypto.decryptAES(encrypted, aes, iv, (err, decrypted) => {

                    console.log("Original : " + plain);
                    console.log("Decrypted : " + decrypted);
                    if (plain == decrypted)
                        done();
                })
            })
        });
    })

    it.skip('Generate RSA keypair', done => {
        crypto.generateRSAKeyPair((err, keypair) => {
            console.log('PubKey : ' + keypair.pub);
            console.log('PriKey : ' + keypair.pri);
            done();
        });
    })

    it.skip('RSA Encrypt/Decrypt', done => {

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