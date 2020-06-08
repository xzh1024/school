// pages/newsDetail/newsDetail.js
var newsData = require('../data/newsData.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    newsDetailData: {},
    isPlayingMusic: false,
    audioContext: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad 监听页面加载");
    this.setData({
      newsDetailData: newsData.data[options.newsid]
    });
    // console.log(this.data.newsDetailData);
    this.createInnerAudio();
  },
  createInnerAudio() {
    const audioContext = wx.createInnerAudioContext();
    audioContext.src = this.data.newsDetailData.music.url;
    this.setData({
      audioContext: audioContext
    });
  },
  // 音乐
  onPlay() {
    const audioContext = this.data.audioContext;
    console.log(audioContext);
    if (this.data.isPlayingMusic == false) {
      this.setData({
        "isPlayingMusic": true
      });
      audioContext.play();//播放
    } else {
      this.setData({
        "isPlayingMusic": false
      });
      audioContext.pause();//暂停
    };
  },
  // 背景音乐
  onMusicTap: function(event){
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
    };
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
    console.log("onReady 监听页面初次渲染完成");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow 监听页面显示");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide 监听页面隐藏");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnload 页面卸载");
    // 销毁当前音频实例
    this.data.audioContext.destroy();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("onPullDownRefresh 监听用户下拉动作");
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("onReachBottom 页面上拉触底事件的处理函数");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log("onShareAppMessage 用户点击右上角分享");
  }
})