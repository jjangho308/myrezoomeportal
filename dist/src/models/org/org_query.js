"use strict";Object.defineProperty(exports, "__esModule", { value: true }); /**
                                                                             * Query statements for Org. <br />
                                                                             * 
                                                                             * @since 180306
                                                                             * @author KWANGWOOK
                                                                             */exports.default =
{
    get: "SELECT ORG_QUEUE_NAME FROM TBL_ORG WHERE ORG_CD IN ( %s )",
    getByCodes: "SELECT ORG_QUEUE_NAME FROM TBL_ORG WHERE ORG_CD IN ( %s )",
    findAll: "SELECT ORG_QUEUE_NAME FROM TBL_ORG",
    put: '',
    set: '',
    del: '' };
//# sourceMappingURL=org_query.js.map