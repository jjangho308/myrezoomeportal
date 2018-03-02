import csdr from 'cassandra-driver';

class AbstractDAO {
    constructor(opt) {
        if (!opt.driver) {
            throw new Error("No driver")
        }
        this.driver = opt.driver;
    }
}