/**
 * Created by Admin on 2019/1/16.
 */

module.exports = {
    "button": [
        // {
        //     // "type":"click",
        //     "name":"福利专区",
        //     "sub_button":[
        //         {
        //             "type":"view",
        //             "name":"福利中心",
        //             "url":"http://www.soso.com/"
        //         },
        //         {
        //             "type":"view",
        //             "name":"礼包中心",
        //             "url":"http://www.soso.com/"
        //         },
        //         {
        //             "type":"click",
        //             "name":"签到有礼",
        //             "key":"签到成功"
        //         },
        //         {
        //             "type":"click",
        //             "name":"每日一题",
        //             "key":"答题"
        //         }
        //     ]
        // },
        // {
        //     "name":"游戏资讯",
        //     "sub_button":[
        //         {
        //             "type":"view",
        //             "name":"游戏官网",
        //             "url":"http://www.soso.com/"
        //         },
        //         {
        //             "type":"miniprogram",
        //             "name":"进入游戏",
        //             "url":"http://mp.weixin.qq.com",
        //             "appid":"wx286b93c14bbf93aa",
        //             "pagepath":"pages/lunar/index"
        //         },
        //         {
        //             "type":"click",
        //             "name":"英雄快报",
        //             "key":"英雄快报"
        //         },
        //         {
        //             "type":"view",
        //             "name":"我的英雄之路",
        //             "url":"http://www.soso.com/"
        //         },
        //         {
        //             "type":"click",
        //             "name":"绑定有礼",
        //             "key":"绑定账号"
        //         }
        //     ]
        // },
        // {
        //     "name":"互动专区",
        //     "sub_button":[
        //         {
        //             "type":"view",
        //             "name":"礼包兑换",
        //             "url":"http://www.soso.com/"
        //         },
        //         {
        //             "type":"click",
        //             "name":"联系客服",
        //             "key":"客服"
        //         },
        //         {
        //             "type":"click",
        //             "name":"游戏圈",
        //             "key":"游戏圈"
        //         },
        //         {
        //             "type":"view",
        //             "name":"看直播",
        //             "url":"http://www.soso.com/"
        //         },
        //         {
        //             "type":"view",
        //             "name":"TGA直播",
        //             "url":"http://www.soso.com/"
        //         }
        //     ]
        // },
        // {
        //     "name": "扫码",
        //     "sub_button": [
        //         {
        //             "type": "scancode_waitmsg",
        //             "name": "扫码带提示",
        //             "key": "rselfmenu_0_0",
        //             "sub_button": [ ]
        //         },
        //         {
        //             "type": "scancode_push",
        //             "name": "扫码推事件",
        //             "key": "rselfmenu_0_1",
        //             "sub_button": [ ]
        //         }
        //     ]
        // },
        // {
        //     "name": "发图",
        //     "sub_button": [
        //         {
        //             "type": "pic_sysphoto",
        //             "name": "系统拍照发图",
        //             "key": "rselfmenu_1_0",
        //             "sub_button": [ ]
        //         },
        //         {
        //             "type": "pic_photo_or_album",
        //             "name": "拍照或者相册发图",
        //             "key": "rselfmenu_1_1",
        //             "sub_button": [ ]
        //         },
        //         {
        //             "type": "pic_weixin",
        //             "name": "微信相册发图",
        //             "key": "rselfmenu_1_2",
        //             "sub_button": [ ]
        //         }
        //     ]
        // },
        // {
        //     "name": "发送位置",
        //     "type": "location_select",
        //     "key": "rselfmenu_2_0"
        // },
        // {
        //     "type": "media_id",
        //     "name": "图片",
        //     "media_id": "MEDIA_ID1"
        // },
        // {
        //     "type": "view_limited",
        //     "name": "图文消息",
        //     "media_id": "MEDIA_ID2"
        // }
        {
            "name": "点击、跳转",
            "sub_button": [
                {
                    "type":"click",
                    "name":"点击拉取",
                    "key":"menu1"
                },
                {
                    "type":"view",
                    "name":"跳转链接",
                    "url":"http://www.soso.com/"
                },
                {
                    "type":"miniprogram",
                    "name":"跳转小程序",
                    "url":"http://mp.weixin.qq.com",
                    "appid":"wx286b93c14bbf93aa",
                    "pagepath":"pages/lunar/index"
                }
            ]
        },
        {
            "name": "发图",
            "sub_button": [
                {
                    "type": "pic_sysphoto",
                    "name": "系统拍照发图",
                    "key": "menu4",
                    "sub_button": [ ]
                },
                {
                    "type": "pic_photo_or_album",
                    "name": "拍照或者相册发图",
                    "key": "menu5",
                    "sub_button": [ ]
                },
                {
                    "type": "pic_weixin",
                    "name": "微信相册发图",
                    "key": "menu6",
                    "sub_button": [ ]
                }
            ]
        },
        {
            "name": "扫码、地址",
            "sub_button": [
                {
                    "type": "scancode_push",
                    "name": "扫码推事件",
                    "key": "menu7",
                    "sub_button": [ ]
                },
                {
                    "type": "scancode_waitmsg",
                    "name": "扫码带提示",
                    "key": "menu8",
                    "sub_button": [ ]
                },
                {
                    "type": "location_select",
                    "name": "地理位置",
                    "key": "menu9",
                    "sub_button": [ ]
                }
            ]
        },
    ]
}