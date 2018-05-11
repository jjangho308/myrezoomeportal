import mysql from 'mysql';

import Env from '../core/environment';

import AbstractDAO from "./abstract_dao";
import ResumeModel from '../models/resume/resume';
import SharedResumeModel from '../models/resume/shared_resume';
import SharedResumeUrlModel from '../models/resume/shared_resume_url';

import ResumeQuery from './resume_query';

import Util from '../util/util';

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
                cb(err);
            } else {
                cb(err, result.insertId);
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
                where += "RSM_ID = '" + creteria.rsmId + "'"+"AND DEL_YN = 'N'"
            } else {
                where = "RSM_ID = '" + creteria.rsmId + "'"+"AND DEL_YN = 'N'"
            }
        }
        if (!!creteria.uId) {
            if (!!where) {
                where += ' AND '
                where += "UID = '" + creteria.uId + "'" +"AND DEL_YN = 'N'"
            } else {
                where = "UID = '" + creteria.uId + "'" +"AND DEL_YN = 'N'"
            }
        }


        var query = ResumeQuery.get + where;
        this.query(query, (err, result) => {
            if (!!err) {
                cb(err);
            } else {
                var returnValue = [];
                for (var i in result) {
                    returnValue.push(ResumeModel.fromRow(result[i]));
                }
                cb(err, returnValue);
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
                cb(err);
            } else {
                cb(err, result.affectedRows);
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
                console.log(err);
                cb(err);
            } else {
                connection.beginTransaction(function (err) {
                    if (err) {
                        console.log(err);
                        cb(err)
                    } else {
                        var condition = {};

                        //e6b88a3e-da49-4ee8-badf-a49e21bc1e86
                        condition.RSM_ID = creteria.rsmId;

                        var usrResumeDelQuery = mysql.format(ResumeQuery.delResume, condition);

                        connection.query(usrResumeDelQuery, (err, result) => {

                            if (!!err) {
                                connection.release();
                                console.log(err);

                            } else if (result.affectedRows > 0) {
                                var usrResumeSharedDelQuery = mysql.format(ResumeQuery.delShared, [condition, { DEL_YN: 'N' }]);
                                connection.query(usrResumeSharedDelQuery, (err, result) => {
                                    if (!!err) {
                                        connection.release();
                                        console.log(err);
                                    } else if (result.affectedRows > 0) {
                                        var selectResumeSharedInfo = mysql.format(ResumeQuery.getUrl, [condition, { DEL_YN: 'N' }]);
                                        connection.query(selectResumeSharedInfo, (err, result) => {
                                            if (!!err) {
                                                connection.release();
                                                console.log(err);
                                            } else if (result.length > 0) {
                                                var deleteResumeSharedInfoQuery = mysql.format(ResumeQuery.delUrl, [condition, { DEL_YN: 'N' }]);

                                                connection.query(deleteResumeSharedInfoQuery, (err, result) => {
                                                    if (!!err) {
                                                        connection.release();
                                                        console.log(err);
                                                    }else if(result.affectedRows>0){
                                                        connection.commit(function(err){
                                                            if(!!err){
                                                                connection.release();
                                                                console.log(err);
                                                            }

                                                            console.log("tranaction sucess");
                                                            consnection.release();
                                                            cb(200, "sucess");
                                                        })
                                                    }
                                                })
                                                console.log(result);
                                            } else {
                                                console.log("=====")
                                                connection.commit(function (err) {
                                                    if (!!err) {
                                                        connection.release();
                                                        console.log(err);
                                                    }
                                                    //정상처리
                                                    cb(200, "sucess");
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
                cb(err);
            } else {
                cb(err, result.insertId);
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
        console.log(query);
        this.query(query, (err, rows) => {
            if (!!err) {
                cb(err);
            } else {
                var result = [];
                for (var i in rows) {
                    result.push(SharedResumeModel.fromRow(rows[i]));
                }
                cb(err, result);
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
                cb(err);
            } else {
                cb(err, result.affectedRows);
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
                cb(err);
            } else {
                cb(err, result.insertId);
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
                cb(err);
            } else {
                cb(err, SharedResumeUrlModel.fromRow(rows[0]));
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
                cb(err);
            } else {
                cb(err, result.affectedRows);
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

export default ResumeDao;