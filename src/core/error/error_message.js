var CODES = require('./error_code');

/**
 * 
 */
var MSG_KR = {
};

// exports.(.*) =
// errorMessageKR[errorCode.$1] =

// Internal Error
MSG_KR[CODES.INTERNAL_ERROR] = '내부 서버 오류입니다.';
MSG_KR[CODES.INTERNAL_UNKNOWN] = '알 수 없는 오류가 발생했습니다.';
MSG_KR[CODES.INTERNAL_NO_RESPONSE] = '서버에서 응답이 없습니다.';

// Authorization error
MSG_KR[CODES.AUTH_ERROR] = '인증 오류입니다.';
MSG_KR[CODES.AUTH_NO_PERMISSON] = '접근 권한이 없습니다.';

// Parameter error
MSG_KR[CODES.PARAM_ERROR] = '인자가 잘못되었습니다.';
MSG_KR[CODES.PARAM_NO_UID] = 'UID가 전달되지 않았습니다.';
MSG_KR[CODES.PARAM_NO_EMAIL] = 'EMail 주소가 전달되지 않았습니다.';
MSG_KR[CODES.PARAM_NO_PASSWORD] = 'Password가 전달되지 않았습니다.';
MSG_KR[CODES.PARAM_NO_CERT_ID] = '증명서 ID가 전달되지 않았습니다.';
MSG_KR[CODES.PARAM_AJAX_ONLY] = '이 URI는 Ajax request만 허용됩니다.';
MSG_KR[CODES.PARAM_AJAX_DENY] = '이 URI의 Ajax request는 금지됩니다.';

// Data error
MSG_KR[CODES.DATA_ERROR] = '데이터 오류입니다.';
MSG_KR[CODES.DATA_NO_EMAIL] = '존재하지 않는 EMail 주소입니다.';
MSG_KR[CODES.DATA_NO_PHONE_NUM] = '존재하지 않는 핸드폰 번호입니다.';
MSG_KR[CODES.DATA_PASSWORD_INCORRECT] = '패스워드가 올바르지 않습니다.';
MSG_KR[CODES.DATA_NO_CERT] = '인증서가 존재하지 않습니다.';
MSG_KR[CODES.DATA_NO_SHORTURL] = '검증할 증명서가 존재하지 않습니다.'

/**
 * Entire error message container for each language code. <br />
 * 
 * @since 180610
 * @author TACKSU
 */
exports['default'] = exports['ko'] = exports['ko-kr'] = MSG_KR;