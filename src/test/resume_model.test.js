var Initialize = require('../core/initializer');
var Managers = require('../core/managers');

var ResumeModel = require('../models/resume/resume');
var SharedResume = require('../models/resume/shared_resume');
var SharedResumeUrl = require('../models/resume/shared_resume_url');

var ResumeDAO = require('../dao/resume_dao');

var Util = require('../util/util');


/**
 * Test suit for ResumeModel. <br />
 * 
 * @since 180410
 * @author TACKSU
 */
describe('Resume model dao test suit.', () => {
    var resumeDAO = new ResumeDAO();

    before('Service Initialize', () => {
        Initialize();

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

        resumeDAO.putResume(resumeModel, (err, insertId) => {
            resumeDAO.getResume({
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

        resumeDAO.putResume(resumeModel, (err, insertId) => {
            resumeModel.title = 'New Resume';
            resumeDAO.setResume({
                sId: insertId
            }, resumeModel, (err, affectedRows) => {
                if (affectedRows > 0) {
                    resumeDAO.getResume({
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
        var orig = Util.uuid();
        var update = Util.uuid();
        var sharedModel = new SharedResume({
            rsmId: Util.uuid(),
            uId: Util.uuid(),
            data: orig
        })

        resumeDAO.putShare(sharedModel, (err, insertId) => {
            if (!!err) {
                console.log(err.toString());
            } else {
                sharedModel.data = update;
                resumeDAO.setShare({
                    sId: insertId
                }, sharedModel, (err, affectedRows) => {
                    if (!!err) {
                        console.log(err.toString());
                    } else if (affectedRows > 0) {
                        resumeDAO.getShare({
                            sId: insertId
                        }, (err, sharedModels) => {
                            if (!!err) {
                                console.log(err.toString());
                            } else if (sharedModels.length > 0) {
                                if (sharedModel.data == sharedModels[0].data) {
                                    done();
                                }
                            }
                        })
                    }
                })
            }
        })
    })

    it('Shared resume url test case', done => {
        var org = Util.uuid();
        var update = Util.uuid();
        var urlModel = new SharedResumeUrl({
            url: 'http://rzoo.me/3js8df',
            rsmId: org,
            public: false,
            passcode: 'asdfasdf'
        });

        resumeDAO.putSharedUrl(urlModel, (err, insertId) => {
            if (!!err) {
                console.log(err.toString());
            } else {
                urlModel.rsmId = update;
                resumeDAO.setSharedUrl({
                    sId: insertId
                }, urlModel, (err, affectedRows) => {
                    if (!!err) {
                        console.log(err.toString());
                    } else if (affectedRows > 0) {
                        resumeDAO.getSharedUrl({
                            sId: insertId
                        }, (err, models) => {
                            if (!!err) {
                                console.log(err.toString());
                            } else if (models.length > 0) {
                                if (models[0].rsmId == update) {
                                    done();
                                }
                            }
                        })
                    }
                })
            }
        })
    })
})