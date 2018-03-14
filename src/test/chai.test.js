import chai from 'chai';
import chaihttp from 'chai-http';

import app from '../app';

import Managers from '../core/managers';
import Initializer from '../core/initializer';
import Util from '../util/util';

describe('Portal <-> Agent Search Record interpolation test suite.', () => {

    var tokenInstance = null;
    var msgId = null;

    before('Portal initailize', () => {
        chai.use(chaihttp);

        Initializer();
    })


    it('Client Request Search record', done => {
        chai.request(app)
            .post('/client')
            .set('Content-Type', 'application/json')
            .set('Authorization', tokenInstance)
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

    it('Agent Search result request', done => {
        chai.request(app)
            .post('/agent')
            .set('Content-Type', 'application/json')
            .set('Authorization', tokenInstance)
            .send({
                cmd: 'SearchResult',
                args: {
                    pkey: Util.uuid()
                }
            })
            .end((err, res) => {
                done();
            });;
    })
})