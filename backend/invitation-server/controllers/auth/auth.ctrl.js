/**
 * @author : manbalboy <manbalboy@hanmail.net>
 * @version 0.0.1
 */

const db = require('../../models');
const { QueryTypes } = require('sequelize');
// const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const passport = require('passport');

/**
 * @author : manbalboy <manbalboy@hanmail.net>
 * @version 0.0.1
 */
const query = `SELECT * FROM TB_USER`;
exports.get_products = async (_, res) => {
    let resultsVal = await db.sequelize.query(query, { type: QueryTypes.SELECT });
    console.log('resultsVal  >> ', resultsVal);
    res.send(resultsVal);
};

exports.post_join = async (req, res, next) => {
    const { email, nick, password } = req.body;
    try {
        const exUser = await User.findOne({ where: { email } });
        if (exUser) {
            req.body.success = false;
            req.body.code = '200';
            req.body.message = '등록된 유저가 있습니다.';
            return res.json(req.body);
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            nick,
            password: hash,
        });
        req.body.success = true;
        req.body.code = '200';
        req.body.message = '성공';
        return res.json(req.body);
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

exports.post_token = async (req, res, next) => {
    try {
        const token = jwt.sign(
            {
                id: 'manbalboy',
                nick: 'manbalboy',
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '10m', // 1분
                issuer: 'manbalboy',
            },
        );

        return res.json({
            code: 200,
            message: '토큰이 발급되었습니다',
            success: true,
            token,
        });
    } catch (error) {
        console.error(error);
        return res.status(200).json({
            code: 500,
            message: '서버 에러',
        });
    }
};

exports.post_login = (req, res, next) => {
    try {
        passport.authenticate('local', (authError, user, info) => {
            if (authError) {
                return next(authError);
            }

            if (!user) {
                console.log(info);
                return res.json({ code: 200, message: info.message, success: false });
            }

            return req.login(user, loginError => {
                if (loginError) {
                    return next(loginError);
                }
                // return res.redirect('/');
                return next();
            });
        })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
    } catch (error) {
        console.error(error);
        return res.status(200).json({
            code: 500,
            success: false,
            message: '서버 에러',
        });
    }
};

exports.get_token = async (req, res, next) => {
    res.json(req.decoded);
};
