// pages/find_password/find_password.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password: '',
    ifequal: false,
  },

  onGetPassword(e) {
    console.log(e.detail.value)
    this.setData({
      password: e.detail.value
    })
  },

  onCheckPassword(e) {
    console.log(e.detail.value)
    if (this.data.password == e.detail.value) {
      this.setData({
        ifequal: true
      })
    }
  },

  onRegister(e) {
    console.log(e)
    if (e.detail.value) {
      let phone = e.detail.value.phone
      let password = e.detail.value.password
      let checkPassword = e.detail.value.checkPassword
      let requireData = {
        phone: phone,
        password: password,
        checkPassword: checkPassword,
        type: 0
      }
      wx.request({
        url: 'http://localhost:8080/music/user/userinfo',
        data: {
          phone: phone
        },
        success(res) {
          if (res.data) {
            wx.request({
              url: 'http://localhost:8080/music/user/register',
              data: JSON.stringify(requireData),
              method: "POST",
              success(res) {
                let phone = wx.setStorageSync('phone', e.detail.value.phone)
                wx.showModal({
                  title: '提示',
                  content: '注册成功',
                  complete: (res) => {
                    if (res.confirm) {
                      wx.switchTab({
                        url: '/pages/index2/index2',
                      })
                    }
                  }
                })
              },
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '该账号已存在，请更换其他账号进行注册',
            })
          }

        },
      })

    } else {
      wx.showModal({
        title: '提示',
        content: '仍未全部完成注册资料的填写，请重新填写',
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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