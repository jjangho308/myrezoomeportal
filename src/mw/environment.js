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
module.exports = (req, rest, next)=>{
    req.locals.env = process.env.NODE_ENV;

    next();
}