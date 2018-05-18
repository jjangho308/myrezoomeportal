import Managers from '../core/managers'
import VerifyRequest from '../modules/client/verify/verify_request'

/**
 * Controller function for '/v' Router.
 * 
 * @since 180509
 * @author TACKSU
 * 
 */
export default {
    get: (req, res, next) => {
        req.body.shortUrl = req.params.shortUrl;        
        Managers.client().request(new VerifyRequest(req.body), (err, result) => {
            if (!!err) {
                next(err);
            } else {
                
                if(req.body.shortUrl.substring(0,1)=='c') {
                    res.render('share-cert', {
                        data : result
                    });
                }
                else {
                    res.render('verify', {
                        data : result
                    });
                }                
            }
        });        
    }
}