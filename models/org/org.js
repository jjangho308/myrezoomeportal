import AbstractModel from '../abstract_model'
/**
 * Organization model. <br />
 * 
 * @since 180305
 * @author TACKSU
 */
class Org extends AbstractModel {
    constructor(row) {
        this.queue = row.ORG_QUEUE_NAME;
        this.code = null;
        this.name = null;
        this.pkey = null;
    }
}

export default Org;