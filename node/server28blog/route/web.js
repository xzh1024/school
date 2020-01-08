/**
 * Created by Admin on 2018/11/12.
 */
var express = require('express');

module.exports = function () {
    var router = express.Router();
    router.get('/', function (req, res) {
        res.send('我是web').end();
    });
    router.get('/2.html', function (req, res) {
        res.send('我是web2').end();
    });
    return router;
};