var express = require('express');
var router = express.Router();
import Managers from "../core/managers";

router.post('/', (req, res, next) => {

    var cmd = req.body.cmd;

    if (cmd === 'mysqlUserGetTest') {
        console.log("========================mysqlUserGetTest========================");
        console.log("=======================Request body=========================");
        console.log(req.body);
        var response = {};
        var result = {};

        response.mid = 'mid11111';
        response.cmd = req.body.cmd;
        response.code = '200';

        result.code = '200';
        result.msg = 'success';

        var db = Managers.db();

        db.getUserInfo('rezoome', function (res2) {
            console.log(res2);
            response.result = res2;
            res.send(response);
        });

        //response.result = result;


        console.log("===========================================================");
        console.log(response);
        //res.send(response);
    } else if (cmd === 'SearchResult') {
        console.log("========================SearchResult========================");
        console.log("=======================Request body=========================");
        console.log(req.body);

        var response = {};
        response.code = '200';
        response.result = 'success';

        console.log("=======================Response body=========================");
        console.log(response);
        res.send(response);
    }

});

module.exports = router;