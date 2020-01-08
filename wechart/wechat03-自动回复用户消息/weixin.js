/**
 * Created by Admin on 2018/12/19.
 */
//reply(回复)
/*
 ToUserName：开发者微信号
 FromUserName：发送方帐号（一个OpenID）
 CreateTime：消息创建时间 （整型）
 MsgType：消息类型，event
 Event：事件类型，subscribe(订阅)、unsubscribe(取消订阅)
 */
exports.reply = function* (next) {
    console.log('消息');
    var message = this.weixin;
    // console.log('message:');
    // console.log(message);
    //消息类型
    if(message.MsgType === 'event'){
        if(message.Event === 'subscribe'){  //关注事件
            if(message.EventKey){  //EventKey：事件KEY值，qrscene_为前缀，后面为二维码的参数值
                console.log('扫二维码进来：' + message.EventKey + '' + message.Ticket); //Ticket：二维码的ticket，可用来换取二维码图片
            }
            console.log('订阅');
            this.body = '哈哈，你订阅了这个号\r\n' + ' 消息ID: ' + message.MsgId;
            // this.body = '哈哈，你订阅了这个号！';
        } else if(message.Event === 'unsubscribe'){  //取消关注事件
            console.log('无情取关！');
            this.body = '';
        } else if(message.Event === 'SCAN'){  //扫描带参数二维码事件-用户已关注时的事件推送
            console.log('关注后扫二维码' + message.EventKey + ' ' + message.Ticket)
        } else if(message.Event === 'LOCATION'){  //上报地理位置事件
            this.body = '您上报的位置是： ' + message.Latitude + '/' + message.Longitude + '-' + message.Precision;
        } else if(message.Event === 'CLICK'){  //点击菜单拉取消息时的事件推送
            this.body = '您点击了菜单： ' + message.EventKey;
        } else if(message.Event === 'VIEW'){  //点击菜单跳转链接时的事件推送
            this.body = '您点击了菜单中的链接： ' + message.EventKey;
        }
    }
    else if(message.MsgType === 'text'){
        var content = message.Content;
        var reply = '额，你说的 ' + message.Content + ' 太复杂了';

        if(content === '1'){
            reply = '天下第一吃大米';
        } else if(content === '2'){
            reply = '天下第一吃豆腐';
        } else if(content === '3'){
            reply = '天下第一吃仙丹';
        } else if(content === '4'){
            reply = [{
                title: '技术改变世界',
                description: '只是个描述而已',
                picUrl: 'https://img.huxiucdn.com/article/cover/201812/18/221511341305.jpg?imageView2/1/w/710/h/400/|imageMogr2/strip/interlace/1/quality/85/format/jpg',
                url: 'https://github.com/'
            }];
            // {
            //     title: 'Nodejs 开发微信',
            //         description: '爽到爆',
            //     // picUrl: 'https://img.huxiucdn.com/article/cover/201812/18/211952592105.jpg?imageView2/1/w/710/h/400/|imageMogr2/strip/interlace/1/quality/85/format/jpg',
            //     picUrl: 'http://res.cloudinary.com/moveha/image/upload/v1441184110/assets/images/Mask-min.png',
            //     url: 'https://nodejs.org/'
            // }
        }

        this.body = reply;
    }

    yield next;
}