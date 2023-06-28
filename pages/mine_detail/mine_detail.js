// pages/mine_detail/mine_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: '',
    whichsex: '',
    birthday: '',
    headUrl: '/picture/head.jpg',
  },

  onChooseAvatar(e) {
    let uid = wx.getStorageSync('uid')
    let _this = this
    wx.chooseImage({
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          filePath: tempFilePaths[0],
          name: 'file',
          url: 'http://localhost:8080/music/file/uploadimg',
          formData: {
            'uid': uid
          },
          success(res) {
            let resultData = JSON.parse(res.data)
            console.log(resultData)
            if (resultData.code === 200) {
              _this.setData({
                headUrl: resultData.data.avatarUrl
              })
              console.log("上传成功")
            }else{
              console.log("上传失败")
              wx.showModal({
                title: '提示',
                content: '图片过大，上传失败',
              })
            }
          }
        })
      }
    })
  },


  onDateChange(e) {
    console.log(e.detail.value);
    this.setData({
      birthday: e.detail.value
    })
  },

  onSexChange(e) {
    console.log(e.detail.value);
    this.setData({
      whichsex: e.detail.value
    })
  },

  onChangeDatail(e) {
    if (e.detail.value) {
      let phone = e.detail.value.phone
      let nickname = e.detail.value.nickname
      let requireData = {
        phone,
        gender: this.data.gender,
        nickname,
        birthday: this.data.birthday,
      }
      console.log(requireData)
      wx.request({
        url: 'http://localhost:8080/music/user/update',
        data: JSON.stringify(requireData),
        method: "POST",
        success(res) {
          wx.showModal({
            title: '提示',
            content: '修改成功',
            complete: (res) => {
              if (res.cancel) {
                wx.redirectTo({
                  url: '/pages/mine_detail/mine_detail',
                })
              }
            }
          })
        }
      })
    }
  },

  onReturnMine(e) {
    wx.reLaunch({
      url: '/pages/mine/mine',
    })
  },

  onReturnIndex(e) {
    wx.redirectTo({
      url: '/pages/index/index',
    })
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
    let phone = wx.getStorageSync('phone')
    let _this = this
    wx.request({
      url: 'http://localhost:8080/music/user/userinfo',
      data: {
        phone: phone
      },
      success(res) {
        let date = new Date(res.data.data.birthday);
        let birthday = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        console.log(res.data)
        _this.setData({
          detail: res.data.data,
          birthday: birthday,
          whichsex: res.data.data.gender,
          nickname: res.data.data.nickname,
        })
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