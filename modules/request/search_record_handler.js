import DataManager from '../db';
import PushManager from '../push';
import AbstractRequestHandler from './abstract_request_handler'

/**
 * 이력 검색 요청 핸들러.
*/
class SearchRecordRequestHandler extends AbstractRequestHandler {
    constructor(opt) {
        super(opt);
    }

    /**
     * 
     * @param {HttpRequest} httpReq 
     * @param {SearchRecordRequest} clientReq {
     *      userId : "rezoome Id",
     *      orgs    : [{
     *                      code : '기관 코드',
     *                      key : {
     *                                  var1 : '키1',
     * *                                var2 : '키2',
     *                              }
     *                  }
     *              ]
     * }
     */
    process(clientReq, httpRes) {
        var queryResult;
        
        var destination = {
            destination: '',
            "content-type": 'application/json'
        }


        // 1. 기관 정보를 db에서 가져오고
        // var dbConfig = {
        //     host: "127.0.0.1",
        //     port: 3306,
        //     user: "rezoome",
        //     password: "sgen2018!",
        //     database: "rezoome"
        // }

        var orgs = clientReq.args.orgs;
        var sqlparam = "";


        for (var i in orgs) {
            sqlparam += JSON.stringify(orgs[i].code);
            if (i != (orgs.length - 1)) {
                sqlparam = sqlparam + ",";
            }
        }

        //Manager 가져오기
        //this.Push = new PushManager();
        




        //Manager 가져오기
        //var db = new DataManager(dbConfig);

        db.getOrgInfo(sqlparam, function (res) {
            queryResult = res;
            console.log(queryResult);

            for (var i in queryResult) {
                destination.destination = queryResult[i].ORG_QUEUE_NAME;
                console.log(destination);

                
                this.Push.sendMessage(JSON.stringify(clientReq), destination, function (err) {
                    if (err != null) {
                        console.log(err);
                    }
                });
            }
        }.bind(this));
    }
}

export default SearchRecordRequestHandler;

