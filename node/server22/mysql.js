/**
 * Created by Admin on 2018/9/29.
 */
const mysql = require('mysql');

//1.连接
//createConnection(哪台服务器, 用户名, 密码, 库名);
var db = mysql.createConnection({
    host:'localhost',
    // port: 3306, //端口号
    user: 'root',
    password: '123456',
    database: 'blog'
});

//2.查询
//query(SQL语句, 回调)
db.query('SELECT * FROM `user_table`;', (err, data) => {
    if(err)
        console.log('出错：', err);
    else
        console.log('成功：', data);
        console.log(JSON.stringify(data));
});