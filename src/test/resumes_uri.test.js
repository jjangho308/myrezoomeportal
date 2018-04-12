import chai from 'chai';
import chaihttp from 'chai-http';

import Managers from '../core/managers';

import app from '../app';

/**
 * Test suite for /resumes URL. <br />
 * 
 * @since 180326
 * @author TACKSU
 */
describe('/resumes URL test suite', () => {

    var jwtToken = null;

    before('Service initialize', () => {
        jwtToken = Managers.token().issueToken({
            uId: 'UUID1'
        })
        chai.use(chaihttp);
    });

    it.skip('HTML Page request', done => {
        chai.request(app)
            .get('/resumes')
            .set('Content-Type', 'text/html')
            .set('Authorization', 'Bearer ' + jwtToken)
            .send()
            .end((err, res) => {
                done();
            });
    });

    it.skip('Resume ajax request', done => {
        chai.request(app)
            .get('/resumes')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + jwtToken)
            .set('X-Requested-With', 'XMLHttpRequest')
            .send()
            .end((err, res) => {
                done();
            });
    })

    it('Create resume request test case', done => {
        chai.request(app)
            .post('/resumes')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + jwtToken)
            .set('X-Requested-With', 'XMLHttpRequest')
            .send({
                resume: {
                    title: '삼성 이력서',
                    records: [
                        'txid1',
                        'txid2'
                    ]
                }
            })
            .end((err, res) => {
                done();
            })
    })

    it.skip('Get resume viewer test case', done => {
        chai.request(app)
            .get('/resumes')
            .set('Content-Type', 'text/html')
            .set('Authorization', 'Bearer ' + jwtToken)
            .send({
                resume: {
                    title: '삼성 이력서',
                    records: [
                        'txid1',
                        'txid2'
                    ]
                }
            })
            .end((err, res) => {
                done();
            })
    })



    it.skip('share resume test case', done => {
        chai.request(app)
            .post('/shared_resumes')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + jwtToken)
            .set('X-Requested-With', 'XMLHttpRequest')
            .send({

            })

    })
});