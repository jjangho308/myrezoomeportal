import Initializer from '../core/initializer';
import Managers from '../core/managers';

import ResumeModel from '../models/resume/resume';
import ResumeDAO from '../dao/resume_dao';

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

    it('Put a new resume model & Get again test case.', done => {
        var resumeModel = new ResumeModel({
            rsmId: Util.uuid(),
            uId: Util.uuid(),
            title: 'My Resume',
            blcMap: [],
            shared: false,
            deleted: false
        });

        resumeDAO.put(resumeModel, (err, insertId) => {
            resumeDAO.get({
                sId: insertId
            }, (err, foundModel) => {
                if (resumeModel.uId == foundModel[0].uId) {
                    done();
                }
            })
        })
    })

    it('Update given resume model test case.', done => {
        var resumeModel = new ResumeModel({
            rsmId: Util.uuid(),
            uId: Util.uuid(),
            title: 'My Resume',
            blcMap: [],
            shared: false,
            deleted: false
        });

        resumeDAO.put(resumeModel, (err, insertId) => {
            resumeModel.title = 'New Resume';
            resumeDAO.set({
                sId: insertId
            }, resumeModel, (err, affectedRows) => {
                if (affectedRows > 0) {
                    resumeDAO.get({
                        sId: insertId
                    }, (err, foundModel) => {
                        if (foundModel.length > 0) {
                            if (foundModel[0].sId == insertId) {
                                done();
                            }
                        }
                    })
                }
            })
        })
    })

    it('Share resume put & get test', done => {

    })
})