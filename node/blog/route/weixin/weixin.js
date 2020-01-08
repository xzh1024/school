const express = require('express');
const https = require('https');
const process = require('process');
const crypto = require('crypto');  //加载crypto库
const router = express.Router();
const querystring = require('querystring');

let config = {
    wechat: {
        appID: 'wxfb63a450ad4fea74',
        appsecret: '35d04dd9f94f7bca2b9b9ed33009302d',
        token: 'weixin'
    }
};
//console.log(crypto.getCiphers()); //打印支持的cipher算法

//什么是Token？

/*
 Token：key
 EncodingAESKey：4w29efg8hEHLdOlQnWYI1RwMdNYhTA2nha4dF7w7RNj
*/
/*
* appID：wxfb63a450ad4fea74
* appsecret：35d04dd9f94f7bca2b9b9ed33009302d
* */
// function httpGet(url) {
//     console.log(url)
//     https.get(url, (res) => {
//         console.log('状态码：', res.statusCode);
//         console.log('请求头：', res.headers);
//
//         res.on('data', (d) => {
//             process.stdout.write(d);
//         });
//
//     }).on('error', (e) => {
//         console.error(e);
//     });
// }


// router.get('/movie', function(req, res) {
//     let url = "https://api-m.mtime.cn/Showtime/LocationMovies.api?locationId=880";
//
//     https.get(url, (response) => {
//         console.log('状态码：', response.statusCode);
//         console.log('请求头：', response.headers);
//
//         response.on('data', (d) => {
//             console.log('-------------------ddddddddddddddddddd------------------------');
//             console.log(d);
//             process.stdout.write(d);
//             console.log('-------------------ddddddddddddddddddd------------------------');
//             console.log(d);
//             // console.log(Object.prototype.toString.call(d));
//             // let data = d.toString();
//             let data = d.toString();
//             console.log('-------------------data------------------------');
//             console.log(data);
//             res.send({
//                 status: 1,
//                 msg: "登录成功",
//                 data: data
//             });
//         });
//
//     }).on('error', (e) => {
//         res.send({
//             status: 0,
//             msg: "登录失败",
//             data: e
//         });
//         console.log(e);
//     });
// });


router.get('/login', function(req, res, next) {
    let url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appID + "&secret="+ appsecret;
    https.get(url, (response) => {
        console.log('状态码：', response.statusCode);
        console.log('请求头：', response.headers);

        response.on('data', (d) => {
            process.stdout.write(d);
            console.log(Object.prototype.toString.call(d));
            let token = Buffer.from(d).toString();
            // res.send({
            //     status: 1,
            //     msg: "登录成功",
            //     data: token
            // });
            console.log(token)
            res.token = token;
            next();
        });

    }).on('error', (e) => {
        res.send({
            status: 0,
            msg: "登录失败",
            data: e
        });
        console.error(e);
    });
});
router.get('/login', function(req, res, next) {
    console.log(res.token);
    let url = "https://api.weixin.qq.com/cgi-bin/getcallbackip?access_token=" + res.token.access_token;
    https.get(url, (response) => {
        console.log('状态码：', response.statusCode);
        console.log('请求头：', response.headers);

        response.on('data', (d) => {
            process.stdout.write(d);
            console.log(Object.prototype.toString.call(d));
            let ipList = Buffer.from(d).toString();
            res.ipList = ipList;
            // next();
            res.send({
                status: 1,
                msg: "登录成功",
                data: ipList
            });
        });

    }).on('error', (e) => {
        res.send({
            status: 0,
            msg: "登录失败",
            data: e
        });
        console.error(e);
    });
});
router.get('/login', function(request, response) {
    // let url = "https://api.weixin.qq.com/cgi-bin/menu/addconditional?access_token=" + res.token.access_token;
    let url = "/cgi-bin/menu/addconditional?access_token=" + response.token.access_token;
    var post_data = {
        "button":[
            {
                "type":"click",
                "name":"今日歌曲",
                "key":"V1001_TODAY_MUSIC" },
            {     "name":"菜单",
                "sub_button":[
                    {
                        "type":"view",
                        "name":"搜索",
                        "url":"http://www.soso.com/"},
                    {
                        "type":"miniprogram",
                        "name":"wxa",
                        "url":"http://mp.weixin.qq.com",
                        "appid":"wx286b93c14bbf93aa",
                        "pagepath":"pages/lunar/index"
                    },
                    {
                        "type":"click",
                        "name":"赞一下我们",
                        "key":"V1001_GOOD"
                    }]
            }],
        "matchrule":{
            "tag_id":"2",
            "sex":"1",
            "country":"中国",
            "province":"广东",
            "city":"广州",
            "client_platform_type":"2",
            "language":"zh_CN"
        }
    };//这是需要提交的数据
    var content = querystring.stringify(post_data);
    const options = {
        hostname: 'api.weixin.qq.com',
        port: 80,
        path: url,
        method: 'POST',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Content-Length':content.length
        }
    };

    let req = https.request(options, (res) => {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);

        res.on('data', (d) => {
            process.stdout.write(d);
        });
    });

    req.on('error', (e) => {
        console.error(e);
    });
    req.write(content);
    req.end();
});


router.get('/index', function(req, res) {
    console.log(req.query);
    var token = config.wechat.token;
	var signature = req.query.signature;  //微信加密签名，signature结合了开发者填写的token参数和请求中的timestamp参数、nonce参数。
    var timestamp = req.query.timestamp;  //时间戳
    var nonce = req.query.nonce;  //随机数
    var echostr = req.query.echostr;  //随机字符串
  
    /*  加密/校验流程如下： */
    //1. 将token、timestamp、nonce三个参数进行字典序排序
    // var array = new Array(token,timestamp,nonce);
    // array.sort();
    // var str = array.toString().replace(/,/g,"");
    var str = [token, timestamp, nonce].sort().join('');
  
    //2. 将三个参数字符串拼接成一个字符串进行sha1加密
    var sha1Code = crypto.createHash("sha1");
    var code = sha1Code.update(str, 'utf-8').digest("hex");
  
    //3. 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
    if(code === signature){
    	console.log("----------------------------------------------成功");
        res.send(echostr)
    } else {
    	console.log("----------------------------------------------失败");
        res.send("error");
    }
});

module.exports = router;