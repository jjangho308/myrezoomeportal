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
        this.code = row.ORG_CD;
        this.name = row.ORG_NAME;
        this.pkey = row.PUB_KEY;
        this.updt = row.UPDT_DT;
    }
}

export default Org;