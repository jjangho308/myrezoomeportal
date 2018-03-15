import chai from 'chai';
import chaihttp from 'chai-http';

import app from '../app';

import Managers from '../core/managers';
import Initializer from '../core/initializer';
import Util from '../util/util';

describe('Portal <-> Agent Search Record interpolation test suite.', () => {

    var tokenInstance = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJpZCI6InJlem9vbWUifSwiZXhwIjoxNTIxMDIwODA4LCJpYXQiOjE1MjEwMTcyMDh9.kMeWGDY94Aq-fkK5l_QxASkz-_BPqJYrYQ78uCsteVw';
    var msgId = null;

    before('Portal initailize', () => {
        chai.use(chaihttp);

        Initializer();
    })

    it.skip('Issue auth token', () => {
        var tokenManager = Managers.token();
    })


    it.skip('Client Request Search record', done => {
        chai.request(app)
            .post('/client')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJpZCI6InNlb255ZW9uIn0sImV4cCI6MTUyMTEzOTk1MCwiaWF0IjoxNTIxMDk2NzUwfQ.YFxcC_zN9wNNXVkXIl1KS87ZOdI2qqwPe7Jf8O7rwUI')
            .send({
                cmd: 'Search',
                args: {
                    pkey: 'asdfasdf'
                }
            })
            .end((err, res) => {
                done();
            });;
    })

    it('Agent Search result request', done => {
        chai.request(app)
            .post('/agent')
            .set('Content-Type', 'application/json')
            .set('Authorization', tokenInstance)
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