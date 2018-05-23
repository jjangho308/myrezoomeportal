import chai from 'chai';
import chaihttp from 'chai-http';

import app from '../app';

import Managers from '../core/managers';
import Initializer from '../core/initializer';
import Util from '../util/util';
import CryptoManager from '../modules/crypto/crypto';

/**
 * Test suit for '/client' SearchRecords command test. <br />
 * 
 * @since
 * @author TACKSU
 */
describe('Portal <-> Agent Search Record interpolation test suite.', () => {

    var token = null;

    /**
     * Prepare test scenaio. <br />
     */
    before('Initialize', () => {
        Initializer();
        token = Managers.token().issueToken({
            uId: 'UID2'
        })
        chai.use(chaihttp);
    })

    /**
     * First contact test case. <br />
     * 
     * @author TACKSU
     */
    it.skip('First search records', done => {
        var cryptoManager = new CryptoManager();
        cryptoManager = Managers.crypto();
        // cryptoManager.generateRSAKeyPair((err, keyPair) => {
        //     chai.request(app)
        //         .post('/client')
        //         .set('Content-Type', 'application/json')
        //         .set('Authorization', 'Bearer ' + token)
        //         .set('Cookie', 'jwt=' + token)
        //         .set('X-Requested-With', 'XMLHttpRequest')
        //         .send({
        //             cmd: 'SearchRecord',
        //             args: {
        //                 pkey: keyPair.public
        //             }
        //         })
        //         .end((err, res) => {
        //             done();
        //         });
        // });

        chai.request(app)
            .post('/client')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .set('Cookie', 'jwt=' + token)
            .set('X-Requested-With', 'XMLHttpRequest')
            .send({
                cmd: 'SearchRecord',
                args: {
                    pkey: 'asdfasdf'
                }
            })
            .end((err, res) => {
                done();
            });
    })


    /**
     * Refresh search records. <br />
     * 
     */
    it('Refresh search records', done => {
        chai.request(app)
            .post('/client')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .set('X-Requested-With', 'XMLHttpRequest')
            .set('Cookie', 'jwt=' + token)
            .send({
                cmd: 'SearchRecord',
                args: {
                    pkey: ''
                }
            })
            .end((err, res) => {
                done();
            });;
    })

    it.skip('Update search records', done => {
        chai.request(app)
            .post('/records')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .set('Cookie', 'jwt=' + token)
            .set('X-Requested-With', 'XMLHttpRequest')
            .send({
                cmd: 'SearchRecord',
                args: {
                    pkey: ''
                }
            })
            .end((err, res) => {
                done();
            });;
    })

    /**
     * Test case for SearchRecord command on RequiredKey phase. <br />
     * 
     * @since 180417
     * @author TACKSU
     */
    it.skip('Required Key phase test case', done => {
        chai.request(app)
            .post('/records')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .set('Cookie', 'jwt=' + token)
            .set('X-Requested-With', 'XMLHttpRequest')
            .send({
                cmd: 'SearchRecord',
                args: {
                    pkey: '',
                    orgcode: 'OPIC',
                    requiredKey: [
                        'key1',
                        'key2'
                    ]
                }
            })
            .end((err, res) => {
                done();
            });
    })

    it.skip('Agent Search Results Response', done => {
        chai.request(app)
            .post('/agent')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .send({
                "mid": "5b675e15-1ba9-49b2-9f1b-f08340e37e7d",
                "cmd": "SearchResult",
                "code": "OK",
                "args": {
                    "keyEnc": "AGENCY PUBLIC KEY - asdfasdf",
                    "dataEnc": "AES - MapperEntity [name=YOOSEONGYEON, grade=IM2, date=20180313]",
                    "dataHash": "HASH - MapperEntity [name=YOOSEONGYEON, grade=IM2, date=20180313]"
                }
            })
            .end((err, res) => {
                done();
            });;
    });
})