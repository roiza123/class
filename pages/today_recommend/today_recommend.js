// pages/today_recommend/today_recommend.js
import config from '../../utils/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onTurntomine(e){
    wx.reLaunch({
      url: '/pages/index2/index2',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let _this = this
    wx.request({
      url: 'http://localhost:3000/recommend/resource',
      header:{
        Cookie:config.cookie
      },
      success(res){
        console.log(res.data.recommend)
        _this.setData({
          today_recommend_list:res.data.recommend
        })
      }
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