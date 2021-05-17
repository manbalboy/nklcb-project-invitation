const db = require('../../models');
const { QueryTypes } = require('sequelize');

/**
 * @author : manbalboy <manbalboy@hanmail.net>
 * @version 0.0.1
 */
const query = `SELECT * FROM TB_USER`;
exports.get_products = async (_, res) => {
    let resultsVal = await db.sequelize.query(query,  { type: QueryTypes.SELECT })
        console.log('resultsVal  >> ', resultsVal);
    res.send(
        resultsVal
    );
}

exports.get_products_write = (_, res) => {
    res.send('admin/write.html');
}

exports.post_products_write = (req, res) => {
    res.send(req.body);
}