// import express from 'express';
var express = require('express');
var router = express.Router();
import managers from '../core/managers'
import SearchRequestHandler from '../modules/request/search_record_handler';

/**
 * Router for client request channel. <br />
 * 
 * @since 180305
 * @author TACKSU
 */
router.get('/', managers.token().filterToken, (req, res, next) => {

});

router.post('/', managers.token().filterToken, (req, res, next) => {

    var cmd = req.body.cmd;

    if (cmd === 'Search') {        
        var search = new SearchRequestHandler();
        try {
            search.process(req.body, res);
        } catch (exception) {
            console.log(exception);
        }
    } else {
        res.send(404);
    }
});



// export default {}
module.exports = router;