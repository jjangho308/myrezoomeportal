var Util = require('../util/util');

/**
 * Logger for request. <br />
 * 
 * @since 180618
 * @author TACKSU
 */
module.exports = (req, res, next) => {

    req.requestUid = Util.uuid().substr(0, 6);

    console.info('Request logger : ' + req.requestUid);
    if (req.method == 'GET') {
        console.info(req.requestUid + ':Query : ' + JSON.stringify(req.query));
    } else {
        console.info(req.requestUid + ':Body : ' + JSON.stringify(req.body));
    }

    next();
}