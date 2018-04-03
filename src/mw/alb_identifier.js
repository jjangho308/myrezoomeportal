/**
 * Middle ware to extract ALB server id
 * of this Node server process. <br />
 * 
 * @since 180403
 * @author TACKSU
 */
export default (req, res, next) => {
    // TODO ServerID 넣어주기:
    req.params.sId = process.args[2];
    next();
}