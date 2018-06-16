
/**
 * Root class of entities. <br />
 * 
 * @since 180513
*/
class Entity {
    constructor(opt) {
    }

    /**
     * 
     */
    getClass() {
        return this.constructor;
    }

    static get class() {
        return undefined;
    }
}

module.exports = Entity;