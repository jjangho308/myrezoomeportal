import chai from 'chai';
import chaihttp from 'chai-http';

import app from '../app';

import Managers from '../core/managers';
import Initializer from '../core/initializer';
import Util from '../util/util';

describe('Chai HTTP test suite', () => {
    before('Chai init', () => {
        chai.use(chaihttp);
        Initializer();
    })

    it.skip('Chai GET Request test', done => {
        chai.request(app).get('/client').end((err, res) => {
            done();
        });
    })

    it('Agent Request Search record', done => {
        chai.request(app)
            .post('/client')
            .set('Content-Type', 'application/json')
            .send({
                cmd: 'Search',
                args: {
                    pkey: Util.uuid()
                }
            })
            .end((err, res) => {
                done();
            });;
    })
})