"use strict";Object.defineProperty(exports, "__esModule", { value: true }); /**
                                                                             * Environment checker. <br />
                                                                             */exports.default =
{

    developement: function developement() {
        return process.env.NODE_ENV == "development";
    },

    prouction: function prouction() {
        return process.env.NODE_ENV == 'production';
    } };
//# sourceMappingURL=environment.js.map