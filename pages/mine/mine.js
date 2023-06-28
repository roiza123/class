// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname: '',
    headUrl: ''
  },

  onDetailMine(e) {
    wx.redirectTo({
      url: '/pages/mine_detail/mine_detail',
    })
  },

  onDetailLove(e) {
    wx.redirectTo({
      url: '/pages/love_detail/love_detail',
    })
  },

  onDetailListen(e) {
    wx.redirectTo({
      url: '/pages/listen_detail/listen_detail',
    })
  },

  onTurntotodayRecommend(e){
    wx.redirectTo({
      url: '/pages/today_recommend/today_recommend',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let nickname = wx.getStorageSync('nickname')
    this.setData({
      nickname: nickname
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let phone = wx.getStorageSync('phone')
    let _this = this
    wx.request({
      url: 'http://localhost:8080/music/user/userinfo',
      data: {
        phone: phone
      },
      success(res) {
        console.log(res.data)
        if (res.data.data.avatarUrl != null) {
          _this.setData({
            headUrl: res.data.data.avatarUrl
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})