// pages/news/news.js
//引入
var newsData = require('../data/newsData.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../images/banner01.jpg',
      '../images/banner02.jpg',
      '../images/banner03.jpg',
      '../images/banner04.jpg',
      '../images/banner05.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    newsData:[]
  },
  goNewsDetail: function (event){
    // console.log(event.currentTarget.dataset.newsid);
    wx.navigateTo({
      url: '../newsDetail/newsDetail?newsid=' + event.currentTarget.dataset.newsid
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(newsData);
    this.setData({
      newsData: newsData.data
    })
    // console.log(this.data.newsData);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
  
  }
})