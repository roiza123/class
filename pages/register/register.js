// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    birthday: "点击选择生日",
    sex: "",
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
      sex: e.detail.value
    })
  },

  onRegister(e) {
    console.log(e)
    if(e.detail.value){
      let username = e.detail.value.username
      let user = e.detail.value.user
      let phone = e.detail.value.phone
      let password = e.detail.value.password
      let requireData = {
        username,
        name:user,
        phone,
        password,
        birthday:this.data.birthday,
        sex:this.data.sex
      }
      wx.request({
        url: 'http://localhost:8080/music_player_war_exploded/addUser',
        data:JSON.stringify(requireData),
        method:"POST",
        success(res){
          wx.showModal({
            title: '提示',
            content: '登陆成功',
            complete: (res) => {
              if (res.confirm) {
                wx.redirectTo({
                  url: '/pages/index2/index2?username='+e.detail.value.username,
                })
              }
            }
          })
        }
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