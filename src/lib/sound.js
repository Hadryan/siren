// import Sound from 'react-native-sound'
import TrackPlayer from 'react-native-track-player';

let _singleton = 'singletoken'

class SoundApi {
  constructor (token) {
    TrackPlayer.setupPlayer()
    if (_singleton !== token)
      throw new Error('Cannot instantiate directly.');
  }
  /**
   * 设置音乐基本信息
   * @param {String} url 音乐地址
   * @param {String} title 标题
   * @param {Array} author 艺术家
   * @param {String} cover 封面
   */
  setBaseInfo (url, title = '标题', author = ['作者'], cover = '') {
    this.title = title
    this.author = author
    this.cover = cover
    return this.setURL(url)
  }
  setURL (url) {
    return new Promise((resolve, reject) => {
      if (this.player) {
        this.player.release()
      }
      this.player = new Sound(url, '', (error) => {
        if (error) {
          console.log(error)
          reject(error)
          return
        }
        resolve(this)
      })
    })
  }
  play () {
    console.log('play')
    this.player.play((success) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
        // reset the player to its uninitialized state (android only)
        // this is the only option to recover after an error occured and use the player again
        this.player.reset();
      }
    })
  }
  static get instance () {
    if (!this[_singleton])
      this[_singleton] = new SoundApi(_singleton)
    
    return this[_singleton]
  }
}

export default SoundApi