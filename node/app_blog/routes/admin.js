var express = require('express');
var router = express.Router();
var mongoose = require('./conn');
//登录请求
router.post('/checkuser.html',function(req,res) {
	//获取浏览器发送的数据
	var username = req.body.username;
	var password = req.body.password;
	//查询数据库中是否存在
	userModel.find({"username":username,"password":password}).exec(function(err,data) {
		if (data.length) {
			//登录成功，设置cookie
            res.cookie('user',username);
			res.send('1');
		} else{
			res.send('0');
		}
	});
});
//判断cookies
router.get('/checklogin.html',function(req,res) {
	var user = req.cookies.user;
	if (user) {
		res.send('1');
	} else{
		res.send('alert("请登录后再操作");location.href="/admin/login.html";');
	}
});
//接收退出系统的请求
router.get('/logout.html',function(req,res) {
	res.clearCookie('user');
	res.send('<script>alert("退出成功");location.href="/admin/login.html";</script>');
});
//发布文章
router.post('/article_save.html', function(req, res) {
	var title = req.body.title;
	var type = req.body.type;
	var writer = req.body.writer;
	var content = req.body.content;
	var time = new Date().toLocaleDateString();
//	var time = new Date().toLocaleString();
	//console.log(title,type,writer,content,time);
	//创建实体
	var blog = new blogModel();
	//写入数据
	blog.title = title;
	blog.type = type;
	blog.writer = writer;
	blog.content = content;
	blog.time = time;
	blog.img = "img/"+Math.ceil(Math.random()*10)+".jpg";
	//保存数据
	blog.save(function(err) {
		if (err) {
			throw err;
		} else{
			res.send('<script>alert("发表成功");location.href="article_list.html";</script>');
		}
	});
});
//显示文章列表
router.post('/showarticle.html',function(req,res) {
	/*后端分页 三条件
	 * pagesuze : 每页显示多少条数据
	 * page : 当前页
	 * pagecount : 总页数
	*/
	//每页显示多少条
	var pagesize = 10;
	//第几页
	var page = req.body.page?req.body.page:1;
	blogModel.find({}).exec(function(err,data) {
		//总共多少页
		var pagecount = Math.ceil(data.length/pagesize);
		var n = (page-1)*pagesize;
		blogModel.find({}).skip(n).limit(pagesize).sort({"time":-1}).exec(function(err,data) {
			data.push({"pagecount":pagecount});
			res.send(data);
			//console.log(data)
		});
	});	
});
//删除文章
router.post('/art_del.html',function(req,res) {
	var id = req.body.id;
	blogModel.findById(id).exec(function(err,data) {
		if (err) {
			throw err;
		} else{
			data.remove();
			res.send("1");
		}
	})
});
//修改文章
router.get('/edit.html',function(req,res) {
	var id = req.query.id;
	blogModel.findById(id, function(err,data) {
		res.render('edit.ejs',{'data':data});
	});
});
//保存修改
router.post('/save_edit.html',function(req,res) {
	var id = req.body.id;
	var title = req.body.title; //标题
	var type = req.body.type; //文章分类
	var writer = req.body.writer; //作者
	var content = req.body.content; //内容
	blogModel.findById(id, function(err,data) {
		data.title = title;
		data.type = type;
		data.writer = writer;
		data.content = content;
		data.save(function(err) {
			if (err) {
				throw err;
			} else{
				res.send('<script>alert("修改成功！");location.href="/admin/article_list.html"</script>');
			}
		});
	});
});

module.exports = router;