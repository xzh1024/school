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
var config = require('./config');
var Wechat = require('./wechat/wechat');

var wechatApi = new Wechat(config.wechat);


exports.reply = function* (next) {
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
        } else if(message.Event === 'MASSSENDJOBFINISH'){  //点击菜单跳转链接时的事件推送
            this.body = '群发消息事件\r\n粉丝数：' + message.TotalCount + '\r\n过滤数：' + message.FilterCount + '\r\n发送成功的粉丝数：' + message.SentCount + '\r\n发送失败的粉丝数：' + message.ErrorCount;
        }
    }
    else if(message.MsgType === 'text'){
        var content = message.Content;
        var reply = '额，你说的 ' + message.Content + ' 太复杂了';

        if(content === '0'){
            console.log(message);
            reply = '用户信息';
        } else if(content === '1'){
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
        } else if(content === '图片'){
            // var data = yield wechatApi.uploadMaterial('image', __dirname + '/2.jpg');
            var data = yield wechatApi.uploadMaterial('image', './public/img/2.jpg');

            reply = {
                type: 'image',
                mediaId: data.media_id
            }
        } else if(content === '视频'){
            var data = yield wechatApi.uploadMaterial('video', './public/video/1.mp4');

            reply = {
                type: 'video',
                title: '回复视频内容',
                description: '喝杯咖啡提提神',
                mediaId: data.media_id
            }
        } else if(content === '8'){
            // var data = yield wechatApi.uploadMaterial('image', __dirname + '/2.jpg');
            var data = yield wechatApi.uploadMaterial('image', './public/img/3.jpg', {type: 'image'});

            reply = {
                type: 'image',
                mediaId: data.media_id
            }
        } else if(content === '9'){
            var data = yield wechatApi.uploadMaterial('video', './public/video/1.mp4', {
                type: 'video',
                description: '{"title": "is title","introduction": "is introduction"}'
            });

            reply = {
                type: 'video',
                title: '永久视频素材',
                description: 'xxxx',
                mediaId: data.media_id
            }
        } else if(content === '10'){
            var picData = yield wechatApi.uploadMaterial('image', './public/img/2.jpg', {});

            var media = {
                articles: [
                    {
                        title: '没有标题',
                        thumb_media_id: picData.media_id,
                        author: 'zero',
                        digest: '没有摘要',
                        show_cover_pic: 1,
                        content: '没有内容',
                        content_source_url: 'https://github.com'
                    }
                ]
            };
            var data = '';
            data = yield wechatApi.uploadMaterial('news', media, {});
            data = yield wechatApi.fetchMaterial(data.media_id, 'news', {});

            console.log(data);

            var items = data.news_item;
            var news = [];

            items.forEach(function (item) {
                news.push({
                    title: item.title,
                    decription: item.digest,
                    picUrl: picData.url,
                    url: item.url
                });
            });

            reply = news;
        } else if(content === '11'){
            var counts = yield wechatApi.countMaterial();
            console.log('---------------------素材总数-------------------');
            console.log(JSON.stringify(counts));

            var results = yield [
                wechatApi.batchMaterial({
                    type: 'image',
                    offset: 0,
                    count: 10
                }),
                wechatApi.batchMaterial({
                    type: 'video',
                    offset: 0,
                    count: 10
                }),
                wechatApi.batchMaterial({
                    type: 'voice',
                    offset: 0,
                    count: 10
                }),
                wechatApi.batchMaterial({
                    type: 'news',
                    offset: 0,
                    count: 10
                })
            ];

            // var list = yield wechatApi.batchMaterial({
            //     type: 'image',
            //     offset: 0,
            //     count: 10
            // })
            console.log('---------------------素材列表-------------------');
            console.log(results);

            reply = '1';
        } else if(content === '删除'){
            var data = yield wechatApi.deleteMaterial('qp8wEAvjkkdXGbGJwc9yNQSiWIlJqkgiuH4_z84dUVY');

            reply = '删除';
        } else if(content === '创建标签'){
            var tag = yield wechatApi.createTag('wechat');
            console.log('新分组 wechat');
            console.log(tag);

            var tags = yield wechatApi.getTag();
            console.log('加了 test 后的标签列表');
            console.log(tags);
            console.log('用户ID：' + message.FromUserName);
            var tag2 = yield wechatApi.checkTag(message.FromUserName);
            console.log('查看我所在的标签');
            console.log(tag2);

            reply = 'Tag done!';
        } else if(content === '标签列表'){
            var tags = yield wechatApi.getTag();
            console.log('标签列表');
            console.log(tags);
            console.log('用户ID：' + message.FromUserName);
            var mytag = yield wechatApi.checkTag(message.FromUserName);
            console.log('查看我所在的标签');
            console.log(mytag);

            reply = 'Tag done!';
        } else if(content === '编辑标签'){
            var tags = yield wechatApi.getTag();
            console.log('标签列表');
            console.log(Object.prototype.toString.call(tags));
            console.log(tags);

            var tag = yield wechatApi.updateTag(102, 'wechat');
            console.log('编辑后的标签');
            console.log(tag)

            var mytag = yield wechatApi.checkTag(message.FromUserName);
            console.log('查看我所在的标签');
            console.log(mytag);

            reply = 'Tag done!';
        } else if(content === '打标签'){
            var tags = yield wechatApi.getTag();
            console.log('标签列表');
            console.log(Object.prototype.toString.call(tags));
            console.log(tags);

            var tag = yield wechatApi.batchtaggingTag(102, [message.FromUserName]);
            console.log('批量为用户打标签后');
            console.log(tag)

            var mytag = yield wechatApi.checkTag(message.FromUserName);
            console.log('查看我所在的标签');
            console.log(mytag);

            reply = 'Tag done!';
        } else if(content === '取消标签'){
            var tags = yield wechatApi.getTag();
            console.log('标签列表');
            console.log(Object.prototype.toString.call(tags));
            console.log(tags);

            var tag = yield wechatApi.batchuntaggingTag(101, [message.FromUserName]);
            console.log('取消标签后');
            console.log(tag)

            var mytag = yield wechatApi.checkTag(message.FromUserName);
            console.log('查看我所在的标签');
            console.log(mytag);

            reply = 'Tag done!';
        } else if(content === '删除标签'){
            var deleteTag = yield wechatApi.deleteTag(101);
            console.log('删除标签后');
            console.log(deleteTag);

            var mytag = yield wechatApi.checkTag(message.FromUserName);
            console.log('查看我所在的标签');
            console.log(mytag);

            reply = 'Tag done!';
        } else if(content === '获取用户基本信息'){
            var openIds = [message.FromUserName];
            var userinfo = yield wechatApi.batchgetUser(openIds);
            console.log('获取用户基本信息后');
            console.log(typeof userinfo);
            console.log(userinfo);
            if(typeof(userinfo) === 'object'){
                reply = '用户昵称：' + userinfo.user_info_list[0].nickname;
            } else {
                reply = '用户昵称：' + userinfo.nickname;
            }
        } else if(content === '获取用户列表'){
            var userlist = yield wechatApi.listUser();
            console.log('获取用户列表后');
            console.log(userlist);
            /* 返回参数
            *   total	关注该公众账号的总用户数
                count	拉取的OPENID个数，最大值为10000
                data	列表数据，OPENID的列表
                next_openid	拉取列表的最后一个用户的OPENID
             */
            reply = 'userlist';
        } else if(content === '获取黑名单列表'){
            var list = yield wechatApi.getblacklistUser();
            console.log('获取黑名单列表后');
            console.log(list);
            reply = '1';
        } else if(content === '拉黑用户'){
            var openIds = ["olKQ50qR8MWE-GQLep2EWyvmMU_k"];
            var data = yield wechatApi.batchblacklistUser(openIds);
            console.log('拉黑用户后');
            console.log(data);
            reply = JSON.stringify(data);
        } else if(content === '取消拉黑用户'){
            var openIds = ["olKQ50qR8MWE-GQLep2EWyvmMU_k"];
            var data = yield wechatApi.batchunblacklistUser(openIds);
            console.log('取消拉黑用户后');
            console.log(data);
            reply = JSON.stringify(data);
        } else if(content === '群发消息'){
            // var mpnews = {
            //     "media_id": "JkzLUaw987hXkNCds9Fdm8ROiiLvW4n9awrSkLAduqxZqP2pGy8N8NEFgE3zgamk"
            // };
            var text = {
                "content": "hello wechat"
            };
            // var image = {
            //     "media_id":"JkzLUaw987hXkNCds9Fdm8ROiiLvW4n9awrSkLAduqxZqP2pGy8N8NEFgE3zgamk"
            // };

            // var msgData = yield wechatApi.sendAllMass('mpnews', mpnews);
            // var msgData = yield wechatApi.sendAllMass('mpnews', mpnews, 102);
            var msgData = yield wechatApi.sendAllMass('text', text, 102);
            // var msgData = yield wechatApi.sendAllMass('image', image, 102);
            console.log('根据标签进行群发消息后');
            console.log(msgData);
            reply = 'Yeah!';
        } else if(content === '查询群发状态'){
            var msgData = yield wechatApi.getMass(1000000001);
            console.log('查询群发状态后');
            console.log(msgData);
            reply = '1';
        }

        this.body = reply;
    }

    yield next;
}