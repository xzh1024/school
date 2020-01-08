/**
 * Created by Admin on 2018/9/17.
 */
const express = require('express');

var server = express();

server.use('/a.html', function (req, res) {
    // res.write({a: 12, b: 5});
    res.send({a: 12, b: 5});
    res.end();
});

server.get('/', function (req, res) {
    console.log(req.query.username);
    res.send('get');
    res.end();
});

server.post('/', function (req, res) {
    console.log(req);
    res.send('post');
    res.end();
});

server.listen(8081);