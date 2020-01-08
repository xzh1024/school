/**
 * Created by Admin on 2018/9/6.
 */
const http = require('http');
const querystring = require('querystring');

http.createServer(function (req, res) {
    //POST--req

    var str = '';   //接收数据

    //data--有一段数据到达（很多次）
    var i = 0;
    req.on('data', function (data) {
        console.log(`第${i++}次收到数据`);
        str+=data;
        // console.log(str);
    });
    //end--数据全部到达（一次）
    req.on('end', function () {
        var data = querystring.parse(str)
        console.log(data);
    })
    // res.write('server05');
    // res.end();
}).listen(8081);