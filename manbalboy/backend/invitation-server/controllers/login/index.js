const { Router } = require('express');
const router = Router();
const ctrl = require('./admin.ctrl');

function testMiddleWare( req, res, next ){
    console.log('첫번째 미들웨어');
    next();
}


router.get('/', testMiddleWare, (req,res) => {
    res.send('login app');
});

router.get('/products', ctrl.get_products );

router.get('/products/write', ctrl.get_products_write );

router.post('/products/write', ctrl.post_products_write );

module.exports = router;


