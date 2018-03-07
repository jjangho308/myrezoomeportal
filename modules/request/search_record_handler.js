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
     * @param {SearchRecordRequest} clientReq 
     */
    process(httpReq, clientReq) {
        var queryResult;
        var destination = {
            destination: '',
            "content-type": 'application/json'
        }


        // 1. 기관 정보를 db에서 가져오고
        var dbConfig = {
            host: "127.0.0.1",
            port: 3306,
            user: "rezoome",
            password: "sgen2018!",
            database: "rezoome"
        }

        var orgs = clientReq.args.orgs;
        var sqlparam = "";


        for (var i in orgs) {
            sqlparam += JSON.stringify(orgs[i].code);
            if (i != (orgs.length - 1)) {
                sqlparam = sqlparam + ",";
            }
        }

        this.Push = new PushManager();

        this.Push.connect({
            servers: [
                {
                    host: 'b-cb8c6e8c-f893-4464-aa69-b3501991ef60-1.mq.ap-southeast-2.amazonaws.com',
                    port: 61614,
                    ssl: true,
                    connectHeaders: {
                        host: '/',
                        login: 'rezoome',
                        passcode: 'sgen2018!!!!'
                    }
                }
            ]
        }, function (res) {
        });

        var db = new DataManager(dbConfig);

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

