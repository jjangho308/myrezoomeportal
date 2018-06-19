var mysql = require('mysql');

var Env = require('../core/environment');

var AbstractDAO = require('./abstract_dao');
var ResumeModel = require('../models/resume/resume');
var SharedResumeModel = require('../models/resume/shared_resume');
var SharedResumeUrlModel = require('../models/resume/shared_resume_url');

var ResumeQuery = require('./resume_query');

var Util = require('../util/util');

/**
 * DAO of resume. <br />
 * 
 * @since 180323
 * @author TACKSU
 */
class ResumeDao extends AbstractDAO {

    /**
     * Default constructor. <br />
     * 
     * @since 180330
     * @author TACKSU
     * 
     * @param {MySqlConnectionPool} connectionPool 
     */
    constructor(connectionPool) {
        super(connectionPool);
    }

    /**
     * Insert a given resume model to database. <br />
     * 
     * @since 180323
     * @author TACKSU
     * 
     * @param {*} resume Resume model.
     * @param {function(err, result)} cb Callback
     */
    putResume(resume, cb) {
        var resumeRow = resume.toRow();

        var query = mysql.format(ResumeQuery.put, resumeRow);
        this.query(query, (err, result) => {
            if (!!err) {
                return cb(err);
            } else {
                return cb(err, result.insertId);
            }
        })
    }

    /**
     * Select resumes from database. <br />
     * 
     * @param {*} creteria 
     * @param {function(object, array)} cb 
     */
    getResume(creteria, cb) {

        var where;
        if (!!creteria.sId) {
            where = "S_USR_RSM_ID = " + creteria.sId
        }
        if (!!creteria.rsmId) {
            if (!!where) {
                where += ' AND '
                where += "RSM_ID = '" + creteria.rsmId + "'" + "AND DEL_YN = 'N'"
            } else {
                where = "RSM_ID = '" + creteria.rsmId + "'" + "AND DEL_YN = 'N'"
            }
        }
        if (!!creteria.uId) {
            if (!!where) {
                where += ' AND '
                where += "UID = '" + creteria.uId + "'" + "AND DEL_YN = 'N'"
            } else {
                where = "UID = '" + creteria.uId + "'" + "AND DEL_YN = 'N'"
            }
        }


        var query = ResumeQuery.get + where;
        this.query(query, (err, result) => {
            if (!!err) {
                return cb(err);
            } else {
                var returnValue = [];
                for (var i in result) {
                    returnValue.push(ResumeModel.fromRow(result[i]));
                }
                return cb(err, returnValue);
            }
        });
    }

    /**
     * Update resume data. <br />
     * 
     * @since 180409
     * @author TACKSU
     * 
     * @param {*} creteria 
     * @param {*} resumeModel 
     * @param {*} cb 
     */
    setResume(creteria, resumeModel, cb) {
        var condition = {};
        if (!!creteria.sId) {
            condition.S_USR_RSM_ID = creteria.sId;
        }
        if (!!creteria.rsmId) {
            condition.RSM_ID = creteria.rsmId;
        }
        if (!!creteria.uId) {
            condition.UID = creteria.uId;
        }

        var query = mysql.format(ResumeQuery.set, [resumeModel.toRow(), condition]);
        this.query(query, (err, result) => {
            if (!!err) {
                return cb(err);
            } else {
                return cb(err, result.affectedRows);
            }
        })
    }

    /**
     * Mark given resume deleted. <br />
     * 
     * @since 180410
     * @author TACKSU
     * 
     * @param {*} resumeid 
     * @param {*} cb 
     */
    delResume(creteria, cb) {
        var rsmId = creteria.rsmId;

        this.connectionPool.getConnection((err, connection) => {
            if (!!err) {
                console.error(JSON.stringify(err));
                return cb(err);
            } else {
                connection.beginTransaction((err) => {
                    if (err) {
                        console.error(JSON.stringify(err));
                        return cb(err);
                    } else {
                        var condition = {};

                        //e6b88a3e-da49-4ee8-badf-a49e21bc1e86
                        condition.RSM_ID = creteria.rsmId;

                        var usrResumeDelQuery = mysql.format(ResumeQuery.delResume, condition);

                        connection.query(usrResumeDelQuery, (err, result) => {

                            if (!!err) {
                                console.error(JSON.stringify(err));
                                connection.rollback(() => {
                                    return cb(err);
                                });
                            }

                            //TCDA_USR_RSM이 삭제가 제대로 되었을때.
                            else if (result.affectedRows > 0) {

                                var usrResumeSharedDelQuery = mysql.format(ResumeQuery.delResumeRecords, [condition, {
                                    DEL_YN: 'N'
                                }]);

                                //TCDA_RSM_DATA와 TCDA_USR_RSM은 1:1 관계이다.
                                //TCDA_USR_RSM이 있다면 TCDA_RSM_DATA는 무조건 존재한다
                                //TCDA_USR_RSM이 삭제된다면 DATA는 같이 삭제되어야 한다.
                                connection.query(usrResumeSharedDelQuery, (err, result) => {
                                    if (!!err) {
                                        console.error(JSON.stringify(err));
                                        connection.rollback(() => {
                                            return cb(err);
                                        })
                                    } else if (result.affectedRows > 0) {

                                        //TCDA_USR_RSM과 TCDA_RSM_DATA가 동시에 지워진 상황
                                        //TCDA_RSM_SHR_INFO Table을 select하여 있다면 update 치고 없다면 직전상황까지 commit한다.
                                        var selectResumeSharedInfo = mysql.format(ResumeQuery.isShareURL, [condition, {
                                            DEL_YN: 'N'
                                        }]);

                                        connection.query(selectResumeSharedInfo, (err, result) => {
                                            if (!!err) {
                                                console.error(JSON.stringify(err));
                                                connection.rollback(() => {
                                                    return cb(err);
                                                })
                                            }

                                            //URL 공유가 한번이라도 완료되었다면
                                            else if (result.length > 0) {

                                                var deleteResumeSharedInfoQuery = mysql.format(ResumeQuery.delUrl, [condition, {
                                                    DEL_YN: 'N'
                                                }]);

                                                connection.query(deleteResumeSharedInfoQuery, (err, result) => {
                                                    if (!!err) {
                                                        console.error(JSON.stringify(err));
                                                        connection.rollback(() => {
                                                            return cb(err);
                                                        })
                                                    } else if (result.affectedRows > 0) {
                                                        connection.commit((err) => {
                                                            if (!!err) {
                                                                console.error(JSON.stringify(err));
                                                                connection.rollback(function () {
                                                                    return cb(err);
                                                                })
                                                            }
                                                            consnection.release();
                                                            return cb(null, result.affectedRows);
                                                        })
                                                    }
                                                });
                                            }
                                            //한번도 URL 공유를 한적이 없다면..
                                            //TCDA_USR_RSM 테이블과 TCDA_RSM_DATA 테이블을 삭제한 것 까지 commit한다.
                                            else {
                                                connection.commit((err) => {
                                                    if (!!err) {
                                                        console.error(JSON.stringify(err));
                                                        connection.rollback(function () {
                                                            return cb(err);
                                                        })
                                                    }
                                                    //정상처리
                                                    return cb(null, result.affectedRows);
                                                })
                                            }
                                        })
                                    }
                                })
                            }

                        })



                    }
                })
            }

        })

    }

    /**
     * Put shared resume. <br />
     * 
     * @since 180410
     * @author TACKSU
     * 
     * @param {*} sharedResume 
     * @param {*} cb 
     */
    putResumeRecords(sharedResume, cb) {
        var param = sharedResume.toRow();

        var query = mysql.format(ResumeQuery.putResumeRecords, param);
        this.query(query, (err, result) => {
            if (!!err) {
                return cb(err);
            } else {
                return cb(err, result.insertId);
            }
        })
    }

    /**
     * Search shared resume. <br />
     * 
     * @since 180410
     * @author TACKSU
     * 
     * @param {*} creteria 
     * @param {*} cb 
     */
    getResumeRecords(creteria, cb) {
        var condition = {};

        if (!!creteria.rsmId) {
            condition.RSM_ID = creteria.rsmId;
        }

        var query = mysql.format(ResumeQuery.getResumeRecords, condition);
        this.query(query, (err, rows) => {
            if (!!err) {
                return cb(err);
            } else {
                var result = [];
                for (var i in rows) {
                    result.push(SharedResumeModel.fromRow(rows[i]));
                }
                return cb(err, result);
            }
        })
    }

    /**
     * Update shared resume entity. <br />
     * 
     * @since 180410
     * @author TACKSU
     *
     * @param {*} creteria 
     * @param {*} sharedResume 
     * @param {*} cb 
     */
    setResumeRecords(creteria, sharedResume, cb) {
        var condition = {
            S_RSM_SHR_ID: creteria.sId
        }

        var query = mysql.format(ResumeQuery.setResumeRecords, [sharedResume.toRow(), condition]);
        this.query(query, (err, result) => {
            if (!!err) {
                return cb(err);
            } else {
                return cb(err, result.affectedRows);
            }
        })
    }

    /**
     * Delete shared resume entity. <br />
     * 
     * @since 180410
     * @author TACKSU
     * 
     * @param {*} creteria 
     * @param {*} cb 
     */
    delResumeRecords(creteria, cb) {

    }

    /**
     * Put shared resume url info. <br />
     * 
     * @since 180410
     * @author TACKSU
     * 
     * @param {*} sharedUrl 
     * @param {*} cb 
     */
    putSharedUrl(sharedUrl, cb) {
        var param = sharedUrl.toRow();

        var query = mysql.format(ResumeQuery.putUrl, param);
        this.query(query, (err, result) => {
            if (!!err) {
                return cb(err);
            } else {
                return cb(err, result.insertId);
            }
        })
    }

    getSharedUrl(creteria, cb) {
        var condition = {
            URL: creteria.url
        };

        var query = mysql.format(ResumeQuery.getUrl, condition);
        this.query(query, (err, rows) => {
            if (!!err) {
                return cb(err);
            } else {
                return cb(err, {
                    txId: rows[0].TRX_ID,
                    passcode: rows[0].PASSCODE,
                    certId: rows[0].CERT_ID,
                    url: rows[0].URL,
                    sharedYn: rows[0].SHRD_YN,
                    pubYn: rows[0].PUB_YN,
                    expired: rows[0].EXPIRED_DT,
                    created: rows[0].CRTD_DT,
                    encData: rows[0].ENC_CERT_DATA
                });
            }
        });
    }

    /**
     * Update shared resume url. <br />
     * 
     * @since 180410
     * @author TACKSU
     * 
     * @param {*} creteria 
     * @param {*} sharedUrl 
     * @param {*} cb 
     */
    setSharedUrl(creteria, sharedUrl, cb) {
        var condition = {
            S_RSM_SHR_INFO_ID: creteria.sId
        };

        var query = mysql.format(ResumeQuery.setUrl, [sharedUrl.toRow(), condition]);
        this.query(query, (err, result) => {
            if (!!err) {
                return cb(err);
            } else {
                return cb(err, result.affectedRows);
            }
        })
    }

    /**
     * Mark as deleted given shared resume url entity. <br />
     * 
     * @param {*} creteria
     * @param {*} cb 
     */
    delSharedUrl(creteria, cb) {

    }
}

module.exports = ResumeDao;