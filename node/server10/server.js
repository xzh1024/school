/**
 * Created by Admin on 2018/9/17.
 */
const express = require('express');
const bodyParser2 = require('./libs/my-body-parser');


var server = express();

// server.use(bodyParser2());

server.use('/', function (req, res) {
    console.log(req.body);
});

// server.post('/', function (req, res) {
//     console.log(req.body);
// });
// server.get('/', function (req, res) {
//     console.log(req.query);
//     res.send('成功');
//     res.end();
// });

server.listen(8081, function () {
    console.log('8081服务器已启动...');
});