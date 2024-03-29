//index.js
//获取应用实例
const app = getApp()
const config = require("../../includes/config.js");

function getRandomColor () {
  let rgb = []
  for (let i = 0 ; i < 3; ++i){
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page({
  // inputValue: '666',
  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '666',
    src: '',
    danmuList: [
      {
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showModal({
      cancelColor: 'cancelColor',
      title: '用户信息',
      content: `姓名：${config.name}，年龄：${config.age}`
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  bindInputBlur: function(e) {
    // this.inputValue = e.detail.value
  },
  bindButtonTap: function() {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front','back'],
      success: function(res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  },
  bindSendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.data.inputValue,
      color: getRandomColor()
    });
    // 弹幕发送后清除input内容
    this.setData({
      inputValue: ''
    });
  },

  // 获取界面上的节点信息
  showNodeInfo: function () {
    const query = wx.createSelectorQuery()
    query.select('#the-id').boundingClientRect(function(res){
      res.top // #the-id 节点的上边界坐标（相对于显示区域）
      res.height = 10
      console.log(res);
    })
    query.selectViewport().scrollOffset(function(res){
      console.log(res);
      res.scrollTop // 显示区域的竖直滚动位置
    })
    query.exec()
  }
})
