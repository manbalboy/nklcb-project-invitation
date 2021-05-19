const { Router } = require('express');
const ctrl = require('./auth.ctrl');

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

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('로그인 필요');
    }
};

const isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.redirect(`/?error=${message}`);
    }
};

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

module.exports = router;
