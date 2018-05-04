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
    it.skip('Resume ajax request', done => {
        chai.request(app)
            .get('/resumes')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + jwtToken)
            .set('X-Requested-With', 'XMLHttpRequest')
            .send()
            .end((err, res) => {
                console.log(JSON.stringify(res.body));
                done();
            });
    });

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
                    title: '신창호 테스트용 이력서',
                    data: [{
                            txid: 'ce4dc6b9ba8bbeca1ea7ecf0a5fb84347ada49a716067dfe4214e114a2b084c5',
                            subid: 'RCLPT0005',
                            order: 1,
                            record: {
                                "testid":"6A3135824610",
                                "phone":"01064749282",
                                "name":"PARKHUNWOOK",
                                "grade":"IM2",
                                "date":"20180313"
                            }
                        },
                        {
                            txid: '134607a780fe8e7f0136aaabaa6d72e6593d4bf0f1666394b8ea17dc2ccc9bcf',
                            subid: 'RCCNF0001',
                            order: 2,
                            record: {
                                "userid":"123456",
                                "point0":"800",
                                "point1":"95",
                                "point2":"500",
                                "point3":"300",
                                "name":"박헌욱",
                                "grade":"우수",
                                "date":"2018-04-10 05:18:29.0"
                            }
                        }
                    ]
                }
            })
            .end((err, res) => {
                if(!!err){
                    console.log(err);
                }

                if (!!res.body.result) {
                    console.log(res.body);
                    done();
                }
            })
    });

    /**
     * Test case of specific resume viewer. <br />
     */
    it.skip('Get resume viewer test case', done => {
        chai.request(app)
            .get('/resumes/c765f105-4a09-4b19-9300-a5e8a7b84840')
            .set('Content-Type', 'text/html')
            .set('Authorization', 'Bearer ' + jwtToken)
            .send()
            .end((err, res) => {
                console.log(res.body);
                done();
            })
    })

    it('Delete Resumes request test', done => {
        chai.request(app)
            .delete('/resumes/e1fa3a6f-8d24-4706-9220-1e9e733d4721')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + jwtToken)
            .set('X-Requested-With', 'XMLHttpRequest')
            .send()
            .end((err, res) => {
                console.log(res);
                done();
            });
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