/**
 * Environment checker. <br />
 */
export default {

    developement: () => {
        return process.env.NODE_ENV == 'development';
    },

    prouction: () => {
        return process.env.NODE_ENV == 'production';
    }
}