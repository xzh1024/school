// pages/cart/product/product.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ballX: 0,
    ballY: 0,
    showBall: false,
    animationX: 0,
    animationY: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  cartAnimation(e) {
    let x = e.detail.x,
      y = e.detail.y;
    // x y 为手指点击的坐标，即球的起始坐标
    let self = this,
      cartY = 600,
      // 结束位置（购物车图片）纵坐标
      cartX = 50,
      // 结束位置（购物车图片）的横坐标
      animationX = this.flyX(cartX, x),
      // 创建球的横向动画
      animationY = this.flyY(cartY, y)
    // 创建球的纵向动画

    this.setData({
      ballX: x,
      ballY: y,
      showBall: true
    })
    this.setTimeoutES6(100)
      .then(() => {
        // 100 ms 延时，确保球已经到位并显示
        self.setData({
          animationX: animationX.export(),
          animationY: animationY.export()
        })
        return this.setTimeoutES6(400)
        // 400 ms 是球的抛物线动画时长
      }).then(() => {
        // 400 ms 延时后隐藏球
        this.setData({
          showBall: false
        })
      })
  },

  setTimeoutES6(sec) {
    // Promise 化 setTimeout
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, sec)
    })
  },

  flyX(cartX, oriX) {
    // 水平动画
    let animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear',
    })
    animation.left(cartX).step()
    return animation
  },

  flyY(cartY, oriY) {
    // 垂直动画
    let animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease-in',
    })
    animation.top(cartY).step()
    return animation
  },



  // cartAnimation(e) {
  //   let x = e.detail.x,
  //     y = e.detail.y;
  //   let self = this,
  //   cartY = 600,
  //   cartX = 50,
  //   animationX = this.flyX(cartX, x),
  //   animationY = this.flyY(cartY, y)
  //   this.setData({
  //     leftNum: x,
  //     topNum: y,
  //     showBall: true
  //   })

  //   this.setTimeoutES6(100).then(() => {
  //     self.setData({
  //       animationDataX: animationX.export(),
  //       animationDataY: animationY.export(),
  //     })
  //     return this.setTimeoutES6(400)
  //   }).then(() => {
  //     this.setData({
  //       showBall: false,
  //       animationX: this.flyX(0, 0, 0).export(),
  //         // 还原小球位置，即 translate 恢复默认值
  //       animationY: this.flyY(0, 0, 0).export(),
  //     })
  //   })
  // },

  // setTimeoutES6(sec) {
  //   // Promise 化 setTimeout
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve()
  //     }, sec)
  //   })
  // },

  // flyX(cartX, oriX, duration) {
  //   let animation = wx.createAnimation({
  //     duration: duration || 400,
  //     timingFunction: 'linear',
  //   })
  //   animation.translateX(cartX - oriX).step()
  //   return animation
  // },

  // flyY(cartY, oriY, duration) {
  //   let animation = wx.createAnimation({
  //     duration: duration || 400,
  //     timingFunction: 'ease-in',
  //   })
  //   animation.translateY(cartY - oriY).step()
  //   return animation
  // }
})