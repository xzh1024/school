/**
 * Created by Admin on 2018/9/17.
 */
const express = require('express');
const expressStatic = require('express-static');

var server = express();

//用户数据
var users = {
    'blue': '123456',
    'zhangsan': '654321',
    'lisi': '000000'
}

server.get('/login', function (req, res) {
    console.log(req.query.username);
    var user = req.query['user'];
    var pass = req.query['pass'];

    if(users[user] == null){
        res.send({ok: false, msg: '此用户不存在'});
    } else if(users[user] != pass){
        res.send({ok: false, msg: '密码错了'});
    } else {
        res.send({ok: true, msg: '成功'});
    }
    res.end();
});

server.use(expressStatic('./www'));

server.listen(8081);