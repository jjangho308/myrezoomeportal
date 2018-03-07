import ManagerProvider from './managers'
/**
 * Rezoome portal initialize. <br />
 * 
 * @since 180302
 * @author TACKSU
 * @param {*} cb 
 */
export default function init(from){
    
    // Initialize managers.
    for(var i in ManagerProvider){
        var manager = ManagerProvider[i]();
        manager.init();
    }
};