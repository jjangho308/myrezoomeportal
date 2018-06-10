/**
 * Internal error code container. <br />
 * 
 * HTTP Response용으로 쓰이는 Error Code이므로 <br />
 * 응답에 필요한 에러 코드가 추가될 경우 작성해야 함. <br />
 * 
 * @since 180508
 * @author TACKSU
 */
export default {

    // General internal error codes.
    INTERNAL_ERROR: 1,
    INTERNAL_UNKNOWN: 2,
    INTERNAL_NO_RESPONSE: 3,

    // Authorizations error
    AUTH_ERROR: 100,
    AUTH_NO_PERMISSON: 101,

    // Parameter error
    PARAM_INVALID: 200,

    // Data error
    DATA_ERROR: 300,
    DATA_NO_USER_ID: 301,
    DATA_NO_PHONE_NUM: 302,
    DATA_PASSWORD_INCORRECT: 303,
};