const jwt = require('jsonwebtoken');
const { CODE_MESSAGE_TOKEN } = require('./CONST_CODE_MESSAGE.js');
const dotenv = require('dotenv');
dotenv.config(); //LOAD CONFIG

// 미들웨어
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('로그인 필요');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.redirect(`/?error=${message}`);
    }
};

exports.verifyToken = (req, res, next) => {
    try {
        req.decoded = jwt.verify(req.headers.autorization, process.env.JWT_SECRET);
        return next();
    } catch (error) {
        if (error.name == 'TokenExpiredError') {
            console.log(error);
            // 유효기간 초과
            return res.status(200).json({
                code: 'T502',
                success: false,
                message: CODE_MESSAGE_TOKEN.T502,
            });
        } else {
            return res.status(200).json({
                code: 'T501',
                success: false,
                message: CODE_MESSAGE_TOKEN.T501,
            });
        }
    }
};
