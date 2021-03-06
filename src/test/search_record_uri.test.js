import chai from 'chai';
import chaihttp from 'chai-http';

import app from '../app';

import Managers from '../core/managers';
import Initializer from '../core/initializer';
import Util from '../util/util';
import CryptoManager from '../modules/crypto/crypto';

describe('Portal <-> Agent Search Record interpolation test suite.', () => {

    var token = null;

    before('Initialize', () => {
        Initializer();
        token = Managers.token().issueToken({
            uId: 'UID1'
        })
        console.log(token);

        chai.use(chaihttp);
    })

    it('First search records', done => {
        var cryptoManager = new CryptoManager();
        cryptoManager = Managers.crypto();
        var keyPair = cryptoManager.generateRSAKeyPair();
        chai.request(app)
            .post('/client')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .set('Cookie', 'jwt=' + token)
            .set('X-Requested-With', 'XMLHttpRequest')
            .send({
                cmd: 'SearchRecord',
                args: {
                    pkey: keyPair.public
                }
            })
            .end((err, res) => {
                done();
            });;
    })

    it.skip('Refresh search records', done => {
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
    it('Required Key phase test case', done => {
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
            });;
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
    })
})