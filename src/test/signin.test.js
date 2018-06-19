var Initialize = require('../core/initializer');
var Managers = require('../core/managers');

var chai = require('chai');
var chaihttp = require('chai-http');

var app = require('../app');

describe('Sign In test suite', () => {

    before('Initialization', () => {
        Initialize();
        chai.use(chaihttp);
    });

    it('Paramter insufficient on ajax', done => {
        chai.request(app)
            .post('/signin')
            .set('Content-Type', 'application/json')
            .set('X-Requested-With', 'XMLHttpRequest')
            .send({
                email: 'test@naver.com',
            })
            .end((err, res) => {
                console.log(JSON.stringify(res.body));
                done();
            });
    });

    it('Paramter insufficient on normal', done => {
        chai.request(app)
            .post('/signin')
            .set('Content-Type', 'application/json')
            .send({
                email: 'test@naver.com',
            })
            .end((err, res) => {
                console.log(JSON.stringify(res.error.text));
                expect(res).to.have.status(400);
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