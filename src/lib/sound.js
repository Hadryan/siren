import Sound from 'react-native-sound'

let _singleton = Symbol()

Sound.setCategory('Playback');

class SoundApi {
  constructor (token) {
    this.token = Math.random()
    if (_singleton !== token)
      throw new Error('Cannot instantiate directly.');
  }
  setURL (url) {
    return Promise((resolve, reject) => {
      this.player = new Sound(url, (error) => {
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
    this.player.play()
  }
  static get instance () {
    if (!this[_singleton])
      this[_singleton] = new SoundApi(_singleton)
    
    return this[_singleton]
  }
}

export default SoundApi