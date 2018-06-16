var Managers = require('../core/managers');
var AgentRequestManager = require('../modules/agent/agent_request');

/**
 * Controller function set for /agent URI Request with command arguments. <br />
 * 
 * @since 180313
 * @author TACKSU
 */
module.exports = {

    /**
     * POST method controller to process ajax request. <br />
     * 
     * @since 180312
     * @author TACKSU
     */
    post: (req, res, next) => {
        console.log('Agent body : ');
        console.log(req.body);
        console.log('===========================');

        var agentRequestManager = Managers.agent();
        var entity = new(agentRequestManager.getEntity(req.body.cmd))(req.body.args);
        entity.mId = req.body.mid;
        entity.cmd = req.body.cmd;
        entity.code = req.body.code;

        console.log('Agent entity');
        console.log(entity);
        console.log('===========================');

        agentRequestManager.request(entity, (err, result) => {
            if (!!err) {
                res.json({
                    cmd: req.body.cmd,
                    err: err
                });
            } else {
                res.json({
                    cmd: req.body.cmd,
                    result: result
                });
            }
        });
    }
}