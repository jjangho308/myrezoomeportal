import chai from 'chai';
import chaihttp from 'chai-http';

import app from '../app';

import CertModel from '../models/cert/cert';
import CertDao from '../models/cert/cert_dao';

import Util from '../util/util';

import Managers from '../core/managers';

describe('/certs URI Page test suite.', () => {
    // var jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJpZCI6InNlb255ZW9uIn0sImV4cCI6MTUyMTEzOTk1MCwiaWF0IjoxNTIxMDk2NzUwfQ.YFxcC_zN9wNNXVkXIl1KS87ZOdI2qqwPe7Jf8O7rwUI';
    var token = null;
    before('Service initialize', () => {
        token = Managers.token().issueToken({
            uId: 1
        })
        chai.use(chaihttp);
    });

    it('Cert HTML Page', done => {
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
                done();
            });
    })

    it('Issue certificate request test', done => {
        var certModel = new CertModel({
            uId: 'uid',
            encryptedData: ''
        });
        chai.request(app)
            .post('/certs')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + jwtToken)
            .set('X-Requested-With', 'XMLHttpRequest')
            .send(JSON.stringify(certModel))
            .end((err, res) => {
                done();
            });
    })

    it('Update certificate request test', done => {
        var certModel = new CertModel({

        });
        chai.request(app)
            .patch('/certs/')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + jwtToken)
            .set('X-Requested-With', 'XMLHttpRequest')
            .send(JSON.stringify(certModel))
            .end((err, res) => {
                done();
            });
    })

    after(() => {

    })
});