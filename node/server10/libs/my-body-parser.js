/**
 * Created by Admin on 2018/9/17.
 */
const querystring = require('querystring');

module.exports = function() {
    return function (req, res, next) {
        var str = '';
        req.on('data', function (data) {
            str += data;
        });
        req.on('end', function () {
            req.body = querystring.parse(str);

            next();
        });
    }
}