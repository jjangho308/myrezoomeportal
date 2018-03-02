import PropertyManager from '../modules/property';
import PushManager from '../modules/push';

export default {
    property    : new PropertyManager({}),
    push        : new PushManager({})
}