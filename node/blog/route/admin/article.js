/**
 * Created by Admin on 2018/11/26.
 */
const express = require('express');
const mysql = require('mysql');
const common = require('../../libs/common');
//1.连接池
//createConnection(哪台服务器, 用户名, 密码, 库名);
const db = mysql.createPool({
    host:'localhost',
    port: 3306,      //端口号 可缺省,默认3306
    user: 'root',
    password: '123456',
    database: 'blog'    //库名
});
const router = express.Router();

router.post('/add', (req, res) => {
    console.log(req.body);
    var title = req.body.title;
    var author = req.body.author;
    var content = req.body.content;
    var time = Date.parse(new Date()) / 1000;

    // console.log('cookie:'+req.cookie);
    // console.log('session:'+req.session);
    console.log(time)
    db.query(`INSERT INTO article_table (title, author, content, time) VALUES('${title}', '${author}', '${content}', '${time}');`,
        (err, data) => {
            if(err){
                console.log(err);
                // res.status(500).send('database error').end();
                res.send({
                    status: 0,
                    msg: 'database error',
                    data: ''
                }).end();
            } else {
                res.send({
                    status: 1,
                    msg: '添加成功',
                    data: ''
                }).end();
            }
        });
});
//删除
router.post('/delete', (req, res) => {
    console.log(req.body);
    var ID = req.body.ID;
    console.log(ID)
    db.query(`DELETE FROM article_table WHERE ID='${ID}';`,
        (err, data) => {
            if(err){
                console.log(err);
                // res.status(500).send('database error').end();
                res.send({
                    status: 0,
                    msg: 'database error',
                    data: ''
                }).end();
            } else {
                res.send({
                    status: 1,
                    msg: '删除成功',
                    data: ''
                }).end();
            }
        });
});
router.post('/get_list', (req, res) => {
    //每页显示多少条
    var pageSize = req.body.page_size?req.body.page_size:10;
    //第几页
    var page = req.body.page?req.body.page:1;
    //起始坐标
    var n = (page-1)*pageSize;
    db.query(`SELECT * FROM article_table;`,
        (err, data) => {
            if(err){
                console.log(err);
                // res.status(500).send('database error').end();
                res.send({
                    status: 0,
                    msg: 'database error',
                    data: ''
                }).end();
            } else {
                if(data.length == 0){
                    res.send({
                        status: 0,
                        msg: '没有数据',
                        data: data
                    }).end();
                } else {
                    //计算总页数
                    var count = data.length;
                    var pageCount = Math.ceil(data.length/pageSize);
                    if(page <= pageCount){
                        //查询语句 以时间为条件降序排列
                        db.query(`SELECT * FROM article_table ORDER BY time DESC LIMIT ${n},${pageSize};`,
                            (err, data) => {
                                if(err){
                                    console.log(err);
                                    // res.status(500).send('database error').end();
                                    res.send({
                                        status: 0,
                                        msg: 'database error',
                                        data: ''
                                    }).end();
                                } else {
                                    console.log(data.length);
                                    if(data.length == 0){
                                        res.send({
                                            status: 0,
                                            msg: '没有数据',
                                            data: data
                                        }).end();
                                    } else {
                                        var datas = {};
                                        datas.count = count;
                                        // datas.pageCount = pageCount;
                                        datas.list = data;
                                        res.send({
                                            status: 1,
                                            msg: '',
                                            data: datas
                                        }).end();
                                    }
                                }
                            });
                    } else {
                        res.send({
                            status: 0,
                            msg: '超过最大page数',
                            data: ''
                        }).end();
                    }
                }
            }
        });
});

module.exports = router;