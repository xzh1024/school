/**
 * Created by Admin on 2018/11/9.
 */
var express = require('express');

module.exports = function () {
    var router = express.Router();
    router.get('/1.html', function (req, res) {
        res.send('我是blog111').end();
    });
    router.get('/2.html', function (req, res) {
        res.send('我是blog222').end();
    });
    return router;
};
