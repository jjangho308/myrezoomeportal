import Managers from '../core/managers';
import AgentRequestManager from '../modules/agent/agent_request';

/**
 * Controller function for /agent URI channle. <br />
 * 
 * @since 180313
 * @author TACKSU
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export default {
    post: (req, res, next) => {
        console.log('Agent body : ' + req.body);
        var agentRequestManager = Managers.agent();
        var entity = new(agentRequestManager.getEntity(req.body.cmd))(req.body.args);
        entity.mId = req.body.mid;
        entity.cmd = req.body.cmd;
        entity.code = req.body.code;
        agentRequestManager.request(entity);
        res.sendStatus(200);
    },

    default: (req, res, next) => {
        console.log('Default controller');
        res.sendStatus(200);
    }
}