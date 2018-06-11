/**
 * 
 */
var koreanErrMsg = {
    1: '내부 서버 오류입니다.',
    2: '알 수 없는 오류가 발생했습니다.',
    3: '서버에서 응답이 없습니다.',

    // Authorizations error
    101: '접근 권한이 없습니다.',

    // Parameter error
    201: 'EMail 주소가 존재하지 않습니다.',
    202: '핸드폰 번호가 존재하지 않습니다.',
    203: '패스워드가 올바르지 않습니다.',

    //
}

/**
 * Entire error message container for each language code. <br />
 * 
 * @since 180610
 * @author TACKSU
 */
export default {
    'default': koreanErrMsg,

    'ko': koreanErrMsg,

    'ko-kr': koreanErrMsg,
};