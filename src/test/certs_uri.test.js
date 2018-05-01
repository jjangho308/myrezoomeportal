import chai from 'chai';
import chaihttp from 'chai-http';

import app from '../app';

import CertModel from '../models/cert/cert';
import CertDao from '../dao/cert_dao';

import Util from '../util/util';

import Managers from '../core/managers';

import Terminator from '../core/terminator';

/**
 * Test suit to test '/cert' URI. <br />
 * 
 */
describe('/certs URI Page test suite.', () => {

    var jwtToken = null;
    before('Service initialize', () => {
        jwtToken = Managers.token().issueToken({
            uId: 'UID2'
        })
        chai.use(chaihttp);
    });

    it.skip('Cert HTML Page', done => {
        chai.request(app)
            .get('/certs')
            .set('Content-Type', 'text/html')
            .set('Authorization', 'Bearer ' + jwtToken)
            .send()
            .end((err, res) => {
                done();
            });
    });

    it.skip('Cert Ajax request', done => {
        chai.request(app)
            .get('/certs')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + jwtToken)
            .set('X-Requested-With', 'XMLHttpRequest')
            .send()
            .end((err, res) => {
                if (!!err) {
                    console.log(err);
                    console.log(err);
                } else if (res.body.hasOwnProperty('result')) {
                    done();
                }
            });
    });

    it.skip('Issue certificate request test', done => {
        chai.request(app)
            .post('/certs')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + jwtToken)
            .set('X-Requested-With', 'XMLHttpRequest')
            .send({
                cert: {
                    txid: '7571dc60cbb265a3ee04be243ba7c4f7d46af29c2af001bfea10b5899ca09ced',
                    record: {
                        subId: 'asdfasdf',
                        score: 70
                    }
                }
            })
            .end((err, res) => {
                console.log(res.body);
                done();
            });
    })

    it.skip('Certificate view page test case', done => {
        chai.request(app)
            .get('/certs/bfd04148-c918-46c3-99fa-9f1fc0e20122')
            .set('Content-Type', 'text/html')
            .set('Authorization', 'Bearer ' + jwtToken)
            .send()
            .end((err, res) => {
                done();
            });
    })

    it.skip('Update certificate request test', done => {
        chai.request(app)
            .patch('/certs/3da38796-da33-41ec-8de7-31b9a2ea4e59')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + jwtToken)
            .set('X-Requested-With', 'XMLHttpRequest')
            .send({
                cert: {
                    txid: '5',
                }
            })
            .end((err, res) => {
                done();
            });
    })

    it.skip('Delete certificate request test', done => {
        chai.request(app)
            .delete('/certs/e58a799f-dcf9-4dc4-829e-bb3507c3fa8b')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + jwtToken)
            .set('X-Requested-With', 'XMLHttpRequest')
            .send()
            .end((err, res) => {
                console.log(res);
                done();
            });
    })

    it.skip('Share certificate test case', done => {
        chai.request(app)
            .post('/shared_certs')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + jwtToken)
            .set('X-Requested-With', 'XMLHttpRequest')
            .send({
                shared_cert: {
                    certId: 'e58a799f-dcf9-4dc4-829e-bb3507c3fa8b',
                    record: {
                        subcode: 'SUB1',
                        data: 'NAME'
                    },
                    url: 'https://rzoo.me/asdf4ecvvv',
                    password: 'asdfasdf',
                    emails: [
                        'asdfasdf@asdfasd.com',
                        'qwerqwer@qwerqwer.com'
                    ],
                    msg: 'Hello World!',
                    public: false,
                    expired: '2018-10-19'
                }
            })
            .end((err, res) => {
                done();
            });
    })

    /**
     * Terminator
     */
    after(() => {
        Terminator();
    })
});