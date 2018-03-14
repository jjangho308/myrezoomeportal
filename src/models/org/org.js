import AbstractModel from '../abstract_model'
/**
 * Organization model. <br />
 * 
 * @since 180305
 * @author TACKSU
 */
class Org extends AbstractModel {
    constructor(row) {
        super(row);
        this.queueName = row.ORG_QUEUE_NAME;
        this.code = null;
        this.name = null;
        this.pkey = null;
    }
}

export default Org;