// pages/index2/index2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: "",
    username: "",
    recommended_list: [],
    list: [{
      name: "向云端",
      picUrl: '/picture/1.1.jpg'
    }, {
      name: "署前街少年",
      picUrl: '/picture/1.2.jpg'
    }, {
      name: "风吹过的声音是",
      picUrl: '/picture/1.3.jpg'
    }, {
      name: "把回忆拼成日记",
      picUrl: "/picture/1.4.jpg"
    }, {
      name: "罗生门",
      picUrl: "/picture/1.5.jpg"
    }, {
      name: "天赐的声音",
      picUrl: "/picture/1.6.jpg"
    }, {
      name: "予你",
      picUrl: "/picture/1.7.jpg"
    }, {
      name: "中国说唱巅峰对决",
      picUrl: "/picture/1.8.jpg"
    }, {
      name: "飞行器的执行周期",
      picUrl: "/picture/1.9.jpg"
    }],
    name: '歌曲名',
  },

  onInput(e) {
    this.setData({
      name: e.detail.value
    })
  },

  onSearch(e) {
    console.log(this.data.name)
    wx.navigateTo({
      url: '/pages/search/search?name='+this.data.name,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    this.setData({
      username: options.username,
    })
    wx.request({
      url: 'http://localhost:8080/music_player_war_exploded/searchUser',
      data: {
        username: this.data.username
      },
      success(res) {
        console.log(res)
        _this.setData({
          user: res.data.name
        })
      }
    });
    wx.request({
      url: 'http://localhost:3000/top/list',
      data: {
        idx: 1
      },
      success(res) {
        for (let i = 0; i < 10; i++) {
          _this.data.recommended_list.push(res.data.playlist.tracks[i].al)
        }
        console.log(_this.data.recommended_list)
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