// pages/music-top/music-top.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommendedList: [],
    list: [{
      id: "166146490",
      name: "向云端",
      picUrl: '/picture/1.1.jpg'
    }, {
      id: "150127127",
      name: "署前街少年",
      picUrl: '/picture/1.2.jpg'
    }, {
      id: "164305610",
      name: "风吹过的声音是",
      picUrl: '/picture/1.3.jpg'
    }, {
      id: "83305009",
      name: "把回忆拼成日记",
      picUrl: "/picture/1.4.jpg"
    }, {
      id: "91237927",
      name: "罗生门",
      picUrl: "/picture/1.5.jpg"
    }, {
      name: "天赐的声音",
      picUrl: "/picture/1.6.jpg"
    }, {
      id: "136184367",
      name: "予你",
      picUrl: "/picture/1.7.jpg"
    }, {
      name: "中国说唱巅峰对决",
      picUrl: "/picture/1.8.jpg"
    }, {
      id: "35005583",
      name: "飞行器的执行周期",
      picUrl: "/picture/1.9.jpg"
    }],
  },

  onTurntolisten(e) {
    console.log(e)
    let musicId = e.currentTarget.dataset.musicid
    console.log(musicId)
    wx.reLaunch({
      url: '/pages/listen/listen?musicId=' + musicId,
    })
  },

  onTurntoindex2(e) {
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
      url: 'http://localhost:3000/top/list',
      data: {
        idx: 1
      },
      success(res) {
        let list = []
        for (let i = 0; i < 10; i++) {
          list.push(res.data.playlist.tracks[i])
        }
        _this.setData({
          recommendedList:list
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