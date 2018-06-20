/**
 * Internal error code container. <br />
 * 
 * HTTP Response용으로 쓰이는 Error Code이므로 <br />
 * 응답에 필요한 에러 코드가 추가될 경우 작성해야 함. <br />
 * 
 * @since 180508
 * @author TACKSU
 */

// Internal error codes.
exports.INTERNAL_ERROR = 1;
exports.INTERNAL_UNKNOWN = 2;
exports.INTERNAL_NO_RESPONSE = 3;
exports.INTERNAL_DB = 4;
exports.INTERNAL_CRYPTO = 5;

// Authorization error
exports.AUTH_ERROR = 100;
exports.AUTH_NO_PERMISSON = 101;

// Parameter error
exports.PARAM_ERROR = 200;
exports.PARAM_NO_UID = 201;
exports.PARAM_NO_EMAIL = 202;
exports.PARAM_NO_PASSWORD = 203;
exports.PARAM_NO_CERT_ID = 204;
exports.PARAM_AJAX_ONLY = 205;
exports.PARAM_AJAX_DENY = 206;
exports.PARAM_NO_TXID = 207;
exports.PARAM_NO_SUBID = 208;
exports.PARAM_NO_CMD = 209;
exports.PARAM_NO_PRIVATE_RECORD_ID = 210;
exports.PARAM_NO_PHONE = 211;
exports.PARAM_NO_PREFIX = 212;
exports.PARAM_INVALID_PREFIX = 213;

// Data error
exports.DATA_ERROR = 300;
exports.DATA_NO_EMAIL = 301;
exports.DATA_NO_PHONE_NUM = 302;
exports.DATA_PASSWORD_INCORRECT = 303;
exports.DATA_NO_CERT = 304;
exports.DATA_NO_BLCMAP = 305;
exports.DATA_NO_ORG = 306;

/**
 * API Error code set. <br />
 * 
 * @since 180619
 * @author TACKSU
 */
exports.API_ERROR = 800;
// No apicommand
exports.API_NO_CMD = 801;
// Invalid api version name
exports.API_VERSION_INVALID = 802;
exports.API_UNAUTHORIZED = 803;