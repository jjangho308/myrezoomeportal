import aws from 'aws-sdk';
import crypto from 'crypto';
import AbstractManager from "../abstract_manager";


class KMSManager extends AbstractManager{
    constructor(opt){
        super(opt);
    }

    init(){  
        this.kms = new aws.KMS({
            accessKeyId: 'AKIAI6WIYRSEBP5HWRNQ',
            secretAccessKey: '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',
            region: 'ap-northeast-2'
        });

        
    }

    generateDataKey() {
        return new Promise((resolve, reject) => {
            const params = {
                KeyId: 'a515baff-dbef-4c93-85fc-083bf39f7fa5', // The identifier of the CMK to use to encrypt the data key. You can use the key ID or Amazon Resource Name (ARN) of the CMK, or the name or ARN of an alias that refers to the CMK.
                KeySpec: 'AES_256'// Specifies the type of data key to return.
            };
            this.kms.generateDataKey(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

     encryptAES(key, buffer) {
        const algorithm = 'AES-256-CBC';
    
        const iv = new Buffer('00000000000000000000000000000000', 'hex');
    
        var encryptor = crypto.createCipheriv(algorithm, key, iv);
        //encryptor.write(buffer);
        //encryptor.end();

        

        var encrypted = encryptor.update(buffer, 'utf-8', 'base64');
        encrypted += encryptor.final('base64');

        //encrypted += cipher.final('base64');
        return encrypted;
    }
    
    
     decryptAES(key, buffer) {
        const algorithm = 'AES-256-CBC';
    
        const iv = new Buffer('00000000000000000000000000000000', 'hex');

        var decryptor = crypto.createDecipheriv(algorithm, key, iv);

        var decrypted = decryptor.update(buffer, 'base64', 'utf-8');
        decrypted += decryptor.final('utf-8');


        //decryptor.write(buffer);
        //decryptor.end();
    
        return decrypted;
    }

    decrypt(buffer) {
        return new Promise((resolve, reject) => {
            const params = {
                CiphertextBlob: buffer// The data to dencrypt.
            };
            this.kms.decrypt(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.Plaintext);
                }
            });
        });
    }
}

export default KMSManager;