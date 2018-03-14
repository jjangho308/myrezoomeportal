import express from 'express';
import controller from './agent_ctrl';

/**
 * Router for '/agent' URI request. <br />
 * 
 * @since 180315
 * @author TACKSU
 */
var router = express.Router();
router.post('/agent', controller.post);
router.use('/agent', controller.default);

<<<<<<< HEAD
router.get('/', (req, res, next) => {

});

router.post('/', (req, res, next) => {

    var cmd = req.body.cmd;

    if (cmd === 'Registration') {
        console.log("========================Registration========================");
        console.log("=======================Request body=========================");
        console.log(req.body);
        var response = {};
        var result = {};

        response.mid = 'mid11111';
        response.cmd = req.body.cmd;
        response.code = '200';

        result.code = '200';
        result.msg = 'success';
        result.queueName = 'OPIC';

        response.result = result;

        console.log("=======================Response body=========================");
        console.log(response);
        res.send(response);
    } else if (cmd === 'SearchResult') {
        console.log("========================SearchResult========================");
        console.log("=======================Request body=========================");
        console.log(req.body);

        var response = {};
        response.code = '200';
        response.result = 'success';

        console.log("=======================Response body=========================");
        console.log(response);
        res.send(response);
    }

});

module.exports = router;
=======
export default router;
>>>>>>> df8161cd95e951d80cd55419d771fe04cf86edd6
