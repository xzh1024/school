// pages/aboutUs/aboutUs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false
  },
  onMusicTap: function (event) {
    var isPlayingMusic = this.data.isPlayingMusic;
    console.log(isPlayingMusic);
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      // 设置setData值，前端界面才能读取到isPlayingMusic是值，以下同理
      this.setData({
        isPlayingMusic: false
      })
      console.log("pauseBackgroundAudio");
    } else {
      // wx.playBackgroundAudio({
      //   dataUrl: 'http://music.163.com/song/media/outer/url?id=574919767.mp3',
      //   title: '不要平凡',
      //   coverImgUrl: '',
      // })
      wx.playBackgroundAudio({
        dataUrl: 'http://www.170mv.com/kw/other.web.rh01.sycdn.kuwo.cn/resource/n1/37/97/2137201847.mp3',
        title: 'All of Me',
        coverImgUrl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2078751632,494879754&fm=58&bpow=350&bpoh=350',
      })
      this.setData({
        isPlayingMusic: true
      })

      console.log(isPlayingMusic);
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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