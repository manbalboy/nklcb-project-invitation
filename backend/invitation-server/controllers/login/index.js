const { Router } = require('express');
/**
 * @author : manbalboy <manbalboy@hanmail.net>
 * @version 0.0.1
 */

/**
 * @swagger
 * tags:
 * - name: "login"
 *   description: "Everything about your Pets"
 *   externalDocs:
 *     description: "Find out more"
 *     url: "http://swagger.io"
 * - name: "store"
 *   description: "Access to Petstore orders"
 * - name: "user"
 *   description: "Operations about user"
 *   externalDocs:
 *     description: "Find out more about our store"
 *     url: "http://swagger.io"
 */

const router = Router();
const ctrl = require('./admin.ctrl');

function testMiddleWare(req, res, next) {
    console.log('첫번째 미들웨어');
    next();
}

/**
 * @swagger
 *  paths:
 *  /login:
 *    get:
 *      tags:
 *      - login
 *      description: TEST
 *      produces:
 *      - applicaion/json
 *      parameters:
 *          []
 *      responses:
 *       200:
 *        description: board of selected id column list
 */
router.get('/', testMiddleWare, (req, res) => {
    res.json({ test: 1 });
});

router.get('/products', ctrl.get_products);

router.get('/products/write', ctrl.get_products_write);
/**
 * @swagger
 *  paths:
 *  /login/products/write:
 *    post:
 *      tags:
 *      - login
 *      description: TEST
 *      produces:
 *      - applicaion/json
 *      responses:
 *       200:
 *        description: board of selected id column list
 */
router.post('/products/write', ctrl.post_products_write);

module.exports = router;
