const db = require('../../models');
const { QueryTypes } = require('sequelize');
// const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../../models/User');

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
            req.body.msg = '등록된 유저가 있습니다.';
            return res.json(req.body);
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            nick,
            password: hash,
        });
        req.body.msg = '성공';
        return res.json(req.body);
    } catch (error) {
        console.error(error);
        return next(error);
    }
};
