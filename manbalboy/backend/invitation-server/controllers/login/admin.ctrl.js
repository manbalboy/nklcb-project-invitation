/**
 * @author : manbalboy <manbalboy@hanmail.net>
 * @version 0.0.1
 */

exports.get_products = (_, res) => {
    res.send(
        { message: "hello" }
    );
}

exports.get_products_write = (_, res) => {
    res.send('admin/write.html');
}

exports.post_products_write = (req, res) => {
    res.send(req.body);
}