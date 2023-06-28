// pages/listen/listen.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicId: '',
    mid_detail: null,
    url: '',
    isPlay: false,
    song_name: '',
    whereissong: 0,
    song_now: 0,
    song_long: 0,
    if2: false,
    isLove: false
  },

  handlePlay() {
    const isPlay = !this.data.isPlay;
    this.setData({
      isPlay
    });
    this.musicControl();
  },

  musicControl() {
    const {
      isPlay
    } = this.data;
    if (isPlay) {
      this.bam.src = this.data.url;
      this.bam.title = this.data.song_name;
    } else {
      this.bam.pause();
    }
  },

  onChangeListening(e) {
    this.bam = wx.getBackgroundAudioManager();
    console.log(e.detail.value)
    let now = (e.detail.value / 100) * this.data.song_long
    this.bam.seek(now)
    this.setData({
      song_now: now,
      whereissong: (now / this.data.song_long) * 100,
    })
  },

  onLoveThisSong(e) {
    this.setData({
      isLove: !this.data.isLove
    })
    if (this.data.isLove) {
      //添加收藏
      wx.request({
        url: 'http://localhost:8080/music/song/save',
        data: {
          uid:wx.getStorageSync('uid'),
          musicId:this.data.musicId,
          type:1
        },
        success(res) {
          console.log("爱了这首歌")
        }
      })
    } else {
      //取消收藏
      wx.request({
        url: 'http://localhost:8080/music/song/delete/collect',
        data: {
          uid:wx.getStorageSync('uid'),
          musicId:this.data.musicId
        },
        success(res) {
          console.log("没爱了")
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let musicId = options.musicId
    console.log(musicId)
    let _this = this
    _this.setData({
      musicId: musicId,
    })
    if (musicId != null) {
      this.bam = wx.getBackgroundAudioManager();
      this.bam.onTimeUpdate(() => {
        let song_long = this.bam.duration
        let song_now = this.bam.currentTime
        this.setData({
          song_long: song_long,
          song_now: song_now,
          whereissong: (song_now / song_long) * 100
        })
      });
      this.bam.onPlay(() => {
        this.setData({
          isPlay: true
        })
      })
      this.bam.onPause(() => {
        this.setData({
          isPlay: false
        })
      })
      this.bam.onStop(() => {
        this.setData({
          isPlay: false
        })
      })
      //找歌曲的具体信息
      wx.request({
        url: 'http://localhost:3000/song/detail',
        data: {
          ids: _this.data.musicId,
        },
        success(res) {
          console.log(res.data)
          _this.setData({
            mid_detail: res.data.songs[0].al,
            song_name: res.data.songs[0].name
          })
        }
      })
      //找歌曲对应的url
      wx.request({
        url: 'http://localhost:3000/song/url',
        data: {
          id: _this.data.musicId,
        },
        success(res) {
          if (res.data.data[0].url != null) {
            _this.setData({
              url: res.data.data[0].url
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '该歌曲为会员歌曲，暂时无法收听',
            })
          }
        }
      })
      //最近播放
      let uid = wx.getStorageSync('uid')
      let musicId = _this.data.musicId
      wx.request({
        url: 'http://localhost:8080/music/song/save',
        data: {
          uid: uid,
          musicId: musicId,
          type: 0
        },
        success(res) {
          console.log("听歌喽")
        }
      })
      //是否收藏
      wx.request({
        url: 'http://localhost:8080/music/song/iscollect',
        data: {
          uid:uid,
          musicId:musicId
        },
        success(res) {
          console.log(res.data.data.isCollect)
          if(res.data.data.isCollect!=false){
            _this.setData({
              isLove:true
            })
          }
          
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '现在没有歌曲在播放噢',
      })
    }

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