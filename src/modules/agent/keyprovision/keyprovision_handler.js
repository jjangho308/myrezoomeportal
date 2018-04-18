import AbstractAgentRequestHandler from "../abstract_agent_request_handler";

import Managers from '../../../core/managers';
import OrgDAO from '../../../dao/org_dao';
import OrgModel from '../../../models/org/org';
import OrgInfoModel from "../../../models/org/org_info";

import AgentRequest from '../agent_request';

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
     * @param {*} done Callback function of AgentRequest. <br />
     */
    request(requestEntity, done) {
        var orgDAO = new OrgDAO();
        var orgDAO = Managers.db().getOrgDAO();
        orgDAO.getOrg({
            orgId: requestEntity.orgId
        }, (err, result) => {
            if (!!err) {
                // Datbase or system error.
                done(AgentReqeust.RESULT_FAILURE, err);
                return;
            } else if (result.length == 0) {
                // No organization error.
                done(AgentReqeust.RESULT_FAILURE, err);
                return;
            } else {
                orgDAO.getInfo({
                    orgId: requestEntity.orgId
                }, (err, orgInfoList) => {
                    if (!!err) {
                        done(AgentReqeust.RESULT_FAILURE, err);
                        return;
                    } else {
                        if (orgInfoList.length == 0) {
                            // 존재하지 않는 기관 정보므로 error 처리
                            done(AgentReqeust.RESULT_FAILURE, null);
                            return;
                        } else if (orgInfoList.length == 1) {
                            // Org info update.

                            orgDAO.setInfo({
                                orgId: requestEntity.orgId
                            }, new OrgInfoModel({
                                publicKey: requestEntity.publicKey
                            }), (err, result) => {
                                if (!!err) {
                                    done(AgentReqeust.RESULT_FAILURE, err);
                                    return;
                                } else {
                                    done(AgentRequest.RESULT_SUCCESS, true);
                                    return;
                                }
                            })
                        }
                    }
                });
            }
        })
    }
}

export default KeyProvisionRequestHandler;