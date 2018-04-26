import Initialize from '../core/initializer';
import Managers from '../core/managers';

import chai from 'chai';
import chaihttp from 'chai-http';

import app from '../app';

describe('Sign In test suite', () => {

    before('Initialization', () => {
        Initialize();
        chai.use(chaihttp);
    })

    it('Sign In URI Test case', done => {
        chai.request(app)
            .post('/signin')
            .set('Content-Type', 'application/json')
            .send({
                email: 'exle_@naver.com',
                password: '1234'
            })
            .end((err, res) => {
                done();
            });
    });

    it.skip('Sign Up URI Test case', done=>{
        
    })
});