/**
 * @author : manbalboy <manbalboy@hanmail.net>
 * @version 0.0.1
 */

const { Router } = require('express');
const router = Router();
router.use('/login', require('./login'));
router.use('/auth', require('./auth'));

module.exports = router;
