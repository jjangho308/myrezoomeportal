import chai from 'chai';
import chaihttp from 'chai-http';

import app from '../app';

import CertModel from '../models/cert/cert';
import CertDao from '../dao/cert_dao';

import Util from '../util/util';

import Managers from '../core/managers';

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
    })

    it('Cert Ajax request', done => {
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
    })

    it.skip('Issue certificate request test', done => {
        chai.request(app)
            .post('/certs')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + jwtToken)
            .set('X-Requested-With', 'XMLHttpRequest')
            .send({
                cert: {
                    txid: '7646cd4c483f169e9cbc78c29504460733b3e4935842bd93cb02a6eb5258fa24'
                }
            })
            .end((err, res) => {
                done();
            });
    })

    it('Certificate view page test case', done => {
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

    it.skip('Share certificate test case', done => {
        chai.request(app)
            .post('/shared_certs')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + jwtToken)
            .set('X-Requested-With', 'XMLHttpRequest')
            .send({
                shared_cert: {
                    certId: 'c73f4619-db3a-4492-8b43-1fe8fb638d4d',
                    record: {
                        subcode: 'SUB1',
                        data: 'NAME'
                    },
                    url: 'https://rzoo.me/jskji45',
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

    after(() => {

    })
});