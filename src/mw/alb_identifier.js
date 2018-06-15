/**
 * Middle ware to extract ALB server id
 * of this Node server process. <br />
 * 
 * @since 180403
 * @author TACKSU
 */
module.exports = (req, res, next) => {
    // TODO ServerID 넣어주기:
    req.params.sId = process.args[2];
    next();
}