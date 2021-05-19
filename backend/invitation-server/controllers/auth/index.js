const { Router } = require('express');
const ctrl = require('./auth.ctrl');
const { isNotLoggedIn, verifyToken } = require('../../middlewares.js');

/**
 * @author : manbalboy <manbalboy@hanmail.net>
 * @version 0.0.1
 */

/**
 * @swagger
 * tags:
 * - name: "Auth"
 *   description: "Login, Logout, Join 등과 같은 인증 관련"
 */

const router = Router();

/**
 * @swagger
 *  paths:
 *  /auth/join:
 *    post:
 *      tags:
 *      - Auth
 *      description: 회원가입 API
 *      requestBody:
 *       required: true
 *       description: request body
 *       content:
 *        application/json:
 *         schema:
 *           $ref: '#/components/schemas/User'
 *      consumes:
 *      - applicaion/json
 *      produces:
 *      - applicaion/json
 *      responses:
 *       200:
 *        description: ok
 */
router.post('/join', isNotLoggedIn, ctrl.post_join);

/**
 * @swagger
 *  paths:
 *  /auth/token:
 *    post:
 *      tags:
 *      - Auth
 *      description: 토큰 발행 API
 *      consumes:
 *      - applicaion/json
 *      produces:
 *      - applicaion/json
 *      responses:
 *       200:
 *        description: ok
 */
router.post('/token', ctrl.post_token);

/**
 * @swagger
 *  paths:
 *  /auth/test:
 *    get:
 *      tags:
 *      - Auth
 *      description: 토큰 발행 API TEST
 *      consumes:
 *      - applicaion/json
 *      produces:
 *      - applicaion/json
 *      parameters:
 *      - name: "autorization"
 *        in: "header"
 *      responses:
 *       200:
 *        description: ok
 */
router.get('/test', verifyToken, ctrl.get_token);

module.exports = router;
