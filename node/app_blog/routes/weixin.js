var express = require('express');
var crypto = require('crypto');  //加载crypto库
var mongoose = require('mongoose');
var router = express.Router();
//console.log(crypto.getCiphers()); //打印支持的cipher算法


var token = "weixin"; //此处需要你自己修改！
router.get('/login.html', function(req, res) {
	var signature = req.query.signature;  //微信加密签名，signature结合了开发者填写的token参数和请求中的timestamp参数、nonce参数。
    var timestamp = req.query.timestamp;  //时间戳
    var nonce = req.query.nonce;  //随机数
    var echostr = req.query.echostr;  //随机字符串
  
    /*  加密/校验流程如下： */
    //1. 将token、timestamp、nonce三个参数进行字典序排序
    var array = new Array(token,timestamp,nonce);
    array.sort();
    var str = array.toString().replace(/,/g,"");
  
    //2. 将三个参数字符串拼接成一个字符串进行sha1加密
    var sha1Code = crypto.createHash("sha1");
    var code = sha1Code.update(str,'utf-8').digest("hex");
  
    //3. 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
    if(code === signature){
    	console.log("----------------------------------------------成功");
        res.send(echostr)
    } else {
    	console.log("----------------------------------------------失败");
        res.send("error");
    }
    
    
	//微信加密签名，signature结合了开发者填写的token参数和请求中的timestamp参数、nonce参数。
//	var signature = req.query.signature;
//	console.log("----------------------------------------------成功");
//	console.log('微信加密签名:',signature);
//	//时间戳
//	var timestamp	= req.query.timestamp;
//	console.log('时间戳:',timestamp);
//	//随机数
//	var nonce = req.query.nonce;
//	console.log('随机数:',nonce);
//	//随机字符串
//	var echostr	= req.query.echostr;
//	console.log('随机字符串:',echostr);
//	//	密钥
//	var token = "weixin";
//	
//	var tmpArr = new Array(token,timestamp,nonce);
//	//按字母顺序进行排序
//	tmpArr.sort();
//	var tmpStr = tmpArr[0] + tmpArr[1] + tmpArr[2];
//	console.log("+++++++++++++++++++++++++++++++++++",tmpStr)
//
//	//加密
//	var code = encryption(tmpStr,token);
//
//	function encryption(str, token) {
//		var buf = crypto.randomBytes(16);
//		var token = token;
//		token = buf.toString("hex"); //密钥加密；
//		var Signture = crypto.createHmac("sha1", token); //定义加密方式
//		Signture.update(str);
//		var code = Signture.digest().toString("base64"); //生成的密文后将再次作为明文再通过pbkdf2算法迭代加密；
//		console.log("加密的结果f："+code);
//		return code;
//	}
//	if( signature == code ){
//		console.log('-------------------------------------------------------------');
//		
//		res.send(echostr);
//	}else{
//		console.log('-------------------------------------------------------------');
//		console.log("失败");
//		res.send("error");
//	}
});

module.exports = router;