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
        });
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


    /**
     * Get all resumes of given user. <br />
     * 
     * @since 180425
     * @author TACKSU
     */
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

    /**
     * Create a new resume entity test case. <br />
     * 
     * @since 180424
     * @author JJANGHO
     */
    it.skip('Create resume request test case', done => {

        chai.request(app)
            .post('/resumes')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + jwtToken)
            .set('X-Requested-With', 'XMLHttpRequest')
            .send({
                resume: {
                    title: '안택수 테스트용 이력서',
                    data: [{
                            txid: '35bdf8182ef912f1971efa1b367e69fc8dfa819f94c46d2afc352fe3316893b7',
                            order: 1,
                            record: {
                                subId: 'OPIc',
                                score: 30
                            }
                        },
                        {
                            txid: '02f7bae31e7fbced794621aa517b2df5321776a24a02d7305eb1bdbf1e13cb8b',
                            order: 2,
                            record: {
                                subId: 'TOEIC',
                                score: 900
                            }
                        }
                    ]
                }
            })
            .end((err, res) => {
                if (!!res.body.result) {
                    console.log(res.body);
                    done();
                }
            })
    })

    /**
     * Test case of specific resume viewer. <br />
     */
    it.skip('Get resume viewer test case', done => {
        chai.request(app)
            .get('/resumes/884394b8-b2eb-4c58-a707-e2cda423f16f')
            .set('Content-Type', 'text/html')
            .set('Authorization', 'Bearer ' + jwtToken)
            .send()
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