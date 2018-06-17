/**
 * Environment checker. <br />
 */
module.exports = {

    developement: (() => {
        return process.env.NODE_ENV === 'development';
    })(),

    prouction: (() => {
        return process.env.NODE_ENV === 'production';
    })(),
}