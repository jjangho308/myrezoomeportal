//import DatabaseManager from '../modules/db';
import crypto from 'crypto';
import DataManager from '../modules/db/db';
import NexledgerService from '../modules/blockchain/nexledgerservice';
import initializer from '../core/initializer';

import Managers from '../core/managers';

import CryptoManager from '../modules/crypto/crypto';
import Util from '../util/util'

describe.skip('Cassandra test suit', () => {
    var csdr = null;
    before('DB module initialize', () => {
        Initializer();
        /*
        db = new DatabaseManager();
        db.connectCsdr({
            contactPoints: ['127.0.0.1'],
            keyspace: 'rzm_anchor'
        })
        */

        // csdr = new AnchorDAO('127.0.0.1', 'rzm_anchor');
    })
    it('asdf', done => {
        Managers.db().init();
    })

    it.skip('Put transaction', done => {

        var current_date = (new Date()).valueOf().toString();
        var random = Math.random().toString();
        var testTxId = crypto.createHash('sha256').update(current_date + random).digest('hex');

        console.log("put data : %s, %s, %s, %s, %s, %s", "LKW", testTxId, "0", "2", "OPIC", "OPIC")
        csdr.putanchordata("LKW", testTxId, "0", "2", "OPIC", "OPIC", done2 => {
            console.log("====================put test====================");
            //console.log(done2);

            if (done2 != null) {
                console.log("insert success");
            }

            console.log("================================================");

            if (done2 != null) {
                done();
            }

        });

        /*
        csdr.putanchordata("LKW","1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b","0","1","OPIC", done2 => {
            console.log(done2);
        });
        */

    })

    it.skip('GetbyTxId transaction', done => {
        csdr.getbyTxId('421fc7b7c9fcd4e4436228af0652732d7145edf4', done2 => {
            console.log("====================get TxId test====================");
            console.log(done2);
            console.log("=====================================================");
            if (done2 != null) {
                done();
            }
        });

    })

    it.skip('GetbyUsrFormId', done => {
        csdr.getbyUserIdAndFormId("LKW", "2", done2 => {
            console.log("===============get GetbyUsrFormId test===============");
            console.log(done2);
            console.log("=====================================================");
            if (done2 != null) {
                done();
            }
        });

    })

    after('Disconnect cassandra connection', () => {
        csdr.close();
    })
})

describe('Blockchain test suit', () => {
    var nodeurl = null;
    var nexledgerService = null;

    before('Blockchain module initialize', () => {
        //initialize();
        nexledgerService = new NexledgerService();
        nodeurl = "http://DEVNexledgerEXTELB-809568528.ap-northeast-2.elb.amazonaws.com:18080";
    });

    it.skip('Put Nexledger', done => {

        // var data = {
        //     name: "lkwook",
        //     subject: "meth",
        //     score: "80"
        // };
        var data = {
            hash: "dddddddddddddddddddddddddddddddd"
        }

        for (var t = 0; t < 100; t++) {

            nexledgerService.put(nodeurl, "155WAnc5m7RFjjLgQJjQN82nr7xjYXN2wg", data, function (res) {
                console.log("==========test put procedure==========");
                console.log(res);
                console.log("======================================");

            });
        }
        done();
    });

    it('Get Nexledger', done => {

        var rtxid = "ce4437fdaec125c88c694ada6b58a1993cfb411bc08845c11312b3f477cce2c4";

        nexledgerService.getbytxid(nodeurl, rtxid, function (res) {
            console.log("==========test get procedure==========");
            console.log(res);
            console.log("======================================");
            done();
        });
    });

    it.skip('New Account Nexledger', done => {

        nexledgerService.newaccount(nodeurl, function (res) {
            console.log("==========test get procedure==========");
            console.log(res);
            console.log("======================================");
            done();
        });
    });
})

describe('MySQL test suit', () => {
    //var db = Managers.db();
    before('DB module initialize', () => {
        initializer();
    });

    it('Encrypt with hashed key', done => {
        // var publicKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjwgV2L4NBYzJ2UMeEU2cgSWLsLFb8SUsVgFWMNkyFHUpIscMVE8MEvvomfW3dISuj5JEtAfUpCaEESoDLhjK8ut7xjG3rkiAn2URLJzhAi1CczLmVVN+WZFS2WD+9hJchHM65DNOWbvZMJdD/yDPn+1Ep8sKBI/ufFYXondkpfdBSm1JgaRA0lqAOx6FxaWfpVShLkQyAqhtdhdoN7i+7jrR/PjZL+z0mfdMRfbyAd39r3Lj9kARDmcWCs0mAqxweCg9eAWhaX/S0A/kxepG320oOqx9hb549rHLjaQSeGRDvzR5M7yj/msN9FELZiIJDYlM4FCps1MgJR17MKbl+QIDAQAB"; 
        // var privateKey = "MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCPCBXYvg0FjMnZQx4RTZyBJYuwsVvxJSxWAVYw2TIUdSkixwxUTwwS++iZ9bd0hK6PkkS0B9SkJoQRKgMuGMry63vGMbeuSICfZREsnOECLUJzMuZVU35ZkVLZYP72ElyEczrkM05Zu9kwl0P/IM+f7USnywoEj+58Vheid2Sl90FKbUmBpEDSWoA7HoXFpZ+lVKEuRDICqG12F2g3uL7uOtH8+Nkv7PSZ90xF9vIB3f2vcuP2QBEOZxYKzSYCrHB4KD14BaFpf9LQD+TF6kbfbSg6rH2Fvnj2scuNpBJ4ZEO/NHkzvKP+aw30UQtmIgkNiUzgUKmzUyAlHXswpuX5AgMBAAECggEAOEHU3fA6jPFIPyUwAVxGb2GGJRRNdnbJjnZuIT58fSFr8Zra1ZpVxG3CmjPUWYcKZbwBO9JMp9fiYCHnKE1mHc/TWiwZ8/neZVNKQwLdWY7VsRvXDr6NVstbC9cj0UN9kjcEdddcPN0u2vbULtgH8f5P37NzmEHIaq0uFJ/jPYd9HFRNH3MN9JfJd6OkGiaeZ5RMDD6kRp40KbF7Dv40vRE0PT3q47vT6OsWqA1wKjexhaX94UuQWGZFC/Zj/M/gtXGEqIFdegznZIbrkWxLLUsMyyrdwtgSe9+1BZX18+oVxNgMQULLNsPVTMVR1H7QhnLoNIyVoBiUcPgQjgp/JQKBgQDy0B5uDsmXba5GHpKXoZ03J+O/CMQ1tMuZv6Bh/a8pHaGFUXRxY/2vRVSCnEVwIsni0+MmotoYlGqDs7/plptnZFseSP+5hyG47H3JV9ohyVrsGtlfQmlbv5EOENtS974t0SeVi6I6qWEMyQ3yaAx6q0Ex/R2utGbIAPS6wV0HewKBgQCWzK8yVJdzzB6+nv5clEobvRqQXdLY8i6Dr+TY9HnKxqNliJtlKxRjRCPUbVHi4lPWPRoY/8McOEFDIqZO5HScnTLyX46pEwmKld/ysC1liOUixHg/SZ7kCAB24fb7pd78RJ0Z6JElUR2g1DzTMmp6lAX+3d48Ea508lQi8UyUGwKBgBV4Z6htsE+uiCF1JJs51DADW/URbmAdW3993U2s4+cr0pN6T2STZeQwqjdeYBl5Sga/m69X6RcRUJXSuB6MjbNHwXLdG5epJkc2yiyakxQ3vM1x1lTBB5XwS4BF507fzzY371se3Lp5Lba2tIAByVCzgfFMo2pGU2xOAVXeMT6vAoGACN0G/yJRtJCuze1ybeaZZH/867dYCUBS05KnFMlpzy1VtUYOPCgIDr2WjYnPYlKDMvhsbEO8KBB2ZYfH1qM+52Wl9PEA5Zck3GxquUz5nhopvZ1mo/Gj0StXO6WUar4ZGSK/SSKORW87GpTe7lrsP0AsCgroYQd5BY6ou1ULdzkCgYBM+XE+beamQWR78I8PKyTFRB4eqj7NGABANGywqC31CKf960FfopSA292AthALd7GQ5yMvfmIsheffVgCWTlAmpdXMHsMf20JrKwn9driXAbW4hHCGN9CDiO4Bwq2Vsbz68sigX7ReLlrnrj6Pl4w49jlpTDEwZ/wsmgXdXJTf+w=="
        // //var plain = "giemncc3LqXT+o8MWucPqkGQPCmsBliHCwCOlxoHY6k=";
        // var plain = "hello world";
        // var crypto = Managers.crypto();
        // crypto.encryptRSAPublic(plain, publicKey, (err, encrypted) => {
        //     console.log("######");
        //     console.log(encrypted);
        //     console.log(encrypted.toString('base64'));

        //     crypto.decryptRSAPrivate(encrypted, privateKey, (err, result) => {
        //         console.log(result.toString());
        //         if (plain == result.toString()) {
        //             done();
        //         }
        //     })
        // });

        var msgString = "KCuYKAmztvm1uDdklhI/Xz+aGZe6V3ATg1eBty+01ZMoX+PBejI1QJOe25ju3HM3dpgvHaVMuvzzmVU9Ytub1Q==";        
        var crypto = Managers.crypto();
        crypto.generateAESKey((err, aesKey) => {
            if (!!err) {
                console.log(err);
            } else {
                crypto.encryptAES(msgString, aesKey, (err, encodedIV, encryptedMsg) => {
                    if (!!err) {
                        console.log(err);
                    } else {
                        crypto.decryptAES(encryptedMsg, aesKey, encodedIV, (err, decryptedData) => {
                            console.log(decryptedData);
                        });                                             
                    }
                });
            }
        });
   

        // var plain = "test";
        // var passcode = "testpasscode";
        // Util.sha256(passcode, (hashed) =>{
        //     console.log(hashed);
        //     var crypto = Managers.crypto();
        //     crypto.encryptAES(plain, hashed, (err, encodedIV, encryptedData) => {
        //         if (!!err) {
        //             console.log(err);
        //         } else {
        //             var verifyData = {
        //                 encrypted: true,
        //                 iv: encodedIV,
        //                 data: encryptedData
        //             };
        //             console.log(verifyData);
                                        
        //             crypto.decryptAES(encryptedData, hashed, encodedIV, (err, decryptedData) => {
        //                 console.log(decryptedData);
        //             });
                    
        //             done(ClientRequest.RESULT_SUCCESS, verifyData);
        //         }
        //     });
        // });

        // var shareModel = { 
        //     txId: 'bf14acbc2cd790a5b0bcbbcf5246c85d4388676e748098402a1aad42663ca8f4',
        //       passcode: '73l8gRjwLftklgfdXT+MdiMEjJwGPVMsyVxe16iYpk8=',
        //       certId: '8b4932fa-83d6-4221-88d6-cc9b98615519',
        //       url: 'cmkHFpV',
        //       sharedYn: 'N',
        //       pubYn: 'N',
        //       expired: '0000-00-00 00:00:00',
        //       created: undefined,
        //       encData: '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' 
        //       }
        // var crypto = Managers.crypto();     
        
        // console.log(crypto.getSystemSymmetricKey());
        // console.log(shareModel.encData);
        
        // crypto.decryptAESECB(shareModel.encData, crypto.getSystemSymmetricKey(), (err, decrypted)=> { // decrypt with clientkey

        //     console.log(err);
        //     console.log(decrypted);
        //     if("N" == shareModel.pubYn) { // encrypt with user's passcode when pubYn is N                                
        //         crypto.encryptAES(decrypted, shareModel.passcode, (err, encodedIV, encryptedData) => {
        //             if (!!err) {
        //                 console.log(err);
        //             } else {
        //                 var verifyData = {
        //                     encrypted: true,
        //                     iv: encodedIV,
        //                     data: encryptedData
        //                 };
        //                 console.log(verifyData);
        //                 done(ClientRequest.RESULT_SUCCESS, verifyData);
        //             }
        //         });                            
        //     } else {
        //         var verifyData = {
        //             encrypted: false,
        //             iv: "",
        //             data: decrypted
        //         };
        //         console.log(verifyData);
        //         done(ClientRequest.RESULT_SUCCESS, verifyData);
        //     }
        // });  
    });

    it.skip('Encrypt with ebc algo', done => {
        var crypto = Managers.crypto(); 
        var data = '{"data":{"id":"12060992","status":"JAEHAK","entranceDate":"2018-02-01","graduDate":"2018-08-01","name":"박헌욱","date":"2018-02-01 ~ 2018-08-01"},"hash":"34ccbc51eccd9bd3944f7f092b7c8b324c5af9f63cf9bac2b9d59df5d0d7dce0","txid":"785267710bde9decc12cf503f3a8f1accd58dc2fd30891ae443fca5a2bf637ab","subid":"RCOGC0008","stored":"Y","dftYn":"N"}';                                 
        crypto.encryptAESECB(data, crypto.getSystemSymmetricKey(), (err, encrypted)=> { // decrypt with clientkey   
            console.log(encrypted);
        }); 
    });
    
    it.skip('RSA Decrypt Test', done => {
        var privateKey = "MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQClmhKzgvKdMBFiWQIZWkSg91H/4Zwe9LTnajBwoxImTr324/YS5Jht4H2elUaQGtUKiZvWhS/dyI3rUkQ+ZDkj3KT0qmaKFpKbU8wrD0vcvizildFBKJ38roCa0euMx87sstk45NCHj00IdBxyXykmkwvuv3mbNNmtGQqXRLzE5y9t5cNGY+8cwmjp/xx2L4ca73a6sln+Pzubgf+ZwhX50lPEKke/KomLFFNcAow5pTyk8eYChBPMIYO/JMgrp9TPhuQlvh1ZYY+VeXnHw0mU2qrMOTsp8UhzufvAOCsWvmsTJutl6JnWo8oMJoT2SHoBGFni09H83FGqfIMrUi97AgMBAAECggEAGYzZiM/R3fW+IOXpwH6gaxNtl+S3wUDxLmlAWwiV8sogXhjS7RxO9lj2GMMgVXiGWS9dF26KMZZRazbQp62v8TwISWWHF5Qe/48gx53/Dupao4UI+ZwqMAO+fOSZiqmDYBrCEBihoeC2unCruOu8viJe63Gocg1n7mCYNTmaRGjFKROSDg9q37ud12bCsdb/yKpgYhqQWDp1KSj7dwsz8jVPYzscucilXGOoqcCmuX1ZMjFAAedYD2uRfr1EkYV0gI3h0MW5O21QcyZM6xtv0wylSIth9EZ2oQTE0OO8lNGFrFm9OHtZoBuqSwIAZjzFqxCO11rOFBR9XRMtL4l2WQKBgQDhbuuTdU5a7I4y5TvUjHYnKzc0nVcOV8FGbx0zfkIGVnqxdgn3xxxtMsvtVhr1DrtLXPBHU8VV1TRkgGiy7MMlfWCAqxRLem5480phLTScU7Hf2BxkWqk0EgLKxmyfNzrh6UZmTH6Ogkt65CSisLD8ya5ol47TJqxhw0npQ5YnqQKBgQC8DlOeRksW6ZfVlT+WosdsRk1g2dKutg4ErXJ3N2viFMJYgMY4bRbnq6QPWaKP9g+vvs+f/scy9rH06zE4YRwN2CWYKVELDBCF+1I/fnvRGtECA8e1Ve+VgKGPv6OVRvjVO94TMHbW8rzi5LSXXQTZ8lqj8B8/mi68Z79PdztEgwKBgA523HyooS9qUDFpze30WTxoJHGmysgrz0XiqT/9kOTxNYwfY8JXLza+dKE0ziP9Hv1V6EDbWiUIugTczFr2oArOwZtf3rx9DYuLKLGVgfOp1xbiueeifYrOwQkbtCp/E7MdEZxMui4QpCEtdEBQD/sYQa2KU+quZ48aRarG4GKJAoGAEdwKdO2YFAT7Nn2GHHg5GD9U+e215IHFswwF4uyQglgWXPFd4d36XuYeHpcUqTdlJfupHDjGEkD7hZcQhZozX903NMw3tiTfLNpBZWZNu/4f+2EAhmgy6K/eqBg7IOIsn5Of85KWtrM23RV7USS0YT5y/T7AuPmblqkDsjhQmKECgYAJarVV6J2nJ9pKM9MBdFAh1gufxBWFUa1cBqiK+BysIrKzD9QxfdYNV1IPi7eD5ksfrdAcgb0A9/p1Dwf5AKz8x2bpvB4dFr4MSA6b0nWGSlqyufgr6KbVIi8DXAXrrxrZzyzAwGjOPjDuLFpwypmSv/qH0IkEH5no2Io7jpI8Ag=="
        var encrypted = "TcPRgOMqgotra1g+641cTGHZrPMKHuJaAtwkoRgNdMSMOm0zLfK25qFN90DEYgaZgGV1l+rLlyWbhMAye+T/lxnkyyPyc5frPCciyOsej6cuDA/SsKv98ENuWzjkhDuz4MHRDZ3iwWCYtK/8a3u5hIepQ6of4u7tMxYDlmi+eZM7zicpGjG4T0xWfCEkwONfjc77Qhcm3L19b5o2kNxcbRYlZgrQ7hrVPIUJOSHvifp2VIylRBYnKC08BJN6MoSrcbgInjGJTU4KbMdSCViq2twSjTyWx8A3Zau18KLkX2GVS1cRcQgZ10XHd7kfQekzBCE8PtmZp56e0hCCtzsbOg==";
 
        var crypto = Managers.crypto();
        crypto.decryptRSAPrivate(Buffer.from(encrypted, 'base64'), privateKey, (err, decrypted) => {
            console.log(decrypted.toString());            
        })
 
    });

    it.skip('RSA Decrypt Test', done => {
        var publicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjwgV2L4NBYzJ2UMeEU2cgSWLsLFb8SUsVgFWMNkyFHUpIscMVE8MEvvomfW3dISuj5JEtAfUpCaEESoDLhjK8ut7xjG3rkiAn2URLJzhAi1CczLmVVN+WZFS2WD+9hJchHM65DNOWbvZMJdD/yDPn+1Ep8sKBI/ufFYXondkpfdBSm1JgaRA0lqAOx6FxaWfpVShLkQyAqhtdhdoN7i+7jrR/PjZL+z0mfdMRfbyAd39r3Lj9kARDmcWCs0mAqxweCg9eAWhaX/S0A/kxepG320oOqx9hb549rHLjaQSeGRDvzR5M7yj/msN9FELZiIJDYlM4FCps1MgJR17MKbl+QIDAQAB';
        crt = ursa.createPublicKey('-----BEGIN PUBLIC KEY-----' + publicKey + '-----END PUBLIC KEY-----');
        //crt = ursa.createPublicKey(fs.readFileSync('./certs/client/my-server.pub'));
        
        console.log('Encrypt with Public');
        msg = crt.encrypt("Everything is going to be 200 OK", 'utf8', 'base64', ursa.RSA_PKCS1_PADDING);
        console.log('encrypted', msg, '\n');
        
        console.log('Decrypt with Private');
        msg = key.decrypt(msg, 'base64', 'utf8');
        console.log('decrypted', msg, '\n');
        
        console.log('############################################');
        console.log('Reverse Public -> Private, Private -> Public');
        console.log('############################################\n');
        
        console.log('Encrypt with Private (called public)');
        msg = key.privateEncrypt("Everything is going to be 200 OK", 'utf8', 'base64');
        console.log('encrypted', msg, '\n');
        
        console.log('Decrypt with Public (called private)');
        msg = crt.publicDecrypt(msg, 'base64', 'utf8');
        console.log('decrypted', msg, '\n');
    });
    
    it.skip('Get default yn', done => {

        var data = {
            uid : "UID2",
            txid : "7c731bfa671da3769414218c1ddd83722e735155bd80a8e0d4e971204f77f7d9"
        };

        db.getRecordDAO().getDefaultYn(data, function (dbres) {
            console.log(dbres);
            console.log(dbres.DFT_YN);
        });
    });

    it.skip('Get user', done => {
        db.getUserInfo('rezoome', function (res) {
            console.log(res);
            done();
        });
    });

    it.skip('Get org', done => {
        var orgcodes = ["01", "02"];
        db.getOrgInfo(orgcodes, function (res) {
            console.log(res);
            done();
        })
    });

    it.skip('Get org all', done => {
        var orgcodes = ["01", "02"];
        db.getOrgAllInfo(function (res) {
            console.log(res);
            done();
        })
    })
})