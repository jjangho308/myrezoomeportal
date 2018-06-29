/**
 * Host name redirector.
 * 
 * '/'로 끝나면 안되는 URL일 경우 /를 제거한 페이지로 Routing해준다.
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports = (req, res, next) => {
    if (req.originalUrl.endsWith('/')) {
        return res.redirect(req.originalUrl.substr(0, req.originalUrl.lastIndexOf('/')));
    }
    next();
}