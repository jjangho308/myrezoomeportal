import Managers from '../core/managers';

/**
 * Token authentication middleware. <br />
 */
export default (req, res, next) => {
    var tokenManager = Managers.token();
    var token = req.get('Authorization').split(' ')[1];
    try {
        var verified = tokenManager.verify(token);
        req.body.args.userid = verified.data.userid;
        next();
    } catch (e) {
        throw e;
    }
}