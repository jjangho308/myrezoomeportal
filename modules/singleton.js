/**
 * Pattern polyfill. <br />
 * 
 * @since 180228
 * @param {*} clazz 
 */
function newInstance(clazz){
    var instance;
    return function(){
        if(!instance){
            instance = new clazz();
        }
        return instance;
    }
}

export default newInstance;