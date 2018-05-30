import Managers from '../core/managers'
import ApiRequest from '../modules/api/common/api_request'

/**
 * Controller function for '/api' Router.
 * 
 * @since 180509
 * @author TACKSU
 * 
 */
export default (req, res, next)=>{
    var version = req.params.version;
    var command = req.params.command;
}

{
    getCert: (req, res, next) => {

        Managers.api().request(new ApiRequest(req.body), (err, result) => {
            if (!!err) {
                next(err);
            } else {
                res.render('certviewer', result);
            }
        });
    }
}