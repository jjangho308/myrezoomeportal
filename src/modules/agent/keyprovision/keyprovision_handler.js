import AbstractAgentRequestHandler from "../abstract_agent_request_handler";

import Managers from '../../../core/managers';
import OrgDAO from '../../../dao/org_dao';
import OrgModel from '../../../models/org/OrgModel';

import AgentRequest from '../agent_request';
import { ENGINE_METHOD_NONE } from "constants";

/**
 * Handler of KeyProvisionRequest. <br />
 * 
 * @since 180403
 * @author TACKSU
 */
class KeyProvisionRequestHandler extends AbstractAgentRequestHandler {

    /**
     * Default consturctor. <br />
     * 
     * @since 180403
     * @author TACKSU
     * 
     * @param {} opt 
     */
    constructor(opt) {
        super(opt);
    }

    /**
     * Store RSA public key of organization. <br />
     * Just overwrite Base64 encoded publicKey string. <br />
     * to organization table. <br />
     * 
     * @since 180403
     * @author TACKSU
     * @param {*} requestEntity 
     * @param {*} cb 
     */
    request(requestEntity, cb) {
        var orgDAO = new OrgDAO();
        var orgDAO = Managers.db().getOrgDAO();
        orgDAO.getByCode({
            orgcode : requestEntity.orgcode
        }, (err, result)=>{
            if(!!err){
                // Datbase or system error.
                done(AgentReqeust.RESULT_FAILURE , err);
            }else if(result.length == 0){
                // No organization error.
                done(AgentReqeust.RESULT_FAILURE , err);
            }else{
                
            }
        })
    }
}