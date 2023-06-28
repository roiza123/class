Page({

  /**
   * 页面的初始数据
   */
  data: {
     phone:''
  },

  onLogin(e) {
    console.log(e.detail.value);
    let phone = e.detail.value.phone;
    let password = e.detail.value.password;
    this.setData({phone:phone})
    if (phone != null && password != null) {
      wx.request({
        url: 'http://localhost:8080/music/user/login',
        data: {
          phone: phone,
          password: password,
        },
        method:'POST',
        success(res) {
          console.log(res);
          if (res.data.message == "成功") {
            wx.setStorageSync('phone', res.data.data.phone)
            wx.switchTab({
              url: '/pages/index2/index2',
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '账号或密码输入错误',
            })
          }
        }
      })
    }

  },

  turnToRegister(e){
    wx.redirectTo({
      url: '/pages/register/register',
    })
  },

  turntofind(e){
    wx.redirectTo({
      url: '/pages/find_password/find_password',
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

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