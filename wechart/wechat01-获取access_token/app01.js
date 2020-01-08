/**
 * Created by Admin on 2018/12/10.
 */
'use strict'

const Koa = require('koa');
// const sha1 = require('sha1');
// const https = require('https');
const crypto = require('crypto');  //加载crypto库
const router = express.Router();
// const querystring = require('querystring');
const app = new Koa();

const config = {
    wechat: {
        appID: 'wxfb63a450ad4fea74',
        appsecret: '35d04dd9f94f7bca2b9b9ed33009302d',
        token: 'weixin'
    }
}
app.use('/', require('./route/web/web.js'));

app.use(function *(next) {
    console.log(this);
    console.log(this.query);

    var token = config.wechat.token;
    var signature = this.query.signature;  //微信加密签名，signature结合了开发者填写的token参数和请求中的timestamp参数、nonce参数。
    var timestamp = this.query.timestamp;  //时间戳
    var nonce = this.query.nonce;  //随机数
    var echostr = this.query.echostr;  //随机字符串

    var str = [token, timestamp, nonce].sort().join('');
    var sha1Code = crypto.createHash("sha1");
    var code = sha1Code.update(str, 'utf-8').digest("hex");

    if(code === signature){
        console.log("----------------------------------------------成功");
        this.body = echostr + '';
    } else {
        console.log("----------------------------------------------失败");
        this.body = 'wrong';
    }
});

app.listen(80, function () {
    console.log('服务器已启动...');
});