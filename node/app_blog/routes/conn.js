var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/blog',function(err) {
	if (err) {
		throw err;
	} else{
		console.log('数据库连接成功...');
	}
});

//创建用户骨架
var userSchema = new mongoose.Schema({
	username : String,//账号
	password : String //密码
});
//发布用户模型
global.userModel = mongoose.model('user',userSchema,'user');

//创建文章骨架
var blogSchema = new mongoose.Schema({
	title : String,//标题
	type : String,//类型
	writer : String,//作者
	content : String,//内容
	time : String, //发表时间
	img : String //存放图片地址
});
//发布文章模型
global.blogModel = mongoose.model('essay',blogSchema,'essay');


module.exports = mongoose;

