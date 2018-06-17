var errorCode = require('./error_code');

/**
 * 
 */
var errorMessageKR = {
    // errorCode.INTERNAL_ERROR: '내부 서버 오류입니다.',
    // 2: '알 수 없는 오류가 발생했습니다.',
    // 3: '서버에서 응답이 없습니다.',

    // // Authorizations error
    // 101: '접근 권한이 없습니다.',

    // // Parameter error
    // 200: '파라미터가 올바르지 않습니다.',

    // // Data error
    // 300: '데이터에 문제가 발생하였습니다.',
    // 301: '회원 ID가 없습니다.',
    // 302: '핸드폰 번호가 등록되어 있지 않습니다.',
    // 303: 'Password가 맞지 않습니다.',
    // 304: '인증서가 존재하지 않습니다.',
};

// exports.(.*) =
// errorMessageKR[errorCode.$1] =

// Internal Error
errorMessageKR[errorCode.INTERNAL_ERROR] = '내부 서버 오류입니다.';
errorMessageKR[errorCode.INTERNAL_UNKNOWN] = '알 수 없는 오류가 발생했습니다.';
errorMessageKR[errorCode.INTERNAL_NO_RESPONSE] = '서버에서 응답이 없습니다.';

// Authorization error
errorMessageKR[errorCode.AUTH_ERROR] = '인증 오류입니다.';
errorMessageKR[errorCode.AUTH_NO_PERMISSON] = '접근 권한이 없습니다.';

// Parameter error
errorMessageKR[errorCode.PARAM_ERROR] = '인자가 잘못되었습니다.';
errorMessageKR[errorCode.PARAM_NO_EMAIL] = 'EMail 주소가 전달되지 않았습니다.';
errorMessageKR[errorCode.PARAM_NO_PASSWORD] = 'Password가 전달되지 않았습니다.';

// Data error
errorMessageKR[errorCode.DATA_ERROR] = '데이터 오류입니다.';
errorMessageKR[errorCode.DATA_NO_EMAIL] = '존재하지 않는 EMail 주소입니다.';
errorMessageKR[errorCode.DATA_NO_PHONE_NUM] = '존재하지 않는 핸드폰 번호입니다.';
errorMessageKR[errorCode.DATA_PASSWORD_INCORRECT] = '패스워드가 올바르지 않습니다.';
errorMessageKR[errorCode.DATA_NO_CERT] = '인증서가 존재하지 않습니다.';

/**
 * Entire error message container for each language code. <br />
 * 
 * @since 180610
 * @author TACKSU
 */
exports['default'] = exports['ko'] = exports['ko-kr'] = errorMessageKR;