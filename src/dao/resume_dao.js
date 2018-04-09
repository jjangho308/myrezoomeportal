import mysql from 'mysql';

import Env from '../core/environment';

import AbstractDAO from "./abstract_dao";
import ResumeModel from '../models/resume/resume';

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
    put(resume, cb) {
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
    get(creteria, cb) {
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

        var query = mysql.format(ResumeQuery.get, condition);
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
    set(creteria, resumeModel, cb) {
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

    del(resumeid, cb) {

    }
}

export default ResumeDao;