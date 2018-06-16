var chai = require('chai');
var chaihttp = require('chai-http');

var app = require('../app');
var CertModel = require('../models/cert/cert');
var CertDao = require('../dao/cert_dao');
var Util = require('../util/util');
var Managers = require('../core/managers');
var Terminator = require('../core/terminator');

/**
 * Test suit to test '/cert' URI. <br />
 * 
 */
describe('/certs URI Page test suite.', () => {

    var jwtToken = null;
    before('Service initialize', () => {
        jwtToken = Managers.token().issueToken({
            uId: 'UID4'
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

    it('Certificate view page test case', done => {
        chai.request(app)
            .get('/certs/9f8bbce2-b944-4fda-9fa6-f2dabaa4745a')
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

    it('Delete certificate request test', done => {
        chai.request(app)
            .delete('/certs/3c8a1b06-49a0-4f68-852e-20ddb058faad')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + jwtToken)
            .set('X-Requested-With', 'XMLHttpRequest')
            .send()
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
                    certid: '400e8968-3119-42be-8769-59ddd9eac9f0',
                    url: 'https://rzoo.me/122838fev',
                    password: 'asdfasdf',
                    emails: [
                        'asdfasdf@asdfasd.com',
                        'qwerqwer@qwerqwer.com'
                    ],
                    msg: 'Hello World!',
                    public: false,
                    exp: '2018-10-19'
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