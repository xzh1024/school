/**
 * Created by Admin on 2018/12/11.
 * 文件名g.js 是Generator的简写
 */
'use strict'
const crypto = require('crypto');
//可以把koa this上的request对象，其实也就是http模块中的request对象，去拼装它的数据，最终可以拿到一个buffer的xml数据
var getRawBody = require('raw-body');
var Wechat = require('./wechat');
var util = require('./util');

module.exports = function (opts, handler) {
    var wechat = new Wechat(opts);

    return function *(next) {
        // console.log(this);
        console.log(this.query);
        var that = this;

        var token = opts.token;
        var signature = this.query.signature;  //微信加密签名，signature结合了开发者填写的token参数和请求中的timestamp参数、nonce参数。
        var timestamp = this.query.timestamp;  //时间戳
        var nonce = this.query.nonce;  //随机数
        var echostr = this.query.echostr;  //随机字符串

        var str = [token, timestamp, nonce].sort().join('');
        var sha1Code = crypto.createHash("sha1");
        // var code = sha1Code.update(str, 'utf-8').digest("hex");
        var sha = sha1Code.update(str, 'utf-8').digest("hex");

        if(this.method === 'GET'){
            if(sha === signature){
                console.log("----------------------------------------------成功");
                this.body = echostr + '';
            } else {
                console.log("----------------------------------------------失败");
                this.body = 'wrong';
            }
        }
        else if(this.method === 'POST'){
            //post数据代表用户操作信息
            if(sha !== signature){
                this.body = 'wrong';

                return false;
            }
            // console.log('g.js  this');
            // console.log(this);
            var data = yield getRawBody(this.req,{
                length: this.length,
                limit: '1mb',
                encoding: this.charset
            });
            // var data = yield getRawBody(this.req,{
            //     length: this.req.headers['content-length'],
            //     limit: '1mb',
            //     encoding: contentType.parse(this.req).parameters.charset
            // });
            //CDATA 部分中的所有内容都会被解析器忽略。
            //CDATA 部分由 "<![CDATA[" 开始，由 "]]>" 结束：
            console.log(Object.prototype.toString.call(data));
            console.log(data.toString());

            var content = yield util.parseXMLAsync(data);
            // console.log(content);

            var message = util.formatMessage(content.xml);
            console.log(message);

            this.weixin = message;

            yield handler.call(this, next);

            wechat.reply.call(this); //处理回复

            //事件类型
            // if(message.MsgType === 'event'){
            //     //订阅事件
            //     if(message.Event === 'subscribe'){  //unsubscribe
            //         var now = new Date().getTime();
            //
            //         // that.status = 200; //回复的状态
            //         // that.type = 'application/xml'; //回复的类型
            //         //回复的主体
            //         // that.body = '<xml>'+
            //         //                  '<ToUserName>< ![CDATA['+ message.FromUserName +']]></ToUserName>'+
            //         //                  '<FromUserName>< ![CDATA['+ message.ToUserName +']]></FromUserName>'+
            //         //                  '<CreateTime>'+ now +'</CreateTime>'+
            //         //                  '<MsgType>< ![CDATA[text] ]></MsgType>'+
            //         //                  '<Content>< ![CDATA[Hi,童鞋!] ]></Content>'+
            //         //             '</xml>';
            //         that.body = `<xml>
            //                          <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
            //                          <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
            //                          <CreateTime>${now}</CreateTime>
            //                          <MsgType><![CDATA[text]]></MsgType>
            //                          <Content><![CDATA[Hi,童鞋!下面请开始你的表演！]]></Content>
            //                      </xml>`;
            //
            //         return
            //     }
            // }
        }
    };
};


