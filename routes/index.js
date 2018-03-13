// import express from 'express'
var express = require('express');
var router = express.Router();
// import token from '../modules/token';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.post('/', token.filterToken ,function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// export default router;
module.exports = router;