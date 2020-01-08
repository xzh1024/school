var utils = require('../../../utils/utils.js');
// var newsData = require('../data/newsData.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryName: 0,
    movieData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading();//显示导航条加载动画
    this.setData({
      categoryName: options.categoryname
    });
    // switch (options.categoryname){
    //   case '1':
    //     this.setData({
    //       categoryName: '正在售票'
    //     });
    //     break;
    //   case '2':
    //     this.setData({
    //       categoryName: '正在热映'
    //     });
    //     break;
    //   case '3':
    //     this.setData({
    //       categoryName: '即将上映'
    //     });
    //     break;
    // }
    console.log(this.data.categoryName);
    utils.movieHttp(app.url + '/Showtime/LocationMovies.api?locationId=290', this.data.categoryName, this.callback);
  },
  callback: function (data) {
    wx.hideNavigationBarLoading();//隐藏导航条加载动画
    wx.stopPullDownRefresh();//暂停下拉刷新
    console.log(data);
    this.data.movieData.push.apply(this.data.movieData, data);
    this.setData({
      movieData: this.data.movieData
    });
  },
  movieId: function (event) {
    console.log(event.currentTarget.dataset.mid)
    wx.navigateTo({
      url: '/pages/movie/movieDetail/movieDetail?mid=' + event.currentTarget.dataset.mid
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var categoryName = '';
    switch (this.data.categoryName) {
      case '1':
        categoryName = '正在售票';
        break;
      case '2':
        categoryName = '正在热映';
        break;
      case '3':
        categoryName = '即将上映';
        break;
    }
    //设置导航条
    wx.setNavigationBarTitle({
      title: categoryName,
      success: function (res) {
        // success
      }
    })
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
    console.log('下拉事件');
    this.setData({
      movieData: []
    });
    utils.movieHttp(app.url + '/Showtime/LocationMovies.api?locationId=290', this.data.categoryName, this.callback);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //加载更多数据
    utils.movieHttp(app.url + '/Showtime/LocationMovies.api?locationId=290', this.data.categoryName, this.callback);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})