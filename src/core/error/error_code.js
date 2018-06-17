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

// Authorization error
exports.AUTH_ERROR = 100;
exports.AUTH_NO_PERMISSON = 101;

// Parameter error
exports.PARAM_ERROR = 200;
exports.PARAM_NO_EMAIL = 201;
exports.PARAM_NO_PASSWORD = 202;

// Data error
exports.DATA_ERROR = 300;
exports.DATA_NO_EMAIL = 301;
exports.DATA_NO_PHONE_NUM = 302;
exports.DATA_PASSWORD_INCORRECT = 303;
exports.DATA_NO_CERT = 304;