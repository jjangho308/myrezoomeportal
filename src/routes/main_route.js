import express from 'express';

var router = express.Router();

//router.get('/', view);


router.get('/', function (req, res) {
    res.render('main', {
        
    })
})

export default router;