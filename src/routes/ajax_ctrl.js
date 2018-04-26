/**
 * Base controller for ajax query. <br />
 * AJAX query에 대한 기본 컨트롤러. <br />
 * 
 * @since 180306
 * @author TACKSU
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export default (req, res, next) => {
    // 1. 어떤 요청인지 확인
    // 2. RequestManager에 전달
    // 3. res에서 성공, 실패 여부 응답
    // 4. next는 무시.

    var command = req.param.command;
    if (!!command) {
        
    }
}