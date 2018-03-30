import Initializer from '../core/initializer';
import Managers from '../core/managers';

import ResumeModel from '../models/resume/resume';
import ResumeDAO from '../models/resume/resume_dao';

import Util from '../util/util';


/**
 * Test suit for ResumeModel. <br />
 */
describe('Resume model dao test suit.', () => {
    var resumeDAO = new ResumeDAO();

    before('Service Initialize', () => {
        Initializer();

        resumeDAO = Managers.db().getResumeDAO();
    })

    it('Resume Put & Get test case.', done => {
        var resumeModel = new ResumeModel({
            rsmId: Util.uuid(),
            uId: Util.uuid(),
            title: 'My Resume',
            blcMap: [],
            shared: false,
            deleted: false
        })

        resumeDAO.put(resumeModel, (err, insertId) => {
            resumeDAO.get({
                sId: insertId
            }, (err, foundModel) => {
                if (resumeModel.uId == foundModel == uId) {
                    done();
                }
            })
        })
    })
})