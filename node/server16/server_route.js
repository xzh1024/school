/**
 * Created by Admin on 2018/9/28.
 */
const express = require('express');
var router = express.Router();
var server = express();

server.get('/', function (req, res) {
    res.send(router);
});

server.listen(8081, function () {
    console.log('服务器已启动...');
});