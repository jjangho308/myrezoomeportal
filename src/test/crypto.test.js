import Managers from '../core/managers';

import CryptoManager from '../modules/crypto/crypto';
import Initializer from '../core/initializer';

import JRSA from 'jsrsasign';

import nodeCrypto from 'crypto';

import NodeRSA from 'node-rsa';

import CryptoJS from 'crypto-js';
import AES from 'crypto-js/aes';

/**
 * CryptoManagers test suite. <br />
 * 
 * @since 180304
 * @author SSEK-SU
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

    it.skip('Generate AES and iv key', done => {
        crypto.generateAESKey((err, aes) => {
            crypto.generateIV((err, iv) => {
                console.log('AES Key : ' + aes);
                console.log('IV : ' + iv.toString('base64'));
            })
        });
    })

    it.skip('Generate RSA keypair', () => {
        var keyPair = crypto.generateRSAKeyPair();
        console.log(keyPair.public);
        console.log(keyPair.private);
    })

    /**
     * AES Encrypt decrypt with given key test case.
     */
    it.skip('AES Encrypt decrypt with given key', done => {
        var plainText = 'Hello, World!';
        crypto.generateAESKey((err, encodedKey) => {
            console.log('AES Key : ' + encodedKey);
            crypto.encryptAES(plainText, encodedKey, (err, iv, encrypted) => {
                console.log('IV : ' + iv.toString('base64'));
                console.log('Encrypted : ' + encrypted);
                var decrypted = crypto.decryptAES(encrypted, encodedKey, iv);
                if (plainText == decrypted)
                    done();
            });
        });
    });

    /**
     * 
     */
    it.skip('RSA Public Key Parsing', done => {
        try {
            var publicEncoded = '-----BEGIN PUBLIC KEY-----\n' +
                'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkQNKGV6/rAS1RpU1HNjzUeAsKHpFqVGEwga9eMI6Q7mXOox5dod1OOcutb1XoW18MCqqpFJZqsLtVMFjBEvlwiz6+CVq/Ij5DE19wOOzQknM5Ct4JFeCQqgQ3bNW/YMi7g1iORMx68aUpUaotqdggq+r3PCVrsrrb1DyUUknJWabElWLAI26Xez8fKQa8ltyR8yi1W7urUzV3kKAVp3Y3vn/h6W+nPVJjsfWdhemJUWFBI5DBgsrNitiGk0Nk195WSjH1OUImVnmslJdecAf8wBtm8XOzzGVOIlyRZjKMoDiLH/eNSqB4kU9NJ76t8XjcOSkxaBfsIS8t3ni1twEWQIDAQAB\n' +
                '-----END PUBLIC KEY-----';

            var privateEncoded = '-----BEGIN PRIVATE KEY-----\n' +
                'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCRA0oZXr+sBLVGlTUc2PNR4CwoekWpUYTCBr14wjpDuZc6jHl2h3U45y61vVehbXwwKqqkUlmqwu1UwWMES+XCLPr4JWr8iPkMTX3A47NCSczkK3gkV4JCqBDds1b9gyLuDWI5EzHrxpSlRqi2p2CCr6vc8JWuyutvUPJRSSclZpsSVYsAjbpd7Px8pBryW3JHzKLVbu6tTNXeQoBWndje+f+Hpb6c9UmOx9Z2F6YlRYUEjkMGCys2K2IaTQ2TX3lZKMfU5QiZWeayUl15wB/zAG2bxc7PMZU4iXJFmMoygOIsf941KoHiRT00nvq3xeNw5KTFoF+whLy3eeLW3ARZAgMBAAECggEAcT2qXcl50HEUxnu6MD7TNDrlAO8K+0AndgUhbO3v5fdGO3h7Wa5KQhd2iIHFrs/6zPpkq1GLqCf0gd1K344Na+cITUObGn40TgEtlLW7xKYxFHVFqsuTc04fbaGg6vO/ETruWze8Iiy+45ocIhbu7N8WTMCrgwX/eLwznnqL0U3znFcPF9E4sk5S6NtYmsUacqKNuhOyspUZqymcuGM1u/wXtBjIXoB4m9EMOssxFpc/BZeJcHQrTM7fA4qaKuzDvbDKsQwmaaPtDkOaZuqD5TYgjgKMFaWQtLPNSYtkFsN41N/WG6hRt4gunvdTBL0HijipySximsXZm03l//FliQKBgQDMBdkk6b8T65g8Ng6560yxvsj36UUIAGNeBVJYg6rMHCu91MG3SqD/2dAM9rEi9HumqPIZ3djdU+D9cQCP8m/NxDJ6oQaAklgexVBfr3OP/6S94YLOan+4jUcwWDzWs7MU2/6YCZvzbnn1IjM9OGmKhVwyMWtqh8HpNFQ4JQ8ezwKBgQC19N9YGURHNUJ8tfXIez+/PveuQsOF8UW5/pkPCIr0WsB45sz008VKec3g/RE8hXQInKAJiyGHO9QF8tUSJRQNc6AIWAVFTLw3s/ChbY38gjWceodhZOBpBJg8CbU9yVaQE5DBfuP57eMUu/GoaHsMlLwUaMcAY2TanAzhLcG0VwKBgG571EV7F3CQKpagp4Ti+Vtf97DY7/sPSsBFnXw1gS6bKszYBDdgAKPMri/2/6HwR23PG5wKWUAyBir5INbS8Ny7HKLvxHenyHSRYZ8PgkM+q1XwY0eowJWOXDi/7+JM2fO31r06putCrmSjKqBChlTvNygvPv4nmkjRf7IPz4pdAoGAPlxPU4VNVk5VnCJMu0oqXeQ5xNqS4kv/hrBQSsu1u+uCfa00X1BZFJ5MRijViHWAgBcV7k9lzVBe6S8BgXd9uOKA3Xs1SzvyYfDkrp66g+kocJm53lJRawytFB6LpEJlzXk3KmnPvm+eXRPQzdQJIBW1pBUI5wQpo5bJ/z7MXX8CgYEAgB2Dy0xVHxau4YgXM2eNHkjpP7+HF+q7NaeHetnaEBeM4+xJ/dV45KvxqptZzymVbzZFLUTKHFGGZT7ZsX76KL2IAe2gC98ik5twhqht/rhp/kfBuvb2GsFc5q8d9MTOLzS0YnyBq75hXt7urUi0XSmoz2s1qdKVoMQ1n6LPfq4=\n' +
                '-----END PRIVATE KEY-----'

            var plainText = Buffer.from('0123456789abcdef');
            var rsaPair = new NodeRSA();
            rsaPair.importKey(publicEncoded, 'pkcs8-public-pem');
            rsaPair.importKey(privateEncoded, 'pkcs8-private-pem');

            var encrypted = rsaPair.encrypt(plainText);
            var decrypted = rsaPair.decrypt(encrypted);
            console.log(decrypted);
        } catch (e) {
            console.log(e);
        }
    })

    it.skip('RSA Key generate', done => {
        var nodeRSA = new NodeRSA({
            b: 2048
        });
        var pemPublic = nodeRSA.exportKey('pkcs1-public-pem');
        var pemPrivate = nodeRSA.exportKey('pkcs1-private-pem');
        console.log('Public : ' + pemPublic);
        console.log('Private : ' + pemPrivate);
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

    it.skip('Generate KeyPair jsrsasign', done => {
        var keyPair = JRSA.KEYUTIL.generateKeypair('RSA', 2048);
        var jwPubkey = JRSA.KEYUTIL.getJWKFromKey(keyPair.pubKeyObj);
        console.log('e : ' + jwPubkey.e.toString());
        console.log('n : ' + jwPubkey.n.toString());
        console.log(JSON.stringify(JRSA.KEYUTIL.getJWKFromKey(keyPair.prvKeyObj)));
    });

    it('Decrypt with jsrsasign', done => {
        try {
            var privateKey = JRSA.KEYUTIL.getKey({
                "kty": "RSA",
                "n": "d41zfuC7n8loCB4Vzhk_l-eUkJwg2gouUUBPpdHecZ2Ih_FdsYOSUOd7V15ks9puo-ZTPjSMe-crvMQE6dHaky1EUd3Kk3X8MG1qvtI7IQSGLucZXWaRWURbyHI-tZtpa6z9QOgGfcfd18ILxUfq976SWbq1csmQxoRsCKDCPg9rImQ7ZunzDPQP64DcmEIxNWVWkH8BiRQqmsGaFvzzLIttpqJ9cSwlFv0ns1EGTmcCmSTw6pa7q19C0f7Zs5oOhUsKj1ElytoJoZLRsObwc_GAuHPLWRsfyPoWsREfia3Z39Odde7RXfdBri8xzauCKA9S7EVq5k3Y1gVUqbzT7Q",
                "e": "AQAB",
                "d": "aXT7FkaC-tYc0FxJe73F3OdIo681Q2CLrtx95ZWVFL-TeectcLLQ1FD8-fqn9gaOZkF72HleGsW2TRLUCrU0i3L4uwZb9Wu0A7vg12Z3Bg8JlkIAm-Un_YhRNiWgr23htjuoQiLp5vXw-KuQ2nswB02xpzkNaa3n6VVSPuIftcGLEml4SYN8PnsMxqYOzadO-tz-iRnOD8MUoGmUgyyxT9xD9ejjP5ItVbKgLGKqCZmMpVOUkOqHBF3oadKccfBCrcIoN5qlKA-uZW3Gd6G8az8zy8tvJu-1yRCA0GhjaKYD5DCFLF5OpWZcNbL55R4PByxsZBgl776Yj7jcegpfQQ",
                "p": "t1zD58BLsQhTXap-6v88wqUSyb1JgjSo3gFl2rmGylEvtTQirWza_2F5I1OKiyb2n9gKChDX5FJGnRJM0MHkzc8G0_TPSV0xUagIzWW1kAEX6EpvxiLUHqhCY2PN4GjKMrP7un6kVCtCeWovnWZLwbzmRE2zxLk486y0T_4BIWU",
                "q": "pumSo-VpmP1yuZjupcueVFRqokQ1dPFhLKWNkhY4_CMv6qMHmMj69bBqGm5ybhknt13Lh4ZYzfuOwW-MK_p7VjT01y8AhlbOKY5Eaci7-TPxd9wP9rZN9mYm7A9JqNqdXVnBDFlTtEvYeeJrgg1xv2LCBXffQCF-rVGyPr-YQ-k",
                "dp": "J2s47nSHkSpyCZvipxBx9oJYVKhtyiEaAIgaZngmAw6LDBCGN_RD7Ez_JtoJ2bppoJloJxvR3dLWPWQ2wVY9owUTubNScLopJR3Trpxj-O5TPmvqNZU9Ns4DX6yQEONWPKo2vrQFDdcy9jkevV7FgIPkmOB_ehY7qR8CsIOxqIU",
                "dq": "DydZluO3KJqqFcuarxbDcyiO3diPeeSITANjzQWTeuC-8vCGOgrVLgUsPOYWIYTLJEyxs8YwvdK-7TTxZvTAydzY9chgpdGvufoen_QHjOJ4Y8do858tiNdRZVEmANyIOPdzHWnmvZG9P6Oc2xvZXeTbdJ-jdzETTS0Dn8rJSjE",
                "qi": "pzERnlytJPjBoPU7n8xyxHgW4uYUNN7WAiBua_acSbRdL8KWAJF4a1r-UG7qigAdcRaPkXQM7ktgMNiG_AZzNP1SHauDiFVCvPSBM2jcCZfI8GqOIHr3jW0AfySuqZE20JYbazHtKQFKdZU2Rf4882RPsR59FGseG_egIqGoce4"
            });

            var key = 'UFm053Yza23o/PDLb6yG8GvxtaRe2Ct1SpfIGMtqoFLets5kqOUzeXTBofHRBoYErffvC4dsC6v0P0xhX3vZqkpa4TLc1VIytpZ4lNiGgy7XKcTn++9goYNQrfOpXNXZc6hk1YNQ8VTedv/a0fnxkyxWWFtXPuOZnQHOevMC48hANxWn2NUfGhW8IRIQZXEYWLRUG8y3rxWr8zCy7omUH1Hire3A+CcAZQX6Y/6GsE2Qg4bq62AXbKdOga/PSGJbH68HBYy83h65h5Gfi5emsBBulVNKbcmB8egRRcuoQfyCB7n5aD4K3fhwsqaHEMt4Ud8eEKw7Inv0bcyTWcG7dA=='
            var iv = 'fOFa37501E4IT6tYp3dOPw==';
            var records = 'y7Bjc9RwTs0zp1xbhHriqQ==';

            key = Buffer.from(key, 'base64').toString('hex');
            var decryptedKey = Buffer.from(JRSA.crypto.Cipher.decrypt(key, privateKey), 'utf-8');
            var parsedKey = CryptoJS.enc.Base64.parse(decryptedKey.toString('base64'));
            var parsedIv = CryptoJS.enc.Base64.parse(iv);
            var decryptedMsg = AES.decrypt(records, parsedKey, {
                iv: parsedIv
            });
            console.log(decryptedMsg.toString(CryptoJS.enc.Utf8));
        } catch (e) {
            console.log(e);
        }
    });

    it.skip('CryptoJS AES encrypt test', done => {
        var plain = 'Hello, World!';
        var encrypted = AES.encrypt(plain, 'mykey');
        var decrypted = AES.decrypt(encrypted.toString(), 'mykey');
        console.log(decrypted.toString(CryptoJS.enc.Utf8));
    });
})