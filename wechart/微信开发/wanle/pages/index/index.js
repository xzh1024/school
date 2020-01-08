//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    banners: {
      list: [],
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000,
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    let _this = this;
    wx.request({
      url: app.server.www + '/api-game-newIndex', // 仅为示例，并非真实的接口地址
      data: {
        page: 1,
        platform: 1,//游戏平台,1BT服，2折扣服
        system: app.config.system  //1为安卓，2为苹果
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        let datas = res.data;
        if (datas.status === 0){
          if(datas.data && datas.data.banner && datas.data.banner.length > 0){
            let banner = datas.data.banner;
            banner.forEach(function(item){
              item.img = app.server.www + item.slide_pic;
            });
            _this.data.banners.list = datas.data.banner
            _this.setData({
              banners: _this.data.banners
            });
          }
        }
      }
    })
  },
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
})
