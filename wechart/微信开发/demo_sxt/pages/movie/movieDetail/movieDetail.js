var app = getApp();
var utils = require('../../../utils/utils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: false,
    movieData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading();//显示导航条加载动画
    wx.showLoading();
    console.log(options.mid);
    //电影详情
    utils.http(app.url + '/movie/detail.api', { 
      "locationId": 290,
      "movieId": options.mid
      }, this.getMovieDate);
    //电影评论https://ticket-api-m.mtime.cn/movie/hotComment.api?movieId=125805
    // utils.http(app.url + '/movie/hotComment.api', { "movieId": options.mid }, this.movieCommentCallback);
  },
  movieCommentCallback: function(data){
    console.log('电影评论');
    console.log(data);
  },
  getMovieDate: function(data){
    wx.hideNavigationBarLoading();//隐藏导航条加载动画
    console.log(data);
    //设置导航条
    // wx.setNavigationBarTitle({
    //   title: data.titleCn,
    //   success: function (res) {
    //     // success
    //   }
    // });

    if (data.type.length > 0) {
      let type = '';
      for (let i = 0; i < data.type.length; i++) {
        if (i > 0) {
          type += '/' + data.type[i];
        } else {
          type += data.type[i];
        }
      }
      data.type = type;
    }
    if(data.directors.length > 0){
      let directors = '';
      for(let i = 0; i < data.directors.length; i++){
        if(i > 0){
          directors += '/' + data.directors[i];
        } else {
          directors += data.directors[i];
        }
      }
      data.directors = directors;
    }
    if (data.actors.length > 0){
      let actors = '';
      for (let i = 0; i < data.actors.length; i++){
        if(i > 0){
          actors += '/' + data.actors[i];
        } else {
          actors += data.actors[i];
        }
      }
      data.actors = actors;
    }
    wx.hideLoading();
    this.setData({
      movieData: data,
      flag: true
    });
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
    console.log('点击分享');
  }
})