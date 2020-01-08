/**
 * Created by Admin on 2018/12/10.
 */
'use strict'

const Koa = require('koa');
// const router = require('koa-router')()
// const bodyParser = require('koa-bodyparser')

const path = require('path');
const crypto = require('crypto');
const wechat = require('./wechat/g');
var Wechat = require('./wechat/wechat');
var util = require('./libs/util');
var config = require('./config');
var reply = require('./wx/reply');
const wechat_file = path.join(__dirname, './config/wechat.txt');

const app = new Koa();
// var Router = require('koa-router');
// var router = new Router();

//卡券签名随机串
var createNonce = function () {
    return Math.random().toString(36).substr(2, 15);
}
//卡券签名时间戳
var createTimestamp = function () {
    return parseInt(new Date().getTime() / 1000, 10) + '';
}
var _sign = function (noncestr, ticket, timestamp, url) {
    var params = [
        'noncestr=' + noncestr,
        'jsapi_ticket=' + ticket,
        'timestamp=' + timestamp,
        'url=' + url
    ];
    var str = params.sort().join('&');
    var sha1Code = crypto.createHash("sha1");
    var signature = sha1Code.update(str, 'utf-8').digest("hex");

    return signature;
}
//卡券签名
function sign(ticket, url) {
    var noncestr = createNonce();
    var timestamp = createTimestamp();
    var signature = _sign(noncestr, ticket, timestamp, url);
    console.log('ticket:');
    console.log(ticket);
    console.log('url:');
    console.log(url);

    return {
        noncestr: noncestr,
        timestamp: timestamp,
        signature: signature
    }
}
/*
*
* wx.config({
     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
     appId: '', // 必填，公众号的唯一标识
     timestamp: , // 必填，生成签名的时间戳
     nonceStr: '', // 必填，生成签名的随机串
     signature: '',// 必填，签名
     jsApiList: [] // 必填，需要使用的JS接口列表
 });
 */
app.use(function *(next) {
    if(this.url.indexOf('/movie') > -1){
        console.log('movie');
        var wechatApi = new Wechat(config.wechat);
        console.log('wechatApi:');
        console.log(wechatApi);
        var data = yield wechatApi.fetchAccessToken();
        console.log('data:');
        console.log(data);
        var access_token = data.access_token;
        console.log('access_token:');
        console.log(access_token);
        var ticketData = yield wechatApi.fetchTicket(access_token);
        console.log('ticketData:');
        console.log(ticketData);
        var ticket = ticketData.ticket;
        console.log('ticket:');
        console.log(ticket);
        var url = this.href;
        console.log('url:');
        console.log(url);
        var params = sign(ticket, url);
        console.log('params:');
        console.log(params);

        // this.body = '<h1>Hi there!</h1>';
        var template = `<!DOCTYPE html>
                        <html>
                            <head>
                                <meta charset="UTF-8">
                                <title></title>
                                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum=scale=1" />
                            </head>
                            <body>
                                <h1>点击标题，开始录音翻译</h1>
                                <p id="title"></p>
                                <div id="poster"></div>
                                <script src="http://www.zeptojs.cn/skin/zepto-docs.min.js"></script>
                                <script src="https://res.wx.qq.com/open/js/jweixin-1.4.0.js"></script>
                                <script>
                                    wx.config({
                                        debug: false,
                                        appId: '${config.wechat.appID}',
                                        timestamp: ${params.timestamp},
                                        nonceStr: '${params.noncestr}',
                                        signature: '${params.signature}',
                                        jsApiList: [
                                            'updateAppMessageShareData',
                                            'updateTimelineShareData',
                                            'startRecord',
                                            'stopRecord',
                                            'onVoiceRecordEnd',
                                            'playVoice',
                                            'pauseVoice',
                                            'stopVoice',
                                            'onVoicePlayEnd',
                                            'uploadVoice',
                                            'downloadVoice',
                                            'chooseImage',
                                            'previewImage',
                                            'uploadImage',
                                            'downloadImage',
                                            'translateVoice'
                                        ] // 必填，需要使用的JS接口列表  附录2-所有JS接口列表
                                    });
                                    
                                    wx.ready(function(){
                                        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                                        console.log('验证完成');
                                        
                                        //基础接口  判断当前客户端版本是否支持指定JS接口
                                        wx.checkJsApi({
                                            jsApiList: [
                                            'updateAppMessageShareData',
                                            'updateTimelineShareData',
                                            'startRecord',
                                            'stopRecord',
                                            'onVoiceRecordEnd',
                                            'playVoice',
                                            'pauseVoice',
                                            'stopVoice',
                                            'onVoicePlayEnd',
                                            'uploadVoice',
                                            'downloadVoice',
                                            'chooseImage',
                                            'previewImage',
                                            'uploadImage',
                                            'downloadImage',
                                            'translateVoice'
                                        ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                                            success: function(res) {
                                                // 以键值对的形式返回，可用的api值true，不可用为false
                                                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                                                console.log('-------------------------------基础接口-------------------------------');
                                                console.log(res);
                                            }
                                        });
                                        
                                        //分享接口
                                        var shareContent = {
                                            title: '测试标题', // 分享标题
                                            desc: '测试描述', // 分享描述
                                            link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                            imgUrl: 'https://www.imooc.com/static/img/common/touch-icon-ipad.png', // 分享图标
                                            success: function () {
                                                // 设置成功
                                                alert('分享接口，初始化成功');
                                            },
                                            cancel: function(){
                                                alert('分享接口，初始化失败');
                                            }
                                        };
                                        wx.updateAppMessageShareData(shareContent);
                                        
                                        //音频接口
                                        var isRecording = false;
                                        $('h1').on('tap', function(){
                                            if(!isRecording){
                                                isRecording = true;
                                                //开始录音接口
                                                wx.startRecord({
                                                    cancel: function(){
                                                        window.alert('那就不能搜了哦');
                                                    }
                                                }); 
                                                
                                                return
                                            }
                                            
                                            isRecording = false;
                                            
                                            //停止路由接口
                                            wx.stopRecord({
                                                success: function (res) {
                                                    var localId = res.localId;
                                                    
                                                    //识别音频
                                                    wx.translateVoice({
                                                        localId: localId, // 需要识别的音频的本地Id，由录音相关接口获得
                                                        isShowProgressTips: 1, // 默认为1，显示进度提示
                                                        success: function (res) {
                                                            $('#title').html(res.translateResult); // 语音识别的结果
                                                            
                                                            
                                                            
                                                            shareContent = {
                                                                title: res.translateResult, // 分享标题
                                                                desc: '测试描述', // 分享描述
                                                                link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                                                imgUrl: 'https://www.imooc.com/static/img/common/touch-icon-ipad.png', // 分享图标
                                                                success: function () {
                                                                    // 设置成功
                                                                    alert('分享接口，设置成功');
                                                                },
                                                                cancel: function(){
                                                                    alert('分享接口，设置失败');
                                                                }
                                                            };
                                                            wx.updateAppMessageShareData(shareContent);
                                                        }
                                                    });
                                                }
                                            });
                                        });
                                        
                                        
                                    });
                                    
                                    wx.error(function(res){
                                        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                                        console.log('验证失败');
                                    });
                                </script>
                            </body>
                        </html>`;
        console.log(template);
        this.body = template;

        return next
    }

    yield next
});

// app.use('/', require('./route/web/web.js'));
// router.get('/wx', wechat(config.wechat, reply.reply));
// router.post('/wx', wechat(config.wechat, reply.reply));
app.use(wechat(config.wechat, reply.reply));

app.listen(80, function () {
    console.log('服务器已启动...');
});