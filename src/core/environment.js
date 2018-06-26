/**
 * Environment checker. <br />
 * 
 * 
 */
module.exports = {
    local: (() => {
        return process.env.NODE_ENV === 'local';
    })(),

    developement: (() => {
        return process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development';
    })(),

    stage: (() => {
        return process.env.NODE_ENV === 'stage';
    })(),

    prouction: (() => {
        return process.env.NODE_ENV === 'stage' || process.env.NODE_ENV === 'production';
    })(),
}