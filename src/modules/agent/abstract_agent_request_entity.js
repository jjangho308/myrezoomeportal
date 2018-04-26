/**
 * Abstract response class. <br />
 * Agent로부터 전달된 HttpRequest를 표현하는 추상 class입니다. <br />
 * 모든 Request class들은 상속받아야 합니다. <br />
 * 
 * @since 180305
 * @author TACKSU
 */
class AbstractAgentRequestEntity {

    /**
     * Default constructor. <br />
     * 
     * @since 180403
     * @author TACKSU
     * 
     * @param {*} opt 
     */
    constructor(opt) {
        this.mId = opt.mId;
    }
}

export default AbstractAgentRequestEntity;