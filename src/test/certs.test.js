import chai from 'chai';
import chaihttp from 'chai-http';

import app from '../app';

describe('/certs URI Page test suite.', () => {
    var jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJpZCI6InNlb255ZW9uIn0sImV4cCI6MTUyMTEzOTk1MCwiaWF0IjoxNTIxMDk2NzUwfQ.YFxcC_zN9wNNXVkXIl1KS87ZOdI2qqwPe7Jf8O7rwUI';
    before('Service initialize', () => {
        chai.use(chaihttp);
    });

    it('Cert DAO test', done => {
        chai.request(app)
            .get('/certs')
            .set('Content-Type', 'text/html')
            .set('Authorization', 'Bearer ' + jwtToken)
            .send()
            .end((err, res) => {
                done();
            });
    })

    after(() => {

    })
});