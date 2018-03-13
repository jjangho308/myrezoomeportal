import chai from 'chai';
import chaihttp from 'chai-http';

import app from '../app';

import Initializer from '../core/initializer';

describe('Chai HTTP test suite', () => {
    before('Chai init', () => {
        chai.use(chaihttp);
        Initializer();
    })

    it('Chai GET Request test', done => {
        chai.request(app).get('/client').end((err, res)=>{
            done();
        });
    })

    it('Agent Request Search record', done => {
        chai.request(app)
            .post('/client')
            .set('Content-Type', 'application/json')
            .send({
                mid: 'salifeliajlsdf',
                cmd: 'Search',
                args: {
                    pkey: 'asdfasefa'
                }
            })
            .end((err, res)=>{
                done();
            });;
    })
})