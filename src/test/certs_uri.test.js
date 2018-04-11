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
            uId: 1
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

    it.skip('Cert Ajax request', done => {
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

    it.skip('Issue certificate request test', done => {

        chai.request(app)
            .post('/certs')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + jwtToken)
            .set('X-Requested-With', 'XMLHttpRequest')
            .send({
                cert: {
                    txid: Util.uuid()
                }
            })
            .end((err, res) => {
                done();
            });
    })

    it('Update certificate request test', done => {
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

    after(() => {

    })
});