import Initialize from '../core/initializer';
import Managers from '../core/managers';

import chai from 'chai';
import chaihttp from 'chai-http';

import app from '../app';

describe('Sign In test suite', () => {

    before('Initialization', () => {
        Initialize();
        chai.use(chaihttp);
    });

    it('Paramter insufficient', done => {
        chai.request(app)
            .post('/signin')
            .set('Content-Type', 'application/json')
            .set('X-Requested-With', 'XMLHttpRequest')
            .send({
                email: 'test@naver.com',
            })
            .end((err, res) => {
                console.log(res.body);
                done();
            });
    });

    it.skip('Sign In Success test case', done => {
        chai.request(app)
            .post('/signin')
            .set('Content-Type', 'application/json')
            .set('X-Requested-With', 'XMLHttpRequest')
            .send({
                email: 'test@naver.com',
                pw: 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3'
            })
            .end((err, res) => {
                console.log(res.body);
                done();
            });
    });

    it.skip('Sign In No Email ID', done => {
        chai.request(app)
            .post('/signin')
            .set('Content-Type', 'application/json')
            .set('X-Requested-With', 'XMLHttpRequest')
            .send({
                email: 'tesasdft@naver.com',
                pw: 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3'
            })
            .end((err, res) => {
                console.log(res.body);
                done();
            });
    });

    it.skip('Sign In Password incorrect test case', done => {
        chai.request(app)
            .post('/signin')
            .set('Content-Type', 'application/json')
            .set('X-Requested-With', 'XMLHttpRequest')
            .send({
                email: 'test@naver.com',
                pw: 'a665a459sade3'
            })
            .end((err, res) => {
                console.log(res.body);
                done();
            });
    });
});