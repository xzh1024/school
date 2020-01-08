// pages/newsDetail/newsDetail.js
var newsData = require('../data/newsData.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    newsDetailData: {},
    isPlayingMusic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      newsDetailData: newsData.data[options.newsid]
    })
    console.log(this.data.newsDetailData)
  },
  onMusicTap: function(event){
    console.log('音乐');
    // var _this = this;
    //wx.getBackgroundAudioManager()
    // wx.getBackgroundAudioPlayerState({
    //   success(res) {
    //     //0 暂停中  1 播放中  2 没有音乐播放
    //     const status = res.status
    //     // const dataUrl = res.dataUrl
    //     // const currentPosition = res.currentPosition
    //     // const duration = res.duration
    //     // const downloadPercent = res.downloadPercent
    //     console.log(status)
    //     if (status != 1){
    //       wx.playBackgroundAudio({
    //         dataUrl: _this.data.newsDetailData.music.url,
    //         title: _this.data.newsDetailData.music.title,
    //         coverImgUrl: _this.data.newsDetailData.music.imgUrl
    //       })
    //     } else{
    //       wx.pauseBackgroundAudio();
    //     }
    //   }
    // });
    const backgroundAudioManager = wx.getBackgroundAudioManager();
    console.log(backgroundAudioManager.paused);
    if (backgroundAudioManager.paused == undefined){
      this.setData({
        "isPlayingMusic": true
      });

      backgroundAudioManager.title = this.data.newsDetailData.music.title;
      backgroundAudioManager.epname = this.data.newsDetailData.music.epname;//专辑名
      backgroundAudioManager.singer = this.data.newsDetailData.music.singer;
      backgroundAudioManager.coverImgUrl = this.data.newsDetailData.music.imgUrl;
      // 设置了 src 之后会自动播放
      backgroundAudioManager.src = this.data.newsDetailData.music.url;
    } else if (backgroundAudioManager.paused == true){
      this.setData({
        "isPlayingMusic": true
      });
      backgroundAudioManager.play();//播放
    } else {
      this.setData({
        "isPlayingMusic": false
      });
      backgroundAudioManager.pause();//暂停
    }
  },
  show: function(){
    // wx.showModal({
    //   title: '提示',
    //   content: '这是一个模态弹窗',
    //   success(res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
    // wx.showActionSheet({
    //   itemList: ['A', 'B', 'C'],
    //   success(res) {
    //     console.log(res.tapIndex)
    //   },
    //   fail(res) {
    //     console.log(res.errMsg)
    //   }
    // })
    // wx.showShareMenu({
    //   withShareTicket: true
    // })
    // wx.hideShareMenu()
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: this.data.newsDetailData.title,
      // path: 'pages/newsDetail/newsDetail?newsid=' + this.data.newsDetailData.newsid,
      path: 'pages/newsDetail/newsDetail',
      imageUrl:'/pages/images/logo04.jpg'
    }
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
  
  }

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {
  
  // }
})