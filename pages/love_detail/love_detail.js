// pages/love_detail/love_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicId: '',
    loveList: [],
  },

  onTurntolisten(e) {
    let musicId= e.currentTarget.dataset.musicid
    console.log(musicId)
    wx.reLaunch({
      url: '/pages/listen/listen?musicId='+musicId,
    })
  },

  onTurntomine(e) {
    wx.switchTab({
      url: '/pages/mine/mine',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let uid = wx.getStorageSync('uid')
    let _this = this
    wx.request({
      url: 'http://localhost:8080/music/song/recently/play',
      data: {
        uid:uid,
        type:1
      },
      success(res) {
        console.log(res.data.data)
        let ids = ""
        for (let i = 0; i < res.data.data.length; i++) {
          ids += ',' + res.data.data[i]
        }
        ids = ids.slice(1)
        console.log(ids)
        wx.request({
          url: 'http://localhost:3000/song/detail',
          data: {
            ids: ids
          },
          success(res) {
            let loveList = res.data.songs
            _this.setData({
              loveList
            })
          }
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