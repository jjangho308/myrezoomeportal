var Environment = require('../core/environment');

/**
 * Set environment variable for EJS render template. <br />
 * 
 * @since 180619
 * @author TACKSU
 * 
 * @param {*} req 
 * @param {*} rest 
 * @param {*} next 
 */
module.exports = (req, res, next)=>{
    res.locals.env = process.env.NODE_ENV;
    res.locals.min = res.locals.env === 'development' || res.locals.env === 'local' ? '' : '.min'
    next();
}