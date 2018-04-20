import chai from 'chai';
import chaihttp from 'chai-http';

import Managers from '../core/managers';

import app from '../app';



import Util from "../util/util";

/**
 * Test suite for /resumes URL. <br />
 * 
 * @since 180326
 * @author TACKSU
 */
describe('/resumes URL test suite', () => {

    var jwtToken = null;

    before('Service initialize', () => {
        jwtToken = Managers.token().issueToken({
            uId: 'UID1'
        })
        chai.use(chaihttp);
    });

    it.skip('HTML Page request', done => {
        chai.request(app)
            .get('/resumes')
            .set('Content-Type', 'text/html')
            .set('Authorization', 'Bearer ' + jwtToken)
            .send()
            .end((err, res) => {
                done();
            });
    });

    //확인 완료
    it('Resume ajax request', done => {
        chai.request(app)
            .get('/resumes')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + jwtToken)
            .set('X-Requested-With', 'XMLHttpRequest')
            .send()
            .end((err, res) => {
                //console.log(res);
                done();
            });
    })

    //확인완료
    it.skip('Create resume request test case', done => {
        chai.request(app)
            .post('/resumes')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + jwtToken)
            .set('X-Requested-With', 'XMLHttpRequest')
            .send({
                resume: {
                    title: '엘지 이력서',
                    records: [{
                        order: 1,
                        //
                        mapId: Util.uuid()
                    }, {
                        order: 2,
                        mapId: Util.uuid()
                    }]
                }
            })
            .end((err, res) => {
                done();
            })
    })

    it.skip('Get resume viewer test case', done => {
        chai.request(app)
            .get('/resumes')
            .set('Content-Type', 'text/html')
            .set('Authorization', 'Bearer ' + jwtToken)
            .send({
                resume: {
                    title: '삼성 이력서',
                    records: [
                        'txid1',
                        'txid2'
                    ]
                }
            })
            .end((err, res) => {
                done();
            })
    })



    //확인 완료
    it.skip('share resume test case', done => {
        chai.request(app)
            .post('/shared_resumes')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + jwtToken)
            .set('X-Requested-With', 'XMLHttpRequest')
            .send({
                shared_resume: {
                    rsmId: '526cf612-110e-4b53-a5a8-5a424d911f87',
                    records: [{
                        testid: '6A3135824610',
                        phone: '01064749282',
                        name: 'PARKHUNWOOK',
                        grade: 'IM2',
                        date: '20180313'
                    }, {
                        date: '2018-02-01 ~ 2018-08-01',
                        entranceDate: '2018-02-01',
                        graduDate: '2018-08-01',
                        id: '12060992',
                        name: "박헌욱",
                        status: "JAEHAK"
                    }],
                    url: 'https://rzoo.me/jskji45',
                    password: 'changshin',
                    exp: new Date("2018-04-19")
                }
            })
            .end((err, res) => {
                done();
            })
    })
});