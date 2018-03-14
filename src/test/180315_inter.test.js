import chai from 'chai';
import chaihttp from 'chai-http';

import app from '../app';

import Managers from '../core/managers';
import Initializer from '../core/initializer';
import Util from '../util/util';

describe('Portal <-> Agent Search Record interpolation test suite.', () => {

    var tokenInstance = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJpZCI6ImFzZGZhc2RmMTIzIn0sImV4cCI6MTUyMTAxOTkzNiwiaWF0IjoxNTIxMDE2MzM2fQ.UKOZF-6i1EBcPeYIS-RUQjZW22OMdCR_ybuhSQva54o';
    var msgId = null;

    before('Portal initailize', () => {
        chai.use(chaihttp);

        Initializer();
    })

    it('Issue auth token', ()=>{
        var tokenManager = Managers.token();
    })


    it('Client Request Search record', done => {
        chai.request(app)
            .post('/client')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + tokenInstance)
            .send({
                cmd: 'Search',
                args: {
                    pkey: Util.uuid(),
                    orgs: [{
                        code: "01",
                        key: {
                            var1: "32832",
                            var2: "abcd"
                        }
                    }, {
                        code: "02",
                        key: {
                            var1: "33253",
                            var2: "ddddd"
                        }
                    }]
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
                mid: msgId,
                cmd: 'SearchResult',
                args: {
                    orgcode: 1,
                    key: '28f5dd71ea466ff5197901375d047edaf3e6b60051475df3a1e4bb1fa7ef0461',
                    records: [{
                        hash: '62e94633ab8849fe1676ad1b3224998a082e50874a99b38424bb0d9190c78db8',
                        data: 'encryptedData'
                    }]
                }
            })
            .end((err, res) => {
                done();
            });;
    })
})