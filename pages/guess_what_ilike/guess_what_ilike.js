// pages/guess_what_ilike/guess_what_ilike.js
import config from '../../utils/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pid: '', //歌单id
    id: '', //歌曲id
    index: 0,
    musicId: '',
    mid_detail: null,
    url: '',
    isPlay: false,
    song_name: '',
    whereissong: 0,
    song_now: 0,
    song_long: 0,
    isLove: false,
    howmanymylove:0
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
    let whereissong =  (now / this.data.song_long) * 100
    this.setData({
      song_now: now,
      whereissong
    })
    this.bam.onEnded(()=>{
      this.setData({
        index:this.data.index+1,
        isPlay:false
      })
      wx.setStorageSync('index', this.data.index)
      this.onLoad()
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
          uid: wx.getStorageSync('uid'),
          musicId: this.data.musicId,
          type: 1
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
          uid: wx.getStorageSync('uid'),
          musicId: this.data.musicId
        },
        success(res) {
          console.log("没爱了")
        }
      })
    }
  },

  onBackmylove(e) {
    this.setData({
      isPlay:false
    })
    wx.showModal({
      title: '提示',
      content: '确认退出猜你喜欢吗',
      complete: (res) => {
        if (res.confirm) {
          wx.reLaunch({
            url: '/pages/index2/index2',
          })
        }
      }
    })
  },

  onTurnprev(e) {
    if (this.data.index != 0) {
      this.setData({
        index: this.data.index - 1,
        isPlay:false
      })
      wx.setStorageSync('index', this.data.index)
      this.onLoad()
    } else {
      wx.showModal({
        title: '提示',
        content: '已是第一首，无法收听上一首歌曲',
      })
    }
  },

  onTurnnext(e) {
    if(this.data.index!=this.data.howmanymylove){
      this.setData({
      index: this.data.index + 1,
      isPlay:false
    })
    wx.setStorageSync('index', this.data.index)
    this.onLoad()
    }else{
      wx.showModal({
        title: '提示',
        content: '没有更多喜欢的歌了吗',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let _this = this
    this.setData({
      index:wx.getStorageSync('index')
    })
    //获取心动模式
    wx.request({
      url: 'http://localhost:3000/user/playlist',
      data: {
        uid: 5057582589,
        limit: 10
      },
      header: {
        Cookie: config.cookie
      },
      success(res) {
        _this.setData({
          pid: res.data.playlist[0].id
        })
        //获取用户的喜欢歌曲
        wx.request({
          url: 'http://localhost:8080/music/song/recently/play',
          data: {
            uid: wx.getStorageSync('uid'),
            limit: 1,
            type: 1,
          },
          success(res) {
            _this.setData({
              id: res.data.data[0]
            })
            wx.request({
              url: 'http://localhost:3000/playmode/intelligence/list',
              data: {
                id: _this.data.id,
                pid: _this.data.pid
              },
              header: {
                Cookie: config.cookie
              },
              success(res) {
                console.log(res.data.data[_this.data.index].songInfo)
                let length = res.data.data.length
                console.log(length)
                let maybeismyloveList = res.data.data[_this.data.index].songInfo
                _this.setData({
                  maybeismyloveList: maybeismyloveList,
                  musicId: maybeismyloveList.id,
                  howmanymylove:length,
                });
                //连接进度条
                _this.bam = wx.getBackgroundAudioManager();
                _this.bam.onTimeUpdate(() => {
                  let song_long = _this.bam.duration
                  let song_now = _this.bam.currentTime
                  _this.setData({
                    song_long: song_long,
                    song_now: song_now,
                    whereissong: (song_now / song_long) * 100
                  })
                });
                _this.bam.onPlay(() => {
                  _this.setData({
                    isPlay: true
                  })
                })
                _this.bam.onPause(() => {
                  _this.setData({
                    isPlay: false
                  })
                })
                _this.bam.onStop(() => {
                  _this.setData({
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
                    uid: uid,
                    musicId: musicId
                  },
                  success(res) {
                    console.log(res.data.data.isCollect)
                    if (res.data.data.isCollect != false) {
                      _this.setData({
                        isLove: true
                      })
                    }

                  }
                })
              }
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