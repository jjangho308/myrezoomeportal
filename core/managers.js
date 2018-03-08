import PropertyManager from '../modules/property';
import PushManager from '../modules/push';
import NetworkManager from '../modules/network';
import BlockchainManager from '../modules/blockchain';
import CryptoManager from '../modules/crypto';
import DatabaseManager from '../modules/db';
import TokenManager from '../modules/token';
import PDFManager from '../modules/pdf';

/**
 * Wrapper function to provide singleton instance of each modules. <br />
 * 
 * @TODO add managers.
 * @since 180304
 */
export default (function(){
    var propertyInstance = null;
    var pushInstance = null;
    var networkInstance = null;
    var bcInstance = null;
    var cryptoInstance = null;
    var dbInstance = null;
    var tokenInstance = null;
    var pdfInstance = null;
    return {
        property : function(){
            return propertyInstance = propertyInstance ? propertyInstance : new PropertyManager();
        },

        push : function(){
            return pushInstance = pushInstance ? pushInstance : new PushManager();
        },

        network : function(){
            return networkInstance = networkInstance ? networkInstance : new NetworkManager();
        },

        // blockchain : function(){
        //     return bcInstance = bcInstance ? bcInstance : new BlockchainManager();
        // },

        crypto : function(){
            return cryptoInstance = cryptoInstance ? cryptoInstance : new CryptoManager();
        },

        db : function(){
            return dbInstance = dbInstance ? dbInstance : new DatabaseManager();
        },

        token : function() {
            return tokenInstance = tokenInstance ? tokenInstance : new TokenManager();
        },

        pdf : function() {
            return pdfInstance = pdfInstance ? pdfInstance : new PDFManager();
        }        
    }
})();