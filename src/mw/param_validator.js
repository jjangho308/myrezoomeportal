/**
 * Validator class for each parameters. <br />
 * 
 * @since 180620
 * @author TACKSU
 */
class Validator {
    constructor(paramName) {
        this.name = paramName;
    }

    phone(exception) {
        this.pattern = '/^\d{3}-\d{3}-\d{4}$/gm';
        this.patternException = exception;

        return this;
    }

    email(exception) {
        this.pattern = '/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$/';
        this.patternException = exception;

        return this;
    }

    mandatory(exception) {
        this.mandatory = true;
        this.mandatoryException = exception;

        return this;
    }

    optional() {
        this.mandatory = false;

        return this;
    }

    uuid(patternException) {
        this.pattern = '/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/gm';
        this.patternException = patternException;
    }

    validate(arg) {
        if (!!this.mandatory && (arg === null || arg === undefined)) {
            throw this.mandatoryException;
        }

        if (!!arg && !new RegExp(this.pattern, 'g').test(arg)) {
            throw this.patternException;
        }
    }


}


/**
 * Parameter validation middleware library. <br />
 * 
 * @since 180620
 * @author TACKSU
 * 
 * @param {*} opt Parameter validators.
 */
var paramValidator = (opt) => {

    if (opt instanceof String) {
        return new Validator(opt);
    }
    return (req, res, next) => {
        var givenParams = null;
        switch (req.method) {
            case 'GET':
                {
                    givenParams = req.query
                    break;
                }
            case 'POST':
            default:
                {
                    givenParams = req.params;
                    break;
                }
        }

        opt.forEach(validator => {
            try {
                validator.validate(givenParams[validator.name])
            } catch (e) {
                console.error(e);
                break;
                next(e);
            }
        });

        next();
    }
};

export default paramValidator;