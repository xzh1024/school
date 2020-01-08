// pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieData: [

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getMovie('https://api-m.mtime.cn/PageSubArea/HotPlayMovies.api?locationId=290');//正在售票
    this.LocationMovies(1);//正在热映
    this.LocationMovies(2);//正在热映
    this.LocationMovies(3);//正在热映
  },
  HotPlayMovies: function(){
    this.getMovie('https://api-m.mtime.cn/PageSubArea/HotPlayMovies.api?locationId=880', 2, this.callback);//正在售票
  },
  LocationMovies: function (categoryname){
    this.getMovie('https://api-m.mtime.cn/Showtime/LocationMovies.api?locationId=290', categoryname, this.callback);//正在热映
  },
  callback: function(data){
    // console.log(data);
  },
  getMovie: function (url, categoryname, callback){
    // console.log(url);
    // console.log(callback);

    var _this = this;
    wx.request({
      // url: url, //仅为示例，并非真实的接口地址
      url: url, //仅为示例，并非真实的接口地址
      // data: {
      //   "apikey": '0b2bdeda43b5688921839c8ecb20399b',//固定值0b2bdeda43b5688921839c8ecb20399b
      //   "city": '成都',//所在城市，例如北京、上海等
      //   "start": 1,//分页使用，表示第几页
      //   "count": 10,//分页使用，表示数量
      //   "client": '',//客户端信息。可为空
      //   "udid": ''//用户 id。可为空
      // },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data);
        if (res.data) {
          if (res.data.ms) {
            var list = res.data.ms;
            var data= {
              list: []
            };
            data.categoryname = categoryname;
            // data.list.push(list[0]);
            // data.list.push(list[1]);
            // data.list.push(list[2]);
            for (let i = 0; i < list.length; i++) {
              list[i].rating = list[i].r;
            }
            data.list.push(list[Math.floor((Math.random() * 50) + 1)]);
            data.list.push(list[Math.floor((Math.random() * 50) + 1)]);
            data.list.push(list[Math.floor((Math.random() * 50) + 1)]);
            _this.data.movieData.push(data);
            // _this.data.movieData.slogan = "正在热映";
            // _this.data.movieData.list.push(list[0]);
            // _this.data.movieData.list.push(list[1]);
            // _this.data.movieData.list.push(list[2]);
            _this.setData({
              movieData: _this.data.movieData
            });
            callback(_this.data.movieData)
          }
        }
      },
      fail(err) {
        console.log(err);
      }
    })
  },
  movieMoreTap: function(event){
    // console.log(event.currentTarget.dataset.categoryname)
    wx.navigateTo({
      url: './movieMore/movieMore?categoryname=' + event.currentTarget.dataset.categoryname
    })
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