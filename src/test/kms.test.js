import assert from 'assert';
import KMSManager from '../modules/push/kms';

describe('KMS suit', function () {
    //var push = new PushManager();

    var datakey;

    before('create KMS ', function () {
        var kms = new KMSManager();
        kms.generateDataKey()
        .then(data =>{
            
            const encrpyted = kms.encryptAES(data.Plaintext, new Buffer('hello world'));
            for (let i = 0; i < data.Plaintext.length; i++) {
                data.Plaintext[i] = null;
            }
            //
            kms.decrypt(data.CiphertextBlob)
            .then(key => {
                const originBuffer = kms.decryptAES(key, encrpyted);
                console.log(originBuffer);
            })

        })
    })

    it('1. KMS Encrypt', done => {
        
    }).timeout(3000);

    after('after encrpyt', done => {
        
        done();
    })
})