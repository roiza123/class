// pages/music/music.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poster: 'https://p2.ssl.qhimgs1.com/sdr/400__/t014266e2c6c893ecbc.jpg',
    name: '歌曲名',
    author: ''
  },

  onInput(e) {
    this.setData({
      name: e.detail.value
    })
  },

  onSearch(e) {
    wx.request({
      url: 'https://music.163.com/api/search/get/web',
      data: {
        s: this.data.name,
        type: 1
      },
      success: res => {
        let id = res.data.result.songs[0].id;
        let ids = '[' + id + ']'
        console.log(ids)
        this.setData({
          author: res.data.result.songs[0].artists[0].name
        })
        wx.request({
          url: 'https://music.163.com/api/song/enhance/player/url',
          data: {
            id: id,
            ids: ids,
            br: 3200000
          },
          success: res => {
            console.log(res.data)
            let playUrl = res.data.data[0].url
            console.log(playUrl)
            this.setData({
              src: playUrl
            });
            this.initAudio()
          }
        })
      }
    })
  },

  initAudio(e) {
    this.audioCtx.src = this.data.src;
    this.audioCtx.onCanplay(()=>{
      setTimeout(()=>{
        this.setData({
          duration:this.audioCtx.duration
        })
      },500);
      console.log('可以播放')
    })
  },

  audioPlay(e){
    this.audioCtx.play()
  },

  audioPasue(e){
    this.audioCtx.pasuse()
  },

  audioSeek(e){
    this.audioCtx.seek(0)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.audioCtx = wx.createInnerAudioContext();
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