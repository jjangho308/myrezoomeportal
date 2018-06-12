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
    200: '파라미터가 올바르지 않습니다.',

    // Data error
    300: '데이터에 문제가 발생하였습니다.',
    301: '회원 ID가 없습니다.',
    302: '핸드폰 번호가 등록되어 있지 않습니다.',
    303: 'Password가 맞지 않습니다.'
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