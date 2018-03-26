import chai from 'chai';
import chaihttp from 'chai-http';

import app from '../app';

/**
 * Test suite for /resumes URL. <br />
 * 
 * @since 180326
 * @author TACKSU
 */
describe('/resumes URL test suite', () => {
    var jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJpZCI6InNlb255ZW9uIn0sImV4cCI6MTUyMTEzOTk1MCwiaWF0IjoxNTIxMDk2NzUwfQ.YFxcC_zN9wNNXVkXIl1KS87ZOdI2qqwPe7Jf8O7rwUI';
    before('Service initialize', () => {
        process.env.NODE_ENV = 'development';
        chai.use(chaihttp);
    });

    it('HTML Page request', done => {
        chai.request(app)
            .get('/resumes')
            .set('Content-Type', 'text/html')
            .set('Authorization', 'Bearer ' + jwtToken)
            .send()
            .end((err, res) => {
                done();
            });
    });

    it('Resume ajax request', done => {
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
});