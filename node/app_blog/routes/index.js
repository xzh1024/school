var express = require('express');
var router = express.Router();
var mongoose = require('./conn');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/showArticle.html',function(req, res) {
	//计数
	var tally = req.query.tally;
	//获取的条目数
	var showsize = 4;
	blogModel.find({}).exec(function(err,data) {
		var total = Math.ceil(data.length/showsize);
		//跳过的条数
		var n = (tally - 1) * showsize;
		blogModel.find({}).skip(n).limit(showsize).sort({"time":-1}).exec(function(err,data) {
			if (err) {
				throw err;
			} else{
				//如果tally==total成立则隐藏 更多文章按钮
				data.push({"token":tally==total});
				res.send(data);
			}
		});
	});
});
//精选帖子列表
router.get('/showList.html',function(req,res) {
	blogModel.find({}).exec(function(err,data) {
		var n = Math.min(6,data.length);
		blogModel.find({}).limit(n).sort({"time":-1}).exec(function(err,data) {
			if (err) {
				throw err;
			} else{
				res.send(data);
			}
		});
	});
});

//查看文章内容
//route.get('/singles.html', function(req,res) {
//var id = req.query.id;
////console.log(id);
//blogModel.findById(id).exec(function(err,data) {
//	data.save(function(err) {
//			res.render('single.ejs',{'data':data});
//		});
//});
//});

//类型
router.get('/showSimilar.html',function(req,res) {
	var type = req.query.sim;
	//console.log(type);
	blogModel.find({"type":type}).exec(function(err,data) {
		res.send(data);
	});
});

router.get('/mainSwitch.html', function(req,res) {
  var id = req.query.id;
  //console.log(id);
  blogModel.findById(id).exec(function(err,data) {
  	res.send(data);
  });
});

module.exports = router;
