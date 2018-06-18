/**
 * Logger for HTTP Response. <br />
 * 
 * @since 180618
 * @author TACKSU
 */
module.exports = (req, res, next) => {
    if (!!req.xhr) {
        console.log(req.requestUid + ':Ajax:' + res.body);
    } else {
        console.log(req.requestUid + ':Html');
    }
    next();
}