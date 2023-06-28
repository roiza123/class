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

  
  onInput(e) {
    this.setData({
      newname: e.detail.value
    })
  },

  onSearch(e) {
    console.log(this.data.newname)
    wx.navigateTo({
      url: '/pages/search/search?newname='+this.data.newname,
    })
  },

  onTurntolisten(e){
    console.log(e.currentTarget.dataset);
    let musicId = e.currentTarget.dataset.id
    wx.reLaunch({
      url: '/pages/listen/listen?musicId='+musicId,
    })
  },

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
        limit: 8,
        type: 1
      },
      success(res) {
        _this.setData({
          searchResult:res.data.result.songs
        })
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