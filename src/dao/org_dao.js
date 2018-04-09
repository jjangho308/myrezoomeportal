import mysql from 'mysql';

import orgQuery from './org_query.js';
import OrgModel from '../models/org/org';
import AbstractDAO from './abstract_dao';

/**
 * DAO for org. <br />
 * 
 * @since 180306
 * @author KWANGWOOK
 */
class OrgDao extends AbstractDAO {

    /**
     * Default constructor. <br />
     * 
     * @param {MySqlConnectionPool} connectionPool 
     */
    constructor(connectionPool) {
        super(connectionPool);
    }

    /**
     * Insert a new Organization model to database. <br />
     * 
     * @since 180401
     * @author TACKSU
     * 
     * @param {OrgModel} orgModel 
     * @param {*} cb 
     */
    put(orgModel, cb) {
        var query = mysql.format(orgQuery.put, orgModel.toRow());
        this.query(query, (err, result) => {
            if (!!err) {
                cb(err)
            } else {
                cb(err, result.insertId);
            }
        })
    }

    getSubIdByOrgId(orgid, cb){
        var query = mysql.format(orgQuery.getSubIdsByOrgId, orgid);
        this.query(query, function(err, rows){
            if(err){
                cb(err)
            }else{
                cb(err, rows)
            }
        })

    }


    /**
     * Get multiple OrgModel by orgcodes. <br />
     * 
     * @since 180313
     * 
     * @param {string} orgcode Specific orgcode.
     * @param {function(err:Error, result:OrgModel[])} cb Callback.
     */
    getByCodes(orgcodes, cb) {

        var makeQuery = mysql.format(orgQuery.getByCodes, orgcodes);

        this.query(makeQuery, (err, rows) => {
            if (err) {
                cb(err, null);
            } else {
                var result = [];
                for (var i in rows) {
                    result.push(OrgModel.fromRow(rows[i]));
                }
                cb(null, result);
            }
        })
    }

    findAll(cb) {

        var makequery = mysql.format(orgQuery.findAll);

        this.query(makequery, (err, rows) => {
            if (err) {
                cb(err);
            } else {
                cb(err, rows);
            }
        })
    }

    set(opt, user, cb) {

    }

    del(opt, cb) {

    }

    delall(opt, cb) {

    }
}

export default OrgDao;