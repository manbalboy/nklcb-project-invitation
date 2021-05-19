/**
 * @author : manbalboy <manbalboy@hanmail.net>
 * @version 0.0.1
 */

const app = require('./app.js');
const port = 3000;

app.listen(port, function () {
    console.log('Express listening on port', port);
});
