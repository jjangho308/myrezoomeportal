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

            var encrypted = rsaPair.encrypt(Buffer.from(plainText, 'utf-8'));

            rsaPair.importKey(privateEncoded, 'pkcs8-private-pem');
            var decrypted = rsaPair.decrypt(encrypted);
            console.log(decrypted.toString('utf-8'));
        } catch (e) {
            console.log(e);
        }
    })

    /**
     * RSA Encrypt/Decrypt test case. <br />
     * 
     * @since 180502
     * @author TACKSU
     */
    it.skip('RSA Encrypt decrypt test with crypto manager.', done => {
        var crypto = Managers.crypto();

        var data = 'Hello, World!';
        var publicEncoded = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkQNKGV6/rAS1RpU1HNjzUeAsKHpFqVGEwga9eMI6Q7mXOox5dod1OOcutb1XoW18MCqqpFJZqsLtVMFjBEvlwiz6+CVq/Ij5DE19wOOzQknM5Ct4JFeCQqgQ3bNW/YMi7g1iORMx68aUpUaotqdggq+r3PCVrsrrb1DyUUknJWabElWLAI26Xez8fKQa8ltyR8yi1W7urUzV3kKAVp3Y3vn/h6W+nPVJjsfWdhemJUWFBI5DBgsrNitiGk0Nk195WSjH1OUImVnmslJdecAf8wBtm8XOzzGVOIlyRZjKMoDiLH/eNSqB4kU9NJ76t8XjcOSkxaBfsIS8t3ni1twEWQIDAQAB';

        var privateEncoded = 'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCRA0oZXr+sBLVGlTUc2PNR4CwoekWpUYTCBr14wjpDuZc6jHl2h3U45y61vVehbXwwKqqkUlmqwu1UwWMES+XCLPr4JWr8iPkMTX3A47NCSczkK3gkV4JCqBDds1b9gyLuDWI5EzHrxpSlRqi2p2CCr6vc8JWuyutvUPJRSSclZpsSVYsAjbpd7Px8pBryW3JHzKLVbu6tTNXeQoBWndje+f+Hpb6c9UmOx9Z2F6YlRYUEjkMGCys2K2IaTQ2TX3lZKMfU5QiZWeayUl15wB/zAG2bxc7PMZU4iXJFmMoygOIsf941KoHiRT00nvq3xeNw5KTFoF+whLy3eeLW3ARZAgMBAAECggEAcT2qXcl50HEUxnu6MD7TNDrlAO8K+0AndgUhbO3v5fdGO3h7Wa5KQhd2iIHFrs/6zPpkq1GLqCf0gd1K344Na+cITUObGn40TgEtlLW7xKYxFHVFqsuTc04fbaGg6vO/ETruWze8Iiy+45ocIhbu7N8WTMCrgwX/eLwznnqL0U3znFcPF9E4sk5S6NtYmsUacqKNuhOyspUZqymcuGM1u/wXtBjIXoB4m9EMOssxFpc/BZeJcHQrTM7fA4qaKuzDvbDKsQwmaaPtDkOaZuqD5TYgjgKMFaWQtLPNSYtkFsN41N/WG6hRt4gunvdTBL0HijipySximsXZm03l//FliQKBgQDMBdkk6b8T65g8Ng6560yxvsj36UUIAGNeBVJYg6rMHCu91MG3SqD/2dAM9rEi9HumqPIZ3djdU+D9cQCP8m/NxDJ6oQaAklgexVBfr3OP/6S94YLOan+4jUcwWDzWs7MU2/6YCZvzbnn1IjM9OGmKhVwyMWtqh8HpNFQ4JQ8ezwKBgQC19N9YGURHNUJ8tfXIez+/PveuQsOF8UW5/pkPCIr0WsB45sz008VKec3g/RE8hXQInKAJiyGHO9QF8tUSJRQNc6AIWAVFTLw3s/ChbY38gjWceodhZOBpBJg8CbU9yVaQE5DBfuP57eMUu/GoaHsMlLwUaMcAY2TanAzhLcG0VwKBgG571EV7F3CQKpagp4Ti+Vtf97DY7/sPSsBFnXw1gS6bKszYBDdgAKPMri/2/6HwR23PG5wKWUAyBir5INbS8Ny7HKLvxHenyHSRYZ8PgkM+q1XwY0eowJWOXDi/7+JM2fO31r06putCrmSjKqBChlTvNygvPv4nmkjRf7IPz4pdAoGAPlxPU4VNVk5VnCJMu0oqXeQ5xNqS4kv/hrBQSsu1u+uCfa00X1BZFJ5MRijViHWAgBcV7k9lzVBe6S8BgXd9uOKA3Xs1SzvyYfDkrp66g+kocJm53lJRawytFB6LpEJlzXk3KmnPvm+eXRPQzdQJIBW1pBUI5wQpo5bJ/z7MXX8CgYEAgB2Dy0xVHxau4YgXM2eNHkjpP7+HF+q7NaeHetnaEBeM4+xJ/dV45KvxqptZzymVbzZFLUTKHFGGZT7ZsX76KL2IAe2gC98ik5twhqht/rhp/kfBuvb2GsFc5q8d9MTOLzS0YnyBq75hXt7urUi0XSmoz2s1qdKVoMQ1n6LPfq4='

        crypto.encryptRSAPublic(Buffer.from(data, 'utf-8'), publicEncoded, (err, encrypted) => {
            crypto.decryptRSAPrivate(encrypted, privateEncoded, (err, decrypted) => {
                console.log(decrypted.toString());
                if(data == decrypted.toString()){
                    done();
                }
            });
        });
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

    it.skip('Decrypt with jsrsasign', done => {
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

            var key = 'JSh3WbI+1bpxtziPGiUwdAPRw1iTQeoKpMYY3+lnGkBhl/x3MPQSGH/O2iBWiTfwEGNF7164mNc1bFrNE/GndpuYDDi+uncIPGJd3hl1uMOugxIp2udPpog4/KLCP4KZ9dq0OMy4sZWW0v4M7ytHAjHtDK+ljrlrRjPk2l/+aHNaQuXRUiLIBcD0qGPe+1eRAVSW9XidyWplyZR0NCVe0tUA1dxM31uif1qxy7aAegmuNgQy74M6vhy1oSNY/fKrHGuGq4XW3fYrIemNEUgVFVwAky3QbMOLPVY+QIAyhbbiAoBKYrccwqb9xvwwhX49d1ZyEakZ0KPfumvO/sCgtA==';
            var iv = 'f72c8vj1R/4MJX2+WCy8ZA==';
            var records = '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';

            key = Buffer.from(key, 'base64').toString('hex');
            var decryptedKey = JRSA.crypto.Cipher.decrypt(key, privateKey);

            var parsedKey = CryptoJS.enc.Base64.parse(decryptedKey);
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
        var decrypted = AES.decrypt("x/IklTi+cog6Jmnet0MeqA==", CryptoJS.enc.Base64.parse('WJpt1KLQe4SKOgH9ytjvBVMMIU5gRC0RWdGWEpxh6H0='), {
            iv: CryptoJS.enc.Base64.parse('S2bQC5cOOPcN8YzXHRXrqg==')
        });
        console.log(decrypted.toString(CryptoJS.enc.Utf8));
    });

    /**
     * Generate RSA2048 KeyPair test case. <br />
     * 
     * @since 180502
     * @author TACKSU
     */
    it('Generate RSA2048 Key pair', done => {
        var crypto = Managers.crypto();
        crypto.generateRSAKeyPair((err, keyPair)=>{
            console.log('Public Key : ' + keyPair.public.toString('base64'));
            console.log('Private Key : ' + keyPair.private.toString('base64'));
            done();
        });
    })
});