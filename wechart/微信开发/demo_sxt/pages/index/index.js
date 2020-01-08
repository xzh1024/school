//index.js
//获取应用实例
const app = getApp()

Page({
  // data: {
  //   motto: 'Hello World',
  //   userInfo: {},
  //   hasUserInfo: false,
  //   canIUse: wx.canIUse('button.open-type.getUserInfo')
  // },
  //事件处理函数
  bindViewTap: function() {
    //当路径tabbar绑定后可以使用wx.switchTab进行跳转并且只能跳转带有tabbar的页面 而redirectTo或者navigateTo则不能跳转tabbar绑定过的页面
    // wx.switchTab({
    //   url: '../news/news'
    // })
    wx.navigateTo({
      url: '../news/news'
    })
  },
  onLoad: function () {

  }
})
