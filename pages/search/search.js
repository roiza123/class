// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchResult:[],
    name:"",
    newname:"",
  },

  // onInput(e) {
  //   this.setData({
  //     newname: e.detail.value
  //   })
  // },

  // onSearch(e) {
  //   console.log(this.data.newname)
  //   wx.navigateTo({
  //     url: '/pages/search/search?newname='+this.data.newname,
  //   })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this;
    this.setData({
      name:options.name
    })
    wx.request({
      url: 'http://localhost:3000/search',
      data: {
        keywords: this.data.name,
        limit: 10,
        type: 1
      },
      success(res) {
        console.log(res.data.result.songs)
        for (let i = 0; i < 10; i++) {
          _this.data.searchResult.push(res.data.result.songs[i])
        }
        console.log(_this.data.searchResult)
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