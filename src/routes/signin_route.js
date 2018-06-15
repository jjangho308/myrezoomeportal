var express = require('express');
var ctrl = require('./signin_ctrl');

/**
 * Router for /signin URI. <br />
 * 
 * @since 180322
 * @author TACKSU
 */
var router = express.Router();

router.get('/', ctrl.get);
router.post('/', ctrl.post);
// router.use('/', (err, req, res, next)=>{
//     console.log(err.toString());
// })

module.exports = router;
